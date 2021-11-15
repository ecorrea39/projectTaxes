import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {
  },
  logout: () => {
  },
});

export const AuthContextProvider = (props) => {

  const [token, setToken] = useState(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!token);

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  useEffect(()=>{
    let token = localStorage.getItem("authToken");
    // setUserIsLoggedIn(!!token);
    // setToken(!!token);
    console.log("mi token es ", token)
    if(token) {
      setToken(token);
      setUserIsLoggedIn(!!token);
    } else {
      setToken(null);
      setUserIsLoggedIn(!!token);
    }
  },[]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default  AuthContext;