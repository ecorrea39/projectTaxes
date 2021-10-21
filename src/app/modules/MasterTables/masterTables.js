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

function MasterTables({tabla}) {

    const { deleteMasterTables, trimestres } = useContext(MasterTablesContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const styleBtn = { borderRadius: '100%'}

    let data = [];
    let title = '';

    switch (tabla) {
        case "trimestre":
            title = "Tabla de Trimestres";
            data = trimestres;
            break;

        case "forma-pago":
            title = "Tabla de Forma de Pago ";
            break;

        case "cuentas-recaudadoras":
            title = "Tabla de Cuentas Recaudadoras";
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

                    <a title="agregar" variant="outline-info" className="btn btn-sm btn-info font-weight-bolder font-size-sm mb-3">Nuevo registro</a>

                    <Table responsive="sm" className="table-vertical-center table-head-bg" pagination={paginationFactory()}>
                        <thead variant="outline-info">
                        <tr className="text-left text-uppercase">
                            <th style={{minWidth: "15px"}}></th>
                            <th style={{minWidth: "15px"}}>id</th>
                            <th style={{minWidth: "300px"}}>Descripción</th>
                            <th style={{minWidth: "100px"}}>Estatus</th>
                            <th style={{minWidth: "50px"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((s, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                        </td>
                                        <td>
                                            <span className="text-dark-75 d-block font-size-sm">{s.id}</span>
                                        </td>
                                        <td>
                                            <span className="text-dark-75 d-block font-size-sm">{s.name}</span>
                                        </td>
                                        <td>
                                            <span className="text-dark-75 d-block font-size-sm">{s.is_active == true ? 'Activo': 'No activo'}</span>
                                        </td>
                                        <td>
                                            <a title="editar" style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                  <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                                                </span>
                                            </a>

                                            <a title="eliminar" style={styleBtn} onClick={deleteMasterTables} className="btn btn-icon btn-hover-light btn-sm">
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
        </>
    );
}

export default MasterTables;