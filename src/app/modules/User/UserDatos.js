import React, {Fragment, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import UserDatosHeader from "./UserDatosHeader";
import UserDatosFormStep1 from "./UserDatosFormStep1";
import UserDatosFormStep2 from "./UserDatosFormStep2";
import UserDatosFormStep3 from "./UserDatosFormStep3";
import UserDatosFormStep4 from "./UserDatosFormStep4";
import UserDatosFormStep5 from "./UserDatosFormStep5";


const UserDatos = (props) => {

  const [step, setStep] = useState(1);

  const cambiarStep = (paso) => {
    setStep(paso);
  }

  return (
    <Fragment>
      <UserDatosHeader formularioActual={step} cambiarFormularioActual={cambiarStep} />

      <br/>

      { step===1 && <UserDatosFormStep1 formularioActual={step} cambiarFormularioActual={cambiarStep} /> }

      { step===2 && <UserDatosFormStep2 formularioActual={step} cambiarFormularioActual={cambiarStep} /> }

      { step===3 && <UserDatosFormStep3 formularioActual={step} cambiarFormularioActual={cambiarStep} /> }

      { step===4 && <UserDatosFormStep4 formularioActual={step} cambiarFormularioActual={cambiarStep} /> }

      { step===5 && <UserDatosFormStep5 formularioActual={step} cambiarFormularioActual={cambiarStep} /> }

    </Fragment>
  );
}

export default UserDatos;