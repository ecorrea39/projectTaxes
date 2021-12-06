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
            title = "Conceptos de Pago";
            break;

        case "registros-mercantiles":
            title = "Registros Mercantiles";
            break;

        case "medida-valor":
            title = "Medida Valor";
            break;

        case "motivo-sancion":
            title = "Motivos de Sanción";
            break;

        case "dias-festivos":
            title = "Días Inhábiles";
            break;

        case "tasa-intereses":
            title = "Tasa de Intereses";
            break;

        case "sectores":
            title = "Sectores";
            break;

        case "vialidades":
            title = "Vialidades";
            break;

        case "locales":
            title = "Nomenclatura";
            break;

        case "edificaciones":
            title = "Edificaciones";
            break;

        case "tipo-documentos":
            title = "Tipo de Documentos";
            break;

        case "tipo-contribuyente":
            title = "Tipo de Contribuyentes";
            break;

        case "cuentas-contables":
            title = "Cuentas Contables";
            break;

        case "firmas-autorizadas":
            title = "Firmas Autorizadas";
            break;

        case "estados":
            title = "Estados";
            break;

        case "municipios":
            title = "Municipios";
            break;

        case "parroquias":
            title = "Parroquías";
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
                        <TitleFormMasterTables title={title} />
                    </div>
                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                        {
                            <MasterTables
                                tabla={tabla}
                                titulo={title} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MasterTablesModule;