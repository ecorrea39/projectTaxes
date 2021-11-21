import React, { useContext, useState } from "react";
import GroupsContext from "../../../context/groups/groupsContext";
import { BtnAddTable } from "../ModulesTable/btnAddtable";
import { GroupsDataTable } from "./groupsDataTable";
import { ModalActionsGroups } from "./modalActionsGroups";
import { Redirect } from 'react-router-dom';

export const UserGroupsTable = ({url,}) => {

    const [showModal, setShowModal] = useState(false);
    // const [actionsModal, setActionsModal] = useState("");
    const { setGroupSlct } = useContext(GroupsContext);

    const handleOnclick = () => {
        // setActionsModal("add");
    }

    const actionsRow = (row) => {
        setGroupSlct(row);
        // setShowModal(true);
        // setActionsModal('update');
    }

    return (
        <>
            <div className="table-responsive">

                <GroupsDataTable actionsRow={actionsRow} />

            </div>
            {/* 
            <ModalActionsGroups
                size={"md"}
                centered={"centered"}
                show={showModal}
                onHide={() => setShowModal(false)}
                title={actionsModal == "add" ? "Crear Nuevo Grupo" : "Modificar Grupo"}
                action={actionsModal}
            />
            */}
        </>
    )
}