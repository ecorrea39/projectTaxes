import React, {useContext} from "react";
import { Card, Tab, Table, Tabs } from "react-bootstrap";
import {Formik} from "formik";
import AccountStatusContext from "../../context/accountStatus/accountStatusContext";

function PagosCreditosTrimestresDeclarados({className}) {

    const { anos, trimestres, detallePagosTrim, filtarAccountStatus, formatNumber } = useContext(AccountStatusContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", marginTop: "1%", marginBottom: "1%" }

    const detallePagoTrim = detallePagosTrim;

    return (
        <>
            <div className={`card card-custom ${className}`} style={styleCard}>
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Pagos y créditos | Detalles</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Trimestres declarados</span>
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
                                ano_declaracion: "",
                                trimestre: "",
                            }}
                            onSubmit={(values) => {
                                filtarAccountStatus(values, 'pagostrim');
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
                                            <select
                                                className="form-control"
                                                name="ano_declaracion"
                                                placeholder="Filtro por año"
                                                onChange={(e) => {
                                                    setFieldValue("ano_declaracion", e.target.value);
                                                    handleSubmit();
                                                }}
                                                onBlur={handleBlur}
                                                value={values.ano_declaracion}
                                            >
                                                <option value="" disabled>seleccione</option>
                                                <option value="">todos</option>
                                                {
                                                    anos.map((s, i) => {
                                                        return <option key={i} value={s}>{s}</option>
                                                    })
                                                }
                                            </select>
                                            <small className="form-text text-muted">
                                                <b>Filtro</b> por año
                                            </small>
                                        </div>
                                        <div className="col-lg-4">
                                            <select
                                                className="form-control"
                                                placeholder="Fitro por trimestre"
                                                name="trimestre"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    setFieldValue("trimestre", e.target.value);
                                                    handleSubmit();
                                                }}
                                                value={values.trimestre}
                                            >
                                                <option value="" disabled>seleccione</option>
                                                <option value="">todos</option>
                                                {
                                                    trimestres.map((s, i) => {
                                                        return <option key={s.id} value={s.id}>{s.name}</option>
                                                    })
                                                }
                                            </select>
                                            <small className="form-text text-muted">
                                                <b>Filtro</b> por trimestre
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
                                    <th style={{minWidth: "170px"}}>Concepto</th>
                                    <th style={{minWidth: "50px"}}>Año</th>
                                    <th style={{minWidth: "50px"}}>Trim.</th>
                                    <th style={{minWidth: "100px"}}>Fecha</th>
                                    <th style={{minWidth: "100px"}}>Banco</th>
                                    <th style={{minWidth: "80px"}}>Referencia</th>
                                    <th style={{minWidth: "100px"}}>Monto pagado</th>
                                    <th style={{minWidth: "50px"}}>Clave de pago</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    detallePagoTrim.map((s,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.concepto_pago_name}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.ano_declaracion}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.trimestre}</span>
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
                                detallePagoTrim.length == 0 && (<span className="text-muted">sin información para mostrar</span>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PagosCreditosTrimestresDeclarados;