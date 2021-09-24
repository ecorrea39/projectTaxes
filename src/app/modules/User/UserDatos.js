import React, {Fragment, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import UserDatosHeader from "./UserDatosHeader";
import UserDatosFormStep1 from "./UserDatosFormStep1";
import UserDatosFormStep2 from "./UserDatosFormStep2";
import UserDatosFormStep3 from "./UserDatosFormStep3";
import UserDatosFormStep4 from "./UserDatosFormStep4";
import {Redirect, Route} from "react-router-dom";
import {AuthPage} from "../Auth";


const UserDatos = (props) => {

  const [step, setStep] = useState(1);

  return (
    <Fragment>
      <UserDatosHeader formularioActual={step} />

      <br/>

      { step==1 && <UserDatosFormStep1 formularioActual={step} /> }

      { step==2 && <UserDatosFormStep2 formularioActual={step} /> }

      { step==3 && <UserDatosFormStep3 formularioActual={step} /> }

      { step==4 && <UserDatosFormStep4 formularioActual={step} /> }

    </Fragment>
  );
}

export default UserDatos;