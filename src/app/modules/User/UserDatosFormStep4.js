import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";

const listaCodCelular = () => {
  const array = [
    {"id": "0416", "code": "0416", "name": "0416"},
    {"id": "0426", "code": "0426", "name": "0426"},
    {"id": "0414", "code": "0414", "name": "0414"},
    {"id": "0424", "code": "0424", "name": "0424"},
    {"id": "0412", "code": "0412", "name": "0412"}
  ];
  return array.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const UserDatosFormStep4 = (props) => {

  const [loading, setLoading] = useState(false);

  const intl = useIntl();

  const initialValues = {
    cedula_representante_legal1: "",
    nombre_representante_legal1: "",
    apellido_representante_legal1: "",
    codigo_de_area_representante_legal1: "",
    telefono_representante_legal1: "",
    correo_electronico_representante_legal1: "",
    cargo_representante_legal1: "",
    cedula_representante_legal2: "",
    nombre_representante_legal2: "",
    apellido_representante_legal2: "",
    codigo_de_area_representante_legal2: "",
    telefono_representante_legal2: "",
    correo_electronico_representante_legal2: "",
    cargo_representante_legal2: "",
    cedula_representante_legal3: "",
    nombre_representante_legal3: "",
    apellido_representante_legal3: "",
    codigo_de_area_representante_legal3: "",
    telefono_representante_legal3: "",
    correo_electronico_representante_legal3: "",
    cargo_representante_legal3: ""
  };

  const codigosCelulares = listaCodCelular();

  const customHandleChangeCedulaRepresentanteLegal1 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedula_representante_legal1', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedula_representante_legal1', value);
      }
    }
  }

  const customHandleChangeCedulaRepresentanteLegal2 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedula_representante_legal2', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedula_representante_legal2', value);
      }
    }
  }

  const customHandleChangeCedulaRepresentanteLegal3 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedula_representante_legal3', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedula_representante_legal3', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal1 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('telefono_representante_legal1', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('telefono_representante_legal1', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal2 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('telefono_representante_legal2', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('telefono_representante_legal2', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal3 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('telefono_representante_legal3', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('telefono_representante_legal3', value);
      }
    }
  }

  const irAnterior = () => {
    props.cambiarFormularioActual(3);
  }

  const LoginSchema = Yup.object().shape({

    cedula_representante_legal1: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 8})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 8)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
    cedula_representante_legal2: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 8})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 8)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
    cedula_representante_legal3: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 8})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 8)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
    nombre_representante_legal1: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Nombre'})
      ),
    nombre_representante_legal2: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Nombre'})
      ),
    nombre_representante_legal3: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Nombre'})
      ),
    apellido_representante_legal1: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Apellido'})
      ),
    apellido_representante_legal2: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Apellido'})
      ),
    apellido_representante_legal3: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Nombre'})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Apellido'})
      ),
    codigo_de_area_representante_legal1: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigo_de_area_representante_legal2: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigo_de_area_representante_legal3: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    telefono_representante_legal1: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 7})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 7)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Teléfono'})
      ),
    telefono_representante_legal2: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 7})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 7)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Teléfono'})
      ),
    telefono_representante_legal3: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 7})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 7)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Teléfono'})
      ),
    correo_electronico_representante_legal1: Yup.string()
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
      .max(80,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 80})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Correo'})
      ),
    correo_electronico_representante_legal2: Yup.string()
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
      .max(80,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 80})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Correo'})
      ),
    correo_electronico_representante_legal3: Yup.string()
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
      .max(80,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 80})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Correo'})
      ),
    cargo_representante_legal1: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Cargo'})
      ),
    cargo_representante_legal2: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Cargo'})
      ),
    cargo_representante_legal3: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Cargo'})
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

  return (
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

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedula_representante_legal1">
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal1}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedula_representante_legal1}
                                  maxLength="8"
                    />

                    {formik.touched.cedula_representante_legal1 && formik.errors.cedula_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedula_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombre_representante_legal1">
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombre_representante_legal1}
                                  maxLength="30"
                    />

                    {formik.touched.nombre_representante_legal1 && formik.errors.nombre_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombre_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellido_representante_legal1">
                    <Form.Control size="lg" type="text" placeholder="Apellido del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellido_representante_legal1}
                                  maxLength="30"
                    />

                    {formik.touched.apellido_representante_legal1 && formik.errors.apellido_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellido_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigo_de_area_representante_legal1">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_de_area_representante_legal1}
                    >
                      Seleccione el Codigo De Area Del Representante Legal 1

                      {codigosCelulares.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigo_de_area_representante_legal1 && formik.errors.codigo_de_area_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigo_de_area_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefono_representante_legal1">
                    <Form.Control size="lg" type="text" placeholder="Telefono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal1}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefono_representante_legal1}
                                  maxLength="7"
                    />

                    {formik.touched.telefono_representante_legal1 && formik.errors.telefono_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefono_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correo_electronico_representante_legal1">
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correo_electronico_representante_legal1}
                                  maxLength="80"
                    />

                    {formik.touched.correo_electronico_representante_legal1 && formik.errors.correo_electronico_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correo_electronico_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargo_representante_legal1">
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargo_representante_legal1}
                                  maxLength="30"
                    />

                    {formik.touched.cargo_representante_legal1 && formik.errors.cargo_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargo_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Card.Subtitle>Representante Legal 2</Card.Subtitle>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedula_representante_legal2">
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedula_representante_legal2}
                                  maxLength="8"
                    />

                    {formik.touched.cedula_representante_legal2 && formik.errors.cedula_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedula_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombre_representante_legal2">
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombre_representante_legal2}
                                  maxLength="30"
                    />

                    {formik.touched.nombre_representante_legal2 && formik.errors.nombre_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombre_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellido_representante_legal2">
                    <Form.Control size="lg" type="text" placeholder="Apellido del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellido_representante_legal2}
                                  maxLength="30"
                    />

                    {formik.touched.apellido_representante_legal2 && formik.errors.apellido_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellido_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigo_de_area_representante_legal2">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_de_area_representante_legal2}
                    >
                      Seleccione el Codigo De Area Del Representante Legal 1

                      {codigosCelulares.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigo_de_area_representante_legal2 && formik.errors.codigo_de_area_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigo_de_area_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefono_representante_legal2">
                    <Form.Control size="lg" type="text" placeholder="Teléfono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefono_representante_legal2}
                                  maxLength="8"
                    />

                    {formik.touched.telefono_representante_legal2 && formik.errors.telefono_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefono_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correo_electronico_representante_legal2">
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correo_electronico_representante_legal2}
                                  maxLength="80"
                    />

                    {formik.touched.correo_electronico_representante_legal2 && formik.errors.correo_electronico_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correo_electronico_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargo_representante_legal2">
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargo_representante_legal2}
                                  maxLength="30"
                    />

                    {formik.touched.cargo_representante_legal2 && formik.errors.cargo_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargo_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Card.Subtitle>Representante Legal 3</Card.Subtitle>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedula_representante_legal3">
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal3}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedula_representante_legal3}
                                  maxLength="8"
                    />

                    {formik.touched.cedula_representante_legal3 && formik.errors.cedula_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedula_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombre_representante_legal3">
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombre_representante_legal3}
                                  maxLength="30"
                    />

                    {formik.touched.nombre_representante_legal3 && formik.errors.nombre_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombre_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellido_representante_legal3">
                    <Form.Control size="lg" type="text" placeholder="Apellido del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellido_representante_legal3}
                                  maxLength="30"
                    />

                    {formik.touched.apellido_representante_legal3 && formik.errors.apellido_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellido_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigo_de_area_representante_legal3">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_de_area_representante_legal3}
                    >
                      Seleccione el Codigo De Area Del Representante Legal 3

                      {codigosCelulares.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigo_de_area_representante_legal3 && formik.errors.codigo_de_area_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigo_de_area_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefono_representante_legal3">
                    <Form.Control size="lg" type="text" placeholder="Teléfono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal3}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefono_representante_legal3}
                                  maxLength="7"
                    />

                    {formik.touched.telefono_representante_legal3 && formik.errors.telefono_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefono_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correo_electronico_representante_legal3">
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correo_electronico_representante_legal3}
                                  maxLength="80"
                    />

                    {formik.touched.correo_electronico_representante_legal3 && formik.errors.correo_electronico_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correo_electronico_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargo_representante_legal3">
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargo_representante_legal3}
                                  maxLength="30"
                    />

                    {formik.touched.cargo_representante_legal3 && formik.errors.cargo_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargo_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

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

export default UserDatosFormStep4;