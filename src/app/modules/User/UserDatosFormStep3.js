import React, {useEffect, useState, useRef, useContext} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import GeneralContext from "../../store/general-context";

const listaCodCelular = () => {
  const array = [
    { "id": "0416", "code": "0416", "name": "0416" },
    { "id": "0426", "code": "0426", "name": "0426" },
    { "id": "0414", "code": "0414", "name": "0414" },
    { "id": "0424", "code": "0424", "name": "0424" },
    { "id": "0412", "code": "0412", "name": "0412" },
    { "id": "0212", "code": "0212", "name": "0212" },
    { "id": "0248", "code": "0248", "name": "0248" },
    { "id": "0281", "code": "0281", "name": "0281" },
    { "id": "0282", "code": "0282", "name": "0282" },
    { "id": "0283", "code": "0283", "name": "0283" },
    { "id": "0285", "code": "0285", "name": "0285" },
    { "id": "0240", "code": "0240", "name": "0240" },
    { "id": "0243", "code": "0243", "name": "0243" },
    { "id": "0244", "code": "0244", "name": "0244" },
    { "id": "0273", "code": "0273", "name": "0273" },
    { "id": "0284", "code": "0284", "name": "0284" },
    { "id": "0286", "code": "0286", "name": "0286" },
    { "id": "0288", "code": "0288", "name": "0288" },
    { "id": "0289", "code": "0289", "name": "0289" },
    { "id": "0241", "code": "0241", "name": "0241" },
    { "id": "0242", "code": "0242", "name": "0242" },
    { "id": "0245", "code": "0245", "name": "0245" },
    { "id": "0249", "code": "0249", "name": "0249" },
    { "id": "0258", "code": "0258", "name": "0258" },
    { "id": "0259", "code": "0259", "name": "0259" },
    { "id": "0268", "code": "0268", "name": "0268" },
    { "id": "0269", "code": "0269", "name": "0269" },
    { "id": "0279", "code": "0279", "name": "0279" },
    { "id": "0235", "code": "0235", "name": "0235" },
    { "id": "0238", "code": "0238", "name": "0238" },
    { "id": "0246", "code": "0246", "name": "0246" },
    { "id": "0247", "code": "0247", "name": "0247" },
    { "id": "0251", "code": "0251", "name": "0251" },
    { "id": "0252", "code": "0252", "name": "0252" },
    { "id": "0274", "code": "0274", "name": "0274" },
    { "id": "0275", "code": "0275", "name": "0275" },
    { "id": "0234", "code": "0234", "name": "0234" },
    { "id": "0239", "code": "0239", "name": "0239" },
    { "id": "0287", "code": "0287", "name": "0287" },
    { "id": "0291", "code": "0291", "name": "0291" },
    { "id": "0292", "code": "0292", "name": "0292" },
    { "id": "0295", "code": "0295", "name": "0295" },
    { "id": "0255", "code": "0255", "name": "0255" },
    { "id": "0256", "code": "0256", "name": "0256" },
    { "id": "0257", "code": "0257", "name": "0257" },
    { "id": "0293", "code": "0293", "name": "0293" },
    { "id": "0294", "code": "0294", "name": "0294" },
    { "id": "0276", "code": "0276", "name": "0276" },
    { "id": "0277", "code": "0277", "name": "0277" },
    { "id": "0278", "code": "0278", "name": "0278" },
    { "id": "0271", "code": "0271", "name": "0271" },
    { "id": "0272", "code": "0272", "name": "0272" },
    { "id": "0261", "code": "0261", "name": "0261" },
    { "id": "0262", "code": "0261", "name": "0262" },
    { "id": "0263", "code": "0263", "name": "0263" },
    { "id": "0264", "code": "0264", "name": "0264" },
    { "id": "0265", "code": "0265", "name": "0265" },
    { "id": "0266", "code": "0266", "name": "0266" },
    { "id": "0267", "code": "0267", "name": "0267" }

  ];
  return array.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const listaSector = () => {
  const array = [
    { "id": "1", "name": "Barrio" },
    { "id": "2", "name": "Caserio" },
    { "id": "3", "name": "Conjunto Residencial" },
    { "id": "4", "name": "Sector" },
    { "id": "5", "name": "Urbanización" },
    { "id": "6", "name": "Zona" }
  ];
  return array.sort((a,b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const listaVialidad = () => {
  const array = [
    { "id": "1", "name": "Calle" },
    { "id": "2", "name": "Avenida" },
    { "id": "3", "name": "Vereda" },
    { "id": "4", "name": "Carretera" },
    { "id": "5", "name": "Esquina" },
    { "id": "6", "name": "Carrera" }
  ];
  return array.sort((a,b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const listaEdificacion = () => {
  const array = [
    { "id": "1", "name": "Casa" },
    { "id": "2", "name": "Centro Comercial" },
    { "id": "3", "name": "Edificio" },
    { "id": "4", "name": "Quinta" },
    { "id": "5", "name": "Local" }
  ];
  return array.sort((a,b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const textLabelColor = {
  'color': '#5A5EFF',
};

const UserDatosFormStep3 = (props) => {

  const generalCtx = useContext(GeneralContext);

  const [initialValues, setInitialValues] = useState({
    domicilio_fiscal: "",
    estado: "",
    municipio: "",
    parroquia: "",
    ciudad: "",
    sector:"",
    vialidad:"",
    edificacion:"",
    local:"",
    codigo_telefono_compania1:"",
    numero_telefono_compania1:"",
    codigo_telefono_compania2:"",
    numero_telefono_compania2:"",
    correo_empresa:""
  });

  const estadoRef = useRef();
  const municipioRef = useRef();
  const parroquiaRef = useRef();
  const sectorRef = useRef();
  const vialidadRef = useRef();
  const edificacionRef = useRef();
  const codigo_telefono_compania1Ref = useRef();
  const codigo_telefono_compania2Ref = useRef();

  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState([]);
  const [municipiosTotales, setMunicipiosTotales] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [parroquiasTotales, setParroquiasTotales] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [ciudadesTotales, setCiudadesTotales] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [siguiente, setSiguiente] = useState(false);

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

    cargaDeEstados().then((resolvedValueEstados) => {
      console.log("resolvedValueEstados", resolvedValueEstados);

      cargaDeMunicipios().then((resolvedValueMunicipios) => {
        console.log("resolvedValueMunicipios", resolvedValueMunicipios);

        cargaDeParroquias().then((resolvedValueParroquias) => {
          console.log("resolvedValueParroquias", resolvedValueParroquias);

          cargaDeCiudades().then((resolvedValueCiudades) => {
            console.log("resolvedValueCiudades", resolvedValueCiudades);

            axios.get(`${API_URL}user_geographic_data/fondoporid/${generalCtx.theIdUserInformacionProfile}/`, axiosConfig)
              .then(function (res) {
                console.log("get_user_company::", res);

                if (res.data.data != null) {

                  let initialValuesJson = {
                    "domicilio_fiscal": res.data.data.attributes.domicilio_fiscal != null ? res.data.data.attributes.domicilio_fiscal : "",
                    "estado": res.data.data.attributes.estado != null ? res.data.data.attributes.estado : "",
                    "municipio": res.data.data.attributes.municipio != null ? res.data.data.attributes.municipio : "",
                    "parroquia": res.data.data.attributes.parroquia != null ? res.data.data.attributes.parroquia : "",
                    "ciudad": res.data.data.attributes.ciudad != null ? res.data.data.attributes.ciudad : "",
                    "sector": res.data.data.attributes.sector != null ? res.data.data.attributes.sector : "",
                    "vialidad": res.data.data.attributes.vialidad != null ? res.data.data.attributes.vialidad : "",
                    "edificacion": res.data.data.attributes.edificacion != null ? res.data.data.attributes.edificacion : "",
                    "local": res.data.data.attributes.local != null ? res.data.data.attributes.local : "",
                    "codigo_telefono_compania1": res.data.data.attributes.codigo_telefono_compania1 != null ? res.data.data.attributes.codigo_telefono_compania1 : "",
                    "numero_telefono_compania1": res.data.data.attributes.numero_telefono_compania1 != null ? res.data.data.attributes.numero_telefono_compania1 : "",
                    "codigo_telefono_compania2": res.data.data.attributes.codigo_telefono_compania2 != null ? res.data.data.attributes.codigo_telefono_compania2 : "",
                    "numero_telefono_compania2": res.data.data.attributes.numero_telefono_compania2 != null ? res.data.data.attributes.numero_telefono_compania2 : "",
                    "correo_empresa": res.data.data.attributes.correo_empresa != null ? res.data.data.attributes.correo_empresa : ""
                  };

                  setInitialValues(initialValuesJson);
                } else {
                  alert("No existe información alguna registrada del usuario");
                }

                disableLoading();
              }).catch((err) => {

              console.log("errGetUserCompany", err);
              alert("Error buscando datos geograficos de la empresa del usuario")
              disableLoading();
            });

          }, (error) => {
            console.log("cargaDeCiudadesFallido", error);
            alert(error);
          });

        }, (error) => {
          console.log("cargaDeParroquiasFallido", error);
          alert(error);
        });

      }, (error) => {
        console.log("cargaDeMunicipiosFallido", error);
        alert(error);
      });

    }, (error) => {
      console.log("cargaDeEstadosFallido", error);
      alert(error);
    });

  }, []);

  const cargaDeEstados = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      axios.get(`${API_URL}geographic_data_estados/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep3_datos_geograficos_estados", res);

          const arrayData = Array.from(res.data.data);

          let estadosArray = arrayData.map(elemData => {
            let id = elemData.attributes.cod_estado;
            let elemDataName = elemData.attributes.descripcion;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            return rObj;
          });

          estadosArray.sort((a, b) => a.name < b.name ? -1 : 1);
          setEstados(estadosArray);

          disableLoading();
          resolve('Estados cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep3Estados", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de los estados'));
      });
    })

    return p;
  };

  const cargaDeMunicipios = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      axios.get(`${API_URL}geographic_data_municipios/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep3_datos_geograficos_municipios", res);

          const arrayData = Array.from(res.data.data);

          let municipiosArray = arrayData.map(elemData => {
            let id = elemData.attributes.cod_municipio;
            let elemDataName = elemData.attributes.descripcion;
            let relacion = elemData.attributes.cod_municipio + '-' + elemData.attributes.id_estado;

            let rObj = {
              "id": id,
              "name": elemDataName,
              "relacion": relacion
            };

            return rObj;
          });

          municipiosArray.sort((a, b) => a.name < b.name ? -1 : 1);
          setMunicipios(municipiosArray);
          setMunicipiosTotales(municipiosArray);

          disableLoading();
          resolve('Municipios cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep3Municipios", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de los municipios'));
      });
    })

    return p;
  };

  const cargaDeParroquias = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      axios.get(`${API_URL}geographic_data_parroquias/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep3_datos_geograficos_parroquias", res);

          const arrayData = Array.from(res.data.data);

          let parroquiasArray = arrayData.map(elemData => {
            let id = elemData.id;
            let elemDataName = elemData.attributes.descripcion;
            let relacion = elemData.id + '-' + elemData.attributes.id_municipio;

            let rObj = {
              "id": id,
              "name": elemDataName,
              "relacion": relacion
            };

            return rObj;
          });

          parroquiasArray.sort((a, b) => a.name < b.name ? -1 : 1);
          setParroquias(parroquiasArray);
          setParroquiasTotales(parroquiasArray);

          disableLoading();
          resolve('Parroquias cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep3Parroquias", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de las Parroquias'));
      });
    })

    return p;
  };

  const cargaDeCiudades = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      axios.get(`${API_URL}geographic_data_ciudades`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep3_datos_geograficos_ciudades", res);

          const arrayData = Array.from(res.data.data);

          let ciudadesArray = arrayData.map(elemData => {
            let id = elemData.id;
            let elemDataName = elemData.attributes.descripcion;
            let relacion = elemData.attributes.id_estado;

            let rObj = {
              "id": id,
              "name": elemDataName,
              "relacion": relacion
            };

            return rObj;
          });

          ciudadesArray.sort((a, b) => a.name < b.name ? -1 : 1);
          setCiudades(ciudadesArray);
          setCiudadesTotales(ciudadesArray);

          disableLoading();
          resolve('Ciudades cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep3Ciudades", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de las Ciudades'));
      });
    })

    return p;
  };

  const sectores = listaSector();
  const vialidades = listaVialidad();
  const edificaciones = listaEdificacion();
  const codigosCelulares = listaCodCelular();

  const customHandleChangeNumeroDeTelefono1 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('numero_telefono_compania1', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('numero_telefono_compania1', value);
      }
    }
  }

  const customHandleChangeNumeroDeTelefono2 = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('numero_telefono_compania2', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('numero_telefono_compania2', value);
      }
    }
  }

  const handleChangeFiltrarMunicipios = (event) => {

    console.log("event.target.value", event.target.value);

    formik.values.estado = event.target.value;

    setMunicipios(
      municipiosTotales.filter((municipio) => {

        if (event.target.value == "") {
          return true;
        } else {
          let municipioArray = municipio.relacion.split('-');

          if (municipioArray[1] == event.target.value) {
            return true;
          } else {
            return false;
          }
        }
      })
    );

    //Filtrar Ciudades
    setCiudades(
      ciudadesTotales.filter((ciudad) => {

        if (event.target.value == "") {
          return true;
        } else {
          if (event.target.value == ciudad.relacion) {
            return true;
          } else {
            return false;
          }
        }
      })
    );
  }

  const handleChangeFiltrarParroquias = (event) => {

    const relacionDeMunicipio = event.target.selectedOptions[0].getAttribute('relacion');

    formik.values.municipio = event.target.value;

    setParroquias(
      parroquiasTotales.filter((parroquia) => {

        if (event.target.value == "") {
          return true;
        } else {
          let parroquiaArray = parroquia.relacion.split('-');

          let municipioArray = relacionDeMunicipio.split('-');

          if (parroquiaArray[1] == municipioArray[0]) {
            return true;
          } else {
            return false;
          }
        }
      })
    );
  }

  const irAnterior = () => {
    props.cambiarFormularioActual(2);
  }

  const submitSiguiente = () => {
    setSiguiente(true);
    formik.submitForm();
  }

  const LoginSchema = Yup.object().shape({

    domicilio_fiscal: Yup.string()
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
    local: Yup.string()
      .min(1,
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
    correo_empresa: Yup.string()
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
    codigo_telefono_compania1: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigo_telefono_compania2: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    numero_telefono_compania1: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 7})
        , val => !val || (val && (val.toString().length == 7)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Teléfono 1'})
      ),
    numero_telefono_compania2: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 7})
        , val => !val || (val && (val.toString().length == 7)))
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
          type: "userGeographicData",
          id: rif,
          attributes: jsonAttributes
        }
      };

      axios.post(`${API_URL}user_geographic_data/`, data, axiosConfig)
        .then(function (res) {

          const estadoC = estadoRef.current.options[estadoRef.current.selectedIndex].text;
          const municipioC = municipioRef.current.options[municipioRef.current.selectedIndex].text;
          const parroquiaC = parroquiaRef.current.options[parroquiaRef.current.selectedIndex].text;
          const sectorC = sectorRef.current.options[sectorRef.current.selectedIndex].text;
          const vialidadC = vialidadRef.current.options[vialidadRef.current.selectedIndex].text;
          const edificacionC = edificacionRef.current.options[edificacionRef.current.selectedIndex].text;
          const codigo_telefono_compania1C = codigo_telefono_compania1Ref.current.options[codigo_telefono_compania1Ref.current.selectedIndex].text;
          const codigo_telefono_compania2C = codigo_telefono_compania2Ref.current.options[codigo_telefono_compania2Ref.current.selectedIndex].text;

          props.cambiarResumenFicha({
            domicilio_fiscal: formik.values.domicilio_fiscal,
            estado: estadoC,
            municipio: municipioC,
            parroquia: parroquiaC,
            ciudad: formik.values.ciudad,
            sector: sectorC,
            vialidad: vialidadC,
            edificacion: edificacionC,
            local: formik.values.local,
            codigo_telefono_compania1: codigo_telefono_compania1C,
            numero_telefono_compania1: formik.values.numero_telefono_compania1,
            codigo_telefono_compania2: codigo_telefono_compania2C,
            numero_telefono_compania2: formik.values.numero_telefono_compania2,
            correo_empresa: formik.values.correo_empresa
          });

          setSubmitting(false);
          disableLoading();

          console.log("resFormStep3", res);

          if (siguiente) {
            setSiguiente(false);
            props.cambiarFormularioActual(4);
          }
        }).catch((err) => {

        console.log("errUserDatosFormStep3", err);
        setSubmitting(false);
        disableLoading();

        alert("Error al guardar los Datos Geograficos");
      });
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
                  <Form.Group as={Col} controlId="domicilio_fiscal">
                    <Form.Label style={textLabelColor}>Domicilio Fiscal</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Domicilio Fiscal"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.domicilio_fiscal}
                                  maxLength="100"
                                  disabled={props.registradoValor ? "disabled" : ""}
                    />

                    {formik.touched.domicilio_fiscal && formik.errors.domicilio_fiscal ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.domicilio_fiscal}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={4}>
                  <Form.Group controlId="estado">
                    <Form.Label style={textLabelColor}>Estado</Form.Label>
                    <Form.Control as="select"
                                  onChange={handleChangeFiltrarMunicipios}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.estado}
                                  ref={estadoRef}
                                  disabled={props.registradoValor ? "disabled" : ""}
                    >
                      <option key="0" value="">Seleccione el Estado</option>

                      {estados.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
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
                    <Form.Label style={textLabelColor}>Municipio</Form.Label>
                    <Form.Control as="select"
                                  onChange={handleChangeFiltrarParroquias}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.municipio}
                                  ref={municipioRef}
                                  disabled={props.registradoValor ? "disabled" : ""}
                    >
                      <option key="0" relacion="" value="">Seleccione el Municipio</option>

                      {municipios.map((elemento) =>
                        <option key={elemento.id} relacion={elemento.relacion} value={elemento.id}>{elemento.name}</option>
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
                    <Form.Label style={textLabelColor}>Parroquia</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.parroquia}
                                  ref={parroquiaRef}
                                  disabled={props.registradoValor ? "disabled" : ""}
                    >
                      <option key="0" relacion="" value="">Seleccione el Parroquia</option>

                      {parroquias.map((elemento) =>
                        <option key={elemento.id} relacion={elemento.relacion} value={elemento.id}>{elemento.name}</option>
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
                    <Form.Label style={textLabelColor}>Ciudad</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.municipio}
                                  ref={municipioRef}
                                  disabled={props.registradoValor ? "disabled" : ""}
                    >
                      <option key="0" relacion="" value="">Seleccione la Ciudadad</option>

                      {ciudades.map((elemento) =>
                        <option key={elemento.id} relacion={elemento.relacion} value={elemento.id}>{elemento.name}</option>
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
                  <Form.Group controlId="sector">
                    <Form.Label style={textLabelColor}>Sector</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.sector}
                                  ref={sectorRef}
                                  disabled={props.registradoValor ? "disabled" : ""}
                    >
                      <option key="0" value="">Seleccione el Sector</option>

                      {sectores.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
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
                    <Form.Label style={textLabelColor}>Vialidad</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.vialidad}
                                  ref={vialidadRef}
                                  disabled={props.registradoValor ? "disabled" : ""}
                    >
                      <option key="0" value="">Seleccione la Vialidad</option>

                      {vialidades.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
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
                    <Form.Label style={textLabelColor}>Edificación</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.edificacion}
                                  ref={edificacionRef}
                                  disabled={props.registradoValor ? "disabled" : ""}
                    >
                      <option key="0" value="">Seleccione la Edificación</option>

                      {edificaciones.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
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
                    <Form.Label style={textLabelColor}>Local</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Local"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.local}
                                  maxLength="20"
                                  disabled={props.registradoValor ? "disabled" : ""}
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
                  <Form.Group controlId="codigo_telefono_compania1">
                    <Form.Label style={textLabelColor}>Código de área</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_telefono_compania1}
                                  ref={codigo_telefono_compania1Ref}
                    >
                      <option key="0" value="">Seleccione el Código de Area</option>

                      {codigosCelulares.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigo_telefono_compania1 && formik.errors.codigo_telefono_compania1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigo_telefono_compania1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="numero_telefono_compania1">
                    <Form.Label style={textLabelColor}>Número de Teléfono 1</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Telefono 1"
                                  onChange={customHandleChangeNumeroDeTelefono1}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_telefono_compania1}
                                  maxLength="7"
                    />

                    {formik.touched.numero_telefono_compania1 && formik.errors.numero_telefono_compania1 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_telefono_compania1}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group controlId="codigo_telefono_compania2">
                    <Form.Label style={textLabelColor}>Código de área</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_telefono_compania2}
                                  ref={codigo_telefono_compania2Ref}
                    >
                      <option key="0" value="">Seleccione el Código de Area</option>

                      {codigosCelulares.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.codigo_telefono_compania2 && formik.errors.codigo_telefono_compania2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.codigo_telefono_compania2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="numero_telefono_compania2">
                    <Form.Label style={textLabelColor}>Número de Teléfono 2</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Telefono 2"
                                  onChange={customHandleChangeNumeroDeTelefono2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_telefono_compania2}
                                  maxLength="7"
                    />

                    {formik.touched.numero_telefono_compania2 && formik.errors.numero_telefono_compania2 ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_telefono_compania2}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col md={12}>
                  <Form.Group as={Col} controlId="correo_empresa">
                    <Form.Label style={textLabelColor}>Correo electrónico</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correo_empresa}
                                  maxLength="80"
                    />

                    {formik.touched.correo_empresa && formik.errors.correo_empresa ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.correo_empresa}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

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

export default UserDatosFormStep3;