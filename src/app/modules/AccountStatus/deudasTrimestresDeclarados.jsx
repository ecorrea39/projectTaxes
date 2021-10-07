import React, {useContext} from "react";
import { Card, Tab, Table, Tabs } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import AccountStatusContext from "../../context/accountStatus/accountStatusContext";
import {Formik} from "formik";

function DeudasTrimestresDeclarados({className}) {

    const { anos, trimestres, totalDeudaTrim, detalleDeudaTrim, filtarAccountStatus, formatNumber } = useContext(AccountStatusContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", marginTop: "1%", marginBottom: "1%" }
    const detalleTrim = detalleDeudaTrim;

    return (
        <>
            {/* --- detalle de deudas de trimestres declarados --- */}

            <div className={`card card-custom ${className}`} style={styleCard}>
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Deudas | Detalles</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Trimestres declarados</span>
                    </h3>
                    <div className="card-toolbar">
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Total deuda: {formatNumber(totalDeudaTrim)} </span>
                    </div>
                </div>
                <div className="px-10 border-0 ">
                    <div>
                        <Formik
                            initialValues={{
                                ano_declaracion: "",
                                trimestre: "",
                                searchText: "",
                            }}
                            onSubmit={(values) => {
                                filtarAccountStatus(values, 'deudatrim');
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
                                        {/*
                                                <div className="col-lg-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="searchText"
                                                        placeholder="Buscar"
                                                        onBlur={handleBlur}
                                                        value={values.searchText}
                                                        onChange={(e) => {
                                                            setFieldValue("searchText", e.target.value);
                                                            handleSubmit();
                                                        }}
                                                    />
                                                    <small className="form-text text-muted">
                                                        <b>Filtro</b> todas las columnas
                                                    </small>
                                                </div>*/}
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>

                <div className="card-body pt-0 pb-3">
                    <div className="tab-content">
                        <div className="table-responsive">
                            <table
                                className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                                <thead>
                                <tr className="text-left text-uppercase">
                                    <th style={{minWidth: "200px"}}>Concepto</th>
                                    <th style={{minWidth: "50px"}}>Año</th>
                                    <th style={{minWidth: "50px"}}>Trim.</th>
                                    <th style={{minWidth: "100px"}}>Fecha emisión</th>
                                    <th style={{minWidth: "100px"}}>Monto nómina</th>
                                    <th style={{minWidth: "50px"}}>Cant. Trab.</th>
                                    <th style={{minWidth: "100px"}}>Monto tr1buto</th>
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
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.fecha_emision}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{formatNumber(s.monto_pagado)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.ntrabajadores}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{formatNumber(s.monto_tributo)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{formatNumber(s.monto_intereses)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{formatNumber(s.monto_multa)}</span>
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