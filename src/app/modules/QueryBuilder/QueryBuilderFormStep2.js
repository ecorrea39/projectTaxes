import React, {useEffect, useState, useRef, useContext} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import 'antd/dist/antd.css';
import "./QueryBuilder.css";
import { TreeSelect } from 'antd';
import axios from "axios";

const textLabelColor = {
  'color': '#5A5EFF',
};

const { SHOW_PARENT } = TreeSelect;

const QueryBuilderFormStep2 = (props) => {
  const [loading, setLoading] = useState(false);
  const [advance, setNext] = useState(false);

  const [value, setValue] = useState(undefined);
  const [tablesFields, setTablesFields] = useState([]);
  const [tables, setTables] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const token = localStorage.getItem('authToken');

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    enableLoading();

    //* TEMPORALMENTE DESHABILITADO
    // axios.get(`${API_URL}system_schema_data/`, axiosConfig)
    //   .then(function (res) {
    //     if (res.data.data != null) {
    //       let fieldsValuesArray = res.data.data.slice();
    //       setTablesFields(fieldsValuesArray);
    //     } else {
    //       alert("Error obteniendo la lista de campos");
    //     }

    //     disableLoading();
    //   }).catch((err) => {
    //   alert("Error obteniendo la lista de campos")
    //   disableLoading();
    // });
    // *********************************************************** //

    //* TEMPORALMENTE HASTA QUE ESTÉ EL BACKEND
    let fieldsValuesArray = [
      {table_name: "abonos", column_name: "createdAt", data_type: "timestamp with time zone"},
      {table_name: "abonos", column_name: "created_by", data_type: "integer"},
      {table_name: "abonos", column_name: "deudas_id", data_type: "integer"},
      {table_name: "abonos", column_name: "id", data_type: "integer"},
      {table_name: "abonos", column_name: "last_modified_by", data_type: "integer"},
      {table_name: "abonos", column_name: "monto", data_type: "numeric"},
      {table_name: "abonos", column_name: "pagos_id", data_type: "integer"},
      {table_name: "abonos", column_name: "updatedAt", data_type: "timestamp with time zone"},
      {table_name: "abonos", column_name: "users_id", data_type: "integer"},
      {table_name: "actas", column_name: "conceptos_id", data_type: "integer"},
      {table_name: "actas", column_name: "createdAt", data_type: "timestamp with time zone"},
      {table_name: "actas", column_name: "created_by", data_type: "integer"},
      {table_name: "actas", column_name: "deudas_id", data_type: "integer"},
      {table_name: "actas", column_name: "id", data_type: "integer"},
      {table_name: "actas", column_name: "last_modified_by", data_type: "integer"},
      {table_name: "actas", column_name: "notificacion_date", data_type: "timestamp with time zone"},
      {table_name: "actas", column_name: "pagos_id", data_type: "integer"},
      {table_name: "actas", column_name: "template_id", data_type: "integer"},
      {table_name: "actas", column_name: "updatedAt", data_type: "timestamp with time zone"},
      {table_name: "actas", column_name: "users_id", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "createdAt", data_type: "timestamp with time zone"},
      {table_name: "actas_asamblea", column_name: "created_by", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "fecha_protocolizacion", data_type: "timestamp with time zone"},
      {table_name: "actas_asamblea", column_name: "id", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "last_modified_by", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "numero_de_documento", data_type: "character varying"},
      {table_name: "actas_asamblea", column_name: "numero_de_folio", data_type: "character varying"},
      {table_name: "actas_asamblea", column_name: "numero_de_protocolo", data_type: "character varying"},
      {table_name: "actas_asamblea", column_name: "numero_de_tomo", data_type: "character varying"},
      {table_name: "actas_asamblea", column_name: "oficina", data_type: "integer"},
      {table_name: "actas_asamblea", column_name: "updatedAt", data_type: "timestamp with time zone"},
      {table_name: "actas_asamblea", column_name: "users_information_id", data_type: "integer"}
    ];
    // *********************************************************** //

    setTablesFields(fieldsValuesArray);

    let mappedData = [];
    let childrenData = [];
    let tablesNames = [];
    let currentTable = "";
    let startTable = 0;
    for (let i = 0; i < fieldsValuesArray.length; i++) {
      const field = fieldsValuesArray[i];
      if (i === 0) currentTable = field.table_name;

      if (currentTable != field.table_name) {
        mappedData.push({
          title: currentTable,
          value: `${startTable}-${i - 1}`,
          key: `${startTable}-${i - 1}`,
          children: childrenData.slice()
        });

        tablesNames.push(currentTable);

        childrenData = [];
        startTable = i;
        currentTable = field.table_name;
        childrenData.push({
          title: `${currentTable}.${field.column_name}`,
          value: i.toString(),
          key: i.toString(),
        });
      } else {
        childrenData.push({
          title: `${currentTable}.${field.column_name}`,
          value: i.toString(),
          key: i.toString(),
        });
      }

      if (i === fieldsValuesArray.length - 1) {
        mappedData.push({
          title: currentTable,
          value: `${startTable}-${i}`,
          key: `${startTable}-${i}`,
          children: childrenData.slice()
        });

        tablesNames.push(currentTable);
      }
    }

    setTreeData(mappedData);
    setTables(tablesNames);
    setValue(props.QueryFinal.campos ? props.QueryFinal.campos.slice() : undefined);
    setNext(props.QueryFinal.campos ? props.QueryFinal.campos.length > 0 : false);

    disableLoading();
  }, []);

  const irAnterior = () => {
    props.cambiarFormularioActual(1, false);
  }

  const submitSiguiente = () => {
    props.CambiarQuery({
      campos: value,
      esquema: tablesFields,
      tablas: tables
    });

    props.cambiarFormularioActual(3, true);
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const onTreeChange = (value) => {
    setValue(value);
    setNext(value.length > 0);
  };

  const tProps = {
    treeData,
    value: value,
    onChange: onTreeChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Por favor seleccione los campos',
    style: {
      width: '100%'
    }
  };

  return(
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Selección de campos
        </Card.Title>
        <Card.Body>
          <form
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Form.Label style={textLabelColor}>Campos:</Form.Label>
                <TreeSelect {...tProps} />
              </Row>

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
                          onClick={submitSiguiente}
                          disabled={!advance}
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

export default QueryBuilderFormStep2;