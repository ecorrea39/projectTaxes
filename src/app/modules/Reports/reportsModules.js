import React, { useContext } from "react";
import ReportsContext from "../../context/reports/reportsContext";
import TitleFormReports from "./titleFormReports";
import ReportsCertificateSolvency from './reportsCertificateSolvency';
import { useParams } from 'react-router-dom';
import ComprobanteDeInscripcion from "./ComprobanteDeInscripcion";

function ReportsModule() {

    const title = "Reportes del Contribuyente";

    const { reporte } = useParams();

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className={`card card-custom card-stretch gutter-b`}>
                    {/* Header */}
                    <div className="card-header border-0 pt-5">
                        <TitleFormReports title={title}/>
                    </div>
                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                        { reporte === 'certificado-solvencia' && <ReportsCertificateSolvency /> }
                        { reporte === 'comprobante-de-inscripcion' && <ComprobanteDeInscripcion /> }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportsModule;