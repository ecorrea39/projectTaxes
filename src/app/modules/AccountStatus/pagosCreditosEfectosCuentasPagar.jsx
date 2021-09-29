import React from "react";
import { Card, Tab, Table, Tabs } from "react-bootstrap";

function PagosCreditosEfectosCuentasPagar({className}) {

    return (
        <>
            <div className={`card card-custom ${className}`}>
                {/* Head */}
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Pagos y créditos</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Efectos y cuentas por pagar</span>
                    </h3>
                    <div className="card-toolbar">
                        {/*<a href="#" className="btn btn-info font-weight-bolder font-size-sm mr-3">Reporte</a>*/}
                        {/*<a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a>*/}
                    </div>
                </div>
                {/* Body */}
                <div className="card-body pt-0 pb-3">
                    <div className="tab-content">
                        <div className="table-responsive">
                            <table
                                className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                                <thead>
                                <tr className="text-left text-uppercase">
                                    <th style={{minWidth: "170px"}}>Concepto documento</th>
                                    <th style={{minWidth: "170px"}}>Componentes</th>
                                    <th style={{minWidth: "50px"}}>Número giro</th>
                                    <th style={{minWidth: "100px"}}>Fecha</th>
                                    <th style={{minWidth: "100px"}}>Banco</th>
                                    <th style={{minWidth: "50px"}}>Referencia</th>
                                    <th style={{minWidth: "100px"}}>Monto pagado</th>
                                    <th style={{minWidth: "100px"}}>Clave de pago</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Resolución</span>
                                        <span className="text-muted font-weight-bold">ADM-20210901-123456</span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Incumplimiento deberes formales</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">21-09-2021</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Banco de venezuela</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">1234567890</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">150.000,00</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Sanción por acta</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Resolución</span>
                                        <span className="text-muted font-weight-bold">ADM-20210901-123456</span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Incumplimiento deberes formales</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">21-09-2021</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Banco de venezuela</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">1234567890</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">150.000,00</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Sanción por acta</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PagosCreditosEfectosCuentasPagar;