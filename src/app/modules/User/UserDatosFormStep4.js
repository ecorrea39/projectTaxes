import React, {useEffect, useState, useRef} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";

const listaCodCelular = () => {
  const array = [
    {"id": "0416", "code": "0416", "name": "0416"},
    {"id": "0426", "code": "0426", "name": "0426"},
    {"id": "0414", "code": "0414", "name": "0414"},
    {"id": "0424", "code": "0424", "name": "0424"},
    {"id": "0412", "code": "0412", "name": "0412"}
  ];
  return array.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const textLabelColor = {
  'color': '#5A5EFF',
};

const UserDatosFormStep4 = (props) => {

  const [loading, setLoading] = useState(false);
  const [siguiente, setSiguiente] = useState(false);

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

    axios.get(`${API_URL}user_manager_data/${rif}/`, axiosConfig)
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Nombre'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Nombre'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Apellido'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Apellido'})
      ),
    codigo_de_area_representante_legal1: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigo_de_area_representante_legal2: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    codigo_de_area_representante_legal3: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Teléfono'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Teléfono'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Correo'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Correo'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Cargo'})
      ),
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
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Cargo'})
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

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userManagerData",
          id: rif,
          attributes: formik.values
        }
      };

      axios.post(`${API_URL}user_manager_data/`, data, axiosConfig)
        .then(function (res) {

          alert('Guardado exitosamente');

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

          // if (parciales) {
          //   console.log('fechacontitucion ', fechacontitucion);
          //   if (validateMulta(new Date(fechacontitucion), new Date(formData.fecha_registro_inces)) > 45) {
          //     //procesar acto administrativo de la multa
          //     toastTop = $f7.toast.create({
          //       text: 'Se cargo multa según Artículo 35 del COT',
          //       position: 'top',
          //       horizontalPosition: 'center',
          //       closeTimeout: 2000
          //     });
          //     toastTop.open();
          //   }
          // }
          // ;
          //
          // let arreglo = odb.get('groups');
          // if (!arreglo.find(x => x === 'contribuyentes')) {
          //   arreglo.shift();
          //   arreglo.push('contribuyentes');
          //   odb.set('groups', arreglo);
          // }
          //
          // setTimeout(() => {
          //   window.location.href = '/dashboard';
          //   $update();
          // }, 2000);


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
                <Col md={4}>
                  <Button variant="success" size="lg" block
                          type="submit"
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid
                          }
                  >
                    Guardar
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={irAnterior}
                  >
                    Anterior
                  </Button>
                </Col>
                <Col md={4}>
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