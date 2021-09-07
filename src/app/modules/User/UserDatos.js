import React, {Fragment, useState} from "react";
import {Row, Col, Card, Container, Form, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import UserDatosHeader from "./UserDatosHeader";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useIntl} from "react-intl";

const UserDatos = (props) => {

  const [loading, setLoading] = useState(false);

  const intl = useIntl();

  const initialValues = {
    razonSocial: "",
    nombreComercial: "",
    claseDeEmpresa: "",
    actividadEconomica: "",
    estatus: "",
    numeroPatronal: "",
    numeroDeTrabajadores: ""
  };

  const LoginSchema = Yup.object().shape({

    razonSocial: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 8})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 25})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    nombreComercial: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 8})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 25})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    claseDeEmpresa: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 8})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 25})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    actividadEconomica: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 8})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 25})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    estatus: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 8})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 25})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    numeroPatronal: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 7, max: 9})
        , val => !val || (val && (val.toString().length >= 7 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Código de Verificación'})
      ),
    numeroDeTrabajadores: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 7, max: 9})
        , val => !val || (val && (val.toString().length >= 7 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Código de Verificación'})
      ),
    // password: Yup.string()
    //   .min(8,
    //     intl.formatMessage({
    //       id: "AUTH.VALIDATION.MIN_LENGTH",
    //     }, {min: 8})
    //   )
    //   .max(25,
    //     intl.formatMessage({
    //       id: "AUTH.VALIDATION.MAX_LENGTH",
    //     }, {max: 25})
    //   )
    //   .required(
    //     intl.formatMessage({
    //       id: "AUTH.VALIDATION.REQUIRED_FIELD",
    //     })
    //   ),
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
    <Fragment>
      <UserDatosHeader/>

      <br />

      <Card bg="primary" text="white">
        <Card.Body>
          <Card.Title>
            Datos de la Empresa
          </Card.Title>
          <Card.Body>
            <form
              onSubmit={formik.handleSubmit}
              className="form fv-plugins-bootstrap fv-plugins-framework"
            >
              <Container>
                <Row>
                  <Col md={6}>
                    <Form.Group as={Col} controlId="razonSocial">
                      <Form.Control size="lg" type="text" placeholder="Razon Social"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.razonSocial}
                      />

                      {formik.touched.razonSocial && formik.errors.razonSocial ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.razonSocial}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group as={Col} controlId="nombreComercial">
                      <Form.Control size="lg" type="text" placeholder="Nombre Comercial"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombreComercial}
                      />

                      {formik.touched.nombreComercial && formik.errors.nombreComercial ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.nombreComercial}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group as={Col} controlId="claseDeEmpresa">
                      <Form.Control size="lg" type="text" placeholder="Clase De Empresa"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.claseDeEmpresa}
                      />

                      {formik.touched.claseDeEmpresa && formik.errors.claseDeEmpresa ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.claseDeEmpresa}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group as={Col} controlId="actividadEconomica">
                      <Form.Control size="lg" type="text" placeholder="Actividad Economica"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.actividadEconomica}
                      />

                      {formik.touched.actividadEconomica && formik.errors.actividadEconomica ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.actividadEconomica}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group as={Col} controlId="estatus">
                      <Form.Control size="lg" type="text" placeholder="Estatus"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.estatus}
                      />

                      {formik.touched.estatus && formik.errors.estatus ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.estatus}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={6}>

                  </Col>
                </Row>

                <br/>

                <Card.Subtitle>Datos de IVSS</Card.Subtitle>

                <br/>

                <Row>
                  <Col md={6}>
                    <Form.Group as={Col} controlId="numeroPatronal">
                      <Form.Control size="lg" type="text" placeholder="Número Patronal"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numeroPatronal}
                      />

                      {formik.touched.numeroPatronal && formik.errors.numeroPatronal ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.numeroPatronal}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group as={Col} controlId="numeroDeTrabajadores">
                      <Form.Control size="lg" type="text" placeholder="Número de Trabajadores"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numeroDeTrabajadores}
                      />

                      {formik.touched.numeroDeTrabajadores && formik.errors.numeroDeTrabajadores ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.numeroDeTrabajadores}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <br />

                <Row>
                  <Col md={4}>
                    <Button variant="secondary" size="lg" block
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
                    <Button variant="default" size="lg" block
                            type="button"
                    >
                      Anterior
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button variant="default" size="lg" block
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
    </Fragment>
  );
}

export default UserDatos;