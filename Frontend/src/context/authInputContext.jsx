import { createContext, useState, useRef} from 'react';

export const inputContext = createContext({
    passwordEye: null,
    inputPassword: null,
    toggleEye: ()=>{}
});

const InputContextProvider = ({children})=>{
    const passwordEye = useRef(null);
    const inputPassword = useRef(null);

    const toggleEye = ()=>{
        const eye = passwordEye.current;
        const password = inputPassword.current;
        eye.classList.toggle('fa-eye');
        if (eye.classList.contains('fa-eye')) {
          password.type = "text";
        }
        else{
          password.type = "password";
        }
      }

    return (
        <inputContext.Provider value={{passwordEye, inputPassword, toggleEye}}>
            {children}
        </inputContext.Provider>
    )
};

export default InputContextProvider;