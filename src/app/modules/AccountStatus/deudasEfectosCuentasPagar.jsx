import React, {useContext} from "react";
import {Card, Tab, Table, Tabs} from "react-bootstrap";

import AccountStatusContext from "../../context/accountStatus/accountStatusContext";

function DeudasEfectosCuentasPagar({ className }) {

    const { deudaCxP } = useContext(AccountStatusContext);

    const detalleCxP = [
        {
            concepto_pago: "10",
            concepto_pago_name: "Resolución por incumplimiento deberes formales",
            componentes: "",
            fecha_notificacion: "2021-05-06",
            numero_documento: "",
            numero_giro: "",
            valor_mmv: "",
            numero_veces_mmv: "50",
            monto: "150000"
        },
        {
            concepto_pago: "11",
            concepto_pago_name: "Resolución por incumplimiento deberes materiales",
            componentes: "",
            fecha_notificacion: "2021-05-07",
            numero_documento: "",
            numero_giro: "",
            valor_mmv: "",
            numero_veces_mmv: "50",
            monto: "150000"
        },
        {
            concepto_pago: "3",
            concepto_pago_name: "Acta de reparo",
            componentes: "",
            fecha_notificacion: "2021-05-07",
            numero_documento: "CUL-20210901-123456",
            numero_giro: "",
            valor_mmv: "",
            numero_veces_mmv: "",
            monto: "800000"
        },
        {
            concepto_pago: "3",
            concepto_pago_name: "Acta de reparo",
            componentes: "",
            fecha_notificacion: "2021-05-07",
            numero_documento: "CUL-20210901-000002",
            numero_giro: "",
            valor_mmv: "",
            numero_veces_mmv: "",
            monto: "800000"
        },
        {
            concepto_pago: "4",
            concepto_pago_name: "Sanción por acta de reparo",
            componentes: "",
            fecha_notificacion: "2021-06-09",
            numero_documento: "CUL-20210901-000001",
            numero_giro: "",
            valor_mmv: "",
            numero_veces_mmv: "",
            monto: "800000"
        },
        {
            concepto_pago: "7",
            concepto_pago_name: "Giro por convenio de pago",
            componentes: "",
            fecha_notificacion: "2021-06-09",
            numero_documento: "",
            numero_giro: "02/02",
            valor_mmv: "",
            numero_veces_mmv: "",
            monto: "0"
        },
        {
            concepto_pago: "7",
            concepto_pago_name: "Giro por convenio de pago",
            componentes: "",
            fecha_notificacion: "2021-05-09",
            numero_documento: "",
            numero_giro: "01/02",
            valor_mmv: "",
            numero_veces_mmv: "",
            monto: "100000"
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
            <div className={`card card-custom ${className}`}>
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Deudas</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Efectos y Cuentas por Pagar</span>
                    </h3>
                    <div className="card-toolbar">
                        <span className="card-label font-weight-bolder text-dark">{FormatNumber(deudaCxP)}</span>
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
                                    <th style={{minWidth: "200px"}}>Concepto documento</th>
                                    <th style={{minWidth: "200px"}}>Componentes</th>
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
                                      <span className="text-dark-75 font-weight-bolder d-block font-size-sm">Resolución</span>
                                      <span className="text-muted font-weight-bold">ADM-20210901-123456</span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">Incumplimiento deberes formales</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">21-09-2021</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">50,00</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">150.000,00</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">Resolución</span>
                                        <span className="text-muted font-weight-bold">ADM-20210901-123456</span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">Sanción por acta</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">21-09-2021</span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm"></span>
                                        <span className="text-muted font-weight-bold"></span>
                                    </td>
                                    <td>
                                        <span className="text-dark-75 font-weight-bolder d-block font-size-sm">525.000,00</span>
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

export default DeudasEfectosCuentasPagar;


