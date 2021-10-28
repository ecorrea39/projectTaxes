import React, {useContext, useEffect, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from 'react-data-table-component';
import axios from "axios";
import GeneralContext from "../../store/general-context";
import {Button, Card, Col, Container, Dropdown, DropdownButton, Form, Row, SplitButton} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const columnas = [
  {
    name: "ID",
    selector: row => row.id,
    sortable: true
  },
  {
    name: "Razón Social",
    selector: row => row.razon_social,
    sortable: true,
    grow: 2
  },
  {
    name: "Nombre Comercial",
    selector: row => row.nombre_comercial,
    sortable: true,
    right: true
  }
];

const paginationOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

const FondoDeComercioLista = (props) => {

  const generalCtx = useContext(GeneralContext);

  const [pending, setPending] = React.useState(true);
  const [rowsData, setRowsData] = React.useState([]);

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const history = useHistory();

  const onRowClicked = (row, event) => {

    if (window.confirm("Deseas editar: " + row.razon_social + "?")) {
      generalCtx.iniIdUserInformacion(row.id);
      generalCtx.iniRazonSocial(row.razon_social);
      generalCtx.iniTipoDeEmpresa("FONDO COMERCIO");
    }
  };

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  const verificarTipoDeEmpresa = (elemento) => {
    if (elemento.attributes.tipo == "FONDO COMERCIO") {
      return true;
    }
  };

  const handleClickCrear = () => {

    const tipoIdentificacion = rif.substring(0, 1);
    if (tipoIdentificacion == 'v' || tipoIdentificacion == 'e') {
      if (rowsData.length < 3) {
        history.replace('/crearfondocomercio');
      } else {
        alert("No puede crear más Fondos de Comercio (Máximo 3)");
      }
    } else {
      alert("Solo los naturales o extranjeros pueden crear fondos de comercio");
    }
  };

  useEffect(() => {

    axios.get(`${API_URL}user_company/fondos/${rif}/`, axiosConfig)
      .then(function (res) {
        console.log("get_user_company_fondo_comercio::", res);

        let tableFondoDeComercioData = [];

        if (res.data.data != null) {

          tableFondoDeComercioData = res.data.data.filter(verificarTipoDeEmpresa).map(elemData => {

            let rObj = {
              "id": elemData.id,
              "razon_social": elemData.attributes.razon_social,
              "nombre_comercial": elemData.attributes.nombre_comercial
            };

            return rObj;
          });

          setRowsData(tableFondoDeComercioData);
          setPending(false);
        }
      }).catch((err) => {

      console.log("errGetUserCompany_fondo_comercio", err);
      alert("Error buscando datos de la empresa del usuario")
    });
  }, []);

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleEditar = () => {

      if (window.confirm(`Deseas editar la empresa:\r ${selectedRows.map(r => r.razon_social)}?`)) {
        setToggleCleared(!toggleCleared);
        // setRows(differenceBy(data, selectedRows, 'title'));
      }
    };

    return (
      <Button key="edit" onClick={handleEditar} style={{backgroundColor: 'red'}} icon>
        Editar
      </Button>
    );
  }, [rowsData, selectedRows, toggleCleared]);

  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <Button key="crear" onClick={handleClickCrear} style={{backgroundColor: 'default'}} icon>
            Crear
          </Button>
        </Col>
      </Row>

      <Card bg="default" text="success">
        <Card.Body>
          <div className="table-responsive">
            <DataTable
              columns={columnas}
              data={rowsData}
              title="Fondos de Comercio"
              pagination
              paginationComponentOptions={paginationOptions}
              fixedHeader
              fixedHeaderScrollHeight="600px"
              progressPending={pending}
              // onRowClicked={onRowClicked}
              selectableRows={true}
              selectableRowsSingle={true}
              selectableRowsHighlight={true}
              contextActions={contextActions}
              onSelectedRowsChange={handleRowSelected}
            />
          </div>
        </Card.Body>
      </Card>


    </Fragment>
  );
}

export default FondoDeComercioLista;