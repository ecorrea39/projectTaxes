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

        let status = statusList.find(element => element.status == id );
        return status.name;
    }

    const alertNotice = (action,row) => {

        return (
            <>
            { row.attributes.status == 0 || row.attributes.status == 1 ?
                Swal.fire({
                    title: `${action} grupo`,
                    text: `Esta seguro que desea ${action} el grupo ${row.attributes.name}`,
                    icon: 'info',
                    showDenyButton: true,
                    denyButtonText: `Cancelar`,
                    confirmButtonText: 'Confirmar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        let newStatus = !row.attributes.status;
                        updateStatus({id_group:row.id, name: row.attributes.name, status: newStatus });
                    }
                })

                :
                Swal.fire({
                    title: `Grupo ${action}`,
                    text: `El grupo ${row.attributes.name} se encuentra con status Deshabilitado. No requiere ninguna otra acción`,
                    icon: 'info'
                })
            }
            </>
        )
    }

    const columns = [
        {
            name: 'Nombre del grupo',
            selector: row => row.attributes.name,
            sortable: true,
        },
        {
            name: 'Fecha de creacion',
            selector: row => row.attributes.fecha,
            sortable: true,
        },
        {
            name: 'Cant. Usuarios Asignados',
            selector: row => row.attributes.cant_usuarios,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.attributes.status,
            sortable: true,
            cell: row => (
                <>{selectStatus(row.attributes.status)}</>
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