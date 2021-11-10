import React, { useContext } from "react";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";
import TitleFormMasterTables from "./titleFormMasterTables";
import MasterTables from './masterTables'
import { useParams } from 'react-router-dom';

function MasterTablesModule() {

    const { tabla } = useParams();
    let title = "";

    switch (tabla) {
        case "trimestre":
            title = "Trimestres";
            break;

        case "forma-pago":
            title = "Formas de Pago";
            break;

        case "cuentas-recaudadoras":
            title = "Cuentas Recaudadoras";
            break;

        case "estatus-entidad-trabajo":
            title = "Estatus Entidad de Trabajo";
            break;

        case "clase-empresa":
            title = "Clases Entidad de Trabajo";
            break;

        case "bancos-recaudadores":
            title = "Bancos Recaudadores";
            break;

        case "motores-productivos":
            title = "Motores Productivos";
            break;

        case "actividad-economica":
            title = "Actividades Económicas";
            break;

        case "conceptos":
            title = "Conceptos";
            break;

        case "registros-mercantiles":
            title = "Registros Mercantiles";
            break;

        case "medida-valor":
            title = "Medida Valor";
            break;

        case "motivo-sancion":
            title = "Motivo de Sanción";
            break;

        default:
            break;
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className={`card card-custom card-stretch gutter-b`}>
                    {/* Header */}
                    <div className="border-0 pl-10 pt-10">
                        <TitleFormMasterTables title={title}/>
                    </div>
                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                        {
                            <MasterTables tabla={tabla} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MasterTablesModule;