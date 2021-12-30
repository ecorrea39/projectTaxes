import React, {useContext, useEffect, Fragment, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from 'react-data-table-component';
import axios from "axios";
import GeneralContext from "../../store/general-context";
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row, Spinner, SplitButton} from "react-bootstrap";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useIntl} from "react-intl";

const textLabelColor = {
  'color': '#5A5EFF',
};

const formulario = {
  'padding': '0',
  'width:': '100%'
}

const ActaDeAsambleaCrear = (props) => {

  const [initialValues, setInitialValues] = useState({
    users_information_id: "",
    oficina: "",
    numero_de_documento: "",
    numero_de_tomo: "",
    numero_de_folio: "",
    numero_de_protocolo: "",
    fecha_protocolizacion: ""
  });

  const generalCtx = useContext(GeneralContext);

  const [userCompanies, setUserCompanies] = useState([]);
  const [estados, setEstados] = useState([]);
  const [oficinasTotales, setOficinasTotales] = useState([]);
  const [oficinas, setOficinas] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const intl = useIntl();

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  useEffect(() => {

    cargaDeEmpresas().then((resolvedValueCargaDeEmpresas) => {
      console.log("resolvedValueCargaDeEmpresasActaDeAsamblea", resolvedValueCargaDeEmpresas);

      cargaDeEstados().then((resolvedValueEstados) => {
        console.log("resolvedValueEstados", resolvedValueEstados);

        cargaDeOficinas().then((resolvedValueOficinas) => {
          console.log("resolvedValueOficinas", resolvedValueOficinas);

        }, (error) => {
          console.log("cargaDeOficinasFallida", error);
          alert(error);
        });

      }, (error) => {
        console.log("cargaDeEstadosFallido", error);
        alert(error);
      });
    }, (error) => {
      console.log("cargaDeEmpresasFallidoActaDeAsamblea", error);
      alert(error);
    });
  }, []);

  const handleClickedCrear = (event) => {
    formik.submitForm();
  };

  const handleClickedCancelar = (event) => {
    props.cambiarVistaActual("lista");
  };

  const cargaDeEmpresas = () => {

    let p = new Promise(function (resolve, reject) {

      axios.get(`${API_URL}user_company/fondos/${rif}/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep1_fondos", res);

          const arrayData = Array.from(res.data.data);

          let companiesArray = [];

          if (arrayData.length > 0) {

            arrayData.forEach(function(elemData) {

              let id = elemData.id;
              let elemDataName = elemData.attributes.razon_social;

              let rObj = {
                "id": id,
                "name": elemDataName
              };

              console.log("rObjCompanies", rObj);

              companiesArray.push(rObj);
            });
          } else {
            alert("Aún no hay compañías con un perfil registrado");
          }

          setUserCompanies(companiesArray);
          console.log("companiesArray::", companiesArray);


          resolve('Companies cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep1EstatusCompanies", err);
        // disableLoading();

        reject(new Error('Error al consultar los datos de las Compañías asociadas al RIF'));
      });
    })

    return p;
  }

  const cargaDeEstados = () => {

    let p = new Promise(function (resolve, reject) {

      setSpinner(true);
      axios.get(`${API_URL}geographic_data_estados/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep2_datos_geograficos_estados", res);

          const arrayData = Array.from(res.data.data);

          let estadosArray = [];

          arrayData.forEach(function(elemData) {

            let id = elemData.attributes.cod_estado;
            let elemDataName = elemData.attributes.descripcion;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            estadosArray.push(rObj);
          });

          estadosArray.sort((a, b) => a.name < b.name ? -1 : 1);
          setEstados(estadosArray);

          resolve('Estados cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep3Estados", err);

        reject(new Error('Error al consultar los datos de los estados'));
      })
        .finally(() => {
          setSpinner(false);
        });
    })

    return p;
  };

  const cargaDeOficinas = () => {

    let p = new Promise(function (resolve, reject) {

      setSpinner(true);
      axios.get(`${API_URL}oficinas_saren/`, axiosConfig)
        .then(function (res) {
          console.log("resFormStep2_oficinas_saren", res);

          const arrayData = Array.from(res.data.data);

          let oficinasArray = [];

          arrayData.forEach(function(elemData) {

            let id = elemData.id;
            let elemDataName = elemData.attributes.oficina;
            let relacion = elemData.attributes.id_estado;

            let rObj = {
              "id": id,
              "name": elemDataName,
              "relacion": relacion
            };

            oficinasArray.push(rObj);
          });

          oficinasArray.sort((a, b) => a.name < b.name ? -1 : 1);
          setOficinas(oficinasArray);
          setOficinasTotales(oficinasArray);

          resolve('Ciudades cargadas Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep2Ciudades", err);

        reject(new Error('Error al consultar los datos de los ciudades'));
      })
        .finally(() => {
          setSpinner(false);
        });
    })

    return p;
  };

  const handleChangeFiltrarOficinas = (event) => {

    console.log("event.target.value", event.target.value);

    formik.values.oficina = "";

    //Filtrar Oficinas
    setOficinas(
      oficinasTotales.filter((oficina) => {

        if (event.target.value == "") {
          return true;
        } else {
          if (event.target.value == oficina.relacion) {
            return true;
          } else {
            return false;
          }
        }
      })
    );
  }

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  const LoginSchema = Yup.object().shape({

    users_information_id: Yup.string()
      .required("Debe seleccionar la empresa"),
    oficina: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    numero_de_documento: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
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
          {name: 'Número de Documento'})
      ),
    numero_de_tomo: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
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
          {name: 'Número de Tomo'})
      ),
    numero_de_folio: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
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
          {name: 'Número de Folio'})
      ),
    numero_de_protocolo: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
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
          {name: 'Número de Protocolo'})
      ),
    fecha_protocolizacion: Yup.string()
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Fecha de Constitución'})
      ),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      console.log("values", formik.values);

      const rif = localStorage.getItem('rif');

      let jsonAttributes = formik.values;

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "saveActaAsamblea",
          id: rif,
          attributes: jsonAttributes
        }
      };

      axios.post(`${API_URL}acta_asamblea/`, data, axiosConfig)
        .then(function (res) {

          setSubmitting(false);

          console.log("resFormStep1-add_acta_asamblea", res);

          props.cambiarVistaActual("lista");
        }).catch((err) => {

        console.log("errUserDatosFormStep1", err);


        if (err.response !== undefined && err.response !== null) {
          let txt = '';
          switch (err.response.status) {
            case 424:
              txt = 'Error en la consulta de Acta de Asamblea (Debe llenar el perfil del usuario antes de cargar actas)';
              break;
            default:
              txt = 'Error al guardar los Datos de la Empresa';
          }

          alert(txt);
        } else {
          alert("Error al guardar los Datos de la Empresa.");
        }

        setSubmitting(false);
      });
    },
  });

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Datos Mercantiles
          {spinner && <Spinner animation="border" variant="danger" />}
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="users_information_id">
                    <Form.Label style={textLabelColor}>Empresa</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.users_information_id}
                    >

                      <option key="0" value="">Seleccione la Empresa</option>

                      {userCompanies.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.users_information_id && formik.errors.users_information_id ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.users_information_id}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row>

                <Col md={4}>
                  <Form.Group controlId="estado" style={formulario}>
                    <Form.Label style={textLabelColor}>Estado</Form.Label>
                    <Form.Control as="select"
                                  onChange={handleChangeFiltrarOficinas}
                    >
                      <option key="0" value="">Seleccione el Estado</option>

                      {estados.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="oficina">
                    <Form.Label style={textLabelColor}>Oficina</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.oficina}
                    >
                      <option key="0" value="">Seleccione la Oficina</option>

                      {oficinas.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.oficina && formik.errors.oficina ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.oficina}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group as={Col} controlId="numero_de_documento">
                    <Form.Label style={textLabelColor}>Número de Documento</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Documento"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_documento}
                                  maxLength="20"
                    />

                    {formik.touched.numero_de_documento && formik.errors.numero_de_documento ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_documento}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_tomo">
                    <Form.Label style={textLabelColor}>Número de Tomo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número De Tomo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_tomo}
                                  maxLength="20"
                    />

                    {formik.touched.numero_de_tomo && formik.errors.numero_de_tomo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_tomo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_folio">
                    <Form.Label style={textLabelColor}>Número de Folio</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Folio"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_folio}
                                  maxLength="20"
                    />

                    {formik.touched.numero_de_folio && formik.errors.numero_de_folio ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_folio}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_protocolo">
                    <Form.Label style={textLabelColor}>Número de Protocolo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número De Protocolo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_protocolo}
                                  maxLength="20"
                    />

                    {formik.touched.numero_de_protocolo && formik.errors.numero_de_protocolo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_protocolo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="fecha_protocolizacion">
                    <Form.Label style={textLabelColor}>Fecha de Protocolización</Form.Label>
                    <Form.Control size="lg" type="date" required
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.fecha_protocolizacion}
                                  max={new Date().toISOString().split("T")[0]}
                    />

                    {formik.touched.fecha_protocolizacion && formik.errors.fecha_protocolizacion ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.fecha_protocolizacion}</div>
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
                          onClick={handleClickedCrear}
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid
                          }
                  >
                    Aceptar
                  </Button>
                </Col>
                <Col md={6}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={handleClickedCancelar}
                  >
                    Cancelar
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

export default ActaDeAsambleaCrear;