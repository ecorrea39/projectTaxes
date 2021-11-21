import React, {useState, useEffect, useRef} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";

function ComprobanteDeInscripcion() {

  const [mostrarComboEmpresas, setMostrarComboEmpresas] = useState(false);
  const [userCompaniesArray, setUserCompaniesArray] = useState([]);

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const fondoComercioRef = useRef();

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {

    console.log('Iniciando consulta');

    axios.get(`${API_URL}user_company/fondos/${rif}/`, axiosConfig)
      .then(function (res) {
        console.log("resFormStep1_fondos - ComprobanteDeInscripcion", res);

        const arrayData = Array.from(res.data.data);

        if (arrayData.length > 0) {
          setMostrarComboEmpresas(true);
        } else {
          setMostrarComboEmpresas(false);
        }

        let companiesArray = [];

        arrayData.forEach(function(elemData) {

          let id = elemData.id;
          let elemDataName = elemData.attributes.razon_social;

          let rObj = {
            "id": id,
            "name": elemDataName
          };

          companiesArray.push(rObj);
        });

        setUserCompaniesArray(companiesArray);
        console.log("companiesArray::", companiesArray);

      }).catch((err) => {

      console.log("errUserDatosFormStep1EstatusCompanies - ComprobanteDeInscripcion", err);
    });

  }, []);

  const clickHandler = (event) => {
    window.open(API_URL + 'reports/comprobante_inscripcion/' + fondoComercioRef.current.value, '_blank');
  }

  return (

    <Card bg="default" text="dark">
      <Card.Title>
        Reporte de Comprobante de Inscripción
      </Card.Title>

      <Card.Body>
        <Row>
          <Col md={12}>
            {mostrarComboEmpresas &&
            <form>
              <Form.Group controlId="fondoComercio">
                <Form.Control as="select"
                              ref={fondoComercioRef}
                >

                  {
                    userCompaniesArray.map((elemento) =>
                      <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                    )
                  }

                </Form.Control>
              </Form.Group>
            </form>
            }
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Button variant="primary" size="lg" block
                    type="button"
                    onClick={clickHandler}
                    disabled={
                      !mostrarComboEmpresas
                    }
            >
              Generar Reporte
            </Button>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  );
}

export default ComprobanteDeInscripcion;