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

const UserDatosFormStep4 = (props) => {

  const [loading, setLoading] = useState(false);

  const intl = useIntl();

  const initialValues = {
    cedulaRepresentanteLegal1: "",
    nombreRepresentanteLegal1: "",
    apellidoRepresentanteLegal1: "",
    codigoDeAreaRepresentanteLegal1: "",
    telefonoRepresentanteLegal1: "",
    correoElectronicoRepresentanteLegal1: "",
    cargoRepresentanteLegal1:"",
    cedulaRepresentanteLegal2: "",
    nombreRepresentanteLegal2: "",
    apellidoRepresentanteLegal2: "",
    codigoDeAreaRepresentanteLegal2: "",
    telefonoRepresentanteLegal2: "",
    correoElectronicoRepresentanteLegal2: "",
    cargoRepresentanteLegal2:"",
    cedulaRepresentanteLegal3: "",
    nombreRepresentanteLegal3: "",
    apellidoRepresentanteLegal3: "",
    codigoDeAreaRepresentanteLegal3: "",
    telefonoRepresentanteLegal3: "",
    correoElectronicoRepresentanteLegal3: "",
    cargoRepresentanteLegal3:""
  };

  const oficinas = listaOficinas();

  const customHandleChangeCedulaRepresentanteLegal1 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedulaRepresentanteLegal1', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedulaRepresentanteLegal1', value);
      }
    }
  }

  const customHandleChangeCedulaRepresentanteLegal2 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedulaRepresentanteLegal2', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedulaRepresentanteLegal2', value);
      }
    }
  }

  const customHandleChangeCedulaRepresentanteLegal3 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedulaRepresentanteLegal3', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedulaRepresentanteLegal3', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal1 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedulaRepresentanteLegal3', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedulaRepresentanteLegal3', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal2 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedulaRepresentanteLegal3', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedulaRepresentanteLegal3', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal3 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedulaRepresentanteLegal3', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedulaRepresentanteLegal3', value);
      }
    }
  }

  const LoginSchema = Yup.object().shape({

    nombreRepresentanteLegal1: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    nombreRepresentanteLegal2: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    nombreRepresentanteLegal3: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    apellidoRepresentanteLegal1: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    apellidoRepresentanteLegal2: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    apellidoRepresentanteLegal3: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    cargoRepresentanteLegal1: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    cargoRepresentanteLegal2: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    cargoRepresentanteLegal3: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 50})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigoDeAreaRepresentanteLegal1: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigoDeAreaRepresentanteLegal2: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigoDeAreaRepresentanteLegal3: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    correoElectronicoRepresentanteLegal1: Yup.string()
      .email(
        intl.formatMessage({
          id: "AUTH.VALIDATION.WRONG_EMAIL_FORMAT",
        })
      )
      .min(7,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 7})
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
    correoElectronicoRepresentanteLegal2: Yup.string()
      .email(
        intl.formatMessage({
          id: "AUTH.VALIDATION.WRONG_EMAIL_FORMAT",
        })
      )
      .min(7,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 7})
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
    correoElectronicoRepresentanteLegal3: Yup.string()
      .email(
        intl.formatMessage({
          id: "AUTH.VALIDATION.WRONG_EMAIL_FORMAT",
        })
      )
      .min(7,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 7})
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
    cedulaRepresentanteLegal1: Yup
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
    cedulaRepresentanteLegal2: Yup
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
    cedulaRepresentanteLegal3: Yup
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
    telefonoRepresentanteLegal1: Yup
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
    telefonoRepresentanteLegal2: Yup
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
    telefonoRepresentanteLegal3: Yup
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
          Datos del Representante Legal
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>

              <Card.Subtitle>Representante Legal 1</Card.Subtitle>

              <br />

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedulaRepresentanteLegal1">
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal1}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedulaRepresentanteLegal1}
                    />

                    {formik.touched.cedulaRepresentanteLegal1 && formik.errors.cedulaRepresentanteLegal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedulaRepresentanteLegal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombreRepresentanteLegal1">
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombreRepresentanteLegal1}
                    />

                    {formik.touched.nombreRepresentanteLegal1 && formik.errors.nombreRepresentanteLegal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombreRepresentanteLegal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellidoRepresentanteLegal1">
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellidoRepresentanteLegal1}
                    />

                    {formik.touched.apellidoRepresentanteLegal1 && formik.errors.apellidoRepresentanteLegal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellidoRepresentanteLegal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigoDeAreaRepresentanteLegal1">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigoDeAreaRepresentanteLegal1}
                    >
                      Seleccione el Codigo De Area Del Representante Legal 1

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigoDeAreaRepresentanteLegal1 && formik.errors.codigoDeAreaRepresentanteLegal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigoDeAreaRepresentanteLegal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefonoRepresentanteLegal1">
                    <Form.Control size="lg" type="text" placeholder="Telefono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal1}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefonoRepresentanteLegal1}
                    />

                    {formik.touched.telefonoRepresentanteLegal1 && formik.errors.telefonoRepresentanteLegal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefonoRepresentanteLegal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correoElectronicoRepresentanteLegal1">
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correoElectronicoRepresentanteLegal1}
                    />

                    {formik.touched.correoElectronicoRepresentanteLegal1 && formik.errors.correoElectronicoRepresentanteLegal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correoElectronicoRepresentanteLegal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargoRepresentanteLegal1">
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargoRepresentanteLegal1}
                    />

                    {formik.touched.cargoRepresentanteLegal1 && formik.errors.cargoRepresentanteLegal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargoRepresentanteLegal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Card.Subtitle>Representante Legal 2</Card.Subtitle>

              <br />

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedulaRepresentanteLegal2">
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedulaRepresentanteLegal2}
                    />

                    {formik.touched.cedulaRepresentanteLegal2 && formik.errors.cedulaRepresentanteLegal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedulaRepresentanteLegal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombreRepresentanteLegal2">
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombreRepresentanteLegal2}
                    />

                    {formik.touched.nombreRepresentanteLegal2 && formik.errors.nombreRepresentanteLegal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombreRepresentanteLegal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellidoRepresentanteLegal2">
                    <Form.Control size="lg" type="text" placeholder="Apellido del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellidoRepresentanteLegal2}
                    />

                    {formik.touched.apellidoRepresentanteLegal2 && formik.errors.apellidoRepresentanteLegal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellidoRepresentanteLegal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigoDeAreaRepresentanteLegal2">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigoDeAreaRepresentanteLegal2}
                    >
                      Seleccione el Codigo De Area Del Representante Legal 1

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigoDeAreaRepresentanteLegal2 && formik.errors.codigoDeAreaRepresentanteLegal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigoDeAreaRepresentanteLegal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefonoRepresentanteLegal2">
                    <Form.Control size="lg" type="text" placeholder="Teléfono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefonoRepresentanteLegal2}
                    />

                    {formik.touched.telefonoRepresentanteLegal2 && formik.errors.telefonoRepresentanteLegal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefonoRepresentanteLegal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correoElectronicoRepresentanteLegal2">
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correoElectronicoRepresentanteLegal2}
                    />

                    {formik.touched.correoElectronicoRepresentanteLegal2 && formik.errors.correoElectronicoRepresentanteLegal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correoElectronicoRepresentanteLegal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargoRepresentanteLegal2">
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargoRepresentanteLegal2}
                    />

                    {formik.touched.cargoRepresentanteLegal2 && formik.errors.cargoRepresentanteLegal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargoRepresentanteLegal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Card.Subtitle>Representante Legal 3</Card.Subtitle>

              <br />

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedulaRepresentanteLegal3">
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal3}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedulaRepresentanteLegal3}
                    />

                    {formik.touched.cedulaRepresentanteLegal3 && formik.errors.cedulaRepresentanteLegal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedulaRepresentanteLegal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombreRepresentanteLegal3">
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombreRepresentanteLegal3}
                    />

                    {formik.touched.nombreRepresentanteLegal3 && formik.errors.nombreRepresentanteLegal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombreRepresentanteLegal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellidoRepresentanteLegal3">
                    <Form.Control size="lg" type="text" placeholder="Apellido del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellidoRepresentanteLegal3}
                    />

                    {formik.touched.apellidoRepresentanteLegal3 && formik.errors.apellidoRepresentanteLegal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellidoRepresentanteLegal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigoDeAreaRepresentanteLegal3">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigoDeAreaRepresentanteLegal3}
                    >
                      Seleccione el Codigo De Area Del Representante Legal 3

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigoDeAreaRepresentanteLegal3 && formik.errors.codigoDeAreaRepresentanteLegal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigoDeAreaRepresentanteLegal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefonoRepresentanteLegal3">
                    <Form.Control size="lg" type="text" placeholder="Teléfono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal3}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefonoRepresentanteLegal3}
                    />

                    {formik.touched.telefonoRepresentanteLegal3 && formik.errors.telefonoRepresentanteLegal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefonoRepresentanteLegal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correoElectronicoRepresentanteLegal3">
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correoElectronicoRepresentanteLegal3}
                    />

                    {formik.touched.correoElectronicoRepresentanteLegal3 && formik.errors.correoElectronicoRepresentanteLegal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correoElectronicoRepresentanteLegal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargoRepresentanteLegal3">
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargoRepresentanteLegal3}
                    />

                    {formik.touched.cargoRepresentanteLegal3 && formik.errors.cargoRepresentanteLegal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargoRepresentanteLegal3}</div>
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

export default UserDatosFormStep4;