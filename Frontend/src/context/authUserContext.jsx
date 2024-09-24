import { createContext, useReducer, useRef, useState } from "react";

export const AuthUserState = createContext();

const reducer = (state, action)=>{
    switch (action.type) { 
        case 'login':
            return { ...state,
                userId: action.payload.userId,
                login: true
                }
        
        case 'logout':
            return { ...state, 
                userId: null,
                userName: null,
                userEmail: null,
                userMobileNo: null,
                userAddress: { 
                    street: null,
                    city: null,
                    postalCode: null},
                isAdmin: false,
                login: false, userLoading: true
            }
        
        case 'setUserData':
            return {
                ...state,
                userName: action.payload.name,
                userEmail: action.payload.email,
                userMobileNo: action.payload.mobileNo,
                userAddress: { 
                    street: action.payload?.address?.street,
                    city: action.payload?.address?.city,
                    postalCode: action.payload?.address?.postalCode},
                isAdmin: action.payload.isAdmin,
                userLoading: false
            }

        case 'notLogin':
            return {
                ...state,
                userLoading: false
            }

        case 'updated':
            return {
                ...state, 
                updated: action.payload
            }
            
        default:
            return state;
            
    }
};


const AuthUserStateProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, {userId: null, login: false, userLoading: true, userName: null, userEmail: null, userMobileNo: null, userAddress: { street: null,
        city: null,
        postalCode: null}, updated:0, isAdmin: false});

    return(
        <AuthUserState.Provider value={{state, dispatch}}>
            {children}
        </AuthUserState.Provider>
    )
};

export default AuthUserStateProvider;