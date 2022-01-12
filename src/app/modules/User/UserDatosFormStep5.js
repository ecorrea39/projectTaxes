import React, {useContext, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {useIntl} from "react-intl";
import axios from "axios";
import GeneralContext from "../../store/general-context";
import {useHistory} from "react-router-dom";

const UserDatosFormStep5 = (props) => {

  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const generalCtx = useContext(GeneralContext);

  const intl = useIntl();
  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const history = useHistory();

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  const irAnterior = () => {
    props.cambiarFormularioActual(4);
  }

  const finalizarRegistro = () => {

    enableLoading();

    const rif = localStorage.getItem('rif');

    let jsonAttributes = {};

    jsonAttributes["user_information_id"] = generalCtx.theIdUserInformacionProfile;

    const data = {
      jsonapi: {version: '1.0'},
      data: {
        type: "userManagerData",
        id: rif,
        attributes: jsonAttributes
      }
    };

    setSpinner(true);
    axios.post(`${API_URL}profile_summary/`, data, axiosConfig)
      .then(function (res) {

        // window.open(API_URL + 'reports/comprobante_inscripcion/' + generalCtx.theIdUserInformacionProfile,'_blank');

        disableLoading();

        history.replace('/dashboard');

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
        console.log("errUserDatosFormStep5", err);
        disableLoading();

        alert("Error en consulta de finalización");
      })
      .finally(() => {
        setSpinner(false);
    });
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  return (
    <Card bg="default" text="primary">
      <Card.Body>
        <Card.Title>
          Ficha de Registro
          {spinner && <Spinner animation="border" variant="danger" />}
        </Card.Title>
        <Card.Body>
          <Container>
            <Card.Subtitle>Datos de la Empresa</Card.Subtitle>

            <br/>
            <br/>

            <Row>
              <Col md={4}>
                <b>Razon Social</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.razon_social}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Nombre Comercial</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.nombre_comercial}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Clase De Empresa</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.clase_de_empresa}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Actividad Economica</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.actividad_economica}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Estatus</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.estatus}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Numero Patronal</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.numero_patronal}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Numero De Trabajadores</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.numero_de_trabajadores}
              </Col>
            </Row>

            <br/>
            <br/>

            <Card.Subtitle>Datos Mercantiles</Card.Subtitle>

            <br/>

            <Row>
              <Col md={4}>
                <b>Oficina</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.oficina}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Número De Documento</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.numero_de_documento}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Número De Tomo</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.numero_de_tomo}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Número De Folio</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.numero_de_folio}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Número De Protocolo</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.numero_de_protocolo}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Fecha Constitución</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.fecha_constitucion}
              </Col>
            </Row>

            <br/>
            <br/>

            <Card.Subtitle>Datos Geográficos</Card.Subtitle>

            <br/>

            <Row>
              <Col md={4}>
                <b>Domicilio Fiscal</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.domicilio_fiscal}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Estado</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.estado}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Municipio</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.municipio}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Parroquia</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.parroquia}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Ciudad</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.ciudad}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Sector</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.sector}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Sector Txxto</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.sector_texto}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Vialidad</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.vialidad}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Vialidad</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.vialidad_texto}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Edificación</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.edificacion}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Local</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.local}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Teléfono 1</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.codigo_telefono_compania1 + props.resumenFichaRegistro.numero_telefono_compania1}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Teléfono 2</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.codigo_telefono_compania2 + props.resumenFichaRegistro.numero_telefono_compania2}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Correo Empresa</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.correo_empresa}
              </Col>
            </Row>

            <br/>
            <br/>

            <Card.Subtitle>Datos Representante Legal</Card.Subtitle>

            <br/>

            <Row>
              <Col md={4}>
                <b>Cédula Representante Legal 1</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.cedulaLetra1}{props.resumenFichaRegistro.cedula_representante_legal1}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Nombre Representante Legal 1</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.nombre_representante_legal1}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Apellido Representante Legal 1</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.apellido_representante_legal1}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Teléfono Representante Legal 1</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.codigo_de_area_representante_legal1 + props.resumenFichaRegistro.telefono_representante_legal1}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Correo Electrónico Representante Legal 1</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.correo_electronico_representante_legal1}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Cargo Representante Legal 1</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.cargo_representante_legal1}
              </Col>
            </Row>

            <br/>

            <Row>
              <Col md={4}>
                <b>Cédula Representante Legal 2</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.cedulaLetra2}{props.resumenFichaRegistro.cedula_representante_legal2}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Nombre Representante Legal 2</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.nombre_representante_legal2}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Apellido Representante Legal 2</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.apellido_representante_legal2}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Teléfono 2</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.codigo_de_area_representante_legal2 + props.resumenFichaRegistro.telefono_representante_legal2}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Correo Electrónico Representante Legal 2</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.correo_electronico_representante_legal2}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Cargo Representante Legal 2</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.cargo_representante_legal2}
              </Col>
            </Row>

            <br/>

            <Row>
              <Col md={4}>
                <b>Cédula Representante Legal 3</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.cedulaLetra3}{props.resumenFichaRegistro.cedula_representante_legal3}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Nombre Representante Legal 3</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.nombre_representante_legal3}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Apellido Representante Legal 3</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.apellido_representante_legal3}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Teléfono 3</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.codigo_de_area_representante_legal3 + props.resumenFichaRegistro.telefono_representante_legal3}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Correo Electrónico Representante Legal 3</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.correo_electronico_representante_legal3}
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <b>Cargo Representante Legal 3</b>
              </Col>

              <Col md={8}>
                {props.resumenFichaRegistro.cargo_representante_legal3}
              </Col>
            </Row>

            <br/>
            <br/>

            <Row>
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
                        onClick={finalizarRegistro}
                >
                  Finalizar
                </Button>
                {spinner && <Spinner animation="border" variant="danger" />}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default UserDatosFormStep5;