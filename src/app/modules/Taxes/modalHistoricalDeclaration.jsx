import React, {useContext, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import DeudasTrimestresDeclarados from '../../modules/AccountStatus/deudasTrimestresDeclarados';
import TaxesContext from "../../context/taxes/taxesContext";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../src/_metronic/_helpers";
import DeleteIcon from '@material-ui/icons/Delete';

function ModalHistoricalDeclaration(props) {

    const { estatus, formatNumber } = useContext(TaxesContext);

    //const [show, setShow] = useState(false);

    const sustituirDeclaracion = (obj) => {

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
    }

    const historico = [
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
            fecha_emision: "2021-04-07",
            estatus: 'definitiva'
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
            fecha_emision: "2021-06-11",
            estatus: 'definitiva'
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
            fecha_emision: "2021-07-08",
            estatus: 'creada'
        }
    ]

    return (
        <>
            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className={`card card-custom`}>
                        <div className="card-header border-0 py-5">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label font-weight-bolder text-dark">Histórico de declaración de tributos</span>
                                <span className="text-muted mt-3 font-weight-bold font-size-sm"></span>
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
                                                <th style={{minWidth: "10px"}}></th>
                                                <th style={{minWidth: "200px"}}>Concepto</th>
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
                                            historico.map((s, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <a href="#" title="seleccionar declaración"
                                                               className="btn btn-icon btn-outline btn-sm"
                                                               onClick={sustituirDeclaracion(historico[i])}>
                                                                <DeleteIcon color="primary"/>
                                                            </a>
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
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalHistoricalDeclaration;