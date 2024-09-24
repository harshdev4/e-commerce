import { createContext, useReducer, useState } from "react";

export const EditInfoContext = createContext({
    editInfoState: [],
    dispatchEditInfo: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return [
        {
          type: "text",
          name: "name",
          required: true,
          placeholder: "Your Full Name",
        },
      ];
    
    case "email":
        return [
        {
          type: "text",
          name: "email",
          required: true,
          placeholder: "Enter the new Email",
        },
        ];
    case 'address':
      return [
        {
          type: "text",
          name: "street",
          required: true,
          placeholder: "Your Street",
        },
        {
          type: "text",
          name: "city",
          required: true,
          placeholder: "Your City",
        },
        {
          type: "text",
          name: "postalCode",
          required: true,
          placeholder: "Your Pincode",
        },
      ]
    default:
      state;
  }
};

const EditInfoProvider = ({ children }) => {
  const [editInfoState, dispatchEditInfo] = useReducer(reducer, []);
  return (
    <EditInfoContext.Provider value={{ editInfoState, dispatchEditInfo }}>
      {children}
    </EditInfoContext.Provider>
  );
};

export default EditInfoProvider;
