import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import './QueryRunner.css';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Query, Builder, Utils as QbUtils } from "react-awesome-query-builder";
import { JsonGroup, Config, ImmutableTree, BuilderProps } from "react-awesome-query-builder";
import AntdConfig from "react-awesome-query-builder/lib/config/antd";
import "antd/dist/antd.css";
import "react-awesome-query-builder/lib/css/styles.css";

const InitialConfig = AntdConfig;

const config = {
  ...InitialConfig,
  fields: {
    qty: {
      label: "Qty",
      type: "number",
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    price: {
      label: "Price",
      type: "number",
      valueSources: ["value"],
      fieldSettings: {
        min: 10,
        max: 100
      },
      preferWidgets: ["slider", "rangeslider"]
    },
    color: {
      label: "Color",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "orange", title: "Orange" }
        ]
      }
    },
    is_promotion: {
      label: "Promo?",
      type: "boolean",
      operators: ["equal"],
      valueSources: ["value"]
    }
  }
};

const queryValue = { id: QbUtils.uuid(), type: "group" };

const { confirm } = Modal;

const QueryRunnerStep2 = (props) => {
  const [queryData, setQueryData] = useState('');
  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config
  });

  useEffect(() => {
    setQueryData(props.queryData);
  }, [props.queryData]);

  const irAnterior = () => {
    props.cambiarFormularioActual(1);
  }

  const submitSiguiente = () => {
    //
  };

  const onCancel = () => {
    confirm({
      title: '¿Desea cancelar la ejecución de la consulta?',
      icon: <ExclamationCircleOutlined />,
      okText: "Abandonar",
      cancelText: "Volver",
      onOk() {
        props.regresar();
      },
    });
  };

  const onChange = (immutableTree, config) => {
    setState({ tree: immutableTree, config: config });

    const jsonTree = QbUtils.getTree(immutableTree);
  };

  const renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Filtros
        </Card.Title>
        <Card.Body>
          <form className="form fv-plugins-bootstrap fv-plugins-framework" >
            <Container>
              <Row>
                <Col md={12} className="query-header">
                  <div>Nombre: <b>{queryData.nombre}</b></div>
                  <div>Título: <b>{queryData.titulo}</b></div>
                  <div>Descripción: <b>{queryData.descripcion}</b></div>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={12}>
                <div>
                  <Query
                    {...config}
                    value={state.tree}
                    onChange={onChange}
                    renderBuilder={renderBuilder}
                  />
                  <div className="query-builder-result">
                    <div className="query-header">
                      SQL where:{" "}
                      <pre>
                        {JSON.stringify(QbUtils.sqlFormat(state.tree, state.config))}
                      </pre>
                    </div>
                  </div>
                </div>
                </Col>
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

export default QueryRunnerStep2;