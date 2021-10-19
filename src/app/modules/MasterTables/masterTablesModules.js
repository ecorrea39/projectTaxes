import React, { useContext } from "react";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";
import TitleFormMasterTables from "./titleFormMasterTables";

function MasterTablesModule() {

    const title = "Tabla Maestra";

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className={`card card-custom card-stretch gutter-b`}>
                    {/* Header */}
                    <div className="card-header border-0 pt-5">
                        <TitleFormMasterTables title={title}/>
                    </div>
                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                        {
                            <h1></h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MasterTablesModule;