import React, { useContext } from "react";
import FusionarEmpresasContext from "../../context/fusionarEmpresas/fusionarEmpresasContext";
import TitleFusionarEmpresas from "./titleFusionarEmpresas";
import FusionarEmpresas from './fusionarEmpresas'

function FusionarEmpresasModule() {

    const title = "Fusionar Entidades de Trabajo";

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className={`card card-custom card-stretch gutter-b`}>
                    {/* Header */}
                    <div className="card-header border-0 pt-5">
                        <TitleFusionarEmpresas title={title}/>
                    </div>
                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                        <FusionarEmpresas />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FusionarEmpresasModule;