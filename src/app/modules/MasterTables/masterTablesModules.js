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
            title = "Tabla de Trimestres";
            break;

        case "forma-pago":
            title = "Tabla de Forma de Pago ";
            break;

        case "cuentas-recaudadoras":
            title = "Tabla de Cuentas Recaudadoras";
            break;

        default:
            break;
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className={`card card-custom card-stretch gutter-b`}>
                    {/* Header */}
                    <div className="border-0 pl-10 pt-5">
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