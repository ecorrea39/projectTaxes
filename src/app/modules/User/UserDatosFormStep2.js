import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";

const listaOficinas = () => {
  const array = [
    { "id": "1", "name": "Registro Mercantil Primero del Distrito Capital" },
    { "id": "2", "name": "Registro Mercantil Segundo del Distrito Capital" },
    { "id": "3", "name": "Registro Mercantil Tercero del Distrito Capital" },
    { "id": "4", "name": "Registro Mercantil Cuarto del Distrito Capital" },
    { "id": "5", "name": "Registro Mercantil Quinto del Distrito Capital" },
  ];
  return array.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const UserDatosFormStep2 = (props) => {

  const [loading, setLoading] = useState(false);

  const intl = useIntl();

  const initialValues = {
    oficina: "",
    ndoc: "",
    ntomo: "",
    nfolio: "",
    nprotocolo: "",
    fecha_protocolizacion:""
  };

  const oficinas = listaOficinas();

  const customHandleChangeNumeroDelDocumento = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('ndoc', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('ndoc', value);
      }
    }
  }

  const customHandleChangeNumeroDelFolio = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('nfolio', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('nfolio', value);
      }
    }
  }

  const irAnterior = () => {
    props.cambiarFormularioActual(1);
  }

  const LoginSchema = Yup.object().shape({

    oficina: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    ndoc: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 6})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 6)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
    ntomo: Yup.string()
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
    nfolio: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
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
    nprotocolo: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
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
    fecha_protocolizacion: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
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
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      setSubmitting(true);
      enableLoading();

      console.log("values", formik.values);
      // console.log("location.search", location.search);

      setSubmitting(false);
      disableLoading();
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.oficina}
                    >
                      Seleccione la Oficina

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
                  <Form.Group as={Col} controlId="ndoc">
                    <Form.Control size="lg" type="text" placeholder="Número Del Documento"
                                  onChange={customHandleChangeNumeroDelDocumento}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.ndoc}
                    />

                    {formik.touched.ndoc && formik.errors.ndoc ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.ndoc}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="ntomo">
                    <Form.Control size="lg" type="text" placeholder="Número De Tomo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.ntomo}
                    />

                    {formik.touched.ntomo && formik.errors.ntomo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.ntomo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="nfolio">
                    <Form.Control size="lg" type="text" placeholder="Número Del Folio"
                                  onChange={customHandleChangeNumeroDelFolio}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nfolio}
                    />

                    {formik.touched.nfolio && formik.errors.nfolio ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nfolio}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="nprotocolo">
                    <Form.Control size="lg" type="text" placeholder="Número De Protocolo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nprotocolo}
                    />

                    {formik.touched.nprotocolo && formik.errors.nprotocolo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nprotocolo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="fecha_protocolizacion">
                    <Form.Control size="lg" type="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="dd-mm-yyyy"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.fecha_protocolizacion}
                    />

                    {formik.touched.fecha_protocolizacion && formik.errors.fecha_protocolizacion ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.fecha_protocolizacion}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col md={4}>
                  <Button variant="success" size="lg" block
                          type="submit"
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid
                          }
                  >
                    Guardar
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={irAnterior}
                  >
                    Anterior
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="secondary" size="lg" block
                          type="button"
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