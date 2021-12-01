import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import { clientAxios, requestConfig } from '../../config/configAxios';
import './QueryRunner.css';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const QueryRunner = (props) => {
  const [queryData, setQueryData] = useState('');

  useEffect(() => {
    setQueryData(props.queryData);
  }, [props.queryData]);

  const irAnterior = () => {
    //
  };

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

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Ejecutar Consulta
        </Card.Title>
        <Card.Body>
          <Container><Row>
              <Col md={12} className="query-header">
                <div>Nombre: <b>{queryData.nombre}</b></div>
                <div>Título: <b>{queryData.titulo}</b></div>
                <div>Descripción: <b>{queryData.descripcion}</b></div>
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
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default QueryRunner;