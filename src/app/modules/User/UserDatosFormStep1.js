import React, {useState, useEffect, useRef, useContext} from "react";
import {Button, Card, Col, Container, Form, Modal, Row, Spinner, SplitButton} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import * as Yup from "yup";
import {useFormik, Formik, Field} from "formik";
import axios from "axios";
import GeneralContext from "../../store/general-context";

const textLabelColor = {
  'color': '#5A5EFF',
};

const formulario = {
  'padding': '0',
  'width:': '100%'
}

const UserDatosFormStep1 = (props) => {

  const generalCtx = useContext(GeneralContext);

  const [initialValues, setInitialValues] = useState({
    razon_social: "",
    nombre_comercial: "",
    clase_de_empresa: "",
    actividad_economica: "",
    estatus: "",
    numero_patronal: "",
    numero_de_trabajadores: ""
  });

  const clase_de_empresaRef = useRef();
  const actividad_economicaRef = useRef();
  const estatusRef = useRef();
  const fondoComercioRef = useRef();
  const actaAsambleaRef = useRef();
  const tipoRifRef = useRef();
  const numeroRifRef = useRef();

  const tipoIdentificacionRef = useRef();
  const numeroIdentificacionRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [clasesEmpresa, setClasesEmpresa] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [actividadesEconomicas, setActividadesEconomicas] = useState([]);
  const [userCompanies, setUserCompanies] = useState([]);
  const [siguiente, setSiguiente] = useState(false);
  const [mostrarComboEmpresas, setMostrarComboEmpresas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actasDeAsamblea, setActasDeAsamblea] = useState([]);
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const intl = useIntl();
  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');
  let rifToSearch = localStorage.getItem('rifToSearch');
  const [rifActual, setRifActual] = useState('');
  const groups = localStorage.getItem('groups');

  if (groups == 'administradores') {
    props.cambiarAdminEdicion(true);
  }

  console.log("groups:::", groups);

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {

    console.log("tipo", rif.substring(0, 1));
    console.log("number", rif.substring(1));

    console.log("registradoValor::", props.registradoValor);

    cargaDeClasesDeEmpresa().then((resolvedValueCargaDeClasesDeEmpresa) => {
      console.log("resolvedValueCargaDeClasesDeEmpresa", resolvedValueCargaDeClasesDeEmpresa);

      cargaDeEstatus().then((resolvedValueCargaDeEstatus) => {
        console.log("resolvedValueCargaDeEstatus", resolvedValueCargaDeEstatus);

        cargaDeActividadesEconomicas().then((resolvedValueCargaDeActividadesEconomicas) => {
          console.log("resolvedValueCargaDeActividadesEconomicas", resolvedValueCargaDeActividadesEconomicas);

          cargaDeEmpresas().then((resolvedValueCargaDeEmpresas) => {
            console.log("resolvedValueCargaDeEmpresas", resolvedValueCargaDeEmpresas);

            cargarDataInicial();
          }, (error) => {
            console.log("cargaDeEmpresasFallido", error);
            alert(error);
          });
        }, (error) => {
          console.log("cargaDeActividadesEconomicasFallido", error);
          alert(error);
        });
      }, (error) => {
        console.log("cargaDeCargaDeEstatusFallido", error);
        alert(error);
      });
    }, (error) => {
      console.log("cargaDeClasesDeEmpresaFallido", error);
      alert(error);
    });

  }, []);

  const cargarDataInicial = () => {
    rifToSearch = localStorage.getItem('rifToSearch');

    setSpinner(true);
    axios.get(`${API_URL}user_company/${rifToSearch}/`, axiosConfig)
      .then(function (res) {
        console.log("get_user_company::", res);

        if (res.data.data != null) {

          let initialValuesJson = {
            "razon_social": res.data.data.attributes.razon_social != null ? res.data.data.attributes.razon_social : "",
            "nombre_comercial": res.data.data.attributes.nombre_comercial != null ? res.data.data.attributes.nombre_comercial : "",
            "clase_de_empresa": res.data.data.attributes.clase_de_empresa != null ? res.data.data.attributes.clase_de_empresa : "",
            "actividad_economica": res.data.data.attributes.actividad_economica != null ? res.data.data.attributes.actividad_economica : "",
            "estatus": res.data.data.attributes.estatus != null ? res.data.data.attributes.estatus : "",
            "numero_patronal": res.data.data.attributes.numero_patronal != null ? res.data.data.attributes.numero_patronal : "",
            "numero_de_trabajadores": res.data.data.attributes.numero_de_trabajadores != null ? res.data.data.attributes.numero_de_trabajadores : ""
          };

          generalCtx.iniIdUserInformacionProfile(res.data.data.id);
          setInitialValues(initialValuesJson);

          if (res.data.data.attributes.fecha_registro_inces != null) {
            props.cambiarRegistrado(true);
          } else {
            props.cambiarRegistrado(false);
          }
        } else {
          generalCtx.iniIdUserInformacionProfile("-");
          props.cambiarRegistrado(false);
          alert("No existe información alguna registrada del usuario");
        }

        disableLoading();
      }).catch((err) => {

      console.log("errGetUserCompany", err);
      alert("Error buscando datos de la empresa del usuario")
      disableLoading();

    })
    .finally(() => {
      setSpinner(false);
    });
  }

  const cargaDeClasesDeEmpresa = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      setSpinner(true);
      axios.get(`${API_URL}company_class/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1_company_class", res);

          const arrayData = Array.from(res.data.data);

          let clasesEmpresaArray = [];

          arrayData.forEach(function (elemData) {
            let id = elemData.id;
            let elemDataName = elemData.attributes.name;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            clasesEmpresaArray.push(rObj);
          });

          clasesEmpresaArray.sort((a, b) => a.name < b.name ? -1 : 1);
          console.log("clasesEmpresaArray", clasesEmpresaArray);
          setClasesEmpresa(clasesEmpresaArray);
          console.log("clasesEmpresa::", clasesEmpresa);

          disableLoading();
          resolve('Clases de Empresa cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep1ClasesDeEmpresas", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de las clases de empresa'));
      })
      .finally(() => {
        setSpinner(false);
      });
    })

    return p;

  };

  const cargaDeEstatus = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      setSpinner(true);
      axios.get(`${API_URL}estatus/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1_estatus", res);

          const arrayData = Array.from(res.data.data);

          let estatusArray = [];

          arrayData.forEach(function (elemData) {

            let id = elemData.id;
            let elemDataName = elemData.attributes.name;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            estatusArray.push(rObj);
          });

          estatusArray.sort((a, b) => a.name < b.name ? -1 : 1);
          setEstatus(estatusArray);
          console.log("estatus::", estatus);
          disableLoading();

          resolve('Clases de Empresa cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep1Estatus", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de los Estatus'));
      })
      .finally(() => {
        setSpinner(false);
      });
    })

    return p;
  }

  const cargaDeActividadesEconomicas = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      setSpinner(true);
      axios.get(`${API_URL}economic_activity/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1_economic_activity", res);

          const arrayData = Array.from(res.data.data);

          let actividadesEconomicasArray = [];

          arrayData.forEach(function (elemData) {

            let id = elemData.id;
            let elemDataName = elemData.attributes.name;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            actividadesEconomicasArray.push(rObj);
          });

          actividadesEconomicasArray.sort((a, b) => a.name < b.name ? -1 : 1);
          setActividadesEconomicas(actividadesEconomicasArray);
          console.log("actividadesEconomicas::", actividadesEconomicas);

          disableLoading();

          resolve('Clases de Empresa cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep1Estatus", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de las Actividades Económicas'));
      })
      .finally(() => {
        setSpinner(false);
      });
    })

    return p;
  }

  const cargaDeEmpresas = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      const rifToSearch = localStorage.getItem('rifToSearch');
      setRifActual(rifToSearch);
      console.log("rifTosearch:::::", rifToSearch);

      setSpinner(true);
      axios.get(`${API_URL}user_company/fondos/${rifToSearch}/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1_fondos", res);

          const arrayData = Array.from(res.data.data);

          let companiesArray = [];

          if (arrayData.length > 0) {

            arrayData.forEach(function (elemData) {

              let id = elemData.id;
              let elemDataName = elemData.attributes.razon_social;

              let rObj = {
                "id": id,
                "name": elemDataName
              };

              console.log("rObjCompanies", rObj);

              companiesArray.push(rObj);
            });

            setMostrarComboEmpresas(true);
          } else {
            setMostrarComboEmpresas(false);
          }

          setUserCompanies(companiesArray);
          console.log("companiesArray::", companiesArray);

          disableLoading();

          resolve('Companies cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep1EstatusCompanies", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de las Compañías asociadas al RIF'));
      })
      .finally(() => {
        setSpinner(false);
      });
    })

    return p;
  }

  const customHandleChangeNumeroDeTrabajadores = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('numero_de_trabajadores', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('numero_de_trabajadores', value);
      }
    }
  }

  const companiesChangeHandler = (event) => {

    setSpinner(true);
    axios.get(`${API_URL}user_company/fondoporid/${event.target.value}/`, axiosConfig)
      .then(function (res) {
        console.log("get_user_company::", res);

        if (res.data.data != null) {

          let initialValuesJson = {
            "razon_social": res.data.data.attributes.razon_social != null ? res.data.data.attributes.razon_social : "",
            "nombre_comercial": res.data.data.attributes.nombre_comercial != null ? res.data.data.attributes.nombre_comercial : "",
            "clase_de_empresa": res.data.data.attributes.clase_de_empresa != null ? res.data.data.attributes.clase_de_empresa : "",
            "actividad_economica": res.data.data.attributes.actividad_economica != null ? res.data.data.attributes.actividad_economica : "",
            "estatus": res.data.data.attributes.estatus != null ? res.data.data.attributes.estatus : "",
            "numero_patronal": res.data.data.attributes.numero_patronal != null ? res.data.data.attributes.numero_patronal : "",
            "numero_de_trabajadores": res.data.data.attributes.numero_de_trabajadores != null ? res.data.data.attributes.numero_de_trabajadores : ""
          };

          generalCtx.iniIdUserInformacionProfile(res.data.data.id);
          setInitialValues(initialValuesJson);

          if (res.data.data.attributes.fecha_registro_inces != null) {
            props.cambiarRegistrado(true);
          } else {
            props.cambiarRegistrado(false);
          }
        } else {
          generalCtx.iniIdUserInformacionProfile("-");
          props.cambiarRegistrado(false);
          alert("No existe información alguna registrada del usuario.");
        }

        disableLoading();
      }).catch((err) => {

      console.log("errGetUserCompany", err);
      alert("Error buscando datos de la empresa del usuario")
      disableLoading();

    })
    .finally(() => {
      setSpinner(false);
    });
  }

  const submitSiguiente = () => {
    setSiguiente(true);
    formik.submitForm();
  }

  const handleEditar = () => {

    setSpinner(true);
    axios.get(`${API_URL}acta_asamblea/${rif}/`, axiosConfig)
      .then(function (res) {
        console.log("get_user_company_acta_asamblea::", res);

        const arrayData = Array.from(res.data.data);

        let actasArray = [];

        if (arrayData.length > 0) {
          arrayData.forEach(function (elemData) {
            const fondoComercioRefC = fondoComercioRef.current.value;

            console.log("fondoComercioRefC::", fondoComercioRefC);
            console.log("elemData.attributes.users_information_id::", elemData.attributes.users_information_id);

            if (elemData.attributes.users_information_id == fondoComercioRefC) {
              let id = elemData.id;
              let elemNumeroDeDocumento = elemData.attributes.numero_de_documento;
              let elemFecha = elemData.attributes.fecha_protocolizacion;

              let rObj = {
                "id": id,
                "name": elemNumeroDeDocumento + "-" + new Date(elemFecha).toISOString().split("T")[0]
              };

              actasArray.push(rObj);
            }
          });
        }

        setActasDeAsamblea(actasArray);

        if (actasArray.length == 0) {
          alert("No tiene actas de asamblea cargadas en el módulo de Actas de Asambleas");
        } else {
          setShowModal(true);
        }

      }).catch((err) => {

      console.log("errCargandoActasDeAsamblea", err);
      alert("Error buscando datos de las actas de asamblea")
    })
    .finally(() => {
      setSpinner(false);
    });
  }

  const handleConsultarEmpresa = () => {
    resetFields();

    const tipoRifRefC = tipoRifRef.current.value;
    const numeroRifRefC = numeroRifRef.current.value;
    rifToSearch = tipoRifRefC + numeroRifRefC;

    console.log("tipoRifRefC", tipoRifRefC);
    console.log("numeroRifRefC", numeroRifRefC);

    localStorage.setItem('rifToSearch', rifToSearch);

    cargaDeEmpresas().then((resolvedValueCargaDeEmpresas) => {
      console.log("resolvedValueCargaDeEmpresas", resolvedValueCargaDeEmpresas);

      cargarDataInicial();
    }, (error) => {
      console.log("cargaDeEmpresasFallido", error);
      alert(error);
    });
  }

  const handleCrearEmpresa = () => {

    setShowCrearModal(true);
  }

  const resetFields = () => {

    formik.values.razon_social = "";
    formik.values.nombre_comercial = "";
    formik.values.clase_de_empresa = "";
    formik.values.actividad_economica = "";
    formik.values.estatus = "";
    formik.values.numero_patronal = "";
    formik.values.numero_de_trabajadores = "";
  }

  const handleResetRif = () => {

    tipoRifRef.current.value = "";
    numeroRifRef.current.value = "";

    resetFields();

    const rif = localStorage.getItem('rif');
    rifToSearch = rif;

    localStorage.setItem('rifToSearch', rifToSearch);

    cargaDeEmpresas().then((resolvedValueCargaDeEmpresas) => {
      console.log("resolvedValueCargaDeEmpresas", resolvedValueCargaDeEmpresas);

      cargarDataInicial();
    }, (error) => {
      console.log("cargaDeEmpresasFallido", error);
      alert(error);
    });
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleAceptar = () => {

    const actaAsambleaRefC = actaAsambleaRef.current.value;

    console.log("actaAsambleaRefC:::", actaAsambleaRefC);

    if (actaAsambleaRefC != "") {
      props.cambiarActaEdicion(true);
    }

    setShowModal(false);
  }

  const handleCloseCrear = () => {
    setShowCrearModal(false);
  }

  const handleAceptarCrear = () => {

    const tipoIdentificacionRefC = tipoIdentificacionRef.current.value;
    const numeroIdentificacionRefC = numeroIdentificacionRef.current.value;
    const emailRefC = emailRef.current.value;
    const passwordRefC = passwordRef.current.value;

    console.log("tipoIdentificacionRefC", tipoIdentificacionRefC);
    console.log("numeroIdentificacionRefC", numeroIdentificacionRefC);
    console.log("emailRefC", emailRefC);
    console.log("passwordRefC", passwordRefC);

    const dataCrear = {
      jsonapi: {version: '1.0'},
      data: {
        type: 'newUser',
        id: tipoIdentificacionRefC + numeroIdentificacionRefC,
        attributes: {
          uid: tipoIdentificacionRefC + numeroIdentificacionRefC,
          mail: emailRefC,
          pass: passwordRefC
        }
      }
    };

    const axiosConfigCrear = {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`
      }
    };

    setSpinner(true);
    axios.post(`${API_URL}users/crear/`, dataCrear, axiosConfigCrear).then(function (res) {

      console.log("registerResCrear", res);

      localStorage.setItem('rifToSearch', tipoIdentificacionRefC + numeroIdentificacionRefC);
      setRifActual(tipoIdentificacionRefC + numeroIdentificacionRefC);

      cargaDeEmpresas().then((resolvedValueCargaDeEmpresas) => {
        console.log("resolvedValueCargaDeEmpresasCrearUsuario", resolvedValueCargaDeEmpresas);

        cargarDataInicial();
      }, (error) => {
        console.log("cargaDeEmpresasFallido", error);
        alert(error);
      });

    }).catch((err) => {
      console.log("err", err);

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
    })
    .finally(() => {
      setSpinner(false);
    });

    setShowCrearModal(false);
  }

  const LoginSchema = Yup.object().shape({

    razon_social: Yup.string()
      .min(3,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 3})
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
    nombre_comercial: Yup.string()
      .min(3,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 3})
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
    clase_de_empresa: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    actividad_economica: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    estatus: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    numero_patronal: Yup.string()
      .min(1,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 8})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 9})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    numero_de_trabajadores: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
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
      console.log("submit_formik::", formik);

      let jsonAttributes = formik.values;

      console.log("generalCtx.theIdUserInformacionProfile", generalCtx.theIdUserInformacionProfile);

      jsonAttributes["user_information_id"] = generalCtx.theIdUserInformacionProfile;
      const rifToSearch = localStorage.getItem('rifToSearch');

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userCompany",
          id: rifToSearch,
          attributes: jsonAttributes
        }
      };

      setSpinner(true);
      axios.post(`${API_URL}user_company/`, data, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1::::", res);

          console.log("res.data.data.id", res.data.data.id);

          generalCtx.iniIdUserInformacionProfile(res.data.data.id);

          if (res.data.data.attributes.tipo == "PRINCIPAL") {
            localStorage.setItem('name', formik.values.razon_social);
            localStorage.setItem('surname', formik.values.nombre_comercial);
          }

          const clase_de_empresaC = clase_de_empresaRef.current.options[clase_de_empresaRef.current.selectedIndex].text;
          const actividad_economicaC = actividad_economicaRef.current.options[actividad_economicaRef.current.selectedIndex].text;
          const estatusC = estatusRef.current.options[estatusRef.current.selectedIndex].text;

          props.cambiarResumenFicha({
            tipo: res.data.data.attributes.tipo,
            razon_social: formik.values.razon_social,
            nombre_comercial: formik.values.nombre_comercial,
            clase_de_empresa: clase_de_empresaC,
            actividad_economica: actividad_economicaC,
            estatus: estatusC,
            numero_patronal: formik.values.numero_patronal,
            numero_de_trabajadores: formik.values.numero_de_trabajadores
          });

          setSubmitting(false);
          disableLoading();

          alert("Información inicial cargada satisfactoriamente");

          if (siguiente) {
            setSiguiente(false);
            props.cambiarFormularioActual(2);
          }
        }).catch((err) => {

        console.log("errUserDatosFormStep1", err);
        setSubmitting(false);
        disableLoading();

        if (err.response !== undefined && err.response !== null) {
          let txt = '';
          switch (err.response.status) {
            case 401:
              txt = 'No puede crear el fondo de comercio porque ya existen empresas con ese nombre';
              break;
            default:
              alert("Error al guardar los Datos de la Empresa");
          }

          alert(txt);
        } else {
          alert("Error al guardar los Datos de la Empresa");
        }
      })
      .finally(() => {
        setSpinner(false);
      });
    },
  });

  return (
    <Card bg="default" text="success">
      <Card.Body>

        {
          groups == 'administradores'
          // groups == 'contribuyentes'
          &&
          <Row>
            <Col md={2}>
              <Form.Group controlId="tipo" className="p-0">
                {/*<Form.Label>State</Form.Label>*/}
                <Form.Control as="select"
                              ref={tipoRifRef}
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
              </Form.Group>
            </Col>
            <Col md={3}>
              <input
                placeholder="Ingrese el RIF"
                type="text"
                className={`form-control form-control-solid`}
                name="user"
                maxLength="10"
                ref={numeroRifRef}
              />
            </Col>
            <Col md={2}>
              <Button variant="secondary" size="lg" block
                      type="button"
                      onClick={handleConsultarEmpresa}
              >
                Consultar
              </Button>
            </Col>
            <Col md={2}>
              <Button variant="secondary" size="lg" block
                      type="button"
                      onClick={handleCrearEmpresa}
              >
                Crear
              </Button>

              <Modal show={showCrearModal} onHide={handleCloseCrear}>
                <Modal.Header closeButton>
                  <Modal.Title>Crear usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>






                  <Row>
                    <Col md={3}>
                      {/* begin: tipo */}
                      <Form.Group controlId="tipo" className="p-0" >
                        {/*<Form.Label>State</Form.Label>*/}
                        <Form.Control as="select"
                                      ref={tipoIdentificacionRef}
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
                      </Form.Group>
                      {/* end: tipo */}
                    </Col>
                    <Col md={9}>
                      {/* begin: user */}
                      <div className="form-group fv-plugins-icon-container">
                        <input
                          placeholder="ingrese número de R.I.F."
                          type="text"
                          className={`form-control form-control-solid h-auto `}
                          name="user"
                          onChange={customHandleChange}
                          maxLength="10"
                          ref={numeroIdentificacionRef}
                        />
                      </div>
                      {/* end: user */}
                    </Col>
                  </Row>

                  {/* begin: Email */}
                  <div className="form-group fv-plugins-icon-container">
                    <input
                      placeholder="ingrese correo electrónico"
                      type="email"
                      maxLength="50"
                      className={`form-control form-control-solid h-auto `}
                      name="email"
                      ref={emailRef}
                    />
                  </div>
                  {/* end: Email */}

                  {/* begin: Password */}
                  <div className="form-group fv-plugins-icon-container">
                    <input
                      placeholder="ingrese contraseña"
                      type="password"
                      maxLength="30"
                      className={`form-control form-control-solid h-auto `}
                      name="password"
                      ref={passwordRef}
                    />
                  </div>
                  {/* end: Password */}




                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary"
                          onClick={handleCloseCrear}
                  >
                    Cerrar
                  </Button>
                  <Button variant="secondary"
                          onClick={handleAceptarCrear}
                  >
                    Aceptar
                  </Button>


                </Modal.Footer>
              </Modal>
            </Col>
            <Col md={2}>
              <Button variant="secondary" size="lg" block
                      type="button"
                      onClick={handleResetRif}
              >
                Usar mi RIF
              </Button>
            </Col>
          </Row>
        }

        <br/>

        <Row>
          <Col md={4}>
            <Card.Title>
              Datos de la Empresa <span>({rifActual})</span>
              {spinner && <Spinner animation="border" variant="danger" />}
            </Card.Title>
          </Col>
          <Col md={3} style={textLabelColor}>
            {mostrarComboEmpresas && 'Empresa Principal y Fondos de Comercio'}
          </Col>
          <Col md={5}>
            {mostrarComboEmpresas &&
            <form>
              <Form.Group controlId="fondoComercio">
                <Form.Control as="select" onChange={companiesChangeHandler}
                              ref={fondoComercioRef}
                >

                  {userCompanies.map((elemento) =>
                    <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                  )}

                </Form.Control>
              </Form.Group>
            </form>
            }
          </Col>
        </Row>

        {
          // groups == 'administradores'
          groups == 'contribuyentes'
          &&
          <Row>
            <Col md={12}>
              <Button variant="secondary" size="lg" block
                      type="button"
                      onClick={handleEditar}
              >
                Editar Información de la Empresa mediante un Acta de Asamblea
              </Button>

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Actas de Asamblea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <Form.Group controlId="actasDeAsamblea">
                      <Form.Control as="select"
                                    ref={actaAsambleaRef}
                      >

                        <option key="0" value="">Seleccione el acta de Asamblea</option>

                        {actasDeAsamblea.map((elemento) =>
                          <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                        )}

                      </Form.Control>
                    </Form.Group>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={handleAceptar}>
                    Aceptar
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        }

        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group style={formulario} as={Col} controlId="razon_social">
                    <Form.Label style={textLabelColor}>Razón Social</Form.Label>
                    <Form.Control size="md" type="text" placeholder="Razón Social"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.razon_social}
                                  maxLength="100"
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    />

                    {formik.touched.razon_social && formik.errors.razon_social ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.razon_social}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group as={Col} style={formulario} controlId="nombre_comercial">
                    <Form.Label style={textLabelColor}>Nombre Comercial</Form.Label>
                    <Form.Control size="md" type="text" placeholder="Nombre Comercial"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombre_comercial}
                                  maxLength="100"
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    />

                    {formik.touched.nombre_comercial && formik.errors.nombre_comercial ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombre_comercial}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group controlId="clase_de_empresa" style={formulario}>
                    <Form.Label style={textLabelColor}>Clase de Empresa</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.clase_de_empresa}
                                  ref={clase_de_empresaRef}
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    >

                      <option key="0" value="">Seleccione la Clase de Empresa</option>

                      {clasesEmpresa.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.clase_de_empresa && formik.errors.clase_de_empresa ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.clase_de_empresa}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group controlId="actividad_economica" style={formulario}>
                    <Form.Label style={textLabelColor}>Actividad Económica</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.actividad_economica}
                                  ref={actividad_economicaRef}
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    >

                      <option key="0" value="">Seleccione la Actividad Económica</option>

                      {actividadesEconomicas.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.actividad_economica && formik.errors.actividad_economica ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.actividad_economica}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group controlId="estatus" style={formulario}>
                    <Form.Label style={textLabelColor}>Estatus</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.estatus}
                                  ref={estatusRef}
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    >

                      <option key="0" value="">Seleccione el Estatus</option>

                      {estatus.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.estatus && formik.errors.estatus ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.estatus}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Card.Subtitle>Datos de IVSS</Card.Subtitle>

              <br/>

              <Row>
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group as={Col} controlId="numero_patronal" style={formulario}>
                    <Form.Label style={textLabelColor}>Número Patronal</Form.Label>
                    <Form.Control size="md" type="text" placeholder="Número Patronal"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_patronal}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_patronal && formik.errors.numero_patronal ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_patronal}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group as={Col} controlId="numero_de_trabajadores" style={formulario}>
                    <Form.Label style={textLabelColor}>Número de Trabajadores</Form.Label>
                    <Form.Control size="md" type="text" placeholder="Número de Trabajadores"
                                  onChange={customHandleChangeNumeroDeTrabajadores}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_trabajadores}
                                  maxLength="7"
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_de_trabajadores && formik.errors.numero_de_trabajadores ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_trabajadores}</div>
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
                  {spinner && <Spinner animation="border" variant="danger" />}
                </Col>
              </Row>
            </Container>
          </form>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default UserDatosFormStep1;
