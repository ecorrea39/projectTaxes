import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {connect} from "react-redux";
import {Link, Redirect, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {FormattedMessage, injectIntl} from "react-intl";
import * as auth from "../_redux/authRedux";
import {Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import Util from "../../../helpers/Util";

const initialValues = {
  tipo: "",
  user: "",
};

function ForgotPassword(props) {

  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('rif');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('mail');
    localStorage.removeItem('phone_number_mobile');
    localStorage.removeItem('groups');
  }, []);

  const customHandleChange = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('user', value);
    } else {
      //const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[0-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('user', value);
      }
    }
  }

  const regresar = () => {
    window.location.href = '/';
  };

  const {intl} = props;
  const [loading, setLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    tipo: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    user: Yup
      .string()
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'RIF'})
      )
      .test('validarRif',
        'El RIF no es válido',
        val => Util.validarRif(formik.values.tipo + val)),
  });

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
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {


      setSubmitting(true);
      setIsRequested(true);


      const rif = values.tipo + values.user;
      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: 'action',
          id: rif,
          attributes: {
            action: 'verification_code_request'
          }
        }
      };
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json'
        }
      };

      axios.post(`${API_URL}users/${rif}`, data, axiosConfig).then(function (res) {

        console.log("registerRes", res);

        setIsRequested(false);
        setSubmitting(false);

        history.push({
          pathname: '/auth/verification-code-request',
          search: '?user=' + rif,  // query string
        });
      }).catch((err) => {

        console.log("err", err);

        setIsRequested(false);
        setSubmitting(false);

        if (err.response !== undefined && err.response !== null) {

          let txt = '';
          switch (err.response.status) {
            case 401:
              txt = 'La solicitud no puede ser procesada';
              break;
            case 403:
              txt = 'La solicitud no puede ser procesada';
              break;
            default:
              txt = 'La solicitud no puede ser procesada';
          }

          alert(txt);

          setStatus(txt);
        } else {
          setStatus('Error de comunicación en el proceso de recuperación de contraseña');
        }
      });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth"/>}
      {!isRequested && (
        <div className="login-form login-forgot" style={{display: "block"}}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">¿Olvidaste tu contraseña?</h3>
            <div className="text-muted font-weight-bold">
              Ingresa tu RIF para reestablecerla
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}

            <Row>
              <Col md={3}>
                {/* begin: tipo */}
                <Form.Group as={Col} controlId="tipo" className="p-0" >
                  {/*<Form.Label>State</Form.Label>*/}
                  <Form.Control as="select"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.tipo}
                  >

                    <FormattedMessage id='AUTH.GENERAL.IDENTIFICATIONTYPE'>
                      {(message) => <option value="">{message}</option>}
                    </FormattedMessage>

                    <option value="j">J</option>
                    <option value="v">V</option>
                    <option value="c">C</option>
                    <option value="e">E</option>
                    <option value="g">G</option>
                    <option value="p">P</option>

                  </Form.Control>

                  {formik.touched.tipo && formik.errors.tipo ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.tipo}</div>
                    </div>
                  ) : null}
                </Form.Group>
                {/* end: tipo */}
              </Col>
              <Col md={9}>
                {/* begin: user */}
                <div className="form-group fv-plugins-icon-container">
                  <input
                    placeholder="rif"
                    type="text"
                    className={`form-control form-control-solid h-auto ${getInputClasses("user")}`}
                    name="user"
                    onChange={customHandleChange}
                    value={formik.values.user}
                    onBlur={formik.handleBlur}
                    maxLength="10"
                  />
                  {formik.touched.user && formik.errors.user ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.user}</div>
                    </div>
                  ) : null}
                </div>
                {/* end: user */}
              </Col>
            </Row>

            <div className="form-group d-flex flex-wrap flex-center">
              <button
                type="submit"
                disabled={
                  formik.isSubmitting ||
                  !formik.isValid
                }
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
              >
                <span><FormattedMessage id="GENERAL.BUTTON.ACCEPT"/></span>
                {loading && <span className="ml-3 spinner spinner-white"></span>}
              </button>

              <button
                type="button"
                className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                onClick={regresar}
              >
                <FormattedMessage id="GENERAL.BUTTON.CANCEL"/>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
