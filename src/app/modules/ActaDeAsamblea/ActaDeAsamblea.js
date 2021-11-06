import React, {Fragment, useState} from "react";
import ActaDeAsambleaLista from "./ActaDeAsambleaLista";

const ActaDeAsamblea = () => {

  const [vistaActual, setVistaActual] = useState("lista");

  const cambiarVistaActualFunction = (vista) => {
    setVistaActual(vista);
  }

  return (
    <Fragment>
      { vistaActual==="lista" && <ActaDeAsambleaLista cambiarVistaActual={cambiarVistaActualFunction} /> }
    </Fragment>
  );
}

export default ActaDeAsamblea;