import React, {useEffect, useState, useRef, useContext} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import GeneralContext from "../../store/general-context";

const listaOficinas = () => {
  const array = [
    { "id": "1", "name": "Registro Mercantil Primero del Distrito Capital" },
    { "id": "2", "name": "Registro Mercantil Segundo del Distrito Capital" },
    { "id": "3", "name": "Registro Mercantil Tercero del Distrito Capital" },
    { "id": "4", "name": "Registro Mercantil Cuarto del Distrito Capital" },
    { "id": "5", "name": "Registro Mercantil Quinto del Distrito Capital" },
  ];
  return array;
};

const textLabelColor = {
  'color': '#5A5EFF',
};

const UserDatosFormStep2 = (props) => {

  const [loading, setLoading] = useState(false);

  const generalCtx = useContext(GeneralContext);

  const [initialValues, setInitialValues] = useState({
    oficina: "",
    numero_de_documento: "",
    numero_de_tomo: "",
    numero_de_folio: "",
    numero_de_protocolo: "",
    fecha_constitucion: ""
  });

  const oficinaRef = useRef();

  const [siguiente, setSiguiente] = useState(false);

  const intl = useIntl();

  const oficinas = listaOficinas();

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {

    axios.get(`${API_URL}user_mercantil_data/fondoporid/${generalCtx.theIdUserInformacionProfile}/`, axiosConfig)
      .then(function (res) {
        console.log("get_user_company::", res);

        if (res.data.data != null) {

          let initialValuesJson = {
            "oficina": res.data.data.attributes.oficina != null ? res.data.data.attributes.oficina : "",
            "numero_de_documento": res.data.data.attributes.numero_de_documento != null ? res.data.data.attributes.numero_de_documento : "",
            "numero_de_tomo": res.data.data.attributes.numero_de_tomo != null ? res.data.data.attributes.numero_de_tomo : "",
            "numero_de_folio": res.data.data.attributes.numero_de_folio != null ? res.data.data.attributes.numero_de_folio : "",
            "numero_de_protocolo": res.data.data.attributes.numero_de_protocolo != null ? res.data.data.attributes.numero_de_protocolo : "",
            "fecha_constitucion": res.data.data.attributes.fecha_constitucion != null ? res.data.data.attributes.fecha_constitucion.substring(0, 10) : ""
          };

          setInitialValues(initialValuesJson);
        } else {
          alert("No existe información alguna registrada del usuario");
        }

        disableLoading();
      }).catch((err) => {

      console.log("errGetUserCompany", err);
      alert("Error buscando datos mercantiles de la empresa del usuario")
      disableLoading();

    });

  }, []);

  const irAnterior = () => {
    props.cambiarFormularioActual(1);
  }

  const submitSiguiente = () => {
    setSiguiente(true);
    formik.submitForm();
  }

  const LoginSchema = Yup.object().shape({

    oficina: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    numero_de_documento: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
    numero_de_tomo: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Tomo'})
      ),
    numero_de_folio: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Folio'})
      ),
    numero_de_protocolo: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Protocolo'})
      ),
    fecha_constitucion: Yup.string()
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Fecha de Constitución'})
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      setSubmitting(true);
      enableLoading();

      console.log("values", formik.values);

      const rif = localStorage.getItem('rif');

      console.log("rif", rif);
      console.log("authToken", token);

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userMercantilData",
          id: rif,
          attributes: formik.values
        }
      };

      axios.post(`${API_URL}user_mercantil_data/`, data, axiosConfig)
        .then(function (res) {

          const oficinaC = oficinaRef.current.options[oficinaRef.current.selectedIndex].text;

          props.cambiarResumenFicha({
            oficina: oficinaC,
            numero_de_documento: formik.values.numero_de_documento,
            numero_de_tomo: formik.values.numero_de_tomo,
            numero_de_folio: formik.values.numero_de_folio,
            numero_de_protocolo: formik.values.numero_de_protocolo,
            fecha_constitucion: formik.values.fecha_constitucion
          });

          setSubmitting(false);
          disableLoading();

          console.log("resFormStep2", res);

          if (siguiente) {
            setSiguiente(false);
            props.cambiarFormularioActual(3);
          }
        }).catch((err) => {

        console.log("errUserDatosFormStep2", err);
        setSubmitting(false);
        disableLoading();

        alert("Error al guardar los Datos Mercantiles");
      });
    },
  });

  return(
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Datos Mercantiles
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="oficina">
                    <Form.Label style={textLabelColor}>Oficina</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.oficina}
                                  ref={oficinaRef}
                    >
                      <option key="0" value="">Seleccione la Oficina</option>

                      {oficinas.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.oficina && formik.errors.oficina ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.oficina}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_documento">
                    <Form.Label style={textLabelColor}>Número de Documento</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Documento"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_documento}
                    />

                    {formik.touched.numero_de_documento && formik.errors.numero_de_documento ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_documento}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_tomo">
                    <Form.Label style={textLabelColor}>Número de Tomo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número De Tomo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_tomo}
                    />

                    {formik.touched.numero_de_tomo && formik.errors.numero_de_tomo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_tomo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_folio">
                    <Form.Label style={textLabelColor}>Número de Folio</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Folio"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_folio}
                    />

                    {formik.touched.numero_de_folio && formik.errors.numero_de_folio ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_folio}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_protocolo">
                    <Form.Label style={textLabelColor}>Número de Protocolo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número De Protocolo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_protocolo}
                    />

                    {formik.touched.numero_de_protocolo && formik.errors.numero_de_protocolo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_protocolo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="fecha_constitucion">
                    <Form.Label style={textLabelColor}>Fecha de Constitución</Form.Label>
                    <Form.Control size="lg" type="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="dd-mm-yyyy"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.fecha_constitucion}
                    />

                    {formik.touched.fecha_constitucion && formik.errors.fecha_constitucion ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.fecha_constitucion}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                {/*<Col md={4}>*/}
                {/*  <Button variant="success" size="lg" block*/}
                {/*          type="submit"*/}
                {/*          disabled={*/}
                {/*            formik.isSubmitting ||*/}
                {/*            !formik.isValid*/}
                {/*          }*/}
                {/*  >*/}
                {/*    Guardar*/}
                {/*  </Button>*/}
                {/*</Col>*/}
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
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid
                          }
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

export default UserDatosFormStep2;