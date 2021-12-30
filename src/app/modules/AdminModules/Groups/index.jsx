import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BtnAddTable } from "../ModulesTable/btnAddtable";
import { CreateGroup } from "./createGroup";
import { DetailsGroup } from "./detailsGroup";
import { UserGroupsTable } from "./UserGropusTable";

export const GroupsModule = () => {

    const [title, setTitle] = useState("Grupos de usuarios");
    const { url, grupo_id } = useParams();
    
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
            case "detalles":
                    setTitle("Información del grupo");
                    setAction("details");
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
                        <BtnAddTable link={!url ? "/panel/grupos/crear-nuevo" : "/panel/grupos/"} icon={icon} />
                        
                        {
                            (action == "add" || action == "update") ? <CreateGroup action={action} /> 
                            : action == "details" ? <DetailsGroup grupoId={grupo_id} /> : <UserGroupsTable />
                        }

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