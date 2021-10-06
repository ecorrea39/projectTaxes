import React, {useContext, useState, useEffect} from "react";
import ReactDOM from "react-dom"
import {Button, Col, Modal, Row, Table} from "react-bootstrap";
import { FieldArray, Field, Form, Formik } from "formik";
import DeudasTrimestresDeclarados from '../../modules/AccountStatus/deudasTrimestresDeclarados';
import TaxesContext from "../../context/taxes/taxesContext";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../src/_metronic/_helpers";

import paginationFactory from 'react-bootstrap-table2-paginator'
import {isEqual} from "lodash";

function ModalHistoricalDeclaration(props) {

    const { estatus, formatNumber, historico, formatearfecha, sustituirDeclaracion, anos, trimestres, filtarHistorico } = useContext(TaxesContext);
    const styleBtnSeleccionar = { borderRadius: '50%' }
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", marginTop: "1%", marginBottom: "1%" }
    const selectStatus = estatus;

    return (
        <>
            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body>
                    <div className={`card card-custom`} >
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label font-weight-bolder text-dark">Declaración de tributos</span>
                                <span className="text-muted mt-3 font-weight-bold font-size-sm">Histórico de tributos declarados</span>
                            </h3>
                            <div className="card-toolbar">
                                <a href="#" variant="outline-info"
                                   className="btn btn-info font-weight-bolder font-size-sm mr-3"
                                   size="sm"
                                   onClick={props.onHide}>Cerrar</a>
                            </div>
                        </div>
                        <div className="px-5 border-0 ">
                            <div>
                                <Formik
                                    initialValues={{
                                        ano_declaracion: "",
                                        trimestre: "",
                                        estatus: "",
                                        searchText: "",
                                    }}
                                    onSubmit={(values) => { filtarHistorico(values); }}
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
                                                        name="estatus"
                                                        placeholder="Filtro por estatus"
                                                        onChange={(e) => {
                                                            setFieldValue("estatus", e.target.value);
                                                            handleSubmit();
                                                        }}
                                                        onBlur={handleBlur}
                                                        value={values.estatus}
                                                    >
                                                        <option value="" disabled>seleccione</option>
                                                        <option value="">todos</option>
                                                        {
                                                            selectStatus.map((s, i) => {
                                                                return <option key={i} value={s}>{s}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <small className="form-text text-muted">
                                                        <b>Filtro</b> por estatus
                                                    </small>
                                                </div>
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
                        <div className="tab-content px-5">
                                <div className="table-responsive">

                                    <Table className="table table-head-custom table-head-bg table-borderless table-vertical-center" pagination={ paginationFactory() }>
                                        <thead>
                                        <tr className="text-left text-uppercase">
                                            <th style={{minWidth: "15px"}}></th>
                                            <th style={{minWidth: "200px"}}>Concepto</th>
                                            <th style={{minWidth: "50px"}}>Año</th>
                                            <th style={{minWidth: "50px"}}>Trim.</th>
                                            <th style={{minWidth: "100px"}}>Fecha declaración</th>
                                            <th style={{minWidth: "100px"}}>Fecha emisión</th>
                                            <th style={{minWidth: "100px"}}>Monto nómina</th>
                                            <th style={{minWidth: "50px"}}>Cant. Trab.</th>
                                            <th style={{minWidth: "100px"}}>Monto tributo</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            historico.map((s, i) => {
                                                return (
                                                    <tr key={i}>

                                                        <td>
                                                            {/*
                                                            <a href="#" size="sm" title="seleccionar declaración" className="btn btn-success font-weight-bolder font-size-sm mr-3"
                                                               checked={()=>sustituirDeclaracion(historico[i])} >Seleccionar</a>
                                                               */}
                                                            <input type="checkbox" name={`sel${i}`} id={`sel${i}`} onClick={()=>sustituirDeclaracion(historico[i], i, props)} />
                                                        </td>
                                                        <td>
                                                            <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.concepto_pago_name}</span>
                                                            <span className="text-muted font-weight-bold">Estatus: - {s.estatus_name} -</span>
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
                                                            <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.fecha_declaracion}</span>
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
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalHistoricalDeclaration;