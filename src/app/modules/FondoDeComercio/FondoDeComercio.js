import React, {Fragment, useState} from "react";
import FondoDeComercioLista from "./FondoDeComercioLista";
import FondoDeComercioCrear from "./FondoDeComercioCrear";

const FondoDeComercio = () => {

  const [vistaActual, setVistaActual] = useState("lista");

  const cambiarVistaActualFunction = (vista) => {
    setVistaActual(vista);
  }

  return (
    <Fragment>
      { vistaActual==="lista" && <FondoDeComercioLista cambiarVistaActual={cambiarVistaActualFunction} /> }

      { vistaActual==="crear" && <FondoDeComercioCrear cambiarVistaActual={cambiarVistaActualFunction} /> }
    </Fragment>
  );
}

export default FondoDeComercio;