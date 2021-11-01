import React, {useContext} from "react";
import {Card, Col, Tab, Table, Tabs} from "react-bootstrap";
import {Field, Formik} from "formik";
import BaseInput from "../Forms/BaseInputs";
import AccountStatusContext from "../../context/accountStatus/accountStatusContext";

function PagosCreditosEfectosCuentasPagar({className}) {

    const { formatoFechaFutura, formatNumber, detallePagosCxP } = useContext(AccountStatusContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", marginTop: "1%", marginBottom: "1%" }
    const detallePagoCxP = detallePagosCxP;

    return (
        <>
            <div className={`card card-custom ${className}`} style={styleCard}>
                {/* Head */}
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Pagos y créditos | Detalles</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Efectos y cuentas por pagar</span>
                    </h3>
                    <div className="card-toolbar">
                        {/*<a href="#" className="btn btn-info font-weight-bolder font-size-sm mr-3">Reporte</a>*/}
                        {/*<a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a>*/}
                    </div>
                </div>
                <div className="px-10 border-0 ">
                    <div>
                        <Formik
                            initialValues={{
                                fecha_desde: "",
                                fecha_hasta: "",
                            }}
                            onSubmit={(values) => {
                                {/*
                                filtarAccountStatus(values, 'pagostrim');*/}
                            }}
                        >
                            {({
                                  values,
                                  handleSubmit,
                                  handleBlur,
                                  handleChange,
                                  setFieldValue,
                              }) => (
                                <form onSubmit={handleSubmit} className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <Field
                                                id="fecha_desde"
                                                name="fecha_desde"
                                                component={BaseInput}
                                                type="date"
                                                max={formatoFechaFutura}
                                            />
                                            <small className="form-text text-muted">
                                                <b>Filtro</b> por fecha desde
                                            </small>
                                        </div>
                                        <div className="col-lg-4">
                                            <Field
                                                id="fecha_hasta"
                                                name="fecha_hasta"
                                                component={BaseInput}
                                                type="date"
                                                max={formatoFechaFutura}
                                            />
                                            <small className="form-text text-muted">
                                                <b>Filtro</b> por fecha hasta
                                            </small>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="card-body pt-0 pb-3">
                    <div className="tab-content">
                        <div className="table-responsive">
                            <table className="table table-vertical-center table-head-bg">
                                <thead>
                                <tr className="text-left text-uppercase">
                                    <th style={{minWidth: "190px"}}>Concepto documento</th>
                                    <th style={{minWidth: "130px"}}>Componentes</th>
                                    <th style={{minWidth: "50px"}}>Número giro</th>
                                    <th style={{minWidth: "100px"}}>Fecha</th>
                                    <th style={{minWidth: "100px"}}>Banco</th>
                                    <th style={{minWidth: "50px"}}>Referencia</th>
                                    <th style={{minWidth: "100px"}}>Monto pagado</th>
                                    <th style={{minWidth: "80px"}}>Clave de pago</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    detallePagoCxP.map((s,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.concepto_pago_name}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.componentes}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.numero_giro}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.fecha_pago}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.banco_name}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.referencia}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{formatNumber(s.monto_pagado)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.clave}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            {
                                detallePagoCxP.length == 0 && (<span className="text-muted">sin información para mostrar</span>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PagosCreditosEfectosCuentasPagar;