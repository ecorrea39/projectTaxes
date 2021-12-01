import React, {Fragment, useState, useEffect} from "react";
import { Steps } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import './QueryBuilder.css';
import QueryBuilderFormStep1 from "./QueryBuilderFormStep1";
import QueryBuilderFormStep2 from "./QueryBuilderFormStep2";
import QueryBuilderFormStep3 from "./QueryBuilderFormStep3";
import QueryBuilderFormStep4 from "./QueryBuilderFormStep4";
import QueryBuilderFormStep5 from "./QueryBuilderFormStep5";
import QueryBuilderFormStep6 from "./QueryBuilderFormStep6";


const QueryBuilder = (props) => {
  const { Step } = Steps;
  const [current, setCurrent] = React.useState(0);
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
    direccion: 'ASC',
    agrupar: [],
    editId: -1
  });

  useEffect(() => {
    if (props.editar.id) {
      const valores = {
        nombre: props.editar.nombre,
        titulo: props.editar.titulo,
        descripcion: props.editar.descripcion,
        campos: props.editar.campos,
        esquema: [],
        tablas: [],
        joins: props.editar.joins,
        mapa_campos: props.editar.mapa_campos,
        orden: props.editar.orden,
        direccion: props.editar.direccion,
        agrupar: props.editar.agrupar,
        editId: props.editar.id
      };

      setValoresQuery(valores);
    } else {
      setValoresQuery({
        nombre: "",
        titulo: "",
        descripcion: "",
        campos: undefined,
        esquema: [],
        tablas: [],
        joins: [],
        mapa_campos: [],
        orden: [],
        direccion: 'ASC',
        agrupar: [],
        editId: -1
      });
    }
  }, [props.editar]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const cambiarStep = (paso, avanzar) => {
    setStep(paso);
    setForward(avanzar);
    if (avanzar) next();
    else prev();
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
        direccion: objeto.direccion,
        agrupar: objeto.agrupar.slice()
      };
    });
  };

  const steps = [
    {
      title: 'Definición de la consulta',
      content: 
      <QueryBuilderFormStep1
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep1}
        QueryFinal={valoresQuery}
        regresar={props.regresar}
      />,
    },
    {
      title: 'Selección de campos',
      content: 
      <QueryBuilderFormStep2
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep2}
        QueryFinal={valoresQuery}
        regresar={props.regresar}
      />,
    },
    {
      title: 'Relaciones',
      content: 
      <QueryBuilderFormStep3
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep3}
        QueryFinal={valoresQuery}
        regresar={props.regresar}
      />,
    },
    {
      title: 'Mapeo de campos',
      content: 
      <QueryBuilderFormStep4
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep4}
        QueryFinal={valoresQuery}
        regresar={props.regresar}
      />,
    },
    {
      title: 'Agrupación y orden',
      content: 
      <QueryBuilderFormStep5
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={QueryStep5}
        QueryFinal={valoresQuery}
        regresar={props.regresar}
      />,
    },
    {
      title: 'Resumen',
      content: 
      <QueryBuilderFormStep6
        formularioActual={step}
        avanzando={moveForward}
        cambiarFormularioActual={cambiarStep}
        QueryFinal={valoresQuery} 
        regresar={props.regresar}
      />,
    }
  ];

  return (
    <Fragment>

      <Steps current={current} 
        size="small"
        labelPlacement="vertical"
        className="steps"
      >
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content steps-guard">{steps[current].content}</div>

    </Fragment>
  );
}

export default QueryBuilder;