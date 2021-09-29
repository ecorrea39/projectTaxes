import React, {useContext, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import DeudasTrimestresDeclarados from '../../modules/AccountStatus/deudasTrimestresDeclarados';
import TaxesContext from "../../context/taxes/taxesContext";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../src/_metronic/_helpers";
import DeleteIcon from '@material-ui/icons/Delete';

function ModalHistoricalDeclaration(props) {

    const { estatus, formatNumber, historico, formatearfecha, sustituirDeclaracion } = useContext(TaxesContext);

    const styleBtnSeleccionar = { borderRadius: '50%' }

        {/*
        declaracionsustitutiva = true;

        let monto_pagado = obj.monto_pagado.replace('VES', '');
        let monto_tributo = obj.monto_tributo.replace('VES', '');

        declaraciones = [];
        declaracion.id = obj.id;
        declaracion.rif = rif;
        declaracion.concepto_pago = Number(obj.concepto_pago);
        declaracion.trimestre = obj.trimestre;
        declaracion.ano_declaracion = obj.ano_declaracion;
        declaracion.ntrabajadores = obj.ntrabajadores;
        declaracion.ntrabajadores_liquidados = obj.ntrabajadores_liquidados;
        declaracion.monto_pagado = Number(monto_pagado.replace(/,/g, ''));
        declaracion.monto_tributo = Number(monto_tributo.replace(/,/g, ''));
        declaracion.terms = obj.terms;
        declaracion.sustitutiva = Number(obj.sustitutiva) + 1;
        declaracion.fecha_emision = formatearfecha(new Date(obj.fecha_emision), 'YMD');
        //(declaracion.sustitutiva === 3) ? declaracion.estatus = 4 : obj.estatus; //ojo hay que ajustar
        declaraciones.push(declaracion);

        //$f7.popup.close(".popup-about");*/}


    return (
        <>
            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className={`card card-custom`}>
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
                        <div className="card-body pt-0 pb-2">
                            <div className="tab-content">
                                <div className="table-responsive">
                                    <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
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
                                                <th style={{minWidth: "100px"}}>Monto trubuto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            historico.map((s, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td name={`button${i}`}>
                                                            <a href="#" size="sm" title="seleccionar declaración" className="btn btn-green font-weight-bolder font-size-sm mr-3"
                                                               onClick={()=>sustituirDeclaracion(historico[i]), props.onHide} style={styleBtnSeleccionar}><DeleteIcon /></a>
                                                        </td>
                                                        <td>
                                                            <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.concepto_pago_name}</span>
                                                            <span className="text-muted font-weight-bold">Estatus: - {s.estatus} -</span>
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
                                                            <span className="text-dark-75 font-weight-bolder d-block font-size-sm"></span>
                                                            <span className="text-muted font-weight-bold"></span>
                                                        </td>
                                                        <td>
                                                            <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{formatearfecha(new Date(s.fecha_emision))}</span>
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
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalHistoricalDeclaration;