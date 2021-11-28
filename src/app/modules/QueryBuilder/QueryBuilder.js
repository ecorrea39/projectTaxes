import React, {Fragment, useState} from "react";
// import { Steps } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import QueryBuilderHeader from "./QueryBuilderHeader";
import QueryBuilderFormStep1 from "./QueryBuilderFormStep1";
import QueryBuilderFormStep2 from "./QueryBuilderFormStep2";
import QueryBuilderFormStep3 from "./QueryBuilderFormStep3";
import QueryBuilderFormStep4 from "./QueryBuilderFormStep4";
import QueryBuilderFormStep5 from "./QueryBuilderFormStep5";
import QueryBuilderFormStep6 from "./QueryBuilderFormStep6";


const QueryBuilder = (props) => {
  // const { Step } = Steps;
  // const [current, setCurrent] = React.useState(0);
  const [step, setStep] = useState(1);
  const [moveForward, setForward] = useState(true);
  const [valoresQuery, setValoresQuery] = useState({
    nombre: "",
    titulo: "",
    descripcion: "",
    campos: undefined,
    esquema: [],
    tablas: [],
    joins: [],
    mapa_campos: [],
    orden: [],
    agrupar: []
  });

  // const next = () => {
  //   setCurrent(current + 1);
  // };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  const cambiarStep = (paso, avanzar) => {
    setStep(paso);
    setForward(avanzar);
    // if (avanzar) next();
    // else prev();
  }

  const QueryStep1 = (objeto) => {
    setValoresQuery((prevState) => {
      return {
        ...prevState,
        nombre: objeto.nombre,
        titulo: objeto.titulo,
        descripcion: objeto.descripcion
      };
    });
  };

  const QueryStep2 = (objeto) => {
    setValoresQuery((prevState) => {
      return {
        ...prevState,
        campos: objeto.campos.slice(),
        esquema: objeto.esquema.slice(),
        tablas: objeto.tablas.slice()
      };
    });
  };

  const QueryStep3 = (objeto) => {
    setValoresQuery((prevState) => {
      return {
        ...prevState,
        joins: objeto.joins.slice()
      };
    });
  };

  const QueryStep4 = (objeto) => {
    setValoresQuery((prevState) => {
      return {
        ...prevState,
        mapa_campos: objeto.mapa_campos.slice()
      };
    });
  };

  const QueryStep5 = (objeto) => {
    setValoresQuery((prevState) => {
      return {
        ...prevState,
        orden: objeto.orden.slice(),
        agrupar: objeto.agrupar.slice()
      };
    });
  };

  return (
    <Fragment>
      <QueryBuilderHeader formularioActual={step} cambiarFormularioActual={cambiarStep} />

      <br/>

      { step===1 && <QueryBuilderFormStep1
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep1}
        QueryFinal={valoresQuery}
        />
      }

      { step===2 && <QueryBuilderFormStep2
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep2}
        QueryFinal={valoresQuery}
        />
      }

      { step===3 && <QueryBuilderFormStep3
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep3}
        QueryFinal={valoresQuery}
        />
      }

      { step===4 && <QueryBuilderFormStep4
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep4}
        QueryFinal={valoresQuery}
        />
      }

      { step===5 && <QueryBuilderFormStep5
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep5}
        QueryFinal={valoresQuery} 
        />
      }

      { step===6 && <QueryBuilderFormStep6
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        QueryFinal={valoresQuery} 
        />
      }

      {/* <Steps size="small" current={0}>
        <Step title="Uno">
          { step===1 && <QueryBuilderFormStep1
            formularioActual={step}
            avanzando={moveForward}
            cambiarFormularioActual={cambiarStep}
            CambiarQuery={QueryStep1}
            QueryFinal={valoresQuery}
            />
          }
        </Step>
        <Step title="Dos">
          { step===2 && <QueryBuilderFormStep2
            formularioActual={step}
            avanzando={moveForward}
            cambiarFormularioActual={cambiarStep}
            CambiarQuery={QueryStep2}
            QueryFinal={valoresQuery}
            />
          }
        </Step>
        <Step title="Tres">
          { step===3 && <QueryBuilderFormStep3
            formularioActual={step}
            avanzando={moveForward}
            cambiarFormularioActual={cambiarStep}
            CambiarQuery={QueryStep3}
            QueryFinal={valoresQuery}
            />
          }
        </Step>
        <Step title="Cuatro">
          { step===4 && <QueryBuilderFormStep4
            formularioActual={step}
            avanzando={moveForward}
            cambiarFormularioActual={cambiarStep}
            CambiarQuery={QueryStep4}
            QueryFinal={valoresQuery}
            />
          }
        </Step>
        <Step title="Cinco">
          { step===5 && <QueryBuilderFormStep5
            formularioActual={step}
            avanzando={moveForward}
            cambiarFormularioActual={cambiarStep}
            CambiarQuery={QueryStep5}
            QueryFinal={valoresQuery} 
            />
          } 
        </Step>
      </Steps> */}

    </Fragment>
  );
}

export default QueryBuilder;