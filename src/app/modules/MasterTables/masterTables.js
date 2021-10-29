import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import {Modal, Table} from "react-bootstrap";

import MasterTablesContext from "../../context/masterTables/masterTablesContext";
import paginationFactory from "react-bootstrap-table2-paginator";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ModalMasterTables from "./modalMasterTables";

function MasterTables({tabla}) {

    const { deleteMasterTables, trimestres, formasPago, cuentasRecaudadoras, estatus, bancos, claseEmpresa, obtenerValores } = useContext(MasterTablesContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const styleBtn = { borderRadius: '100%'}
    const [show, setShow] = useState(show);
    const [accion, setAccion] = useState("");

    let data = [];
    let titulo = '';
    let columnas = '';

    switch (tabla) {
        case "trimestre":
            titulo = "Trimestres";
            data = trimestres;
            columnas = "col-1";
            break;

        case "forma-pago":
            titulo = "Forma de Pago";
            data = formasPago;
            columnas = "col-1";
            break;

        case "estatus-entidad-trabajo":
            titulo = "Estatus entidad de trabajo";
            data = estatus;
            columnas = "col-1";
            break;

        case "bancos-recaudadores":
            titulo = "Bancos recaudadores";
            data = bancos;
            columnas = "col-1";
            break;

        case "clase-empresa":
            titulo = "Clase entidad de trabajo";
            data = claseEmpresa;
            columnas = "col-1";
            break;

        case "cuentas-recaudadoras":
            titulo = "Cuentas Recaudadoras";
            data = cuentasRecaudadoras;
            columnas = "col-2";
            break;

        default:
            break;
    }

    useEffect(() => {
    },[]);

    return (
        <>
            <div className="tab-content">
                <div className="table-responsive">

                    <a title="agregar" style={{position: 'fixed', top: '18%', right: '6%', borderRadius: '100%', boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)"}} onClick={() => {setShow(true); setAccion("Agregar") }} className="btn btn-icon btn-warning btn-hover-light btn-md mx-3">
                        <span>+</span>
                    </a>

                    <Table responsive="sm" className="table-vertical-center table-head-bg" pagination={paginationFactory()}>
                        <thead variant="outline-info">
                            <tr className="text-left text-uppercase">
                                {
                                    columnas === 'col-1' &&
                                        <>
                                            <th style={{minWidth: "15px"}}></th>
                                            <th style={{minWidth: "15px"}}>id</th>
                                            <th style={{minWidth: "300px"}}>Descripción</th>
                                            <th style={{minWidth: "100px"}}>Estatus</th>
                                            <th style={{minWidth: "50px"}}>Acciones</th>
                                        </>
                                }
                                {
                                    columnas === 'col-2' &&
                                    <>
                                        <th style={{minWidth: "15px"}}></th>
                                        <th style={{minWidth: "15px"}}>id</th>
                                        <th style={{minWidth: "200px"}}>Banco</th>
                                        <th style={{minWidth: "50px"}}>Tipo Cta.</th>
                                        <th style={{minWidth: "50px"}}>Número Cta.</th>
                                        <th style={{minWidth: "50px"}}>Estatus</th>
                                        <th style={{minWidth: "50px"}}>Acciones</th>
                                    </>
                                }

                            </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((s, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{padding: "0rem", paddingLeft: "0.75rem"}}></td>
                                        <td style={{padding: "0rem", paddingLeft: "0.75rem"}}>
                                            <span className="text-dark-75 d-block font-size-sm">{s.id}</span>
                                        </td>
                                        {
                                            columnas === 'col-1' &&
                                            <>
                                                <td style={{padding: "0rem", paddingLeft: "0.75rem"}}>
                                                    <span className="text-dark-75 font-size-sm">{s.name}</span>
                                                </td>
                                            </>
                                        }
                                        {
                                            columnas === 'col-2' &&
                                            <>
                                                <td style={{padding: "0rem", paddingLeft: "0.75rem"}}>
                                                    <span className="text-dark-75 font-size-sm">{s.name}</span>
                                                </td>
                                                <td style={{padding: "0rem", paddingLeft: "0.75rem"}}>
                                                    <span className="text-dark-75 font-size-sm">{s.cuenta_tipo}</span>
                                                </td>
                                                <td style={{padding: "0rem", paddingLeft: "0.75rem"}}>
                                                    <span className="text-dark-75 font-size-sm">{s.cuenta_nro}</span>
                                                </td>
                                            </>
                                        }
                                        <td style={{padding: "0rem", paddingLeft: "0.75rem"}}>
                                            <span className="text-dark-75 font-size-sm">{s.is_active == true ? 'Activo': 'No activo'}</span>
                                        </td>
                                        <td style={{padding: "0rem", paddingLeft: "0.75rem"}}>
                                            <a title="modificar" onClick={() => {setShow(true); setAccion('Modificar'); obtenerValores(s) }} style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                                                <span className="svg-icon svg-icon-md svg-icon-info">
                                                  <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                                                </span>
                                            </a>

                                            <a title="eliminar" style={styleBtn} onClick={()=>deleteMasterTables(tabla, titulo, s)} className="btn btn-icon btn-hover-light btn-sm">
                                                <span className="svg-icon svg-icon-md svg-icon-danger">
                                                  <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            </div>

            <ModalMasterTables
                show={show}
                onHide={() => setShow(false)}
                titulo={titulo}
                columnas={columnas}
                accion={accion}
                tabla={tabla}
            />

        </>
    );
}

export default MasterTables;