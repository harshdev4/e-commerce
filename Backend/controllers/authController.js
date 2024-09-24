const bcrypt = require('bcrypt');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const transporter = require('../config/nodemailerConfig');
require('dotenv').config();

// converting salt round into integer of base 10 i.e. 'decimal'
const saltRounds = parseInt(process.env.SALT_ROUND, 10);
const secretKey = process.env.SECRET_KEY;

// login controller
exports.login = async (req, res) => {
  let { mobileNo, password, prevCart } = req.body;
  // sanitization
  mobileNo = mobileNo + '';

  // validation
  if (!mobileNo || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await userModel.findOne({ mobileNo });
    if (user) {
      if(user.isBanned) return res.status(403).json({message: 'Account has been banned'});
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        prevCart.forEach(element => {
          const found = user.cart.find((item)=> item.product == element.product);
          if (!found) {
            user.cart.push(element);
          }
        });

        await user.save();
        const refreshToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });
        const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '15m' });

        res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'User logged in successfully', user: accessToken });
      }
      else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    }
    else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Something went wrong' });
  }

}

// signup controller
exports.register = async (req, res) => {
  let { name, email, mobileNo, password } = req.body;

  // sanitization
  const trimmedName = name.trim();
  mobileNo = mobileNo + '';

  // validation
  if (!name || !email || !mobileNo || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Enter a valid email' });
  }

  if (!validator.isMobilePhone(mobileNo, 'en-IN')) {
    return res.status(400).json({ message: 'Enter a valid mobile number' });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol.' });
  }

  try {
    const isExisted = await userModel.findOne({ $or: [{ email }, { mobileNo }] });
    if (!isExisted) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await userModel.create({ name: trimmedName, email, mobileNo, password: hashedPassword });
      const refreshToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });
      const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '15m' });
      res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.status(200).json({ message: 'User signed in successfully', user: accessToken });
    }
    else {
      res.status(400).json({ message: 'Email or mobile number is already exists' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong! please try again' });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure this matches your app's environment
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: "User logged out successfully" });
};


// refresh the access token
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }
  
  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const accessToken = jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn: '15m' });
    const user = jwt.verify(accessToken, secretKey);
    res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Token refreshed', user });
  } catch (error) {
    console.log(error);

    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

// isLoggedIn route
exports.isLoggedIn = (req, res) => {
  res.status(200).json({ user: req.user });
}

//handle forget password
exports.forgotPass = async (req, res) => {
  const mobileNo = req.body.mobileNo;
  
  try {
    const user = await userModel.findOne({mobileNo});
    if (user) {
      const userEmail = user.email;
      const mailOptions = {
        from: '"Maya Furniture" <mayafurniture@gmail.com>',
        to: userEmail,
        subject: 'Reset Password',
        html: `<h3>Forgot Your Password?</h3>
              <p>Click the link below to reset your password:</p>
              <a href="http://localhost:3000/auth/${user.mobileNo}/resetPass" target="_blank" rel="noopener noreferrer"> Reset Password </a>`
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending email', error });
        }
        return res.status(200).json({ message: `We have sent an email to ${userEmail}`, info });
      });
    }
    else {
      return res.status(404).json({ message: 'Phone number is not registered' });
    }
  } catch (error) {
    console.log('Server Error: ',error);
    
    return res.status(500).json({ message: 'Server Error' })
  }
}

exports.resetPass = async (req, res) =>{
  const userMobile = req.params.mobileNo;
  
  try {
    const user = await userModel.findOne({mobileNo: userMobile});
    if (user) {
      return res.redirect(`/auth/resetPass/${user._id}`);
    }
    else{
      return res.status(404).json({message: 'User not found'})
    }
  } catch (error) {
    console.log(error);
    
     return res.status(500).json({message: 'Server Error'})
  }
}

exports.resetPassPage = async (req, res) =>{
  const userId = req.params.userId;
  res.render("resetPass.ejs", {userId});
}

exports.updatePass = async (req, res)=>{
  const newPass = req.body.newPass;
  const userId = req.params.userId;
  
  if (!validator.isStrongPassword(newPass)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol.' });
  }

  try {
    const user = await userModel.findById(userId);
    if (user) {
      const hash = await bcrypt.hash(newPass, saltRounds);
      user.password = hash;
      await user.save();
      return res.status(200).json({message: 'Password resets'})
    }
    else{
      return res.status(404).json({message: 'User not found'})
    }
  } catch (error) {
    console.log(error);
    
     return res.status(500).json({message: 'Server Error'})
  }
}


