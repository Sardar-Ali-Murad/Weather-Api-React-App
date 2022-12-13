import React, { useReducer, useContext } from 'react'

import reducer from './reducer'



import {
  HANDLE_CHANGE,
  HANDLE_CHECK,
} from './actions'


const initialState = {
  
}


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
   
  function handleChange(name,value){
    dispatch({type:HANDLE_CHANGE,payload:{name:name,value:value}})
  }

  function handleCheck(name,checked){
    dispatch({type:HANDLE_CHECK,payload:{name:name,value:checked}})
  }

  
  return (
    <AppContext.Provider
    value={{
      ...state,
      handleChange,
      handleCheck,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
