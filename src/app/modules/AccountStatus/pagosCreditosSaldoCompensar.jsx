import React from "react";
import { Card, Tab, Table, Tabs } from "react-bootstrap";

function PagosCreditosSaldoCompensar({className}) {

    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", marginTop: "1%", marginBottom: "1%" }

    return (
        <>
            <div className={`card card-custom ${className}`} style={styleCard}>
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Pagos y créditos</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Saldo a compensar por crédito fiscal</span>
                    </h3>
                    <div className="card-toolbar">
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
                                    <th style={{minWidth: "180px"}}>Saldo temporal a compensar</th>
                                    <th style={{minWidth: "180px"}}>Número documento</th>
                                    <th style={{minWidth: "180px"}}>fecha de notificación</th>
                                    <th style={{minWidth: "50px"}}>Monto aprobado</th>
                                </tr>
                                </thead>

                                <tbody>
                                <tr>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">500.000,00</span>
                                        <span className="text-muted font-weight-bold">1234567890</span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">ADM-20210901-123456</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">21-09-2021</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">123.125,45</span>
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

export default PagosCreditosSaldoCompensar;