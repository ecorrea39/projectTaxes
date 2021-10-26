import React, {useState, useEffect, useRef} from "react";
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row, SplitButton} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";

const textLabelColor = {
  'color': '#5A5EFF',
};

const UserDatosFormStep1 = (props) => {

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

  const [loading, setLoading] = useState(false);
  const [clasesEmpresa, setClasesEmpresa] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [actividadesEconomicas, setActividadesEconomicas] = useState([]);
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

    cargaDeClasesDeEmpresa().then((resolvedValueCargaDeClasesDeEmpresa) => {
      console.log("resolvedValueCargaDeClasesDeEmpresa", resolvedValueCargaDeClasesDeEmpresa);

      cargaDeEstatus().then((resolvedValueCargaDeEstatus) => {
        console.log("resolvedValueCargaDeEstatus", resolvedValueCargaDeEstatus);

        cargaDeActividadesEconomicas().then((resolvedValueCargaDeActividadesEconomicas) => {
          console.log("resolvedValueCargaDeActividadesEconomicas", resolvedValueCargaDeActividadesEconomicas);

          axios.get(`${API_URL}user_company/${rif}/`, axiosConfig)
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

                setInitialValues(initialValuesJson);
              } else {
                alert("No existe información alguna registrada del usuario");
              }

              disableLoading();
            }).catch((err) => {

            console.log("errGetUserCompany", err);
            alert("Error buscando datos de la empresa del usuario")
            disableLoading();

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

  const cargaDeClasesDeEmpresa = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      axios.get(`${API_URL}company_class/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1_company_class", res);

          const arrayData = Array.from(res.data.data);

          let clasesEmpresaArray = arrayData.map(elemData => {
            let id = elemData.id;
            let elemDataName = elemData.attributes.name;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            console.log("rObjCargaDeClasesDeEmpresa", rObj);

            return rObj;
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
      });
    })

    return p;

  };

  const cargaDeEstatus = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      axios.get(`${API_URL}estatus/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1_estatus", res);

          const arrayData = Array.from(res.data.data);

          let estatusArray = arrayData.map(elemData => {
            let id = elemData.id;
            let elemDataName = elemData.attributes.name;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            console.log("rObjCargaDeEstatus", rObj);

            return rObj;
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
      });
    })

    return p;
  }

  const cargaDeActividadesEconomicas = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      axios.get(`${API_URL}economic_activity/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1_economic_activity", res);

          const arrayData = Array.from(res.data.data);

          let actividadesEconomicasArray = arrayData.map(elemData => {
            let id = elemData.id;
            let elemDataName = elemData.attributes.name;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            console.log("rObjActividadesEconomicas", rObj);

            return rObj;
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

  const submitSiguiente = () => {
    setSiguiente(true);
    formik.submitForm();
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

      jsonAttributes["tipo"] = "PRINCIPAL";

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userCompany",
          id: rif,
          attributes: jsonAttributes
        }
      };

      axios.post(`${API_URL}user_company/`, data, axiosConfig)
        .then(function (res) {
          localStorage.setItem('name', formik.values.razon_social);
          localStorage.setItem('surname', formik.values.nombre_comercial);

          const clase_de_empresaC = clase_de_empresaRef.current.options[clase_de_empresaRef.current.selectedIndex].text;
          const actividad_economicaC = actividad_economicaRef.current.options[actividad_economicaRef.current.selectedIndex].text;
          const estatusC = estatusRef.current.options[estatusRef.current.selectedIndex].text;

          props.cambiarResumenFicha({
            tipo: "PRINCIPAL",
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

          console.log("resFormStep1", res);

          if (siguiente) {
            setSiguiente(false);
            props.cambiarFormularioActual(2);
          }
        }).catch((err) => {

        console.log("errUserDatosFormStep1", err);
        setSubmitting(false);
        disableLoading();

        alert("Error al guardar los Datos de la Empresa");
      });
    },
  });

  return (
    <Card bg="default" text="success">
      <Card.Body>

          <Row>
            <Col md={4}>
              <Card.Title>
                Datos de la Empresa
              </Card.Title>
            </Col>
            <Col md={3} style={textLabelColor}>
              Empresa Principal y Fondos de Comercio
            </Col>
            <Col md={5}>
              <form>
                <Form.Group controlId="fondoComercio">
                  <Form.Control as="select">
                    <option key="0" value="">Seleccione el Fondo de Comercio1</option>
                    <option key="1" value="">Seleccione el Fondo de Comercio2</option>
                  </Form.Control>
                </Form.Group>
              </form>
            </Col>
          </Row>


          <Card.Body>
            <form
              onSubmit={formik.handleSubmit}
              className="form fv-plugins-bootstrap fv-plugins-framework"
            >
              <Container>
                <Row>
                  <Col md={6}>
                    <Form.Group as={Col} controlId="razon_social">
                      <Form.Label style={textLabelColor}>Razón Social</Form.Label>
                      <Form.Control size="lg" type="text" placeholder="Razón Social"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.razon_social}
                      />

                      {formik.touched.razon_social && formik.errors.razon_social ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.razon_social}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group as={Col} controlId="nombre_comercial">
                      <Form.Label style={textLabelColor}>Nombre Comercial</Form.Label>
                      <Form.Control size="lg" type="text" placeholder="Nombre Comercial"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre_comercial}
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
                  <Col md={6}>
                    <Form.Group controlId="clase_de_empresa">
                      <Form.Label style={textLabelColor}>Clase de Empresa</Form.Label>
                      <Form.Control as="select"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.clase_de_empresa}
                                    ref={clase_de_empresaRef}
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

                  <Col md={6}>
                    <Form.Group controlId="actividad_economica">
                      <Form.Label style={textLabelColor}>Actividad Económica</Form.Label>
                      <Form.Control as="select"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.actividad_economica}
                                    ref={actividad_economicaRef}
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
                  <Col md={6}>
                    <Form.Group controlId="estatus">
                      <Form.Label style={textLabelColor}>Estatus</Form.Label>
                      <Form.Control as="select"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.estatus}
                                    ref={estatusRef}
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

                  <Col md={6}>

                  </Col>
                </Row>

                <br/>

                <Card.Subtitle>Datos de IVSS</Card.Subtitle>

                <br/>

                <Row>
                  <Col md={6}>
                    <Form.Group as={Col} controlId="numero_patronal">
                      <Form.Label style={textLabelColor}>Número Patronal</Form.Label>
                      <Form.Control size="lg" type="text" placeholder="Número Patronal"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numero_patronal}
                      />

                      {formik.touched.numero_patronal && formik.errors.numero_patronal ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{formik.errors.numero_patronal}</div>
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group as={Col} controlId="numero_de_trabajadores">
                      <Form.Label style={textLabelColor}>Número de Trabajadores</Form.Label>
                      <Form.Control size="lg" type="text" placeholder="Número de Trabajadores"
                                    onChange={customHandleChangeNumeroDeTrabajadores}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numero_de_trabajadores}
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
                  {/*<Col md={6}>*/}
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
