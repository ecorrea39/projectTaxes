import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../../context/users/usersContext";
import Swal from "sweetalert2";
import { MyDataTable } from "../ModulesTable/MyDataTable";
import { ActionsTable } from "../ModulesTable/actionsTable";
import { SearchTable } from "../ModulesTable/searchTable";
import { Link, useHistory } from "react-router-dom";

export const UserTable = () => {

    const { getUserDetails, usersList, statusList, selectGroup,
        loadingTable, updateUserStatus, linkPrintInfoUser } = useContext(UsersContext);
    
    const [dataFilter, setDataFilter] = useState(usersList);

    let history = useHistory();

    const fiterData = (filterText) => {
        if(filterText != "") {
            let filter = usersList.filter(item =>
                item.attributes.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(filterText.toLowerCase())
                || item.attributes.alias.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(filterText.toLowerCase())
                || item.attributes.mail.toLowerCase().includes(filterText.toLowerCase())
            );
            setDataFilter(filter)
        } else {
            setDataFilter(usersList);
        }
    }

    const actionsDetails = async (row,url) => {
       await getUserDetails(row.id);
       history.push(`/panel/usuarios/${url}`);
    }

    const selectStatus = (id) => {
        let status = statusList.find(element => element.status == id );
        return status.name;
    }

    const alertNotice = (action,row) => {
        console.log(row)
        return (
            <>
            {
                Swal.fire({
                    title: `${action} usuario`,
                    text: `Esta seguro que desea ${action} el usuario ${row.nombre + " " + row.apellido}`,
                    icon: 'info',
                    showDenyButton: true,
                    denyButtonText: `Cancelar`,
                    confirmButtonText: 'Confirmar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        updateUserStatus({
                            name: row.attributes.name+" "+row.attributes.surname,
                            id_user:row.id,
                            status: !row.attributes.status ? 1 : 0
                        });
                    }
                })
            }
            </>
        )
    }

    const printInfo = (Userid) => {
        window.open( linkPrintInfoUser+Userid );
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
            with: "50px",
            cell: row => (
                <>{ 
                    // selectStatus(row.status)
                    row.attributes.status ? "Activo" : "Desactivado"
                }</>
            )
        },
        {
            name: 'Fecha de creación',
            selector: row => row.attributes.fecha_de_registro,
            sortable: true,
        },
        {
            name: 'Grupo asignado',
            selector: row => (
                <>
                {
                    <Link to={`/panel/grupos/detalles/${row.attributes['user_grupos_usuarios.grupo_id']}`}>
                       { selectGroup(row.attributes['user_grupos_usuarios.grupo_id']) }
                    </Link>
                }
                </>
            ),
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: row => (
                <ActionsTable
                    row={row}
                    handleDetails={actionsDetails}
                    handleAlertNotice={alertNotice}
                    handlePrintInfo={printInfo}
                    baseUrl={"/panel/usuarios/"}
                    actions={["details","update","status","print"]}
                    module={"user"} />
            )
        }
    ];

    useEffect(()=>{
        setDataFilter(usersList)
    },[usersList]);

    return (
        <>
            <SearchTable handleOnchange={fiterData} />

            <MyDataTable
                columns={columns}
                data={dataFilter}
                loadingTable={loadingTable}
            />
        </>
    )
}