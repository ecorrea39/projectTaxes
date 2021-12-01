import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import 'antd/dist/antd.css';
import "./QueryBuilder.css";
import { TreeSelect } from 'antd';
import { clientAxios } from '../../config/configAxios';
import Swal from "sweetalert2";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const textLabelColor = {
  'color': '#5A5EFF',
};

const { confirm } = Modal;

const { SHOW_PARENT } = TreeSelect;

const QueryBuilderFormStep2 = (props) => {
  const [loading, setLoading] = useState(false);
  const [advance, setNext] = useState(false);

  const [value, setValue] = useState(undefined);
  const [tablesFields, setTablesFields] = useState([]);
  const [tables, setTables] = useState([]);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    enableLoading();

    let fieldsValuesArray = [];

    const fetchData = async () => {
      try {
        const respuesta = await clientAxios.get('/dynamic_query/schema/');
        fieldsValuesArray = await respuesta.data.data.map(data => {
          return data.attributes;
        });

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
      } catch (error) {
        console.log(error);
        disableLoading();
        Swal.fire({
          title: "Resultado de la operación",
          text: "Ocurrió un error obteniendo la data",
          icon: "error",
          timer: 1500
        }).then(() => {
          return;
        });
      }
    }

    fetchData();
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

  const onCancel = () => {
    confirm({
      title: '¿Desea cancelar la creación de la consulta?',
      icon: <ExclamationCircleOutlined />,
      content: 'Se perderán todos los datos',
      okText: "Abandonar",
      cancelText: "Volver",
      onOk() {
        props.regresar();
      },
    });
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
                <Col md={2}>
                  <Button variant="danger" size="lg" block
                          type="button"
                          onClick={onCancel}
                  >
                    Cancelar
                  </Button>
                </Col>
                <Col md={5}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={irAnterior}
                  >
                    Anterior
                  </Button>
                </Col>
                <Col md={5}>
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