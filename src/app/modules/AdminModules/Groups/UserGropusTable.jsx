import React, { useContext, useEffect, useState } from "react";
import GroupsContext from "../../../context/groups/groupsContext";
import { MyDataTable } from "../ModulesTable/MyDataTable";
import { ActionsTable } from "../ModulesTable/actionsTable";
import Swal from "sweetalert2";
import { SearchTable } from "../ModulesTable/searchTable";
import { useHistory } from "react-router-dom";

export const UserGroupsTable = ({url}) => {

    const { getGroupDetails,setGroupSlct, loadingTable, userGroupsList, updateStatus, statusList } = useContext(GroupsContext);

    const [dataFilter, setDataFilter] = useState(userGroupsList);

    let history = useHistory();

    const actionsDetails = async (row,url) => {
        setGroupSlct(row);
        // deshabilitado por un bug en el formulario
        //await getGroupDetails(row.id);
        //history.push(`/panel/grupos/${url}`);
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
                    handleDetails={actionsDetails}
                    handleAlertNotice={alertNotice}
                    baseUrl={"/panel/grupos/"}
                    actions={["update","status"]}
                />
            )
        }
    ];

    const fiterData = (filterText) => {
        if(filterText != "") {
            let filter = userGroupsList.filter(item =>
                item.attributes.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(filterText.toLowerCase())
            );
            setDataFilter(filter)
        } else {
            setDataFilter(userGroupsList);
        }
    }

    useEffect(()=>{
        setDataFilter(userGroupsList)
    },[userGroupsList]);

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