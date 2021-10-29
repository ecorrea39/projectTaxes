import React, {useState, Fragment, useContext} from "react";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import * as auth from "../_redux/authRedux";
import MTCaptcha from "../../MtCaptcha/MTCaptcha";
import {Form, Col, Row} from "react-bootstrap";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import Util from "../../../helpers/Util";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  tipo: "j",
  user: "333333332",
  password: "inces123."
};

const styleCenter = { "display":"flex", "justifyContent":"center", "alignItem":"center" }

function Login(props) {
  const {intl} = props;
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const customHandleChange = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('user', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('user', value);
      }
    }
  }

  const LoginSchema = Yup.object().shape({

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
    password: Yup.string()
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
      enableLoading();

      console.log("values", values);

      const mtcaptcha = document.querySelector('[name="mtcaptcha-verifiedtoken"]').value;

      const axiosConfig = {
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: `Basic ${btoa(`${values.tipo + values.user}:${values.password}:${mtcaptcha}`)}`
        }
      };

      axios.get(`${API_URL}users/authentication/`, axiosConfig).then((res) => {

        //console.log("loginRes", res);

        disableLoading();
        setSubmitting(false);

        const attr = res.data.data.attributes;
        const data = res.data.data;

        localStorage.setItem('authToken', attr.authorization.token);
        localStorage.setItem('expires_in', attr.authorization.expires_in);
        localStorage.setItem('rif', data.id);
        localStorage.setItem('name', attr.name);
        localStorage.setItem('surname', attr.surname);
        localStorage.setItem('mail', attr.mail);
        localStorage.setItem('phone_number_mobile', attr.phone_number_mobile);
        localStorage.setItem('groups', attr.groups);

        // window.location.href = '/dashboard';
        authCtx.login(attr.authorization.token);

      }).catch((err) => {
        console.log("errorEnConsulta", err);

        disableLoading();
        setSubmitting(false);

        if (err.response !== undefined && err.response !== null) {
          let txt = '';
          switch (err.response.status) {
            case 423:
              txt = 'Actualización de contraseña requerida';
              break;
            case 401:
              txt = 'Credenciales inválidas';
              break;
            case 424:
              txt = 'Desafío captcha usado. Por favor resuélvalo nuevamente';
              setTimeout(() => {
                window.location.href = '/signin';
              }, 3000);
              break;
            default:
              txt = 'Error al registrar usuario';
          }

          setStatus(txt);
        } else {
          alert('Error de comunicación en el proceso de Inicio de Sesión');
        }
      });
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-5 mt-8">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE"/>
        </h3>
        {/*<p className="text-muted font-weight-bold">*/}
        {/*  <FormattedMessage id="AUTH.LOGIN.DESCRIPTION"/>*/}
        {/*</p>*/}
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        { formik.status ? (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          ) : (<Fragment/>)
        }

        <div className="form-group fv-plugins-icon-container">
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
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ingrese número de R.I.F."
            type="text"
            className={`form-control form-control-solid ${getInputClasses("user")}`}
            name="user"
            onChange={customHandleChange}
            value={formik.values.user}
            onBlur={formik.handleBlur}
          />
          {formik.touched.user && formik.errors.user ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.user}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ingrese su contraseña"
            type="password"
            className={`form-control form-control-solid py-5 px-6 ${getInputClasses("password")}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>

        <div className="form-group fv-plugins-icon-container">
          <MTCaptcha/>
        </div>

        <div className="form-group fv-plugins-icon-container" style={styleCenter}>
          <button
              id="kt_login_signin_submit"
              type="submit"
              disabled={formik.isSubmitting}
              className={`btn btn-primary size-lg font-weight-bold`}
              style={{"width": "100%"}}
          >
            <span><FormattedMessage id="AUTH.LOGIN.SIGNIN"/></span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>

        <div className="form-group d-flex flex-wrap" style={styleCenter}>
              <span className="font-weight-bold text-dark-50">
                <FormattedMessage id="AUTH.LOGIN.ASK" />
              </span>
          <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">
            <FormattedMessage id="AUTH.LOGIN.SIGNUP" />
          </Link>
        </div>
        <div className="form-group d-flex flex-wrap" style={styleCenter}>
          <Link
              to="/auth/forgot-password"
              className="text-dark-50 text-hover-primary my-3 mr-2"
              id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON"/>
          </Link>
        </div>

      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
