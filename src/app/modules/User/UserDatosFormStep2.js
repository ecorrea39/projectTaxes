import React, {useEffect, useState, useRef, useContext} from "react";
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import GeneralContext from "../../store/general-context";
import Swal from "sweetalert2";

const textLabelColor = {
  'color': '#5A5EFF',
};

const formulario = {
  'padding': '0',
  'width:': '100%'
}

const UserDatosFormStep2 = (props) => {

  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [estados, setEstados] = useState([]);
  const [oficinasTotales, setOficinasTotales] = useState([]);
  const [oficinas, setOficinas] = useState([]);

  const generalCtx = useContext(GeneralContext);

  const [initialValues, setInitialValues] = useState({
    oficina: "",
    numero_de_documento: "",
    numero_de_tomo: "",
    numero_de_folio: "",
    numero_de_protocolo: "",
    fecha_constitucion: ""
  });

  const oficinaRef = useRef();

  const [siguiente, setSiguiente] = useState(false);

  const intl = useIntl();

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const getFechaFutura = () => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();
    if (month < 10) month = '0' + month.toString();
    if (day < 10) day = '0' + day.toString();
    return year + '-' + month + '-' + day;
  }

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {

    //console.log("registradoValor::", props.registradoValor);

    cargaDeEstados().then((resolvedValueEstados) => {
      //console.log("resolvedValueEstados", resolvedValueEstados);

      cargaDeOficinas().then((resolvedValueOficinas) => {
        //console.log("resolvedValueOficinas", resolvedValueOficinas);

        setSpinner(true);
        axios.get(`${API_URL}user_mercantil_data/fondoporid/${generalCtx.theIdUserInformacionProfile}/`, axiosConfig)
          .then(function (res) {
            //console.log("get_user_company::", res);

            if (res.data.data != null) {

              let initialValuesJson = {
                "oficina": res.data.data.attributes.oficina != null ? res.data.data.attributes.oficina : "",
                "numero_de_documento": res.data.data.attributes.numero_de_documento != null ? res.data.data.attributes.numero_de_documento : "",
                "numero_de_tomo": res.data.data.attributes.numero_de_tomo != null ? res.data.data.attributes.numero_de_tomo : "",
                "numero_de_folio": res.data.data.attributes.numero_de_folio != null ? res.data.data.attributes.numero_de_folio : "",
                "numero_de_protocolo": res.data.data.attributes.numero_de_protocolo != null ? res.data.data.attributes.numero_de_protocolo : "",
                "fecha_constitucion": res.data.data.attributes.fecha_constitucion != null ? res.data.data.attributes.fecha_constitucion.substring(0, 10) : ""
              };

              setInitialValues(initialValuesJson);
            } else {
              //alert("No existe información alguna registrada del usuario");
            }

            disableLoading();
          }).catch((err) => {

          console.log("errGetUserCompany", err);
          //alert("Error buscando datos mercantiles de la empresa del usuario")

          Swal.fire({
            title: "Registro de Contribuyente",
            text: "Error buscando datos mercantiles!",
            icon: "error",
            button: "Ok",
            timer: 2000
          })

          disableLoading();

        })
          .finally(() => {
            setSpinner(false);
          });

      }, (error) => {
        console.log("cargaDeOficinasFallida", error);
        alert(error);
      });

    }, (error) => {
      console.log("cargaDeEstadosFallido", error);
      //alert(error);
      Swal.fire({
        title: "Registro de Contribuyente",
        text: "Error buscando datos mercantiles!",
        icon: "error",
        button: "Ok",
        timer: 2000
      })

    });

  }, []);

  const irAnterior = () => {
    props.cambiarFormularioActual(1);
  }

  const submitSiguiente = () => {
    setSiguiente(true);
    formik.submitForm();
  }

  const cargaDeEstados = () => {

    let p = new Promise(function (resolve, reject) {
      enableLoading();

      setSpinner(true);
      axios.get(`${API_URL}geographic_data_estados/`, axiosConfig)
        .then(function (res) {
          //console.log("resFormStep2_datos_geograficos_estados", res);

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

          disableLoading();
          resolve('Estados cargado Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep3Estados", err);
        disableLoading();

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
      enableLoading();

      setSpinner(true);
      axios.get(`${API_URL}oficinas_saren/`, axiosConfig)
        .then(function (res) {
          //console.log("resFormStep2_oficinas_saren", res);

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

          disableLoading();
          resolve('Ciudades cargadas Exitosamente');

        }).catch((err) => {

        console.log("errUserDatosFormStep2Ciudades", err);
        disableLoading();

        reject(new Error('Error al consultar los datos de los ciudades'));
      })
        .finally(() => {
          setSpinner(false);
        });
    })

    return p;
  };

  const handleChangeFiltrarOficinas = (event) => {

    //console.log("event.target.value", event.target.value);

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

  const LoginSchema = Yup.object().shape({

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
    fecha_constitucion: Yup.string()
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Fecha de Constitución'})
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

      //console.log("values", formik.values);

      const rif = localStorage.getItem('rif');

      //console.log("rif", rif);
      //console.log("authToken", token);

      let jsonAttributes = formik.values;

      jsonAttributes["user_information_id"] = generalCtx.theIdUserInformacionProfile;

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userMercantilData",
          id: rif,
          attributes: jsonAttributes
        }
      };

      setSpinner(true);
      axios.post(`${API_URL}user_mercantil_data/`, data, axiosConfig)
        .then(function (res) {

          const oficinaC = oficinaRef.current.options[oficinaRef.current.selectedIndex].text;

          props.cambiarResumenFicha({
            oficina: oficinaC,
            numero_de_documento: formik.values.numero_de_documento,
            numero_de_tomo: formik.values.numero_de_tomo,
            numero_de_folio: formik.values.numero_de_folio,
            numero_de_protocolo: formik.values.numero_de_protocolo,
            fecha_constitucion: formik.values.fecha_constitucion
          });

          setSubmitting(false);
          disableLoading();

          //console.log("resFormStep2", res);

          if (siguiente) {
            setSiguiente(false);
            props.cambiarFormularioActual(3);
          }
        }).catch((err) => {

        console.log("errUserDatosFormStep2", err);
        setSubmitting(false);
        disableLoading();

        alert("Error al guardar los Datos Mercantiles");
      })
      .finally(() => {
        setSpinner(false);
      });
    },
  });

  return(
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
                    <Form.Control style={formulario} as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.oficina}
                                  ref={oficinaRef}
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    >
                      <option key="0" relacion="" value="">Seleccione la Oficina</option>

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
                  <Form.Group as={Col} style={formulario} controlId="numero_de_documento">
                    <Form.Label style={textLabelColor}>Número de Documento</Form.Label>
                    <Form.Control size="md" type="text" placeholder="Número Del Documento"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_documento}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
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
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group as={Col} style={formulario} controlId="numero_de_tomo">
                    <Form.Label style={textLabelColor}>Número de Tomo</Form.Label>
                    <Form.Control size="md" type="text" placeholder="Número De Tomo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_tomo}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_de_tomo && formik.errors.numero_de_tomo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_tomo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group as={Col} style={formulario} controlId="numero_de_folio">
                    <Form.Label style={textLabelColor}>Número de Folio</Form.Label>
                    <Form.Control size="md" type="text" placeholder="Número Del Folio"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_folio}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_de_folio && formik.errors.numero_de_folio ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_folio}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group as={Col} style={formulario} controlId="numero_de_protocolo">
                    <Form.Label style={textLabelColor}>Número de Protocolo</Form.Label>
                    <Form.Control size="md" type="text" placeholder="Número De Protocolo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_protocolo}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_de_protocolo && formik.errors.numero_de_protocolo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_protocolo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6">
                  <Form.Group as={Col} style={formulario} controlId="fecha_constitucion">
                    <Form.Label style={textLabelColor}>Fecha de Constitución</Form.Label>
                    <Form.Control size="md" type="date" required
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.fecha_constitucion}
                                  disabled={props.registradoValor && !props.actaEdicion && !props.adminEdicion ? "disabled" : ""}
                                  max={new Date().toISOString().split("T")[0]}
                    />

                    {formik.touched.fecha_constitucion && formik.errors.fecha_constitucion ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.fecha_constitucion}</div>
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
                          className="btn btn-info font-size-sm w-100"
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

export default UserDatosFormStep2;