import React, {Fragment, useEffect, useState} from "react";
import {Form, Container, Row, Col, Card, Button} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useLocation} from "react-router-dom"
import {FormattedMessage, injectIntl, useIntl} from "react-intl";

const initialValues = {
  user: "11223344",
  verification_code: ""
};

const UserVerificationRequest = (props) => {

  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const intl = useIntl();

  useEffect(() => {
    props.mostrarHeader(false);
  }, []);

  const customHandleChange = (event) => {
    const value = event.currentTarget.value;

    if (value == '') {
      formik.setFieldValue('verification_code', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('verification_code', value);
      }
    }
  }

  const LoginSchema = Yup.object().shape({

    user: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 5, max: 9})
        , val => !val || (val && (val.toString().length >= 5 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'RIF'})
      ),
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
      alert(formik.values.verification_code);

      disableLoading();
      setSubmitting(false);

      // login(values.tipo + values.user, values.password)
      //   .then(res => {
      //     console.log("loginRes", res);
      //     disableLoading();
      //
      //     if (res.status == 200) {
      //       const attr = res.data.data.attributes;
      //       const data = res.data.data;
      //
      //       localStorage.setItem('authToken', attr.authorization.token);
      //       localStorage.setItem('expires_in', attr.authorization.expires_in);
      //       localStorage.setItem('rif', data.id);
      //       localStorage.setItem('name', attr.name);
      //       localStorage.setItem('surname', attr.surname);
      //       localStorage.setItem('mail', attr.mail);
      //       localStorage.setItem('phone_number_mobile', attr.phone_number_mobile);
      //       localStorage.setItem('groups', attr.groups);
      //
      //       // window.location.href = '/dashboard';
      //       authCtx.login(attr.authorization.token);
      //     } else {
      //       setStatus(
      //         res.txt
      //       );
      //     }
      //   })
      //   .catch(() => {
      //     setStatus(
      //       intl.formatMessage({
      //         id: "AUTH.VALIDATION.INVALID_LOGIN",
      //       })
      //     );
      //   })
      //   .finally(() => {
      //     disableLoading();
      //     setSubmitting(false);
      //   });
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