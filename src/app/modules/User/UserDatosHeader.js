import React, {Fragment} from "react";
import {Col, Row} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import UserDatosFormStep1 from "./UserDatosFormStep1";

const UserDatosHeader = (props) => {
  return (
    <Fragment>
      <Row>
        <Col md={12} className="text-center">
          { props.formularioActual==1 && <img src={toAbsoluteUrl("/media/step-by-step-perfil/StepByStep1.png")} className="img-fluid" alt="Step by Step" /> }

          { props.formularioActual==2 && <img src={toAbsoluteUrl("/media/step-by-step-perfil/StepByStep2.png")} className="img-fluid" alt="Step by Step" /> }

          { props.formularioActual==3 && <img src={toAbsoluteUrl("/media/step-by-step-perfil/StepByStep3.png")} className="img-fluid" alt="Step by Step" /> }

          { props.formularioActual==4 && <img src={toAbsoluteUrl("/media/step-by-step-perfil/StepByStep4.png")} className="img-fluid" alt="Step by Step" /> }
        </Col>
      </Row>
    </Fragment>
  );
}

export default UserDatosHeader;
