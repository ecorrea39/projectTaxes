import React, { useContext, useState } from "react";
import UsersContext from "../../../context/users/usersContext";
import Swal from "sweetalert2";
import { MyDataTable } from "../ModulesTable/MyDataTable";
import { ActionsTable } from "../ModulesTable/actionsTable";

export const UserTable = () => {

    const { setUserSlct, usersList, statusList, loadingTable, updateUserStatus, printInfoUser } = useContext(UsersContext);

    const actionsRow = (row) => {
        setUserSlct(row);
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
                    title: `${action} usuario`,
                    text: `Esta seguro que desea ${action} el usuario ${row.nombre + " " + row.apellido}`,
                    icon: 'info',
                    showDenyButton: true,
                    denyButtonText: `Cancelar`,
                    confirmButtonText: 'Confirmar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        updateUserStatus({id_guser:row.id, status: action == "Activar" ? "0" : "1"});
                    }
                })

                :
                Swal.fire({
                    title: `Usuario ${action}`,
                    text: `El usuario ${row.nombre + " " + row.apellido} se encuentra con status Deshabilitado. No requiere ninguna otra acción`,
                    icon: 'info'
                })
            }
            </>
        )
    }

    const printInfo = (Userid) => {
        printInfoUser({user_id: Userid});
    }

    const columns = [
        {
            name: 'Nombre y Apellido',
            selector: row => row.attributes.name + " " + row.attributes.surname,
            sortable: true,
        },
        {
            name: 'Usuario',
            selector: row => row.attributes.alias,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.attributes.mail,
            sortable: true,
        },
        {
            name: 'Status',
            sortable: true,
            cell: row => (
                <>{ 
                    // selectStatus(row.status)
                    row.attributes.status ? "Activo" : "Desactivado"
                }</>
            )
        },
        {
            name: 'Fecha de creación',
            selector: row => row.attributes.fecha_creacion,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: row => (
                <ActionsTable
                    row={row}
                    handleActionsRow={actionsRow}
                    handleAlertNotice={alertNotice}
                    handlePrintInfo={printInfo}
                    baseUrl={"/panel/usuarios/"}
                    actions={["details","update","status","print"]}
                    module={"user"} />
            )
        }
    ];

    return (
        <div className="table-responsive">
            <MyDataTable
                actionsRow={actionsRow}
                columns={columns}
                data={usersList}
                loadingTable={loadingTable}
            />
        </div>
    )
}