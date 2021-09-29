import React, {useContext} from "react";
import { Card, Tab, Table, Tabs } from "react-bootstrap";
import AccountStatusContext from "../../context/accountStatus/accountStatusContext";

function DeudasTrimestresDeclarados({className}) {

    const { deudaTrim } = useContext(AccountStatusContext);

    const detalleTrim = [
        {
            concepto_pago: "1",
            concepto_pago_name: "Aporte patronal 2%",
            ano_declaracion: "2021",
            trimestre: "1",
            ntrabajadores: "5",
            monto_pagado: "2000000",
            monto_tributo: "40000",
            monto_multa: "100",
            monto_intereses: "600",
            fecha_emision: "2021-04-07"
        },
        {
            concepto_pago: "1",
            concepto_pago_name: "Aporte patronal 2%",
            ano_declaracion: "2021",
            trimestre: "2",
            ntrabajadores: "5",
            monto_pagado: "2000000",
            monto_tributo: "40000",
            monto_multa: "0",
            monto_intereses: "0",
            fecha_emision: "2021-06-11"
        },
        {
            concepto_pago: "2",
            concepto_pago_name: "Aporte de los trabajadores 0,5%",
            ano_declaracion: "2021",
            trimestre: "2",
            ntrabajadores: "6",
            monto_pagado: "3000000",
            monto_tributo: "10000",
            monto_multa: "0",
            monto_intereses: "10",
            fecha_emision: "2021-07-08"
        }
    ]

    function FormatNumber(number) {
        return  new Intl.NumberFormat("ES-ES", {
            style: "currency",
            currency: "VEF"
        }).format(number)
    }

    return (
        <>
            {/* --- detalle de deudas de trimestres declarados --- */}

            <div className={`card card-custom ${className}`}>
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Deudas</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Trimestres declarados</span>
                    </h3>
                    <div className="card-toolbar">
                        <span className="card-label font-weight-bolder text-dark">{FormatNumber(deudaTrim)}</span>
                        {/*<a href="#" className="btn btn-info font-weight-bolder font-size-sm mr-3">Reporte</a>*/}
                        {/*<a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a>*/}
                    </div>
                </div>
                <div className="card-body pt-0 pb-3">
                    <div className="tab-content">
                        <div className="table-responsive">
                            <table
                                className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                                <thead>
                                <tr className="text-left text-uppercase">
                                    <th style={{minWidth: "150px"}}>Concepto</th>
                                    <th style={{minWidth: "50px"}}>Año</th>
                                    <th style={{minWidth: "50px"}}>Trim.</th>
                                    <th style={{minWidth: "100px"}}>Fecha emisión</th>
                                    <th style={{minWidth: "100px"}}>Monto nómina</th>
                                    <th style={{minWidth: "50px"}}>Cant. Trab.</th>
                                    <th style={{minWidth: "100px"}}>Monto trubuto</th>
                                    <th style={{minWidth: "100px"}}>Monto intereses</th>
                                    <th style={{minWidth: "100px"}}>Monto multa</th>
                                </tr>
                                </thead>

                                <tbody>

                                {
                                    detalleTrim.map((s,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.concepto_pago_name}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.ano_declaracion}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.trimestre}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.fecha_emision}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{FormatNumber(s.monto_pagado)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.ntrabajadores}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{FormatNumber(s.monto_tributo)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{FormatNumber(s.monto_intereses)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-dark-75 font-weight-bolder d-block font-size-sm">{FormatNumber(s.monto_multa)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeudasTrimestresDeclarados;