import React, {useEffect, useState, useRef, useContext} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import GeneralContext from "../../store/general-context";

const listaCodCelular = () => {
  const array = [
    {"id": "0416", "code": "0416", "name": "0416"},
    {"id": "0426", "code": "0426", "name": "0426"},
    {"id": "0414", "code": "0414", "name": "0414"},
    {"id": "0424", "code": "0424", "name": "0424"},
    {"id": "0412", "code": "0412", "name": "0412"},
    {"id": "0212", "code": "0212", "name": "0212"},
    {"id": "0248", "code": "0248", "name": "0248"},
    {"id": "0281", "code": "0281", "name": "0281"},
    {"id": "0282", "code": "0282", "name": "0282"},
    {"id": "0283", "code": "0283", "name": "0283"},
    {"id": "0285", "code": "0285", "name": "0285"},
    {"id": "0240", "code": "0240", "name": "0240"},
    {"id": "0243", "code": "0243", "name": "0243"},
    {"id": "0244", "code": "0244", "name": "0244"},
    {"id": "0273", "code": "0273", "name": "0273"},
    {"id": "0284", "code": "0284", "name": "0284"},
    {"id": "0286", "code": "0286", "name": "0286"},
    {"id": "0288", "code": "0288", "name": "0288"},
    {"id": "0289", "code": "0289", "name": "0289"},
    {"id": "0241", "code": "0241", "name": "0241"},
    {"id": "0242", "code": "0242", "name": "0242"},
    {"id": "0245", "code": "0245", "name": "0245"},
    {"id": "0249", "code": "0249", "name": "0249"},
    {"id": "0258", "code": "0258", "name": "0258"},
    {"id": "0259", "code": "0259", "name": "0259"},
    {"id": "0268", "code": "0268", "name": "0268"},
    {"id": "0269", "code": "0269", "name": "0269"},
    {"id": "0279", "code": "0279", "name": "0279"},
    {"id": "0235", "code": "0235", "name": "0235"},
    {"id": "0238", "code": "0238", "name": "0238"},
    {"id": "0246", "code": "0246", "name": "0246"},
    {"id": "0247", "code": "0247", "name": "0247"},
    {"id": "0251", "code": "0251", "name": "0251"},
    {"id": "0252", "code": "0252", "name": "0252"},
    {"id": "0274", "code": "0274", "name": "0274"},
    {"id": "0275", "code": "0275", "name": "0275"},
    {"id": "0234", "code": "0234", "name": "0234"},
    {"id": "0239", "code": "0239", "name": "0239"},
    {"id": "0287", "code": "0287", "name": "0287"},
    {"id": "0291", "code": "0291", "name": "0291"},
    {"id": "0292", "code": "0292", "name": "0292"},
    {"id": "0295", "code": "0295", "name": "0295"},
    {"id": "0255", "code": "0255", "name": "0255"},
    {"id": "0256", "code": "0256", "name": "0256"},
    {"id": "0257", "code": "0257", "name": "0257"},
    {"id": "0293", "code": "0293", "name": "0293"},
    {"id": "0294", "code": "0294", "name": "0294"},
    {"id": "0276", "code": "0276", "name": "0276"},
    {"id": "0277", "code": "0277", "name": "0277"},
    {"id": "0278", "code": "0278", "name": "0278"},
    {"id": "0271", "code": "0271", "name": "0271"},
    {"id": "0272", "code": "0272", "name": "0272"},
    {"id": "0261", "code": "0261", "name": "0261"},
    {"id": "0262", "code": "0261", "name": "0262"},
    {"id": "0263", "code": "0263", "name": "0263"},
    {"id": "0264", "code": "0264", "name": "0264"},
    {"id": "0265", "code": "0265", "name": "0265"},
    {"id": "0266", "code": "0266", "name": "0266"},
    {"id": "0267", "code": "0267", "name": "0267"}

  ];
  return array.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const textLabelColor = {
  'color': '#5A5EFF',
};

const UserDatosFormStep4 = (props) => {

  const [loading, setLoading] = useState(false);
  const [siguiente, setSiguiente] = useState(false);

  const generalCtx = useContext(GeneralContext);

  const [initialValues, setInitialValues] = useState({
    cedula_representante_legal1: "",
    nombre_representante_legal1: "",
    apellido_representante_legal1: "",
    codigo_de_area_representante_legal1: "",
    telefono_representante_legal1: "",
    correo_electronico_representante_legal1: "",
    cargo_representante_legal1: "",
    cedula_representante_legal2: "",
    nombre_representante_legal2: "",
    apellido_representante_legal2: "",
    codigo_de_area_representante_legal2: "",
    telefono_representante_legal2: "",
    correo_electronico_representante_legal2: "",
    cargo_representante_legal2: "",
    cedula_representante_legal3: "",
    nombre_representante_legal3: "",
    apellido_representante_legal3: "",
    codigo_de_area_representante_legal3: "",
    telefono_representante_legal3: "",
    correo_electronico_representante_legal3: "",
    cargo_representante_legal3: ""
  });

  const codigo_de_area_representante_legal1Ref = useRef();
  const codigo_de_area_representante_legal2Ref = useRef();
  const codigo_de_area_representante_legal3Ref = useRef();

  const intl = useIntl();
  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {

    axios.get(`${API_URL}user_manager_data/fondoporid/${generalCtx.theIdUserInformacionProfile}/`, axiosConfig)
      .then(function (res) {
        console.log("get_user_company::", res);

        if (res.data.data != null) {

          let initialValuesJson = {
            "cedula_representante_legal1": res.data.data.attributes.cedula_representante_legal1 != null ? res.data.data.attributes.cedula_representante_legal1 : "",
            "nombre_representante_legal1": res.data.data.attributes.nombre_representante_legal1 != null ? res.data.data.attributes.nombre_representante_legal1 : "",
            "apellido_representante_legal1": res.data.data.attributes.apellido_representante_legal1 != null ? res.data.data.attributes.apellido_representante_legal1 : "",
            "codigo_de_area_representante_legal1": res.data.data.attributes.codigo_de_area_representante_legal1 != null ? res.data.data.attributes.codigo_de_area_representante_legal1 : "",
            "telefono_representante_legal1": res.data.data.attributes.telefono_representante_legal1 != null ? res.data.data.attributes.telefono_representante_legal1 : "",
            "correo_electronico_representante_legal1": res.data.data.attributes.correo_electronico_representante_legal1 != null ? res.data.data.attributes.correo_electronico_representante_legal1 : "",
            "cargo_representante_legal1": res.data.data.attributes.cargo_representante_legal1 != null ? res.data.data.attributes.cargo_representante_legal1 : "",
            "cedula_representante_legal2": res.data.data.attributes.cedula_representante_legal2 != null ? res.data.data.attributes.cedula_representante_legal2 : "",
            "nombre_representante_legal2": res.data.data.attributes.nombre_representante_legal2 != null ? res.data.data.attributes.nombre_representante_legal2 : "",
            "apellido_representante_legal2": res.data.data.attributes.apellido_representante_legal2 != null ? res.data.data.attributes.apellido_representante_legal2 : "",
            "codigo_de_area_representante_legal2": res.data.data.attributes.codigo_de_area_representante_legal2 != null ? res.data.data.attributes.codigo_de_area_representante_legal2 : "",
            "telefono_representante_legal2": res.data.data.attributes.telefono_representante_legal2 != null ? res.data.data.attributes.telefono_representante_legal2 : "",
            "correo_electronico_representante_legal2": res.data.data.attributes.correo_electronico_representante_legal2 != null ? res.data.data.attributes.correo_electronico_representante_legal2 : "",
            "cargo_representante_legal2": res.data.data.attributes.cargo_representante_legal2 != null ? res.data.data.attributes.cargo_representante_legal2 : "",
            "cedula_representante_legal3": res.data.data.attributes.cedula_representante_legal3 != null ? res.data.data.attributes.cedula_representante_legal3 : "",
            "nombre_representante_legal3": res.data.data.attributes.nombre_representante_legal3 != null ? res.data.data.attributes.nombre_representante_legal3 : "",
            "apellido_representante_legal3": res.data.data.attributes.apellido_representante_legal3 != null ? res.data.data.attributes.apellido_representante_legal3 : "",
            "codigo_de_area_representante_legal3": res.data.data.attributes.codigo_de_area_representante_legal3 != null ? res.data.data.attributes.codigo_de_area_representante_legal3 : "",
            "telefono_representante_legal3": res.data.data.attributes.telefono_representante_legal3 != null ? res.data.data.attributes.telefono_representante_legal3 : "",
            "correo_electronico_representante_legal3": res.data.data.attributes.correo_electronico_representante_legal3 != null ? res.data.data.attributes.correo_electronico_representante_legal3 : "",
            "cargo_representante_legal3": res.data.data.attributes.cargo_representante_legal3 != null ? res.data.data.attributes.cargo_representante_legal3 : ""
          };

          setInitialValues(initialValuesJson);
        } else {
          alert("No existe información alguna registrada del usuario");
        }

        disableLoading();
      }).catch((err) => {

      console.log("errGetUserCompany", err);
      alert("Error buscando datos de los representantes legales de la empresa del usuario");
      disableLoading();

    });

  }, []);

  const codigosCelulares = listaCodCelular();

  const customHandleChangeCedulaRepresentanteLegal1 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedula_representante_legal1', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedula_representante_legal1', value);
      }
    }
  }

  const customHandleChangeCedulaRepresentanteLegal2 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedula_representante_legal2', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedula_representante_legal2', value);
      }
    }
  }

  const customHandleChangeCedulaRepresentanteLegal3 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('cedula_representante_legal3', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('cedula_representante_legal3', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal1 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('telefono_representante_legal1', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('telefono_representante_legal1', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal2 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('telefono_representante_legal2', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('telefono_representante_legal2', value);
      }
    }
  }

  const customHandleChangeTelefonoRepresentanteLegal3 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('telefono_representante_legal3', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('telefono_representante_legal3', value);
      }
    }
  }

  const irAnterior = () => {
    props.cambiarFormularioActual(3);
  }

  const submitSiguiente = () => {
    setSiguiente(true);
    formik.submitForm();
  }

  const LoginSchema = Yup.object().shape({

    cedula_representante_legal1: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 8})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 8)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
    cedula_representante_legal2: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 8})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 8)))
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    cedula_representante_legal3: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 8})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 8)))
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    nombre_representante_legal1: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Nombre'})
      ),
    nombre_representante_legal2: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    nombre_representante_legal3: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    apellido_representante_legal1: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Apellido'})
      ),
    apellido_representante_legal2: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    apellido_representante_legal3: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    codigo_de_area_representante_legal1: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigo_de_area_representante_legal2: Yup.string()
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    codigo_de_area_representante_legal3: Yup.string()
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    telefono_representante_legal1: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 7})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 7)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Teléfono'})
      ),
    telefono_representante_legal2: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 7})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 7)))
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    telefono_representante_legal3: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 7})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 7)))
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    correo_electronico_representante_legal1: Yup.string()
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
      .max(80,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 80})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Correo'})
      ),
    correo_electronico_representante_legal2: Yup.string()
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
      .max(80,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 80})
      )
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    correo_electronico_representante_legal3: Yup.string()
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
      .max(80,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 80})
      )
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    cargo_representante_legal1: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Cargo'})
      ),
    cargo_representante_legal2: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
    cargo_representante_legal3: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 1})
      )
      .max(30,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 30})
      )
      .test('j-g-c-los-representantes-legales-2-y-3-son-obligatorios', 'Campo requerido para tipos J, G o C', function(value) {
        const tipoIdentificacionConst = rif.substring(0, 1);

        console.log("tipoIdentificacionConst", tipoIdentificacionConst);
        console.log("validacion::::", ['j', 'g', 'c'].includes(tipoIdentificacionConst));
        console.log("value::::", value);
        if (['j', 'g', 'c'].includes(tipoIdentificacionConst)) {

          if (value == '' || typeof value === 'undefined') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      setSubmitting(true);
      enableLoading();

      console.log("values", formik.values);

      const rif = localStorage.getItem('rif');

      console.log("rif", rif);
      console.log("authToken", token);

      let jsonAttributes = formik.values;

      jsonAttributes["user_information_id"] = generalCtx.theIdUserInformacionProfile;

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userManagerData",
          id: rif,
          attributes: jsonAttributes
        }
      };

      axios.post(`${API_URL}user_manager_data/`, data, axiosConfig)
        .then(function (res) {

          const codigo_de_area_representante_legal1C = codigo_de_area_representante_legal1Ref.current.options[codigo_de_area_representante_legal1Ref.current.selectedIndex].text;
          const codigo_de_area_representante_legal2C = codigo_de_area_representante_legal2Ref.current.options[codigo_de_area_representante_legal2Ref.current.selectedIndex].text;
          const codigo_de_area_representante_legal3C = codigo_de_area_representante_legal3Ref.current.options[codigo_de_area_representante_legal3Ref.current.selectedIndex].text;

          props.cambiarResumenFicha({
            cedula_representante_legal1: formik.values.cedula_representante_legal1,
            nombre_representante_legal1: formik.values.nombre_representante_legal1,
            apellido_representante_legal1: formik.values.apellido_representante_legal1,
            codigo_de_area_representante_legal1: codigo_de_area_representante_legal1C,
            telefono_representante_legal1: formik.values.telefono_representante_legal1,
            correo_electronico_representante_legal1: formik.values.correo_electronico_representante_legal1,
            cargo_representante_legal1: formik.values.cargo_representante_legal1,
            cedula_representante_legal2: formik.values.cedula_representante_legal2,
            nombre_representante_legal2: formik.values.nombre_representante_legal2,
            apellido_representante_legal2: formik.values.apellido_representante_legal2,
            codigo_de_area_representante_legal2: codigo_de_area_representante_legal2C,
            telefono_representante_legal2: formik.values.telefono_representante_legal2,
            correo_electronico_representante_legal2: formik.values.correo_electronico_representante_legal2,
            cargo_representante_legal2: formik.values.cargo_representante_legal2,
            cedula_representante_legal3: formik.values.cedula_representante_legal3,
            nombre_representante_legal3: formik.values.nombre_representante_legal3,
            apellido_representante_legal3: formik.values.apellido_representante_legal3,
            codigo_de_area_representante_legal3: codigo_de_area_representante_legal3C,
            telefono_representante_legal3: formik.values.telefono_representante_legal3,
            correo_electronico_representante_legal3: formik.values.correo_electronico_representante_legal3,
            cargo_representante_legal3: formik.values.cargo_representante_legal3
          });

          setSubmitting(false);
          disableLoading();

          console.log("resFormStep4", res);

          if (siguiente) {
            setSiguiente(false);
            props.cambiarFormularioActual(5);
          }
        }).catch((err) => {

        console.log("errUserDatosFormStep4", err);
        setSubmitting(false);
        disableLoading();

        alert("Error al guardar los Datos de los Representantes Legales");
      });
    },
  });

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Datos del Representante Legal
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>

              <Card.Subtitle>Representante Legal 1</Card.Subtitle>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedula_representante_legal1">
                    <Form.Label style={textLabelColor}>Cédula</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal1}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedula_representante_legal1}
                                  maxLength="8"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.cedula_representante_legal1 && formik.errors.cedula_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedula_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombre_representante_legal1">
                    <Form.Label style={textLabelColor}>Nombre</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombre_representante_legal1}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.nombre_representante_legal1 && formik.errors.nombre_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombre_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellido_representante_legal1">
                    <Form.Label style={textLabelColor}>Apellido</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Apellido del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellido_representante_legal1}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.apellido_representante_legal1 && formik.errors.apellido_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellido_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigo_de_area_representante_legal1">
                    <Form.Label style={textLabelColor}>Código de área</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_de_area_representante_legal1}
                                  ref={codigo_de_area_representante_legal1Ref}
                    >
                      <option key="0" value="">Seleccione el Código de Area</option>

                      {codigosCelulares.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigo_de_area_representante_legal1 && formik.errors.codigo_de_area_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigo_de_area_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefono_representante_legal1">
                    <Form.Label style={textLabelColor}>Número de Teléfono</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Telefono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal1}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefono_representante_legal1}
                                  maxLength="7"
                    />

                    {formik.touched.telefono_representante_legal1 && formik.errors.telefono_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefono_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correo_electronico_representante_legal1">
                    <Form.Label style={textLabelColor}>Correo Electrónico</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correo_electronico_representante_legal1}
                                  maxLength="80"
                    />

                    {formik.touched.correo_electronico_representante_legal1 && formik.errors.correo_electronico_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correo_electronico_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargo_representante_legal1">
                    <Form.Label style={textLabelColor}>Cargo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargo_representante_legal1}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.cargo_representante_legal1 && formik.errors.cargo_representante_legal1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargo_representante_legal1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Card.Subtitle>Representante Legal 2</Card.Subtitle>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedula_representante_legal2">
                    <Form.Label style={textLabelColor}>Cédula</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedula_representante_legal2}
                                  maxLength="8"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.cedula_representante_legal2 && formik.errors.cedula_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedula_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombre_representante_legal2">
                    <Form.Label style={textLabelColor}>Nombre</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombre_representante_legal2}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.nombre_representante_legal2 && formik.errors.nombre_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombre_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellido_representante_legal2">
                    <Form.Label style={textLabelColor}>Apellido</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Apellido del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellido_representante_legal2}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.apellido_representante_legal2 && formik.errors.apellido_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellido_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigo_de_area_representante_legal2">
                    <Form.Label style={textLabelColor}>Código de área</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_de_area_representante_legal2}
                                  ref={codigo_de_area_representante_legal2Ref}
                    >
                      <option key="0" value="">Seleccione el Código de Area</option>

                      {codigosCelulares.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigo_de_area_representante_legal2 && formik.errors.codigo_de_area_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigo_de_area_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefono_representante_legal2">
                    <Form.Label style={textLabelColor}>Número de Teléfono</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Teléfono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefono_representante_legal2}
                                  maxLength="7"
                    />

                    {formik.touched.telefono_representante_legal2 && formik.errors.telefono_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefono_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correo_electronico_representante_legal2">
                    <Form.Label style={textLabelColor}>Correo Electrónico</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correo_electronico_representante_legal2}
                                  maxLength="80"
                    />

                    {formik.touched.correo_electronico_representante_legal2 && formik.errors.correo_electronico_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correo_electronico_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargo_representante_legal2">
                    <Form.Label style={textLabelColor}>Cargo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargo_representante_legal2}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.cargo_representante_legal2 && formik.errors.cargo_representante_legal2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargo_representante_legal2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Card.Subtitle>Representante Legal 3</Card.Subtitle>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group as={Col} controlId="cedula_representante_legal3">
                    <Form.Label style={textLabelColor}>Cédula</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Cédula"
                                  onChange={customHandleChangeCedulaRepresentanteLegal3}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cedula_representante_legal3}
                                  maxLength="8"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.cedula_representante_legal3 && formik.errors.cedula_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cedula_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="nombre_representante_legal3">
                    <Form.Label style={textLabelColor}>Nombre</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Nombre del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombre_representante_legal3}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.nombre_representante_legal3 && formik.errors.nombre_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombre_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={5}>
                  <Form.Group as={Col} controlId="apellido_representante_legal3">
                    <Form.Label style={textLabelColor}>Apellido</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Apellido del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.apellido_representante_legal3}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.apellido_representante_legal3 && formik.errors.apellido_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.apellido_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={2}>
                  <Form.Group controlId="codigo_de_area_representante_legal3">
                    <Form.Label style={textLabelColor}>Código de área</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_de_area_representante_legal3}
                                  ref={codigo_de_area_representante_legal3Ref}
                    >
                      <option key="0" value="">Seleccione el Código de Area</option>

                      {codigosCelulares.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigo_de_area_representante_legal3 && formik.errors.codigo_de_area_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigo_de_area_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="telefono_representante_legal3">
                    <Form.Label style={textLabelColor}>Número de Teléfono</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Teléfono del Representante Legal 1"
                                  onChange={customHandleChangeTelefonoRepresentanteLegal3}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.telefono_representante_legal3}
                                  maxLength="7"
                    />

                    {formik.touched.telefono_representante_legal3 && formik.errors.telefono_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.telefono_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="correo_electronico_representante_legal3">
                    <Form.Label style={textLabelColor}>Correo Electrónico</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correo_electronico_representante_legal3}
                                  maxLength="80"
                    />

                    {formik.touched.correo_electronico_representante_legal3 && formik.errors.correo_electronico_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correo_electronico_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group as={Col} controlId="cargo_representante_legal3">
                    <Form.Label style={textLabelColor}>Cargo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Cargo del Representante Legal 3"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.cargo_representante_legal3}
                                  maxLength="30"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.cargo_representante_legal3 && formik.errors.cargo_representante_legal3 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.cargo_representante_legal3}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                {/*<Col md={4}>*/}
                {/*  <Button variant="success" size="lg" block*/}
                {/*          type="submit"*/}
                {/*          disabled={*/}
                {/*            formik.isSubmitting ||*/}
                {/*            !formik.isValid*/}
                {/*          }*/}
                {/*  >*/}
                {/*    Guardar*/}
                {/*  </Button>*/}
                {/*</Col>*/}
                <Col md={6}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={irAnterior}
                  >
                    Anterior
                  </Button>
                </Col>
                <Col md={6}>
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

export default UserDatosFormStep4;