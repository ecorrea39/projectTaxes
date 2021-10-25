import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import {Button, Col, Row, Card, Modal, Table, FormCheck} from "react-bootstrap";

import { initialValuesTables } from "./initialValues";
import { SchemaTables } from "./validateSchemas";

import BaseInput from "../Forms/BaseInputs";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";
import BaseSelect from "../Forms/BaseSelect";
import paginationFactory from "react-bootstrap-table2-paginator";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ModalMasterTables from "./modalMasterTables";

function MasterTables({tabla}) {

    const { deleteMasterTables, trimestres, formasPago, cuentasRecaudadoras } = useContext(MasterTablesContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const styleBtn = { borderRadius: '100%'}
    const [show, setShow] = useState(show);

    let data = [];
    let title = '';
    let columnas = '';

    switch (tabla) {
        case "trimestre":
            title = "Trimestres";
            data = trimestres;
            columnas = "col-1";
            break;

        case "forma-pago":
            title = "Forma de Pago ";
            data = formasPago;
            columnas = "col-1";
            break;

        case "cuentas-recaudadoras":
            title = "Cuentas Recaudadoras";
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

                    <a title="agregar"onClick={() => setShow(true)} variant="outline-info" className="btn btn-sm btn-info font-weight-bolder font-size-sm mb-3">Nuevo registro</a>

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
                                        <th style={{minWidth: "50px"}}>Tipo Cuenta</th>
                                        <th style={{minWidth: "50px"}}>Número Cuenta</th>
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
                                        <td></td>
                                        <td>
                                            <span className="text-dark-75 d-block font-size-sm">{s.id}</span>
                                        </td>
                                        {
                                            columnas === 'col-1' &&
                                            <>
                                                <td>
                                                    <span className="text-dark-75 d-block font-size-sm">{s.name}</span>
                                                </td>
                                            </>
                                        }
                                        {
                                            columnas === 'col-2' &&
                                            <>
                                                <td>
                                                    <span className="text-dark-75 d-block font-size-sm">{s.name}</span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 d-block font-size-sm">{s.cuenta_tipo}</span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 d-block font-size-sm">{s.cuenta_nro}</span>
                                                </td>
                                            </>
                                        }
                                        <td>
                                            <span className="text-dark-75 d-block font-size-sm">{s.is_active == true ? 'Activo': 'No activo'}</span>
                                        </td>
                                        <td>
                                            <a title="editar" style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                  <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                                                </span>
                                            </a>

                                            <a title="eliminar" style={styleBtn} onClick={()=>deleteMasterTables(tabla, title, s)} className="btn btn-icon btn-hover-light btn-sm">
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
                title={title}
            />

        </>
    );
}

export default MasterTables;