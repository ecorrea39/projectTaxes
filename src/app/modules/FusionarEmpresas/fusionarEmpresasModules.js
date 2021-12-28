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
                    <div className="border-0 pl-10 pt-10">
                        <TitleFusionarEmpresas title={title}/>
                    </div>
                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                        {
                            <FusionarEmpresas titulo={title} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FusionarEmpresasModule;