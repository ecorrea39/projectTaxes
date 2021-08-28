import React, {useEffect, Fragment} from 'react';
import {Redirect, Route} from "react-router-dom";

const Logout = () => {

  useEffect(() => {

    localStorage.removeItem('authToken');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('rif');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('mail');
    localStorage.removeItem('phone_number_mobile');
    localStorage.removeItem('groups');

    window.location.href = '/';

  }, []);

  return (
    <Fragment />
  );
}

export default Logout
