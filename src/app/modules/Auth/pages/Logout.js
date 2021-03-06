import React, {useEffect, Fragment} from 'react';
import {useContext} from "react";
import AuthContext from "../../../store/auth-context";

const Logout = () => {

  const authCtx = useContext(AuthContext);

  useEffect(() => {

    localStorage.removeItem('authToken');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('rif');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('mail');
    localStorage.removeItem('phone_number_mobile');
    localStorage.removeItem('groups');

    // NO borrar este código comentado
    // authCtx.logout();
    window.location.href = '/';

  }, []);

  return (
    <Fragment/>
  );
}

export default Logout
