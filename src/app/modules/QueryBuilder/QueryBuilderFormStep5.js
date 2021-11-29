import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import { Transfer } from 'antd';
import "./QueryBuilder.css";

const aggregateFunctions = ['count', 'sum', 'avg', 'max', 'min'];

const QueryBuilderFormStep5 = (props) => {
  const [groupEnabled, setGroupEnabled] = useState(false);
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [btnVariant, setBtnVariant] = useState('success');
  const [forOrder, setforOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [orden, setOrden] = useState([]);
  const [forGrouping, setForGrouping] = useState([]);
  const [selectedGrouping, setSelectedGrouping] = useState([]);
  const [agrupar, setAgrupar] = useState([]);

  useEffect(() => {
    let availableForGroup = [];
    let availableForOrder = [];
    const myMap = props.QueryFinal.mapa_campos.slice();

    if (props.QueryFinal.agrupar.length > 0) {
      setAgrupar(props.QueryFinal.agrupar);
      myMap.forEach(field => {
        if (!props.QueryFinal.agrupar.includes(field.name)) {
          availableForGroup.push({
            key: field.rowId,
            name: field.name
          });
        }

        if (field.function && aggregateFunctions.includes(field.function.name.toLowerCase())) {
          setGroupEnabled(true);
        }
      });
    } else {
      myMap.forEach(field => {
        availableForGroup.push({
          key: field.rowId,
          name: field.name
        });

        if (field.function && aggregateFunctions.includes(field.function.name.toLowerCase())) {
          setGroupEnabled(true);
        }
      });
    }

    if (props.QueryFinal.orden.length > 0) {
      setOrden(props.QueryFinal.orden);
      availableForOrder = myMap.map(field => {
        if (!props.QueryFinal.orden.includes(field.name)) return {
          key: field.rowId,
          name: field.name
        }
      });

      if (props.QueryFinal.direccion === 'ASC') {
        setOrderDirection('ASC');
        setBtnVariant('success');
      }
      else {
        setOrderDirection('DESC');
        setBtnVariant('primary');
      }
    } else {
      availableForOrder = myMap.map(field => {return {
        key: field.rowId,
        name: field.name
      }});
    }

    setForGrouping(availableForGroup);
    setforOrder(availableForOrder);
  }, []);

  const onChangeGroup = (nextTargetKeys, direction, moveKeys) => {
    setAgrupar(nextTargetKeys)
  }

  const onSelectChangeGroup = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedGrouping([...sourceSelectedKeys, ...targetSelectedKeys]);
  }

  const onChangeOrder = (nextTargetKeys, direction, moveKeys) => {
    setOrden(nextTargetKeys)
  }

  const onSelectChangeOrder = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedOrder([...sourceSelectedKeys, ...targetSelectedKeys]);
  }

  const changeDirection = () => {
    if (orderDirection === 'ASC') {
      setOrderDirection('DESC');
      setBtnVariant('primary');
    }
    else {
      setOrderDirection('ASC');
      setBtnVariant('success');
    }
  }

  const irAnterior = () => {
    props.cambiarFormularioActual(4, false);
  }

  const submitSiguiente = () => {
    props.CambiarQuery({
      orden: orden,
      direccion: orderDirection,
      agrupar: agrupar
    });

    props.cambiarFormularioActual(6, true);
  }

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Agrupación y orden
        </Card.Title>
        <Card.Body>
          <Container>
            <Row>
              <Col md={12} className="transfer-container">
                <div className="transfer-labels">Agrupar por:</div>
                {groupEnabled && <div className="transfer-list">
                  <Transfer
                    className="transfer"
                    dataSource={forGrouping}
                    titles={['Disponibles', 'Seleccionados']}
                    listStyle={{width: 300, backgroundColor: 'white'}}
                    locale={{itemUnit: 'campo', itemsUnit: 'campos', notFoundContent: 'No agrupar'}}
                    operations={['Agrupar', 'Quitar']}
                    showSelectAll={false}
                    targetKeys={agrupar}
                    selectedKeys={selectedGrouping}
                    onChange={onChangeGroup}
                    onSelectChange={onSelectChangeGroup}
                    render={item => item.name}
                  />
                </div>}
                {!groupEnabled && <div className="transfer-no-data">Se requiere al menos una función de agregación para agrupar</div>}
              </Col>
            </Row>

            <Row>
              <Col md={12} className="transfer-container">
                <div className="transfer-labels">Ordenar por:</div>
                <div className="transfer-list">
                  <Transfer
                    className="transfer"
                    dataSource={forOrder}
                    titles={['Disponibles', 'Seleccionados']}
                    listStyle={{width: 300, backgroundColor: 'white'}}
                    locale={{itemUnit: 'campo', itemsUnit: 'campos', notFoundContent: 'No ordenar'}}
                    operations={['Ordenar', 'Quitar']}
                    showSelectAll={false}
                    targetKeys={orden}
                    selectedKeys={selectedOrder}
                    onChange={onChangeOrder}
                    onSelectChange={onSelectChangeOrder}
                    render={item => item.name}
                  />
                </div>
                <div className="order-container">
                  <Button className="order-button"
                    variant={btnVariant}
                    size="lg" block
                    type="button"
                    disabled={orden.length === 0}
                    onClick={changeDirection}
                  >
                    {orderDirection === 'ASC' && "Orden Ascendente"}
                    {orderDirection === 'DESC' && "Orden Descendente"}
                  </Button>
                </div>
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

export default QueryBuilderFormStep5;