import React, {Fragment, useState, useEffect} from "react";
import { Steps } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import './QueryRunner.css';
import QueryRunnerStep1 from "./QueryRunnerStep1";
import QueryRunnerStep2 from "./QueryRunnerStep2";
import QueryRunnerStep3 from "./QueryRunnerStep3";

const QueryRunner = (props) => {
  const { Step } = Steps;
  const [current, setCurrent] = React.useState(0);
  const [step, setStep] = useState(1);
  const [valoresWhere, setValoresWhere] = useState({
    formato: 'pdf',
    limites: {}
  });

  const cambiarStep = (paso) => {
    const curr = step;
    setStep(paso);
    if (paso > curr) setCurrent(current + 1);
    else setCurrent(current - 1);
  }

  const WhereStep1 = (objeto) => {
    setValoresWhere((prevState) => {
      return {
        ...prevState,
        formato: objeto.formato,
        limites: objeto.limites
      };
    });
  };

  const steps = [
    {
      title: 'Formato y límites',
      content: 
      <QueryRunnerStep1
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        CambiarQuery={WhereStep1}
        queryData={props.queryData}
        WhereFinal={valoresWhere}
        regresar={props.regresar}
      />,
    },
    {
      title: 'Filtros',
      content: 
      <QueryRunnerStep2
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        WhereFinal={valoresWhere}
        queryData={props.queryData}
        regresar={props.regresar}
      />,
    },
    {
      title: 'Resultados',
      content: 
      <QueryRunnerStep3
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        WhereFinal={valoresWhere}
        queryData={props.queryData}
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

export default QueryRunner;