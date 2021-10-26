import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from 'react-data-table-component';
import axios from "axios";

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

  const [pending, setPending] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {

    axios.get(`${API_URL}user_company/fondos/${rif}/`, axiosConfig)
      .then(function (res) {
        console.log("get_user_company_fondo_comercio::", res);

        let tableFondoDeComercioData = [];

        if (res.data.data != null) {

          tableFondoDeComercioData = res.data.data.map(elemData => {
            let id = elemData.id;
            let elemDataName = elemData.attributes.name;

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
      />

    </div>
  );
}

export default FondoDeComercioLista;