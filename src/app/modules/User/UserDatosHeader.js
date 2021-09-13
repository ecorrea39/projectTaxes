import React, {Fragment} from "react";
import {Col, Row} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

const UserDatosHeader = (props) => {
  return (
    <Fragment>
      <Row>
        <Col md={12} className="text-center">
          <img src={toAbsoluteUrl("/media/step-by-step-perfil/StepByStep1.png")} className="img-fluid" alt="Step by Step" />
        </Col>
      </Row>
    </Fragment>
  );
}

export default UserDatosHeader;
