import React, { useContext, useState } from "react";
import GroupsContext from "../../../context/groups/groupsContext";
import { MyDataTable } from "../ModulesTable/MyDataTable";
import { ActionsTable } from "../ModulesTable/actionsTable";
import Swal from "sweetalert2";

export const UserGroupsTable = ({url}) => {

    const { loadingTable, setGroupSlct, userGroupsList, updateStatus, statusList } = useContext(GroupsContext);

    const actionsRow = (row) => {
        setGroupSlct(row);
    }

    const selectStatus = (id) => {
        let statusName = statusList.find(element => element.status === id );
        return statusName.name;
    }

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

    const columns = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: '50px'
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
            cell: row => (
                <>{selectStatus(row.status)}</>
            )
        },
        {
            name: 'Acciones',
            button: true,
            cell: row => (
                <ActionsTable
                    row={row}
                    actionsRow={actionsRow}
                    alertNotice={alertNotice}
                    urlUpdate={"/panel/grupos/modificar"}
                />
            )
        }
    ];

    return (
        <div className="table-responsive">

            <MyDataTable
                actionsRow={actionsRow}
                columns={columns}
                data={userGroupsList}
                loadingTable={loadingTable}
            />

        </div>
    )
}