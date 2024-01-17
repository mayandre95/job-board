import React, {useState, useReducer, useContext} from "react";

const initialeState = {
    isLoading: false,
    showAlert : false,
    alertType : "",
    alertText : "",
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {

}