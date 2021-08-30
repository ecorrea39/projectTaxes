import React, {useState, Fragment, useContext} from "react";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import * as auth from "../_redux/authRedux";
import {login} from "../security/AuthFunctions";
import MTCaptcha from "../../MtCaptcha/MTCaptcha";
import {Button, Form, InputGroup, Col, Row} from "react-bootstrap";
import AuthContext from "../../../store/auth-context";


/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  tipo: "",
  user: "103802128",
  password: "!Q2w3e4r5",
};

function Login(props) {
  const {intl} = props;
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const customHandleChange = (event) => {
    const value = event.currentTarget.value;

    if (value == '') {
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

      login(values.tipo + values.user, values.password)
        .then(res => {
          console.log("loginRes", res);
          disableLoading();

          if (res.status == 200) {
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
          } else {
            setStatus(
              res.txt
            );
          }
        })
        .catch(() => {
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
        })
        .finally(() => {
          disableLoading();
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
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
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <Fragment/>
        )}

        <Form.Group as={Col} controlId="tipo">
          {/*<Form.Label>State</Form.Label>*/}
          <Form.Control as="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tipo}
          >

            <FormattedMessage id='AUTH.GENERAL.IDENTIFICATIONTYPE'>
              {(message) => <option value="">{message}</option>}
            </FormattedMessage>

            <option value="C">C</option>
            <option value="E">E</option>
            <option value="G">G</option>
            <option value="J">J</option>
            <option value="P">P</option>
            <option value="V">V</option>
          </Form.Control>

          {formik.touched.tipo && formik.errors.tipo ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.tipo}</div>
            </div>
          ) : null}
        </Form.Group>

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="rif"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "user"
            )}`}
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
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
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

        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON"/>
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span><FormattedMessage id="AUTH.LOGIN.SIGNIN"/></span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
