import React, { useContext } from "react";
import PnaContext from "../../context/pna/pnaContext";
import TitleFormPna from "./titlePna";
import Pna from './pna'

function PnaModule() {

    const title = "PNA Certificados";

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className={`card card-custom card-stretch gutter-b`}>
                    {/* Header */}
                    <div className="border-0 pl-10 pt-10">
                        <TitleFormPna title={title}/>
                    </div>
                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                        {
                            <Pna titulo={title} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PnaModule;