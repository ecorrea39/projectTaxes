import React, { useState } from "react";
import { useParams } from "react-router";
import { BtnAddTable } from "../ModulesTable/btnAddtable";
import { CreateGroup } from "./createGroup";
import { UserGroupsTable } from "./UserGropusTable";

export const GroupsModule = () => {

    const [title, setTitle] = useState("Grupos de usuarios");
    const { url } = useParams();
    const [action, setAction] = useState("");
    const [icon, setIcon] = useState("add");

    const ComponentAction = () => {
        switch(url) {
            case "crear-nuevo":
                setTitle("Crear Nuevo Grupo");
                setAction("add");
                setIcon("back");
                break;
            case "modificar":
                setTitle("Modificar Grupo");
                setAction("update");
                setIcon("back");
                break;
            default:
                setTitle("Grupos de usuarios");
                setAction("list");
                setIcon("add");
                break;
        }
        return (
            <div className={`card card-custom card-stretch gutter-b`}>
                {/* Header */}
                <div className="border-0 pl-10 pt-10">
                    <h3 className="font-weight-bolder ">{title}</h3>
                </div>
                {/* End Header */}

                {/* Body */}
                <div className="card-body d-flex flex-column">
                    <div className="tab-content">
                        <BtnAddTable link={!url ? "grupos/crear-nuevo" : "/panel/grupos"} icon={icon} />
                        { (url == "crear-nuevo" || url == "modificar") && <CreateGroup action={action} />}
                        {!url && <UserGroupsTable url={url} />}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <ComponentAction />
            </div>
        </div>
    )
}