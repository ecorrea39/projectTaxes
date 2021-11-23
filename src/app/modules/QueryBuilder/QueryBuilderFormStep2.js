import React, {useEffect, useState, useRef, useContext} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const textLabelColor = {
  'color': '#5A5EFF',
};

const QueryBuilderFormStep2 = (props) => {
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    campos: []
  });

  const [tablesFields, setTablesFields] = useState([]);
  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const token = localStorage.getItem('authToken');

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    enableLoading();

    setInitialValues(props.QueryFinal.campos.slice());

    //* TEMPORALMENTE DESHABILITADO
    // axios.get(`${API_URL}system_schema_data/`, axiosConfig)
    //   .then(function (res) {
    //     if (res.data.data != null) {
    //       let fieldsValuesArray = res.data.data.slice();
    //       setTablesFields(fieldsValuesArray);
    //     } else {
    //       alert("Error obteniendo la lista de campos");
    //     }

    //     disableLoading();
    //   }).catch((err) => {
    //   alert("Error obteniendo la lista de campos")
    //   disableLoading();
    // });

    //* TEMPORALMENTE HASTA QUE ESTÉ EL BACKEND
    let fieldsValuesArray = [
      {table_name: "abonos", column_name: "createdAt", data_type: "timestamp with time zone"},
      {table_name: "abonos", column_name: "created_by", data_type: "integer"},
      {table_name: "abonos", column_name: "deudas_id", data_type: "integer"},
      {table_name: "abonos", column_name: "id", data_type: "integer"},
      {table_name: "abonos", column_name: "last_modified_by", data_type: "integer"},
      {table_name: "abonos", column_name: "monto", data_type: "numeric"},
      {table_name: "abonos", column_name: "pagos_id", data_type: "integer"},
      {table_name: "abonos", column_name: "updatedAt", data_type: "timestamp with time zone"},
      {table_name: "abonos", column_name: "users_id", data_type: "integer"},
      {table_name: "actas", column_name: "conceptos_id", data_type: "integer"},
      {table_name: "actas", column_name: "createdAt", data_type: "timestamp with time zone"},
      {table_name: "actas", column_name: "created_by", data_type: "integer"},
      {table_name: "actas", column_name: "deudas_id", data_type: "integer"},
      {table_name: "actas", column_name: "id", data_type: "integer"},
      {table_name: "actas", column_name: "last_modified_by", data_type: "integer"},
      {table_name: "actas", column_name: "notificacion_date", data_type: "timestamp with time zone"},
      {table_name: "actas", column_name: "pagos_id", data_type: "integer"},
      {table_name: "actas", column_name: "template_id", data_type: "integer"},
      {table_name: "actas", column_name: "updatedAt", data_type: "timestamp with time zone"},
      {table_name: "actas", column_name: "users_id", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "createdAt", data_type: "timestamp with time zone"},
      {table_name: "actas_asamblea", column_name: "created_by", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "fecha_protocolizacion", data_type: "timestamp with time zone"},
      {table_name: "actas_asamblea", column_name: "id", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "last_modified_by", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "numero_de_documento", data_type: "character varying"},
      {table_name: "actas_asamblea", column_name: "numero_de_folio", data_type: "character varying"},
      {table_name: "actas_asamblea", column_name: "numero_de_protocolo", data_type: "character varying"},
      {table_name: "actas_asamblea", column_name: "numero_de_tomo", data_type: "character varying"},
      {table_name: "actas_asamblea", column_name: "oficina", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "updatedAt", data_type: "timestamp with time zone"},
      {table_name: "actas_asamblea", column_name: "users_information_id", data_type: "integer"}
    ];
    setTablesFields(fieldsValuesArray);

    disableLoading();
  }, []);

  const irAnterior = () => {
    props.cambiarFormularioActual(1);
  }

  const submitSiguiente = () => {
    props.cambiarFormularioActual(3);
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  return(
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Selección de campos
        </Card.Title>
        <Card.Body>
          <form
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Form.Label style={textLabelColor}>Campos:</Form.Label>
                yuu
              </Row>

              <br/>

              <Row>
                <Col md={6}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={irAnterior}
                  >
                    Anterior
                  </Button>
                </Col>
                <Col md={6}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={submitSiguiente}
                          disabled={!tablesFields}
                  >
                    Siguiente
                  </Button>
                </Col>
              </Row>
            </Container>
          </form>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default QueryBuilderFormStep2;