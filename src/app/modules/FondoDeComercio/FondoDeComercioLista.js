import React, {useContext, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from 'react-data-table-component';
import axios from "axios";
import GeneralContext from "../../store/general-context";

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
  const [rows, setRows] = React.useState([]);

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

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

          setRows(tableFondoDeComercioData);
          setPending(false);
        }
      }).catch((err) => {

      console.log("errGetUserCompany_fondo_comercio", err);
      alert("Error buscando datos de la empresa del usuario")
    });
  }, []);

  return (
    <div className="table-responsive">

      <DataTable
        columns={columnas}
        data={rows}
        title="Fondos de Comercio"
        pagination
        paginationComponentOptions={paginationOptions}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        progressPending={pending}
        onRowClicked={onRowClicked}
      />

    </div>
  );
}

export default FondoDeComercioLista;