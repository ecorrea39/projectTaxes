import React, {Fragment, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import QueryBuilderHeader from "./QueryBuilderHeader";
import QueryBuilderFormStep1 from "./QueryBuilderFormStep1";
import QueryBuilderFormStep2 from "./QueryBuilderFormStep2";
import QueryBuilderFormStep3 from "./QueryBuilderFormStep3";
import QueryBuilderFormStep4 from "./QueryBuilderFormStep4";
import QueryBuilderFormStep5 from "./QueryBuilderFormStep5";


const QueryBuilder = (props) => {

  const [step, setStep] = useState(1);
  const [valoresQuery, setValoresQuery] = useState({
    nombre: "",
    titulo: "",
    descripcion: "",
    campos: [],
    joins: [],
    mapa_campos: [],
    orden: []
  });

  const cambiarStep = (paso) => {
    setStep(paso);
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
        campos: objeto.campos.slice()
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
        orden: objeto.orden.slice()
      };
    });
  };

  return (
    <Fragment>
      <QueryBuilderHeader formularioActual={step} cambiarFormularioActual={cambiarStep} />

      <br/>

      { step===1 && <QueryBuilderFormStep1
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep1}
        />
      }

      { step===2 && <QueryBuilderFormStep2
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep2}
        />
      }

      { step===3 && <QueryBuilderFormStep3
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep3}
        />
      }

      { step===4 && <QueryBuilderFormStep4
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep4}
        />
      }

      { step===5 && <QueryBuilderFormStep5
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep5}
        // QueryFinal={valoresQuery} 
        />
      }

    </Fragment>
  );
}

export default QueryBuilder;