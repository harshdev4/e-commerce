import { createContext, useState } from "react";

export const PopupState = createContext({
    popupState: false,
    confirmMsg: '',
    buttonTitle: '',
    setPopupState: ()=> {},
    confirmAction: ()=> {},
    setConfirmAction: ()=> {},
    setConfirmMsg: ()=> {},
    setButtonTitle: ()=> {},
});

const PopupStateProvider = ({children})=>{
    const [popupState, setPopupState] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState('');
    const [buttonTitle, setButtonTitle] = useState('');
    const [confirmAction, setConfirmAction] = useState();

    return(
        <PopupState.Provider value={{popupState, setPopupState, confirmMsg, setConfirmMsg, buttonTitle, setButtonTitle, confirmAction, setConfirmAction}}>
            {children}
        </PopupState.Provider>
    )
}

export default PopupStateProvider;