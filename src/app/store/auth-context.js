import React, {useEffect, useState} from "react";
import { PathListContribuyente, PathListFuncional } from "../router/helperRoute";
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext({
  
  token: '',
  isLoggedIn: false,
  login: (token) => {
  },
  logout: () => {
  },
});

export const AuthContextProvider = (props) => {

  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!token);
  const [accesRouters, setAccessRouters] = useState(null);
  const [userGroup, setUserGroup] = useState(localStorage.getItem("groups"));
  const [userType, setUserType] = useState(null);

  const definedRouters = () => {

    let routers = [];
    if(userType == "user") {
      PathListContribuyente.map((router) => {
        if(router.groups.indexOf(userGroup) > -1) {
          routers.push(router);
        }
      });
    }
    if(userType == "funcional") {
      PathListFuncional.map((router) => {
        if(router.groups.indexOf(userGroup) > -1) {
          routers.push(router);
        }
      });
    }
    setAccessRouters(routers);
  }

  const definedUserType = () => {
    switch(userGroup) {
      case "contribuyentes":
        // setUserType("funcional");
        setUserType("user");
        break;
      case "parciales":
        // setUserType("funcional");
        setUserType("user");
        break;
      default:
        setUserType("funcional");
        break;
    }
  }

  useEffect(()=>{
    if(token) {
      let tokenDecoded = jwt_decode(token);
      setUserGroup(tokenDecoded.data.groups[0]);
      // setUserGroup("administradores");
      definedUserType();
    }
    setUserIsLoggedIn(!!token);
  },[]);

  useEffect(()=>{
    definedRouters();
  },[userType]);

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    accesRouters: accesRouters,
    userGroup: userGroup,
    userType: userType,
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