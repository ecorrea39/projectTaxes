import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import "./QueryBuilder.css";
import axios from "axios";

const join_transform = {
  inner: 'INNER JOIN',
  left: 'LEFT JOIN',
  right: 'RIGHT JOIN',
  outer: 'FULL OUTER JOIN'
}

const QueryBuilderFormStep6 = (props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const mapa_campos = props.QueryFinal.mapa_campos;
    const tablas = props.QueryFinal.tablas;
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
      sql += `${tablas[0]}`;
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

  const submitSiguiente = () => {
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