import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useIntl} from "react-intl";
import * as Yup from "yup";
import {useFormik} from "formik";

const textLabelColor = {
  'color': '#5A5EFF',
};

const QueryBuilderFormStep1 = (props) => {
  const [initialValues, setInitialValues] = useState({
    nombre: "",
    titulo: "",
    descripcion: ""
  });

  const intl = useIntl();

  useEffect(() => {
    setInitialValues({
      nombre: props.QueryFinal.nombre,
      titulo: props.QueryFinal.titulo,
      descripcion: props.QueryFinal.descripcion
    });
  }, []);

  const submitSiguiente = () => {
    formik.submitForm();
  }

  const LoginSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 3})
      )
      .max(20,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 20})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    titulo: Yup.string()
      .min(3,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 3})
      )
      .max(60,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 60})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    descripcion: Yup.string()
      .min(3,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 3})
      )
      .max(200,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 200})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: () => {
      props.CambiarQuery({
        nombre: formik.values.nombre,
        titulo: formik.values.titulo,
        descripcion: formik.values.descripcion
      });

      props.cambiarFormularioActual(2, true);
    },
  });

  return (
    <Card bg="default" text="success">
      <Card.Body>

          <Row>
            <Col md={4}>
              <Card.Title>
                Definición de la consulta
              </Card.Title>
            </Col>
          </Row>

          <Card.Body>
            <form
              onSubmit={formik.handleSubmit}
              className="form fv-plugins-bootstrap fv-plugins-framework"
            >
              <Container>
                <Row>
                  <Col md={6}>
                    <Form.Group as={Col} controlId="nombre">
                      <Form.Label style={textLabelColor}>Nombre</Form.Label>
                      <Form.Control size="lg" type="text" placeholder="Nombre"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                                    maxLength="20"
                      />

                      {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.nombre}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group as={Col} controlId="titulo">
                      <Form.Label style={textLabelColor}>Título</Form.Label>
                      <Form.Control size="lg" type="text" placeholder="Título"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.titulo}
                                    maxLength="60"
                      />

                      {formik.touched.titulo && formik.errors.titulo ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.titulo}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group as={Col} controlId="descripcion">
                      <Form.Label style={textLabelColor}>Descripción</Form.Label>
                      <Form.Control as="textarea" size="lg" type="text" rows="3" placeholder="Descripción"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.descripcion}
                                    maxLength="200"
                      />

                      {formik.touched.descripcion && formik.errors.descripcion ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.descripcion}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <br/>

                <Row>
                  <Col md={12}>
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

export default QueryBuilderFormStep1;
