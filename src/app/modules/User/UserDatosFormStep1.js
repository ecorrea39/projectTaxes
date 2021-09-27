import React, {useState, useEffect} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";


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

  const [loading, setLoading] = useState(false);
  const [clasesEmpresa, setClasesEmpresa] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [actividadesEconomicas, setActividadesEconomicas] = useState([]);

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
                  "razon_social": res.data.data.attributes.razon_social,
                  "nombre_comercial": res.data.data.attributes.nombre_comercial,
                  "clase_de_empresa": res.data.data.attributes.clase_de_empresa,
                  "actividad_economica": res.data.data.attributes.actividad_economica,
                  "estatus": res.data.data.attributes.estatus,
                  "numero_patronal": res.data.data.attributes.numero_patronal,
                  "numero_de_trabajadores": res.data.data.attributes.numero_de_trabajadores
                };

                setInitialValues(initialValuesJson);

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

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userEmpresa",
          id: rif,
          attributes: formik.values
        }
      };

      axios.post(`${API_URL}user_company/`, data, axiosConfig)
        .then(function (res) {
          alert('Guardado exitosamente');

          setSubmitting(false);
          disableLoading();

          console.log("resFormStep1", res);

          props.cambiarFormularioActual(2);

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
        <Card.Title>
          Datos de la Empresa
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="razon_social">
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.clase_de_empresa}
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.actividad_economica}
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.estatus}
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
                <Col md={6}>
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

                <Col md={6}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={formik.submitForm}
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
