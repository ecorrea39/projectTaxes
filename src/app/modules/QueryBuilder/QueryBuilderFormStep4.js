import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import DataTable  from 'react-data-table-component';
import { FilterTwoTone, FilterOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import {useFormik} from "formik";
import "./QueryBuilder.css";
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const regexp = /^[a-zA-Z_]+$/;
const textLabelColor = {
  'color': '#5A5EFF',
};

const QueryBuilderFormStep4 = (props) => {
  const [initialValues, setInitialValues] = useState({
    tabla: "",
    clave: "",
    valor: "",
    funcion: "",
    args: "",
    alias: ""
  });

  const [dataMap, setDataMap] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [isAliasVisible, setIsAliasVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFunctionVisible, setIsFunctionVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [allTables, setAllTables] = useState([]);
  const [validFields, setValidFields] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);

  const customStyles = {
    rows: {
        style: {
            minHeight: '40px',
        }
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
  };
  const styleBtn = { borderRadius: '100%'};
  const sortIcon = <ArrowDownward />;
  const colTab = [
    {
        name: "Campo",
        selector: row => row.name,
        sortable: true,
        maxWidth: "740px"
    },
    {
        name: "Alias",
        selector: row => row.alias,
        sortable: true,
        maxWidth: "740px"
    },
    {
      name: "Tipo",
      selector: row => row.type,
      sortable: true,
      maxWidth: "740px"
    },
    {
        name: "Acciones",
        button: true,
        cell: row => (
            <>
            <a title="Definir alias" style={styleBtn} onClick={() => addAlias(row)}
                className="btn btn-icon btn-hover-light btn-sm">
                <span className='icon-alias'>
                    A
                </span>
            </a>

            <a title="Enlazar con lista" style={styleBtn}  onClick={() => addLista(row)}
                className="btn btn-icon btn-hover-light btn-sm mx-3">
                {row.list_table && <FilterTwoTone />}
                {!row.list_table && <FilterOutlined />}
            </a>
            
            <a title="Agregar función" style={styleBtn} onClick={() => addFunction(row)}
                className="btn btn-icon btn-hover-light btn-sm">
                <span className={`icon-function ${row.function ? 'icon-function-active' : 'icon-function-normal'}`}>
                    F(x)
                </span>
            </a>
            </>
        )
    }
  ];

  useEffect(() => {
    let camposCalificados = [];
    setAllTables(props.QueryFinal.tablas);

    const myMap = props.QueryFinal.mapa_campos.slice();

    if (myMap.length > 0) {
      camposCalificados = myMap.map(field => {
        return {
          rowId: field.rowId,
          table: field.table,
          field: field.field,
          name: field.name,
          type: field.type,
          alias: field.alias,
          ...(field.list_table && { list_table: field.list_table }),
          ...(field.function && { function: field.function })
        }
      });
    } else {
      const campos = props.QueryFinal.campos.slice();
      const esquema = props.QueryFinal.esquema.slice();
      let Index = 0;

      campos.forEach(campo => {
        const index = campo.split("-");
        if (campo.includes("-")) {
          for (let i = parseInt(index[0]); i <= parseInt(index[1]); i++) {
            const qName = `${esquema[i].table_name}.${esquema[i].column_name}`;
            camposCalificados.push({
              rowId: Index,
              table: esquema[i].table_name,
              field: esquema[i].column_name,
              name: qName,
              type: esquema[i].data_type,
              alias: ''
            });

            Index++;
          }
        } else {
          const qName = `${esquema[index[0]].table_name}.${esquema[index[0]].column_name}`;
          camposCalificados.push({
            rowId: Index,
            table: esquema[index[0]].table_name,
            field: esquema[index[0]].column_name,
            name: qName,
            type: esquema[index[0]].data_type,
            alias: ''
          });

          Index++;
        }
      });
    }

    setAllFields(camposCalificados);
  }, []);

  useEffect(() => {
    if (selectedRow && selectedRow.list_table) populateTables(selectedRow.list_table.table);
  }, [selectedRow]);

  const limitEntry = (event) => {
    if (event.key.search(regexp) === -1) event.preventDefault();
  }

  const addAlias = (row) => {
    setSelectedRow(row);

    if (row.alias != "") {
      formik.setFieldValue("alias", row.alias);
    } else {
      formik.setFieldValue("alias", "");
    }

    setIsAliasVisible(true);
  }

  const addAliasOk = () => {
    let tmp = allFields.slice();
    tmp[selectedRow.rowId].alias = formik.values.alias;

    setAllFields(tmp);
    setIsAliasVisible(false);
  }

  const addAliasCancel = () => {
    setIsAliasVisible(false);
  }

  const addLista = (row) => {
    setSelectedRow(row);

    if (row.list_table) {
      formik.setFieldValue("tabla", row.list_table.table);
      formik.setFieldValue("clave", row.list_table.key);
      formik.setFieldValue("valor", row.list_table.value);
    } else {
      formik.setFieldValue("tabla", "");
      formik.setFieldValue("clave", "");
      formik.setFieldValue("valor", "");
    }

    setIsModalVisible(true);
  }

  const populateTables = (tablename) => {
    const temp1 = props.QueryFinal.esquema.filter(column => column.table_name === tablename);
    const temp2 = temp1.filter(campo => campo.data_type === selectedRow.type);
    const temp3 = temp1.map(item => { return item.column_name });
    const temp4 = temp2.map(item => { return item.column_name });

    setAvailableFields(temp3);
    setValidFields(temp4)
  }

  const selectTable = (event) => {
    formik.setFieldValue("clave", "");
    formik.setFieldValue("valor", "");
    populateTables(event.target.value);
    formik.handleChange(event);
  }

  const addListaOk = () => {
    let tmp = allFields.slice();
    tmp[selectedRow.rowId].list_table = {
      table: formik.values.tabla,
      key: formik.values.clave,
      value: formik.values.valor
    }

    setAllFields(tmp);
    setIsModalVisible(false);
  };

  const addListaCancel = () => {
    setIsModalVisible(false);
  };

  const addFunction = (row) => {
    setSelectedRow(row);

    if (row.function) {
      formik.setFieldValue("funcion", row.function.name);
      formik.setFieldValue("args", row.function.args);
    } else {
      formik.setFieldValue("funcion", "");
      formik.setFieldValue("args", "");
    }

    setIsFunctionVisible(true);
  }

  const addFunctionOk = () => {
    let tmp = allFields.slice();
    tmp[selectedRow.rowId].function = {
      name: formik.values.funcion,
      args: formik.values.args
    }

    setAllFields(tmp);
    setIsFunctionVisible(false);
  }

  const addFunctionCancel = () => {
    setIsFunctionVisible(false);
  }

  const irAnterior = () => {
    props.cambiarFormularioActual(3, false);
  }

  const submitSiguiente = () => {
    let fullmap = allFields.map(field => {
      return {
        rowId: field.rowId,
        table: field.table,
        field: field.field,
        name: field.name,
        type: field.type,
        alias: field.alias,
        ...(field.list_table && { list_table: field.list_table }),
        ...(field.function && { function: field.function })
      }
    });

    const Alias = fullmap.map(item => { return item.alias });
    const isDuplicate = Alias.some((item, idx) => {
      return item && (Alias.indexOf(item) != idx);
    });

    if (isDuplicate) {
      alert('Existe(n) alias duplicado(s), los alias deben ser únicos');
    }
    else {
      setDataMap(fullmap);
      formik.submitForm();
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      props.CambiarQuery({
        mapa_campos: dataMap
      });

      props.cambiarFormularioActual(5, true);
    },
  });

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Mapeo de campos
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Modal title="Definir alias"
                visible={isAliasVisible} 
                onOk={addAliasOk}
                onCancel={addAliasCancel}
                okText="Aceptar"
                cancelText="Cancelar"
                width={600}
              >
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="alias">
                      <Form.Label style={textLabelColor}>Alias</Form.Label>
                      <Form.Control type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    onKeyPress={limitEntry}
                                    value={formik.values.alias}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal>

              <Modal title="Enlazar con lista"
                visible={isModalVisible} 
                onOk={addListaOk}
                onCancel={addListaCancel}
                okText="Aceptar"
                cancelText="Cancelar"
                width={800}
                okButtonProps={{disabled: formik.values.valor === ""}}
              >
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="tabla">
                      <Form.Label style={textLabelColor}>Tabla</Form.Label>
                      <Form.Control as="select"
                                    onChange={selectTable}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tabla}
                      >
                        <option disabled key="0" value="">Seleccione la tabla</option>

                        {allTables.map((elemento) =>
                          <option key={elemento} value={elemento}>{elemento}</option>
                        )}

                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="clave">
                      <Form.Label style={textLabelColor}>Clave</Form.Label>
                      <Form.Control as="select"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.clave}
                                    disabled={formik.values.tabla === ""}
                      >
                        <option disabled key="0" value="">Seleccione la clave</option>

                        {validFields.map((elemento) =>
                          <option key={elemento} value={elemento}>{elemento}</option>
                        )}

                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="valor">
                      <Form.Label style={textLabelColor}>Valor</Form.Label>
                      <Form.Control as="select"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.valor}
                                    disabled={formik.values.clave === ""}
                      >
                        <option disabled key="0" value="">Seleccione el valor</option>

                        {availableFields.map((elemento) =>
                          <option key={elemento} value={elemento}>{elemento}</option>
                        )}

                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal>

              <Modal title="Agregar función"
                visible={isFunctionVisible} 
                onOk={addFunctionOk}
                onCancel={addFunctionCancel}
                okText="Aceptar"
                cancelText="Cancelar"
                width={600}
                okButtonProps={{disabled: formik.values.funcion === ""}}
              >
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="funcion">
                      <Form.Label style={textLabelColor}>Función</Form.Label>
                      <Form.Control type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.funcion}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="args">
                      <Form.Label style={textLabelColor}>Argumentos</Form.Label>
                      <Form.Control as="textarea" rows="3" placeholder="Separe los argumentos con coma ,"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.args}
                                    disabled={formik.values.envoltura === "space" ||
                                    formik.values.funcion === ""}
                      >
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal>

              <Row>
                <Col md={12} className="table-frame">
                  <DataTable
                        columns={colTab}
                        data={allFields}
                        fixedHeader
                        fixedHeaderScrollHeight="500px"
                        sortIcon={sortIcon}
                        customStyles={customStyles}
                        responsive={true}
                        noDataComponent="Ocurrió un error preparando la data"
                  />
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
          </form>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default QueryBuilderFormStep4;