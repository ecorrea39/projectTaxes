import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";

const listaCodCelular = () => {
  const array = [
    { "id": "1", "code": "0416", "name": "0416" },
    { "id": "2", "code": "0426", "name": "0426" },
    { "id": "3", "code": "0414", "name": "0414" },
    { "id": "4", "code": "0424", "name": "0424" },
    { "id": "5", "code": "0412", "name": "0412" }
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

const UserDatosFormStep3 = (props) => {

  const initialValues = {
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
  };

  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState([]);
  const [municipiosTotales, setMunicipiosTotales] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [parroquiasTotales, setParroquiasTotales] = useState([]);
  const [parroquias, setParroquias] = useState([]);

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

        cargaDeParroquias().then((resolvedValueMunicipios) => {
          console.log("resolvedValueMunicipios", resolvedValueMunicipios);




        }, (error) => {
          console.log("cargaDeMunicipiosFallido", error);
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

            console.log("rObjCargaDeEstados", rObj);

            return rObj;
          });

          estadosArray.sort((a, b) => a.name < b.name ? -1 : 1);
          console.log("estadosArray", estadosArray);
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
            let id = elemData.attributes.cod_municipio + '-' + elemData.attributes.id_estado;;
            let elemDataName = elemData.attributes.descripcion;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            console.log("rObjCargaDeMunicipios", rObj);

            return rObj;
          });

          municipiosArray.sort((a, b) => a.name < b.name ? -1 : 1);
          console.log("municipiosArray", municipiosArray);
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
            let id = elemData.id + '-' + elemData.attributes.id_municipio;;
            let elemDataName = elemData.attributes.descripcion;

            let rObj = {
              "id": id,
              "name": elemDataName
            };

            console.log("rObjCargaDeParroquias", rObj);

            return rObj;
          });

          parroquiasArray.sort((a, b) => a.name < b.name ? -1 : 1);
          console.log("parroquiasArray", parroquiasArray);
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
          let municipioArray = municipio.id.split('-');

          if (municipioArray[1] == event.target.value) {
            return true;
          } else {
            return false;
          }
        }
      })
    );
  }

  const handleChangeFiltrarParroquias = (event) => {

    console.log("event.target.valueParroquias", event.target.value);

    formik.values.municipio = event.target.value;

    setParroquias(
      parroquiasTotales.filter((parroquia) => {

        if (event.target.value == "") {
          return true;
        } else {
          let parroquiaArray = parroquia.id.split('-');

          let municipioArray = event.target.value.split('-');

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

  const LoginSchema = Yup.object().shape({

    domicilio_fiscal: Yup.string()
      .min(8,
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
    local: Yup.string()
      .min(8,
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
        }, {max: 8})
        , val => !val || (val && (val.toString().length == 8)))
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
        }, {max: 8})
        , val => !val || (val && (val.toString().length == 8)))
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
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      setSubmitting(true);
      enableLoading();

      console.log("values", formik.values);
      // console.log("location.search", location.search);

      setSubmitting(false);
      disableLoading();
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
                    <Form.Control size="lg" type="text" placeholder="Domicilio Fiscal"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.domicilio_fiscal}
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
                    <Form.Control as="select"
                                  onChange={handleChangeFiltrarMunicipios}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.estado}
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
                    <Form.Control as="select"
                                  onChange={handleChangeFiltrarParroquias}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.municipio}
                    >
                      <option key="0" value="">Seleccione el Municipio</option>

                      {municipios.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.parroquia}
                    >
                      <option key="0" value="">Seleccione el Parroquia</option>

                      {parroquias.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
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
                  <Form.Group as={Col} controlId="ciudad">
                    <Form.Control size="lg" type="text" placeholder="Ciudad"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.ciudad}
                    />

                    {formik.touched.ciudad && formik.errors.ciudad ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.ciudad}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="sector">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.sector}
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.vialidad}
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.edificacion}
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
                    <Form.Control size="lg" type="text" placeholder="Local"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.local}
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_telefono_compania1}
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
                    <Form.Control size="lg" type="text" placeholder="Telefono 1"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_telefono_compania1}
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
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.codigo_telefono_compania2}
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
                    <Form.Control size="lg" type="text" placeholder="Telefono 2"
                                  onChange={customHandleChangeNumeroDeTelefono2}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_telefono_compania2}
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
                    <Form.Control size="lg" type="text" placeholder="Correo Electrónico"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.correo_empresa}
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