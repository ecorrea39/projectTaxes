import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import {Modal, Table} from "react-bootstrap";

import DataTable  from 'react-data-table-component';

import MasterTablesContext from "../../context/masterTables/masterTablesContext";
import paginationFactory from "react-bootstrap-table2-paginator";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ModalMasterTables from "./modalMasterTables";
import ArrowDownward from '@material-ui/icons/ArrowDownward';

function MasterTables({tabla}) {

    const { deleteMasterTables, trimestres, formasPago, cuentasRecaudadoras, estatus, bancos, claseEmpresa, motores, actividadesEconomicas, conceptos, obtenerValores } = useContext(MasterTablesContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const styleBtn = { borderRadius: '100%'}
    const [show, setShow] = useState(show);
    const [accion, setAccion] = useState("");

    const sortIcon = <ArrowDownward />;

    let data = [];
    let titulo = '';
    let columnas = '';
    let colTab = [];

    const columnas01 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Descripción",
            selector: row => row.name,
            sortable: true,
            maxWidth: "750px"
        },
        {
            name: "Acciones",
            button: true,
            cell: row => (
                <>
                    <a title="modificar" onClick={() => { setShow(true); setAccion('Modificar'); obtenerValores(row)}}
                       style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-info">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                        </span>
                    </a>

                    <a title="eliminar" style={styleBtn} onClick={() => deleteMasterTables(tabla, titulo, row)}
                       className="btn btn-icon btn-hover-light btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                        </span>
                    </a>
                </>
            )
        }
    ];

    const columnas02 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Banco",
            selector: row => row.name,
            sortable: true,
            maxWidth: "500px"
        },
        {
            name: "Tipo cta.",
            selector: row => row.cuenta_tipo,
            sortable: true,
            grow: 0
        },
        {
            name: "Número cta.",
            selector: row => row.cuenta_nro,
            sortable: true
        },
        {
            name: "Acciones",
            button: true,
            cell: row => (
                <>
                    <a title="modificar" onClick={() => { setShow(true); setAccion('Modificar'); obtenerValores(row)}}
                       style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-info">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                        </span>
                    </a>

                    <a title="eliminar" style={styleBtn} onClick={() => deleteMasterTables(tabla, titulo, row)}
                       className="btn btn-icon btn-hover-light btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                        </span>
                    </a>
                </>
            ),
            grow: 0
        }
    ];

    const columnas03 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Nombre del banco",
            selector: row => row.nom_banco,
            sortable: true,
            maxWidth: "530px"
        },
        {
            name: "Código banco",
            selector: row => row.cod_banco,
            sortable: true,
            maxWidth: "200px"
        },
        {
            name: "Acciones",
            button: true,
            cell: row => (
                <>
                    <a title="modificar" onClick={() => { setShow(true); setAccion('Modificar'); obtenerValores(row)}}
                       style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-info">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                        </span>
                    </a>

                    <a title="eliminar" style={styleBtn} onClick={() => deleteMasterTables(tabla, titulo, row)}
                       className="btn btn-icon btn-hover-light btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                        </span>
                    </a>
                </>
            )
        }
    ];

    const columnas04 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Nombre",
            selector: row => row.name,
            sortable: true,
            maxWidth: "750px"
        },
        {
            name: "Acciones",
            button: true,
            cell: row => (
                <>
                    <a title="modificar" onClick={() => { setShow(true); setAccion('Modificar'); obtenerValores(row)}}
                       style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-info">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                        </span>
                    </a>

                    <a title="eliminar" style={styleBtn} onClick={() => deleteMasterTables(tabla, titulo, row)}
                       className="btn btn-icon btn-hover-light btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                        </span>
                    </a>
                </>
            )
        }
    ];

    const columnas05 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Descripción",
            selector: row => row.name,
            sortable: true,
            maxWidth: "500px"
        },
        {
            name: "Código",
            selector: row => row.codigo,
            sortable: true,
            grow: 0
        },
        {
            name: "Motor productivo",
            selector: row => row.motor,
            sortable: true,
            maxWidth: "150px"
        },
        {
            name: "Acciones",
            button: true,
            cell: row => (
                <>
                    <a title="modificar" onClick={() => { setShow(true); setAccion('Modificar'); obtenerValores(row)}}
                       style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-info">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                        </span>
                    </a>

                    <a title="eliminar" style={styleBtn} onClick={() => deleteMasterTables(tabla, titulo, row)}
                       className="btn btn-icon btn-hover-light btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                        </span>
                    </a>
                </>
            ),
            grow: 0
        }
    ];

    const columnas06 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Nombre",
            selector: row => row.name,
            sortable: true,
            maxWidth: "650px"
        },
        {
            name: "Clave",
            selector: row => row.clave,
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Acciones",
            button: true,
            cell: row => (
                <>
                    <a title="modificar" onClick={() => { setShow(true); setAccion('Modificar'); obtenerValores(row)}}
                       style={styleBtn} className="btn btn-icon btn-hover-light btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-info">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                        </span>
                    </a>

                    <a title="eliminar" style={styleBtn} onClick={() => deleteMasterTables(tabla, titulo, row)}
                       className="btn btn-icon btn-hover-light btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                        </span>
                    </a>
                </>
            )
        }
    ];

    switch (tabla) {
        case "trimestre":
            titulo = "Trimestres";
            data = trimestres;
            columnas = "col-1";
            colTab = columnas01;
            break;

        case "forma-pago":
            titulo = "Forma de Pago";
            data = formasPago;
            columnas = 'col-1';
            colTab = columnas01;
            break;

        case "estatus-entidad-trabajo":
            titulo = "Estatus Entidad de Trabajo";
            data = estatus;
            columnas = 'col-1';
            colTab = columnas01;
            break;

        case "motores-productivos":
            titulo = "Motores Productivos";
            data = motores;
            columnas = 'col-1';
            colTab = columnas01;
            break;

        case "actividad-economica":
            titulo = "Actividades Económica";
            data = actividadesEconomicas;
            columnas = 'col-5';
            colTab = columnas05;
            break;

        case "cuentas-recaudadoras":
            titulo = "Cuentas Recaudadoras";
            data = cuentasRecaudadoras;
            columnas = 'col-2';
            colTab = columnas02;
            break;

        case "bancos-recaudadores":
            titulo = "Bancos Recaudadores";
            data = bancos;
            columnas = "col-3";
            colTab = columnas03;
            break;

        case "clase-empresa":
            titulo = "Clase Entidad de Trabajo";
            data = claseEmpresa;
            columnas = "col-4";
            colTab = columnas04;
            break;

        case "conceptos":
            titulo = "Conceptos";
            data = conceptos;
            columnas = "col-6";
            colTab = columnas06;
            break;

        default:
            break;
    }

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

    const customStyles = {
        rows: {
            style: {
                minHeight: '40px',
            }
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
    };

    return (
        <>
            <div className="tab-content">
                <div className="table-responsive">

                    <a title="agregar" style={{position: 'fixed', top: '18%', right: '6%', borderRadius: '100%', boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)"}} onClick={() => {setShow(true); setAccion("Agregar") }} className="btn btn-icon btn-warning btn-hover-light btn-md mx-3">
                        <span>+</span>
                    </a>

                    <DataTable
                        columns={colTab}
                        data={data}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        fixedHeader
                        fixedHeaderScrollHeight="500px"
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 25, 50]}
                        sortIcon={sortIcon}
                        customStyles={customStyles}
                        responsive={true}
                        noDataComponent="No existe datos para mostrar"
                    />
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