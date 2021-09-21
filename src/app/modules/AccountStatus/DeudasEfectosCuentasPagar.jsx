import React from "react";
import {Card, Tab, Table, Tabs} from "react-bootstrap";

function DeudasEfectosCuentasPagar({ className }) {

    return (
        <>
            <div className={`card card-custom ${className}`}>
                {/* Head */}
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Deudas</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Efectos y Cuentas por Pagar</span>
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
                                    <th style={{minWidth: "200px"}}>Concepto documento</th>
                                    <th style={{minWidth: "250px"}}>Componentes</th>
                                    <th style={{minWidth: "100px"}}>Fecha notificación</th>
                                    <th style={{minWidth: "50px"}}>Número giro</th>
                                    <th style={{minWidth: "50px"}}>Valor MMV</th>
                                    <th style={{minWidth: "50px"}}>Número veces MMV</th>
                                    <th style={{minWidth: "100px"}}>Monto</th>
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
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">21-09-2021</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">50,00</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">150.000,00</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Resolución</span>
                                        <span className="text-muted font-weight-bold">ADM-20210901-123456</span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">Sanción por acta</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">21-09-2021</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">525.000,00</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/*
            <h4>Efectos y Cuentas por Pagar</h4>
            <Table striped bordered hover size="md">
                <thead>
                <tr>
                    <th>Concepto del documento</th>
                    <th>Componentes</th>
                    <th>Número documento</th>
                    <th>Fecha notificación</th>
                    <th>Número giro</th>
                    <th>Valor MMV</th>
                    <th>Número veces MMV</th>
                    <th>Monto</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Resolución</th>
                    <th>Incumplimiento deberes formales</th>
                    <th></th>
                    <th>21-09-2021</th>
                    <th></th>
                    <th></th>
                    <th>50,00</th>
                    <th>150.000,00</th>
                </tr>
                <tr>
                    <th>Resolución</th>
                    <th>Sanción por acta</th>
                    <th>AMD-20210901-123456</th>
                    <th>01-09-2021</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>625.000,00</th>
                </tr>
                </tbody>
            </Table>*/}
        </>
    );
}

export default DeudasEfectosCuentasPagar;


