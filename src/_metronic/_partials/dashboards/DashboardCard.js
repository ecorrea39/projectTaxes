import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";

const divStyle = {
  'backgroundColor': '#3699FF',
  'color': 'white',
};

const DashboardCard = () => {

  return (
    <Card bg="default" text="dark">
      <Card.Header style={divStyle}>
        <Card.Title>
          Información
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Body>
          <Row>
            <Col md={12}>
              Estimado contribuyente, una vez vencido el trimestre tiene los primeros 5 días hábiles, para declarar, pagar si está obligado, generar la solvencia y colocarla en un lugar visible de su cartelera tributaria de su establecimiento.
            </Col>
          </Row>
        </Card.Body>
      </Card.Body>
    </Card>
  )
}

export default DashboardCard;