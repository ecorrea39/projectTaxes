import React, {Fragment, useState} from "react";
import {Form, Container, Row, Col, Card, Button} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useLocation, useHistory} from "react-router-dom"
import {FormattedMessage, injectIntl, useIntl} from "react-intl";
import queryString from 'query-string';
import axios from "axios";


const UserVerificationRequest = (props) => {

  const [loading, setLoading] = useState(false);

  const intl = useIntl();

  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const history = useHistory();


  const location = useLocation();
  const value = queryString.parse(location.search);
  const user = value.user;

  const initialValues = {
    user: user,
    verification_code: ""
  };

  props.mostrarHeader(false);

  const customHandleChange = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('verification_code', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('verification_code', value);
      }
    }
  }

  const LoginSchema = Yup.object().shape({

    verification_code: Yup
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
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      setSubmitting(true);
      enableLoading();

      console.log("values", formik.values);
      console.log("location.search", location.search);


      console.log('user::::', user);
      console.log('formik.values.verification_code', formik.values.verification_code);


      const rif = user;
      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: 'action',
          id: rif,
          attributes: {
            action: 'user_verification_request',
            verification_code: formik.values.verification_code
          }
        }
      };

      const axiosConfig = {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json'
        }
      };

      console.log('data', data);

      axios.post(`${API_URL}users/${rif}`, data, axiosConfig).then(function (res) {
        console.log("res", res);

        disableLoading();
        setSubmitting(false);

        alert('Bienvenido al Sistema Inces');

        // history.replace('/auth/login');

        window.location.href = '/';

      }).catch((err) => {
        console.log("err", err);

        disableLoading();
        setSubmitting(false);

        if (err.response !== undefined && err.response !== null) {
          let txt = '';
          switch (err.response.status) {
            case 401:
              txt = 'Código de validación incorecto';
              break;
            case 404:
              txt = 'Usuario no registrado';
              break;
            case 406:
              txt = 'El usuario ya se encuentra registrado';
              break;
            default:
              txt = 'Error al registrar usuario';

          }

          alert(txt);
        } else {
          alert('Error de comunicación en el proceso de verificación de usuario');
        }
      });
    },
  });


  return (
    <Fragment>
      <Card bg="primary" text="white">
        <Card.Img src={toAbsoluteUrl("/media/logos/bannerElectronica.jpg")}/>
        <Card.Body>
          <Card.Title>
            Ingrese el código enviado a su correo
          </Card.Title>
          <Card.Body>
            <form
              onSubmit={formik.handleSubmit}
              className="form fv-plugins-bootstrap fv-plugins-framework"
            >
              <Container>
                <Row>
                  <Col md={12}>
                    <Form.Group as={Col} controlId="user">
                      <Form.Control size="lg" type="text" readOnly
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user}
                                    maxLength="10"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <br/>

                <Row>
                  <Col md={12}>
                    <Form.Group as={Col} controlId="verification_code">
                      <Form.Control size="lg" type="text" placeholder="Código de Verificación"
                                    onChange={customHandleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.verification_code}
                                    maxLength="10"
                      />

                      {formik.touched.verification_code && formik.errors.verification_code ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.verification_code}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <br/>

                <Row>
                  <Col md={12}>
                    <Button variant="secondary" size="lg" block
                            type="submit"
                            disabled={
                              formik.isSubmitting ||
                              !formik.isValid
                            }
                    >
                      Aceptar
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

export default UserVerificationRequest;