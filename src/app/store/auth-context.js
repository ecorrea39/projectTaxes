import React, {useEffect, useState} from "react";
import { PathList, PathListFuncional } from "../router/helperRoute";
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
  const [userGroup, setUserGroup] = useState(null);
  const [userType, setUserType] = useState(null);
  const [urlDash, setUrlDash] = useState("/");

  const definedRouters = () => {
    let routers = [];

    PathList.map((router) => {
      if(router.groups.indexOf(userGroup) > -1) {
        routers.push(router);
      }
    });
    
    /*if(userType == "funcional") {
      PathListFuncional.map((router) => {
        if(router.groups.indexOf(userGroup) > -1) {
          routers.push(router);
        }
      });
    }*/
    setAccessRouters(routers);
  }

  const definedUserType = () => {
    switch(userGroup) {
      case "contribuyentes":
        setUserType("user");
        setUrlDash("/dashboard");
        break;
      case "parciales":
        setUserType("user");
        setUrlDash("/dashboard");
        break;
      default:
        setUserType("funcional");
        setUrlDash("/panel");
        break;
    }
    return;
  }
  useEffect(()=>{
    if(localStorage.getItem("authToken")) {
      let tokenDecoded = jwt_decode(token);
      setUserGroup("contribuyentes");
      //setUserGroup(tokenDecoded.data.groups[0]);
    }
    setUserIsLoggedIn(!!token);
  },[]);

  useEffect(()=>{
    definedRouters();
  },[userType]);

  useEffect(()=>{
    definedUserType();
  },[userGroup]);

  const loginHandler = async (token) => {
    let tokenDecoded = jwt_decode(token);
    setUserGroup(tokenDecoded.data.groups[0]);
    // setUserGroup("administradores");
    definedUserType();
    window.location.href = "/";
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    urlDash: urlDash,
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