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
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [initialValues, setInitialValues] = useState({
    tabla: "",
    clave: "",
    valor: "",
    funcion: "",
    args: ""
  });
  const [dataMap, setDataMap] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFunctionVisible, setIsFunctionVisible] = useState(false);
  const [dataType, setDataType] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
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
        selector: row => row.alias
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
      //Formik simplemente ignora los valores iniciales
      let initObject = {
        tabla: "",
        clave: "",
        valor: "",
        funcion: "",
        args: ""
      };

      myMap.forEach(field => {
        if (field.alias) initObject[`${field.table}_${field.field}`] = field.alias;
      });
      //

      camposCalificados = myMap.map(field => {
        return {
          rowId: field.rowId,
          table: field.table,
          field: field.field,
          name: field.name,
          type: field.type,
          alias: 
            <input id={`${field.name.replace('.', '_')}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyPress={limitEntry}
              value={formik.values[`${field.name.replace('.', '_')}`]}
            />,
          ...(field.list_table && { list_table: field.list_table }),
          ...(field.function && { function: field.function })
        }
      });

      setInitialValues(initObject);
    } else {
      const campos = props.QueryFinal.campos.slice();
      const esquema = props.QueryFinal.esquema.slice();
      let Index = 0;

      campos.forEach(campo => {
        const index = campo.split("-");
        if (campo.includes("-")) {
          for (let i = parseInt(index[0]); i <= parseInt(index[1]); i++) {
            const qName = `${esquema[i].table_name}.${esquema[i].column_name}`;
            const fName = `${esquema[i].table_name}_${esquema[i].column_name}`;
            camposCalificados.push({
              rowId: Index,
              table: esquema[i].table_name,
              field: esquema[i].column_name,
              name: qName,
              type: esquema[i].data_type,
              alias: 
                <input id={`${fName}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onKeyPress={limitEntry}
                  value={formik.values[fName]} 
                />
            });

            Index++;
          }
        } else {
          const qName = `${esquema[index[0]].table_name}.${esquema[index[0]].column_name}`;
          const fName = `${esquema[index[0]].table_name}_${esquema[index[0]].column_name}`;
          camposCalificados.push({
            rowId: Index,
            table: esquema[index[0]].table_name,
            field: esquema[index[0]].column_name,
            name: qName,
            type: esquema[index[0]].data_type,
            alias: 
              <input id={`${fName}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyPress={limitEntry}
                value={formik.values[fName]} 
              />
          });

          Index++;
        }
      });
    }

    setAllFields(camposCalificados);
  }, []);

  const limitEntry = (event) => {
    if (event.key.search(regexp) === -1) event.preventDefault();
  }

  const addLista = (row) => {
    setDataType(row.type);
    setSelectedId(row.rowId);

    if (row.list_table) {
      populateTables(row.list_table.table);

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
    const temp2 = temp1.filter(campo => campo.data_type === dataType);
    const temp3 = temp1.map(item => { return item.column_name });
    const temp4 = temp2.map(item => { return item.column_name });

    setAvailableFields(temp3);
    setValidFields(temp4)
  }

  const selectTable = (event) => {
    populateTables(event.target.value);
    formik.handleChange(event);
  }

  const addListaOk = () => {
    let tmp = allFields.slice();
    tmp[selectedId].list_table = {
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
    setSelectedId(row.rowId);

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
    tmp[selectedId].function = {
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
    const values = formik.values;

    let fullmap = allFields.map(field => {
      const alias = values[`${field.table}_${field.field}`] ? 
        values[`${field.table}_${field.field}`] : "";

      return {
        rowId: field.rowId,
        table: field.table,
        field: field.field,
        name: field.name,
        type: field.type,
        alias: alias,
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