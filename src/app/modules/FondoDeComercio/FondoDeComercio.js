import React, {Fragment, useState} from "react";
import FondoDeComercioLista from "./FondoDeComercioLista";

const FondoDeComercio = () => {

  const [vistaActual, setVistaActual] = useState("lista");

  const cambiarVistaActualFuction = (vista) => {
    setVistaActual(vista);
  }

  return (
    <Fragment>
      { vistaActual==="lista" && <FondoDeComercioLista cambiarVistaActual={cambiarVistaActualFuction} /> }
    </Fragment>
  );
}

export default FondoDeComercio;