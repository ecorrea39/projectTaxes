import React, { useContext } from "react";
import DataTable, { createTheme } from 'react-data-table-component';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import GroupsContext from "../../../context/groups/groupsContext";
import { ActionsRowGroups } from "./actionsTableGroups";
import Swal from "sweetalert2";

export const GroupsDataTable = ({actionsRow}) => {

    const { userGroupsList, updateStatus } = useContext(GroupsContext);

    const alertNotice = (action,row) => {

        return (
            <>
            { row.status == 0 || row.status == 1 ?
                Swal.fire({
                    title: `${action} grupo`,
                    text: `Esta seguro que desea ${action} el grupo ${row.name}`,
                    icon: 'info',
                    showDenyButton: true,
                    denyButtonText: `Cancelar`,
                    confirmButtonText: 'Confirmar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        updateStatus({id_group:row.id, name: row.name, status: action == "Activar" ? "0" : "1"});
                    }
                })

                :
                Swal.fire({
                    title: `Grupo ${action}`,
                    text: `El grupo ${row.name} se encuentra con status Deshabilitado. No requiere ninguna otra acción`,
                    icon: 'info'
                })
            }
            </>
        )
    }

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

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

    const columns = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre del grupo',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Fecha de creacion',
            selector: row => row.fecha_creacion,
            sortable: true,
        },
        {
            name: 'Cant. Usuarios Asignados',
            selector: row => row.cant_usuarios,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            cell: row => (<>{row.status == 0 ? "Activo" : row.status == 1 ? "Desactivado" : "Deshabilitado" }</>)
        },
        {
            name: 'Acciones',
            button: true,
            cell: row => (
                <ActionsRowGroups row={row} actionsRow={actionsRow} alertNotice={alertNotice} />
            )
        }
    ];

    return (

        <>
            <DataTable
                columns={columns}
                data={userGroupsList}
                fixedHeader
                fixedHeaderScrollHeight="500px"
                customStyles={customStyles}
                responsive={true}
                sortIcon={<ArrowDownward />}
                pagination
                paginationComponentOptions={paginationOptions}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 25, 50]}
                noDataComponent="No existen datos para mostrar"
            />
        </>
    )
}