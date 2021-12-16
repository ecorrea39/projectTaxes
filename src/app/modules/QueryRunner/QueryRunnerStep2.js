import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import './QueryRunner.css';
import { Modal } from 'antd';
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Query, Builder, Utils as QbUtils } from "react-awesome-query-builder";
import { clientAxios, requestConfig } from '../../config/configAxios';
import "./raqb-styles.scss"
import { type_map, widget_map, operator_map } from './maps';
import { InitialConfig } from './settings';
import AuthContext from "../../store/auth-context";
import jwt_decode from "jwt-decode";

const queryValue = { id: QbUtils.uuid(), type: "group" };
const { confirm } = Modal;

const QueryRunnerStep2 = (props) => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [uUid, setUUid] = useState(undefined);
  const [queryData, setQueryData] = useState('');
  const [filters, setFilters] = useState({});
  const [config, setConfig] = useState({ ...InitialConfig, fields: {} });
  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config
  });

  useEffect(() => {
    enableLoading();

    setQueryData(props.queryData);
    const myMap = props.queryData.mapa_campos.slice();
    let listas = [];

    myMap.forEach(campo => {
      if (campo.list_table) {
        listas.push({
          rowId: campo.rowId,
          table: campo.list_table.table,
          key: campo.list_table.key,
          value: campo.list_table.value
        });
      }
    });

    getLists(listas);
  }, [props.queryData]);

  useEffect(() => {
    if (uUid) {
      const uukey = `${uUid}_${queryData.id}`;
      const filtersStr = localStorage.getItem(uukey);
      if (filtersStr) {
        setState({
          tree: QbUtils.checkTree(QbUtils.loadTree(JSON.parse(filtersStr)), config),
          config: config
        });
      }
    }
  }, [uUid]);

  const mapType = (type, has_list) => {
    if (has_list) return 'select';
    if (!type_map[type]) return 'text';
    return type_map[type];
  }

  const mapOperator = (type, has_list) => {
    if (has_list) return ['select_equals', 'select_not_equals', 'select_any_in', 'select_not_any_in', 'is_null', 'is_not_null'];
    if (!operator_map[type]) return undefined;
    return operator_map[type];
  }

  const mapWidget = (type, has_list) => {
    if (has_list) return ['select'];
    if (!widget_map[type]) return undefined;
    return widget_map[type];
  }

  const getLists = async (lists) => {
    requestConfig.data.type = 'query';
    requestConfig.data.attributes = { listas: lists };
    requestConfig.data.id = '';
    const myMap = props.queryData.mapa_campos.slice();
    let linkedLists = [];
    let fields = {};

    if (lists.length > 0) {
      const respuesta = await clientAxios.post('/dynamic_query/lists/', requestConfig);
      linkedLists = respuesta.data.data.attributes.listas;
    }

    myMap.forEach(campo => {
      const name = campo.alias != '' ? campo.alias : campo.name;
      const hasList = campo.list_table ? true : false;
      const tipo = campo.function ? campo.function.dataType : campo.type;
      let settings = undefined;

      if (hasList) {
        const mylist = linkedLists.find(lista => lista.rowId === campo.rowId);
        const listValues = mylist.recordset.map(valores => {
          return {
            value: valores.key,
            title: valores.value
          }
        });

        settings = {
          listValues: listValues
        };
      }

      const operators = mapOperator(tipo, hasList);
      const widgets = mapWidget(tipo, hasList);

      const thisField = {
        label: name,
        type: mapType(tipo, hasList),
        ...(settings && { fieldSettings: settings }),
        ...(operators && { operators: operators }),
        ...(widgets && { preferWidgets: widgets })
      };

      fields[campo.name] = thisField;
    });

    setConfig({ ...InitialConfig, fields: fields });

    const token = authCtx.token;
    const decoded = jwt_decode(token);
    if (decoded && decoded.data) setUUid(decoded.data.uid);

    disableLoading();
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const irAnterior = () => {
    props.cambiarFormularioActual(1);
  }

  const submitSiguiente = () => {
    const where = QbUtils.sqlFormat(state.tree, state.config);

    if (uUid) {
      const uukey = `${uUid}_${queryData.id}`;
      if (!where && localStorage.getItem(uukey)) localStorage.removeItem(uukey);
      if (where) {
        const filtersStr = JSON.stringify(filters);
        localStorage.setItem(uukey, filtersStr);
      }
    }

    props.CambiarQuery({
      where: where ? where : ''
    });

    props.cambiarFormularioActual(3);
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

  const onClear = () => {
    confirm({
      title: '¿Seguro que desea eliminar todos los filtros?',
      icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
      okText: "Eliminar",
      cancelText: "Volver",
      okButtonProps: {
        type: 'primary',
        danger: true
      },
      onOk() {
        setState({ tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config), config: config });
      },
    });
  }

  const onChange = (immutableTree, config) => {
    setState({ tree: immutableTree, config: config });

    const jsonTree = QbUtils.getTree(immutableTree);
    setFilters(jsonTree);
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
                <div className="clear-button">
                  <Col md={2}>
                    <Button variant="primary" size="lg" block
                      type="button"
                      onClick={onClear}
                      disabled={!QbUtils.sqlFormat(state.tree, state.config)}
                    >
                      Limpiar
                    </Button>
                  </Col>
                </div>
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
                  <div className="query-builder-result" hidden={!QbUtils.sqlFormat(state.tree, state.config)}>
                    <div className="query-builder-title">WHERE:</div>
                    <div className="query-builder-body">
                      {JSON.stringify(QbUtils.sqlFormat(state.tree, state.config))}
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