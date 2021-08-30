import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import {FormattedMessage, injectIntl} from "react-intl";
import * as auth from "../_redux/authRedux";
import {register} from "../_redux/authCrud";
import {Col, Form} from "react-bootstrap";

const initialValues = {
  tipo: "",
  user: "",
  email: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

function Registration(props) {

  useEffect(() => {
    props.mostrarHeader(false);
  }, []);

  const mostrarAuthPageHeader = () => {
    // NO borrar este código comentado
    // props.mostrarHeader(true);
    window.location.href = '/';
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
      register(values.tipo + values.user, values.email, values.password)
        .then(({data: {authToken}}) => {
          props.register(authToken);
          disableLoading();
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          disableLoading();
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
        {/* end: tipo */}

        {/* begin: user */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="rif"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "user"
            )}`}
            name="user"
            {...formik.getFieldProps("user")}
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
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
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
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Re Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "changepassword"
            )}`}
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
