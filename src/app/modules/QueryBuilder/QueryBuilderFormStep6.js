import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import "./QueryBuilder.css";
import { clientAxios, requestConfig } from '../../config/configAxios';
import Swal from "sweetalert2";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const join_transform = {
  inner: 'INNER JOIN',
  left: 'LEFT JOIN',
  right: 'RIGHT JOIN',
  outer: 'FULL OUTER JOIN'
}

const { confirm } = Modal;

const QueryBuilderFormStep6 = (props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const mapa_campos = props.QueryFinal.mapa_campos;
    const joins = props.QueryFinal.joins;
    const agrupar = props.QueryFinal.agrupar;
    const orden = props.QueryFinal.orden;
    const direccion = props.QueryFinal.direccion;

    let sql = 'SELECT ';

    for (let i = 0; i < mapa_campos.length; i++) {
      const campo = mapa_campos[i];

      if (campo.function) {
        sql += `${campo.function.name}(${campo.name}`;
        if (campo.function.args != '') sql += `, ${campo.function.args})`;
        else sql += `)`;
      } else {
        sql += campo.name;
      }
      
      if (campo.alias != '') sql += ` as ${campo.alias}`;

      if (i === mapa_campos.length - 1) {
        sql += ' FROM ';
      } else {
        sql += ', ';
      }
    }

    if (joins.length > 0) {
      sql += `${joins[0].left.split('.')[0]}`;
      joins.forEach(join => {
        sql += ` ${join_transform[join.type]} ${join.right.split('.')[0]} ON ${join.left}=${join.right}`;
      });
    } else {
      sql += `${mapa_campos[0].table}`;
    }

    for (let i = 0; i < agrupar.length; i++) {
      const groupField = mapa_campos.find(campo => campo.rowId === agrupar[i]);
      if (i === 0) sql += ' GROUP BY';
      sql += ` ${groupField.name}`;

      if (i < agrupar.length - 1) sql += ',';
    }

    for (let i = 0; i < orden.length; i++) {
      const orderField = mapa_campos.find(campo => campo.rowId === orden[i]);
      if (i === 0) sql += ' ORDER BY';
      sql += ` ${orderField.name} ${direccion}`;

      if (i < orden.length - 1) sql += ',';
    }

    setQuery(sql);
  }, []);

  const irAnterior = () => {
    props.cambiarFormularioActual(5, false);
  }

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

  const submitSiguiente = async () => {
    const valores = {
      nombre: props.QueryFinal.nombre,
      titulo: props.QueryFinal.titulo,
      descripcion: props.QueryFinal.descripcion,
      campos: props.QueryFinal.campos,
      mapa_campos: props.QueryFinal.mapa_campos,
      joins: props.QueryFinal.joins,
      agrupar: props.QueryFinal.agrupar,
      orden: props.QueryFinal.orden,
      direccion: props.QueryFinal.direccion
    };

    requestConfig.data.type = 'query';
    requestConfig.data.attributes = valores;
    requestConfig.data.id = (props.QueryFinal.editId >= 0) ? props.QueryFinal.editId : '';

    if (props.QueryFinal.editId < 0) {
        const respuesta = await clientAxios.post('/dynamic_query/query/', requestConfig);
    } else {
        const respuesta = await clientAxios.put('/dynamic_query/query/', requestConfig);
    }

    Swal.fire({
      title: "Resultado de la operación",
      text: "La consulta se guardó con éxito",
      icon: "success",
      timer: 1500
    }).then(() => {
      props.regresar();
    });
  }

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Resumen
        </Card.Title>
        <Card.Body>
          <Container><Row>
              <Col md={12} className="results-container">
                <div>Nombre: <b>{props.QueryFinal.nombre}</b></div>
                <div>Título: <b>{props.QueryFinal.titulo}</b></div>
                <div>Descripción: <b>{props.QueryFinal.descripcion}</b></div>
              </Col>
            </Row>

            <br/>

            <Row>
              <Col md={12} className="results-container">
                <div>{query}</div>
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
                  Finalizar
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default QueryBuilderFormStep6;