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

const UserDatosFormStep3 = (props) => {

  const [loading, setLoading] = useState(false);

  const intl = useIntl();

  const initialValues = {
    domicilioFiscal: "",
    estado: "",
    municipio: "",
    parroquia: "",
    ciudad: "",
    sector:"",
    vialidad:"",
    edificacion:"",
    local:"",
    codigoDeArea1:"",
    telefono1:"",
    codigoDeArea2:"",
    telefono2:"",
    correoElectronico:""
  };

  const oficinas = listaOficinas();

  const customHandleChangeNumeroDeTelefono1 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('telefono1', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('telefono1', value);
      }
    }
  }

  const customHandleChangeNumeroDeTelefono2 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('telefono2', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('telefono2', value);
      }
    }
  }

  const LoginSchema = Yup.object().shape({

    domicilioFiscal: Yup.string()
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
    local: Yup.string()
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
    correo: Yup.string()
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
    estado: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    municipio: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    parroquia: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    ciudad: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    sector: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    vialidad: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    edificacion: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigoDeArea1: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigoDeArea2: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    telefono1: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 8})
        , val => !val || (val && (val.toString().length == 8)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Teléfono 1'})
      ),
    telefono2: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 8})
        , val => !val || (val && (val.toString().length == 8)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Teléfono 2'})
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
          Datos Geográficos
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Col md={12}>
                  <Form.Group as={Col} controlId="domicilioFiscal">
                    <Form.Control size="lg" type="text" placeholder="Domicilio Fiscal"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.domicilioFiscal}
                    />

                    {formik.touched.domicilioFiscal && formik.errors.domicilioFiscal ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.domicilioFiscal}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={4}>
                  <Form.Group controlId="estado">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.estado}
                    >
                      Seleccione el Estado

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.estado && formik.errors.estado ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.estado}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="municipio">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.municipio}
                    >
                      Seleccione el Municipio

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.municipio && formik.errors.municipio ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.municipio}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="parroquia">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.parroquia}
                    >
                      Seleccione la Parroquia

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.parroquia && formik.errors.parroquia ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.parroquia}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={4}>
                  <Form.Group controlId="ciudad">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.ciudad}
                    >
                      Seleccione la Ciudad

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.ciudad && formik.errors.ciudad ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.ciudad}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="sector">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.sector}
                    >
                      Seleccione el Sector

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.sector && formik.errors.sector ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.sector}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="vialidad">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.vialidad}
                    >
                      Seleccione la Vialidad

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.vialidad && formik.errors.vialidad ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.vialidad}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col md={6}>
                  <Form.Group controlId="edificacion">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.edificacion}
                    >
                      Seleccione la Edificacion

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.edificacion && formik.errors.edificacion ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.edificacion}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="local">
                    <Form.Control size="lg" type="text" placeholder="Local"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.local}
                    />

                    {formik.touched.local && formik.errors.local ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.local}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigoDeArea1">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigoDeArea1}
                    >
                      Seleccione el Código De Area

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigoDeArea1 && formik.errors.codigoDeArea1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigoDeArea1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="telefono1">
                    <Form.Control size="lg" type="text" placeholder="Telefono 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefono1}
                    />

                    {formik.touched.telefono1 && formik.errors.telefono1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefono1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group controlId="codigoDeArea2">
                    <Form.Control as="select"
                                  onChange={customHandleChangeNumeroDeTelefono1}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigoDeArea2}
                    >
                      Seleccione el Código De Area

                      {oficinas.map((elemento) =>
                        <option value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigoDeArea2 && formik.errors.codigoDeArea2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigoDeArea2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="telefono2">
                    <Form.Control size="lg" type="text" placeholder="Telefono 2"
                                  onChange={customHandleChangeNumeroDeTelefono2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefono2}
                    />

                    {formik.touched.telefono2 && formik.errors.telefono2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefono2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col md={12}>
                  <Form.Group as={Col} controlId="correoElectronico">
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correoElectronico}
                    />

                    {formik.touched.correoElectronico && formik.errors.correoElectronico ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correoElectronico}</div>
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

export default UserDatosFormStep3;