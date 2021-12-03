import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import './QueryRunner.css';
import { Modal } from 'antd';
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import {useFormik} from "formik";

const textLabelColor = {
  'color': '#5A5EFF',
  'marginLeft': '12px'
};

const optionLabelColor = {
  'color': '#000000',
};

const { confirm } = Modal;
const regexp = /^[0-9]+$/;

const QueryRunnerStep1 = (props) => {
  const [queryData, setQueryData] = useState('');
  const [initialValues, setInitialValues] = useState({
    offset: "",
    limite: "",
    formato: "xlsx"
  });

  useEffect(() => {
    setQueryData(props.queryData);
  }, [props.queryData]);

  const submitSiguiente = () => {
    let limites = {};
    if (formik.values.offset != "") limites["offset"] = formik.values.offset;
    if (formik.values.limite != "") limites["limite"] = formik.values.limite;

    props.CambiarQuery({
      formato: formik.values.formato,
      limites: limites
    });

    props.cambiarFormularioActual(2);
  };

  const limitEntry = (event) => {
    if (event.key.search(regexp) === -1) event.preventDefault();
  }

  const onCancel = () => {
    confirm({
      title: '¿Desea cancelar la ejecución de la consulta?',
      icon: <ExclamationCircleOutlined />,
      okText: "Abandonar",
      cancelText: "Volver",
      onOk() {
        props.regresar();
      },
    });
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true
  });

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Formato y límites
        </Card.Title>
        <Card.Body>
          <form className="form fv-plugins-bootstrap fv-plugins-framework" >
            <Container>
              <Row>
                <Col md={12} className="query-header">
                  <div>Nombre: <b>{queryData.nombre}</b></div>
                  <div>Título: <b>{queryData.titulo}</b></div>
                  <div>Descripción: <b>{queryData.descripcion}</b></div>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" style={textLabelColor}>Formato de salida</FormLabel>
                    <RadioGroup name="formato" 
                      value={formik.values.formato}
                      onChange={formik.handleChange}
                    >
                      <Row>
                        <Col md={12} style={{'marginLeft': '12px'}}>
                          <FormControlLabel value="xlsx" control={<Radio />} 
                            label="XLSX" style={optionLabelColor}
                          />
                          <FormControlLabel value="pdf" control={<Radio />} 
                            label="PDF" style={optionLabelColor} 
                          />
                          <FormControlLabel value="txt" control={<Radio />} 
                            label="TXT" style={optionLabelColor}
                          />
                          <FormControlLabel value="ods" control={<Radio />} 
                            label="ODS" style={optionLabelColor}
                          />
                        </Col>
                      </Row>
                    </RadioGroup>
                  </FormControl>
                </Col>
              </Row>

              <br/>

              <Row>
                <div className="limit-label">Limitar el número de resultados</div>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="offset">
                    <Row>
                      <Form.Label style={textLabelColor}>Omitir</Form.Label>
                      
                      <Tooltip title="Cantidad de filas que se omitirán al inicio"
                      color="geekblue" key="geekblue" placement="right"
                      >
                        <QuestionCircleOutlined 
                        className="question-info-icon" 
                        style={{ color: 'green' }}
                        />
                      </Tooltip>
                    </Row>
                    <Form.Control size="lg" type="number" placeholder="Deje en blanco para no omitir"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onKeyPress={limitEntry}
                      value={formik.values.offset}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="limite">
                    <Row>
                      <Form.Label style={textLabelColor}>Máximo</Form.Label>

                      <Tooltip title="Máxima cantidad de filas que tendrá el resultado"
                      color="geekblue" key="geekblue" placement="right"
                      >
                        <QuestionCircleOutlined 
                        className="question-info-icon" 
                        style={{ color: 'green' }}
                        />
                      </Tooltip>
                    </Row>
                    <Form.Control size="lg" type="number" placeholder="Deje en blanco para no limitar"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onKeyPress={limitEntry}
                      value={formik.values.limite}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={4}>
                  <Button variant="danger" size="lg" block
                          type="button"
                          onClick={onCancel}
                  >
                    Cancelar
                  </Button>
                </Col>
                <Col md={8}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={submitSiguiente}
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

export default QueryRunnerStep1;