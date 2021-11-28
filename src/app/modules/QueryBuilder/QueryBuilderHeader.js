import React, {Fragment} from "react";
import {Col, Row} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

const QueryBuilderHeader = (props) => {
  return (
    <Fragment>
      <Row>
        <Col md={12} className="text-center">
          { props.formularioActual===1 && <img src={toAbsoluteUrl("/media/step-by-step-querybuilder/StepByStep1.png")} className="img-fluid" alt="Step by Step" /> }

          { props.formularioActual===2 && <img src={toAbsoluteUrl("/media/step-by-step-querybuilder/StepByStep2.png")} className="img-fluid" alt="Step by Step" /> }

          { props.formularioActual===3 && <img src={toAbsoluteUrl("/media/step-by-step-querybuilder/StepByStep3.png")} className="img-fluid" alt="Step by Step" /> }

          { props.formularioActual===4 && <img src={toAbsoluteUrl("/media/step-by-step-querybuilder/StepByStep4.png")} className="img-fluid" alt="Step by Step" /> }

          { props.formularioActual===5 && <img src={toAbsoluteUrl("/media/step-by-step-querybuilder/StepByStep5.png")} className="img-fluid" alt="Step by Step" /> }

          { props.formularioActual===6 && <img src={toAbsoluteUrl("/media/step-by-step-querybuilder/StepByStep6.png")} className="img-fluid" alt="Step by Step" /> }
        </Col>
      </Row>
    </Fragment>
  );
}

export default QueryBuilderHeader;
