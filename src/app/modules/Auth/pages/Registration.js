import React, {useState, useEffect, useRef} from "react";
import {useFormik} from "formik";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Link, useHistory} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";
import * as auth from "../_redux/authRedux";
import {Col, Form} from "react-bootstrap";
import axios from "axios";

const initialValues = {
  tipo: "",
  user: "",
  email: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

function Registration(props) {

  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const history = useHistory();

  props.mostrarHeader(false);

  useEffect(() => {
    props.mostrarHeader(false);

    localStorage.removeItem('authToken');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('rif');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('mail');
    localStorage.removeItem('phone_number_mobile');
    localStorage.removeItem('groups');
  }, []);

  const mostrarAuthPageHeader = () => {
    // NO borrar este código comentado porque demuestra que el problema es un bug en el MtCaptcha que obliga la recarga total
    // props.mostrarHeader(true);
    window.location.href = '/';
  }

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

  const {intl} = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    tipo: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    user: Yup
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
          {name: 'RIF'})
      ),
    email: Yup.string()
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
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          intl.formatMessage({
            id: "AUTH.VALIDATION.PASSWORD_MATCH",
          })
        ),
      }),
    acceptTerms: Yup.bool().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.AGREEMENT_REQUIRED",
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
    validationSchema: RegistrationSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      setSubmitting(true);
      enableLoading();

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: 'newUser',
          id: values.tipo + values.user,
          attributes: {
            uid: values.tipo + values.user,
            mail: values.email,
            pass: values.password
          }
        }
      };
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json'
        }
      };

      axios.post(`${API_URL}users/`, data, axiosConfig).then(function (res) {

        //console.log("registerRes", res);

        disableLoading();
        setSubmitting(false);

        history.push({
          pathname: '/auth/user-verification-request',
          search: '?user=' + formik.values.tipo + formik.values.user,  // query string
        });

      }).catch((err) => {
        console.log("err", err);

        disableLoading();
        setSubmitting(false);

        if (err.response !== undefined && err.response !== null) {

          let txt = '';
          switch (err.response.status) {
            case 409:
              txt = 'El usuario ya se encuentra registrado';
              break;
            default:
              txt = 'Error al registrar usuario';
          }

          alert(txt);
        } else {
          alert('Error de comunicación en el proceso de Registro');
        }
      });
    },
  });

  return (
    <div className="login-form login-signin" style={{display: "block"}}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE"/>
        </h3>
        <p className="text-muted font-weight-bold">
          <FormattedMessage id="AUTH.REGISTER.DESC"/>
        </p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

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

        {/* begin: user */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ingrese número de R.I.F."
            type="text"
            className={`form-control form-control-solid h-auto ${getInputClasses("user")}`}
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
        {/* end: user */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ingrese correo electrónico"
            type="email"
            className={`form-control form-control-solid h-auto ${getInputClasses("email")}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ingrese contraseña"
            type="password"
            className={`form-control form-control-solid h-auto ${getInputClasses("password")}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ingrese confirmación de contraseña"
            type="password"
            className={`form-control form-control-solid h-auto ${getInputClasses("changepassword")}`}
            name="changepassword"
            {...formik.getFieldProps("changepassword")}
          />
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.changepassword}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

        {/* begin: Terms and Conditions */}
        <div className="form-group">
          <label className="checkbox">
            <input
              type="checkbox"
              name="acceptTerms"
              className="m-1"
              {...formik.getFieldProps("acceptTerms")}
            />
            <Link
              to="/terms"
              target="_blank"
              className="mr-1"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="AUTH.GENERAL.AGREEMENT"/>
            </Link>
            <span/>
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.acceptTerms}</div>
            </div>
          ) : null}
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.values.acceptTerms
            }
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span><FormattedMessage id="GENERAL.BUTTON.ACCEPT"/></span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          {/*<Link to="/auth/login">*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"*/}
          {/*  >*/}
          {/*    Cancel*/}
          {/*  </button>*/}
          {/*</Link>*/}

          {/*<button*/}
          {/*  type="button"*/}
          {/*  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"*/}
          {/*  onClick={mostrarAuthPageHeader}*/}
          {/*>*/}
          {/*  Cancel*/}
          {/*</button>*/}

          <Link to="/auth/login" onClick={mostrarAuthPageHeader}>
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              <FormattedMessage id="GENERAL.BUTTON.CANCEL"/>
            </button>
          </Link>

        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
