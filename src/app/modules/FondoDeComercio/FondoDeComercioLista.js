import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import DataTable from 'react-data-table-component';

const tableFondoDeComercioData = [
  {id: 1, razon_social: "Fondo 1", nombre_comercial: "Fondo Comercio 1"},
  {id: 2, razon_social: "Fondo 2", nombre_comercial: "Fondo Comercio 2"},
  {id: 3, razon_social: "Fondo 3", nombre_comercial: "Fondo Comercio 3"}
];

const columnas = [
  {
    name: "ID",
    selector: "id",
    sortable: true
  },
  {
    name: "Razón Social",
    selector: "razon_social",
    sortable: true,
    grow: 2
  },
  {
    name: "Nombre Comercial",
    selector: "nombre_comercial",
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(tableFondoDeComercioData);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
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