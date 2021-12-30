import React, { useEffect, useState } from "react";
import { BtnAddTable } from "../ModulesTable/btnAddtable";
import { CreateUser } from "./createUser";
import { UserTable } from "./userTable";
import { useParams } from "react-router";
import { DetailsUser } from "./detailsUser";
import { useHistory } from "react-router-dom";

export const UsersModule = () => {
    
    const [title, setTitle] = useState("Grupos de usuarios");
    const { url } = useParams();
    const [action, setAction] = useState("");
    const [icon, setIcon] = useState("add");
    let history = useHistory();

    const ComponentAction = () => {
        switch(url) {
            case "crear-nuevo":
                setTitle("Crear Nuevo Usuario");
                setAction("add");
                setIcon("back");
                break;
            case "modificar":
                setTitle("Modificar Usuario");
                setAction("update");
                setIcon("back");
                break;
            case "detalles":
                setTitle("Información del usuario");
                setAction("details");
                setIcon("back");
                break;
            default:
                setTitle("Lista de usuarios");
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
                        <BtnAddTable link={!url ? "/panel/usuarios/crear-nuevo" : "/panel/usuarios/"} icon={icon} />
                        {
                            (action == "add" || action == "update") ? <CreateUser action={action} /> 
                            : action == "details" ? <DetailsUser /> : <UserTable />
                        }
                    </div>
                </div>
            </div>
        )
    }

    useEffect(()=>{
        if(url == "detalles") {
            history.push("/panel/usuarios/");
        }
    },[]);

    return (
        <div className="row">
            <div className="col-lg-12">
                <ComponentAction />
            </div>
        </div>
    )
}