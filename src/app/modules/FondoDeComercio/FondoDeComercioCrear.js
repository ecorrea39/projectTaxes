import React, {useContext, useEffect, Fragment, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from 'react-data-table-component';
import axios from "axios";
import GeneralContext from "../../store/general-context";
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row, SplitButton} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useIntl} from "react-intl";

const textLabelColor = {
  'color': '#5A5EFF',
};

const FondoDeComercioCrear = (props) => {

  const [initialValues, setInitialValues] = useState({
    razon_social: "",
    nombre_comercial: ""
  });

  const generalCtx = useContext(GeneralContext);

  const intl = useIntl();

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const history = useHistory();

  const handleClickedCrear = (event) => {
    formik.submitForm();
  };

  const handleClickedCancelar = (event) => {

  };

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  const LoginSchema = Yup.object().shape({

    razon_social: Yup.string()
      .min(3,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 3})
      )
      .max(50,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    nombre_comercial: Yup.string()
      .min(3,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 3})
      )
      .max(50,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      console.log("values", formik.values);

      const rif = localStorage.getItem('rif');

      let jsonAttributes = formik.values;

      jsonAttributes["user_information_id"] = "0";
      jsonAttributes["clase_de_empresa"] = "0";
      jsonAttributes["actividad_economica"] = "0";
      jsonAttributes["estatus"] = "0";
      jsonAttributes["numero_patronal"] = "0";
      jsonAttributes["numero_de_trabajadores"] = "0";

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userCompany",
          id: rif,
          attributes: jsonAttributes
        }
      };

      axios.post(`${API_URL}user_company/crearfondo/`, data, axiosConfig)
        .then(function (res) {

          setSubmitting(false);

          console.log("resFormStep1", res);

          history.replace('/fondosdecomercio');

        }).catch((err) => {

        console.log("errUserDatosFormStep1", err);
        setSubmitting(false);

        alert("Error al guardar los Datos de la Empresa");
      });
    },
  });

  return (
    <Card bg="default" text="success">
      <Card.Title>
        Crear Fondo de Comercio
      </Card.Title>

      <Card.Body>

        <Row>
          <Col md={6}>
            <Form.Group as={Col} controlId="razon_social">
              <Form.Label style={textLabelColor}>Razón Social</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Razón Social"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.razon_social}
              />

              {formik.touched.razon_social && formik.errors.razon_social ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.razon_social}</div>
                </div>
              ) : null}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group as={Col} controlId="nombre_comercial">
              <Form.Label style={textLabelColor}>Nombre Comercial</Form.Label>
              <Form.Control size="lg" type="text" placeholder="Nombre Comercial"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nombre_comercial}
              />

              {formik.touched.nombre_comercial && formik.errors.nombre_comercial ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.nombre_comercial}</div>
                </div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Button variant="primary" size="lg" block
                    type="button"
                    onClick={handleClickedCrear}
            >
              Crear
            </Button>
          </Col>
          <Col md={6}>
            <Button variant="default" size="lg" block
                    type="button"
                    onClick={handleClickedCancelar}
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FondoDeComercioCrear;