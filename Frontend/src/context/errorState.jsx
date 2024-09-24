import { createContext, useState } from 'react';

export const ErrorStateContext = createContext({
    errorState: false,
    setErrorState: ()=>{}
});

const ErrorStateProvider = ({children})=>{
    const [errorState, setErrorState] = useState(false);
    return (
    <ErrorStateContext.Provider value={{errorState, setErrorState}}>
        {children}
    </ErrorStateContext.Provider>
    )
}

export default ErrorStateProvider;