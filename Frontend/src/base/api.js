import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

export const loginUser = async (loginData, setErrorState, setErrorMsg, dispatch, navigate) => {
  try {
    let cartItems = JSON.parse(localStorage.getItem('mayaCart')) || [];
    loginData['prevCart'] = cartItems;
    const response = await api.post('/auth/login', loginData);
    const loggedInUser = jwtDecode(response.data.user);
    dispatch({type: 'login', payload: loggedInUser});
    navigate('/');
  } catch (error) {
    setErrorState(true);
    setErrorMsg(error.response?.data?.message || 'Something went wrong');
  }
};

export const registerUser = async (registerData, setErrorState, setErrorMsg, dispatch, navigate) => {
  try {
    const response = await api.post('/auth/register', registerData);
    const loggedInUser = jwtDecode(response.data.user);
    dispatch({type: 'login', payload: loggedInUser});
    navigate('/');
  } catch (error) {
    setErrorState(true);
    setErrorMsg(error.response?.data?.message || 'Something went wrong');
  }
};

export const logoutUser = async (dispatch, navigate) => {
  try {
    const response = await api.get('/auth/logout');
    if (response.status === 200) {
      dispatch({type: 'logout'});
      navigate('/');
    }
  } catch (error) {
    console.log(error);
  }
};

export const isLoggedIn = async (userId, dispatch, setTokenExp)=>{
  try {
    const response = await api.get('/auth/isLoggedIn');
    if (response.status == 200) {
      setTokenExp((response.data.user.exp)*1000);
      dispatch({type: 'login', payload: response.data.user});
    }
  } catch (error) {
    if((error.response.status == 401 || error.reponse.status == 403)){
      dispatch({type: 'notLogin'});
    }
    else
      console.log(error);
  }  
}

export const refreshToken = async (dispatch)=>{
  try {
    const response = await api.get('/auth/refresh-token');
    if (response.status == 200) {
      dispatch({type: 'login', payload: response.data.user});
    }
  } catch (error) {
    console.log(error);
    
    throw new Error("Please login");
  }
}

export const getUserData = async (userId, dispatch)=>{
  try {
    const response = await api.get(`/api/user/getUserData/${userId}`);
    
    dispatch({type: 'setUserData', payload: response.data.user});
  } catch (error) {
    console.log(error);
  }
}

export const editUserData = async (userId, editType, editData, updated, navigate, dispatch, setErrorState, setErrorMsg)=>{
  try {
    const response = await api.post(`/api/user/${userId}/editInfo/${editType}`, editData);
    dispatch({type: 'updated', payload: updated+1});
    navigate(-1);
  } catch (error) {
    setErrorState(true);
    setErrorMsg(error.response?.data?.message || 'Something went wrong');
  }
}

export const forgotPass = async (input, setEmailState, setNotifyText, setColor)=>{
  try {
    const response = await api.post(`/auth/forgotPass`, input);
    
    setEmailState(true);
    setColor('#4BB543');
    setNotifyText(response.data.message);
  } catch (error) {
    setEmailState(true);
    setNotifyText(error.response.data.message);
    setColor('#e63737');
  }
}

export const getUsers = async (setUsers)=>{
  try {
    const response = await api.get('/api/user/getUsers');
    setUsers(response.data.users);
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = async (userId, setIsDeleted) => {
  try {
    const response = await api.get(`/api/user/deleteUser/${userId}`);
    setIsDeleted(true);
  } catch (error) {
    console.log(error);
  }
}

export const banUser = async (userId, banAction, setBanStatus) => {
  try {
    const response = await api.post('/api/user/banUser', {userId, banAction});
    setBanStatus(true);
  } catch (error) {
    console.log(error);
  }
}

export const addProduct = async (formData, setErrorState, setNotifyText, setColor)=>{
  setErrorState(true);
  try {
    const response = await api.post('/api/product/addProduct', formData, { headers: {
      'Content-Type': 'multipart/form-data'
  }});
    setNotifyText(response.data.message);
    setColor('#4BB543');
  } catch (error) {
    console.log(error);
    setNotifyText(error.response.data.message);
    setColor('#e63737');
  }
}

export const getProducts = async (setProducts)=>{
  try {
    const response = await api.get('/api/product/getProducts');
    setProducts(response.data.products);
  } catch (error) {
    console.log(error);
  }
}

export const getProductsCategory = async (setProducts, category)=>{
  console.log(category);
  
  try {
    const response = await api.get(`/api/product/getProductsCategory/${category}`);
    setProducts(response.data.products);
  } catch (error) {
    console.log(error);
  }
}

export const deleteProduct = async (productId, setIsDeleted)=>{
  try {
    const response = await api.get(`/api/product/deleteProduct/${productId}`);
    setIsDeleted(true);
  } catch (error) {
    console.log(error);
  }
}

export const getNewProducts = async (setNewProducts) => {
  try {
    const response = await api.get('/api/product/getNewProducts');
    setNewProducts(response.data.products);
  } catch (error) {
    console.log(error);
  }
}

export const getProductsByCategory = async (setProducts, category) => {
  try {
    const response = await api.get(`/api/product/getProductsByCategory/${category}`);
    setProducts(response.data.products);
  } catch (error) {
    console.log(error);
  }
}

export const getProductById = async (productId, setProductData)=>{
  try {
    const response = await api.get(`/api/product/getProductById/${productId}`);
    setProductData(response.data.product);
  } catch (error) {
    console.log(error);
  }
}

export const setCartItem = async (cartItem)=>{
  try {
    const response = await api.post(`/api/user/setCartItems`, cartItem);
  } catch (error) {
    console.log(error);
  }
}

export const getCartItem = async (cartItems, setCartProducts, isLogin) => {
  const newCartItems = cartItems.map((obj)=> obj.product);
  const url1 = `/api/product/getCartProduct/${newCartItems}`;
  const url2 = `/api/user/getCartProduct/`;

  try {
    const response = await api.get(isLogin? url2 : url1);

    const fetchedItems = response.data.cartItems;
    
    if(!isLogin){
      fetchedItems.forEach(product => {
        cartItems.map(item => item.product == product._id ? item.product = product : item.product);
      });
      
      setCartProducts(cartItems);
    }

    else{
      setCartProducts(fetchedItems);
    }

  } catch (error) { 
    console.log(error);
  }
}

export const deleteCartItem = async (productId)=>{
  try {
    const response = await api.post("/api/user/deleteCartItems", {'productId': productId});
  } catch (error) {
    console.log(error);
  }
}

export const searchProduct = async (value, setProducts)=>{
  try {
    const response = await api.get(`/api/product/search/${value}`);
    setProducts(response.data.products);
  } catch (error) {
    console.log(error);
  }
}