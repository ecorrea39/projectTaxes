import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';
import DataTable  from 'react-data-table-component';
import {FormattedMessage, useIntl} from "react-intl";
import _ from "lodash";
import {useFormik} from "formik";
import * as Yup from "yup";
import "./QueryBuilder.css";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const textLabelColor = {
  'color': '#5A5EFF',
};

const optionLabelColor = {
  'color': '#000000',
};

const QueryBuilderFormStep3 = (props) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [initialValues, setInitialValues] = useState({
    tabla_a: "",
    tabla_b: "",
    join: "inner"
  });

  const [fulfilled, setFulfilled] = useState(false);
  const [involvedTables, setInvolvedTables] = useState([]);
  const [fieldsLeft, setFieldsLeft] = useState([]);
  const [fieldsRight, setFieldsRight] = useState([]);
  const [joins, setJoins] = useState([]);

  const intl = useIntl();

  const customStyles = {
    rows: {
        style: {
            minHeight: '40px',
        }
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
  };
  const styleBtn = { borderRadius: '100%'};
  const sortIcon = <ArrowDownward />;
  const translate = {inner: "Inner Join", left: "Left Join", right: "Right Join", outter: "Full Outter Join"}
  const colTab = [
    {
        name: "Izquierda",
        selector: row => row.left,
        sortable: true,
        maxWidth: "740px"
    },
    {
        name: "Derecha",
        selector: row => row.right,
        sortable: true,
        maxWidth: "740px"
    },
    {
      name: "Join",
      selector: row => translate[row.type],
      sortable: true,
      maxWidth: "740px"
    },
    {
        name: "Acciones",
        button: true,
        cell: row => (
            <>
              <a title="eliminar" style={styleBtn} onClick={() => deleteJoin(row)}
                  className="btn btn-icon btn-hover-light btn-sm">
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                      <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                  </span>
              </a>
            </>
        )
    }
  ];

  useEffect(() => {
    const campos = props.QueryFinal.campos.slice();
    const esquema = props.QueryFinal.esquema.slice();
    let tablas = [];
    let camposCalificados = [];

    setJoins(props.QueryFinal.joins);
    checkValidity(joins);

    campos.forEach(campo => {
      const index = campo.split("-");
      const myTable = esquema[parseInt(index[0])].table_name;
      if (!tablas.includes(myTable)) tablas.push(myTable);

      if (campo.includes("-")) {
        for (let i = parseInt(index[0]); i <= parseInt(index[1]); i++) {
          camposCalificados.push(`${esquema[i].table_name}.${esquema[i].column_name}`);
        }
      } else {
        camposCalificados.push(`${esquema[index[0]].table_name}.${esquema[index[0]].column_name}`);
      }
    });

    if (tablas.length < 2) {
      props.cambiarFormularioActual(props.avanzando ? 4 : 2, props.avanzando);
      return;
    }

    setInvolvedTables(tablas);
    setFieldsLeft(camposCalificados);
    setFieldsRight(camposCalificados);
  }, []);

  const checkValidity = (arrayCheck) => {
    let usedTables = [];
    arrayCheck.forEach(element => {
      usedTables.push(element.left.split(".")[0]);
      usedTables.push(element.right.split(".")[0]);
    });

    let checker = involvedTables.every(v => usedTables.includes(v));
    setFulfilled(checker);
  }

  const addJoin = () => {
    if (formik.values.tabla_a==="" || formik.values.tabla_b==="") return;
    const thisRelation = {
      left: formik.values.tabla_a,
      right: formik.values.tabla_b,
      type: formik.values.join
    };

    if (joins.find(relationship => _.isEqual(relationship, thisRelation))) {
      alert("El Join indicado ya existe")
      return;
    }

    let temp = joins;
    temp.push(thisRelation);
    
    checkValidity(temp);
    setJoins(temp);
    forceUpdate();
  }

  const deleteJoin = (row) => {
    let temp = joins.filter(join => !_.isEqual(join, row));
    checkValidity(temp);
    setJoins(temp);
  }

  const irAnterior = () => {
    props.cambiarFormularioActual(2, false);
  }

  const submitSiguiente = () => {
    props.CambiarQuery({
      joins: joins
    });

    props.cambiarFormularioActual(4, true);
  }

  const LoginSchema = Yup.object().shape({
    tabla_a: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    tabla_b: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema
  });

  return(
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Relaciones
        </Card.Title>
        <Card.Body>
          <form
            // onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Col md={5}>
                  <Form.Group controlId="tabla_a">
                    <Form.Label style={textLabelColor}>Izquierda</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.tabla_a}
                    >
                      <option disabled key="0" value="">Seleccione el lado izquierdo</option>

                      {fieldsLeft.map((elemento) =>
                        <option key={elemento} value={elemento}>{elemento}</option>
                      )}

                    </Form.Control>

                    {formik.touched.tabla_a && formik.errors.tabla_a ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.tabla_a}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <div className="equal">=</div>
                </Col>

                <Col md={5}>
                  <Form.Group controlId="tabla_b">
                    <Form.Label style={textLabelColor}>Derecha</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.tabla_b}
                    >
                      <option disabled key="0" value="">Seleccione el lado derecho</option>

                      {fieldsRight.map((elemento) =>
                        <option key={elemento} value={elemento}>{elemento}</option>
                      )}

                    </Form.Control>

                    {formik.touched.tabla_b && formik.errors.tabla_b ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.tabla_b}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={10}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" style={textLabelColor}>Tipo de Join</FormLabel>
                    <RadioGroup name="join" 
                          value={formik.values.join}
                          onChange={formik.handleChange}
                    >
                      <Row>
                        <Col md={12}>
                          <FormControlLabel value="inner" control={<Radio />} 
                                label="Inner Join" style={optionLabelColor} 
                          />
                          <FormControlLabel value="left" control={<Radio />} 
                                label="Left Join" style={optionLabelColor}
                          />
                          <FormControlLabel value="right" control={<Radio />} 
                                label="Right Join" style={optionLabelColor}
                          />
                          <FormControlLabel value="outter" control={<Radio />} 
                                label="Full Outter Join" style={optionLabelColor}
                          />
                        </Col>
                      </Row>
                    </RadioGroup>
                  </FormControl>
                </Col>

                <Col md={2}>
                  <Button variant="primary" size="lg" block
                          type="button"
                          onClick={addJoin}
                          disabled={formik.values.tabla_a==="" || formik.values.tabla_b===""}
                  >
                    Agregar
                  </Button>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={12} className="table-frame">
                  <DataTable
                        columns={colTab}
                        data={joins}
                        fixedHeader
                        fixedHeaderScrollHeight="500px"
                        sortIcon={sortIcon}
                        customStyles={customStyles}
                        responsive={true}
                        noDataComponent="Por favor agregue un Join"
                  />
                </Col>
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
                          disabled={!fulfilled}
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

export default QueryBuilderFormStep3;