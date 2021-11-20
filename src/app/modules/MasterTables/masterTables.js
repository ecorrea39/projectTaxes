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
import Search from '@material-ui/icons/Search';

function MasterTables({tabla, titulo}) {

    const { deleteMasterTables, trimestres, formasPago, cuentasRecaudadoras, estatus, bancos, claseEmpresa, motores, actividadesEconomicas, conceptos, registrosMercantiles, medidaValor, motivoSancion, diasFestivos, tasaIntereses, sectores, vialidades, locales, edificaciones, tipoDocumento, obtenerValores, filtrarElementos } = useContext(MasterTablesContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const styleBtn = { borderRadius: '100%'}
    const [show, setShow] = useState(show);
    const [accion, setAccion] = useState("");
    const [dataAux, setDataAux] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const sortIcon = <ArrowDownward />;

    const textField = { height: "32px", width: "400px", border: "1px solid #e5e5e5", padding: "0 32px 0 16px" }
    const btnBuscar = { height: "34px", width: "32px", border: 0, textAlign: "center", alignItems: "center", justifyContent: "center" }
    const barraBusqueda = { float: "left", padding: "0 0 10px" }

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

    let data = [];
    let columnas = '';
    let colTab = [];

    const columnas01 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Descripción",
            selector: row => row.name,
            sortable: true,
            maxWidth: "740px"
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
            maxWidth: "50px"
        },
        {
            name: "Banco",
            selector: row => row.name,
            sortable: true,
            maxWidth: "450px"
        },
        {
            name: "Tipo cta.",
            selector: row => row.cuenta_tipo,
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Número cta.",
            selector: row => row.cuenta_nro,
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
            ),
            grow: 0
        }
    ];

    const columnas03 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
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
            maxWidth: "50px"
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
            maxWidth: "50px"
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
            maxWidth: "50px"
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

    const columnas07 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Estado",
            selector: row => row.estado_name,
            sortable: true,
            maxWidth: "200px"
        },
        {
            name: "Oficina",
            selector: row => row.oficina,
            sortable: true,
            maxWidth: "550px"
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

    const columnas08 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Fecha",
            selector: row => row.fecha,
            sortable: true,
            maxWidth: "300px"
        },
        {
            name: "Valor",
            selector: row => row.valor,
            sortable: true,
            maxWidth: "400px"
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

    const columnas09 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Descripción",
            selector: row => row.name,
            sortable: true,
            maxWidth: "600px"
        },
        {
            name: "Número veces",
            selector: row => row.nveces_mmv,
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
            )
        }
    ];

    const columnas10 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Año",
            selector: row => Number(row.ano),
            sortable: true,
            maxWidth: "350px"
        },
        {
            name: "Día festivo",
            selector: row => row.fecha,
            maxWidth: "350px"
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

    const columnas11 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Año",
            selector: row => Number(row.ano),
            sortable: true,
            maxWidth: "40px"
        },
        {
            name: "Mes",
            selector: row => Number(row.mes),
            sortable: true,
            maxWidth: "40px"
        },
        {
            name: "Tasa de interés (BCV)",
            selector: row => Number(row.tasa_bcv),
            sortable: true,
            maxWidth: "145px"
        },
        {
            name: "Recargo C.O.T.",
            selector: row => Number(row.recargo_cot),
            sortable: true,
            maxWidth: "145px"
        },
        {
            name: "Tasa interés mora Art.66 COT",
            selector: row => Number(row.recargo_cot),
            sortable: true,
            maxWidth: "175px"
        },
        {
            name: "Gaceta",
            selector: row => row.ngaceta,
            sortable: true,
            maxWidth: "50px"
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

    const columnas12 = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Código",
            selector: row => row.codigo,
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
            titulo = titulo;
            data = trimestres;
            columnas = "col-1";
            colTab = columnas01;
            break;

        case "forma-pago":
            titulo = titulo;
            data = formasPago;
            columnas = 'col-1';
            colTab = columnas01;
            break;

        case "estatus-entidad-trabajo":
            titulo = titulo;
            data = estatus;
            columnas = 'col-1';
            colTab = columnas01;
            break;

        case "motores-productivos":
            titulo = titulo;
            data = motores;
            columnas = 'col-1';
            colTab = columnas01;
            break;

        case "actividad-economica":
            titulo = titulo;
            data = actividadesEconomicas;
            columnas = 'col-5';
            colTab = columnas05;
            break;

        case "cuentas-recaudadoras":
            titulo = titulo;
            data = cuentasRecaudadoras;
            columnas = 'col-2';
            colTab = columnas02;
            break;

        case "bancos-recaudadores":
            titulo = titulo;
            data = bancos;
            columnas = "col-3";
            colTab = columnas03;
            break;

        case "clase-empresa":
            titulo = titulo;
            data = claseEmpresa;
            columnas = "col-4";
            colTab = columnas04;
            break;

        case "conceptos":
            titulo = titulo;
            data = conceptos;
            columnas = "col-6";
            colTab = columnas06;
            break;

        case "registros-mercantiles":
            titulo = titulo;
            data = registrosMercantiles;
            columnas = "col-7";
            colTab = columnas07;
            break;

        case "medida-valor":
            titulo = titulo;
            data = medidaValor;
            columnas = "col-8";
            colTab = columnas08;
            break;

        case "motivo-sancion":
            titulo = titulo;
            data = motivoSancion;
            columnas = "col-9";
            colTab = columnas09;
            break;

        case "dias-festivos":
            titulo = titulo;
            data = diasFestivos;
            columnas = "col-10";
            colTab = columnas10;
            break;

        case "tasa-intereses":
            titulo = titulo;
            data = tasaIntereses;
            columnas = "col-11";
            colTab = columnas11;
            break;

        case "sectores":
            titulo = titulo;
            data = sectores;
            columnas = "col-1";
            colTab = columnas01;
            break;

        case "vialidades":
            titulo = titulo;
            data = vialidades;
            columnas = "col-1";
            colTab = columnas01;
            break;

        case "locales":
            titulo = titulo;
            data = locales;
            columnas = "col-1";
            colTab = columnas01;
            break;

        case "edificaciones":
            titulo = titulo;
            data = edificaciones;
            columnas = "col-1";
            colTab = columnas01;
            break;

        case "tipo-documentos":
            titulo = titulo;
            data = tipoDocumento;
            columnas = "col-12";
            colTab = columnas12;
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

    /*
    const filtrarElementos = () => {
        setDataAux(data);
        let search = dataAux.filter(item => {
            if(item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(busqueda)) {
                return item;
            }
        });
        console.log('busqueda ', busqueda)
        actualizarData(search);
        console.log('data ', search)

    }*/

    const onChange = (e) => {
        e.persist();
        setBusqueda(e.target.value);
        filtrarElementos(tabla, e.target.value, columnas);
    }



    return (
        <>
            <div className="tab-content">
                <div className="table-responsive">

                    <a title="agregar" style={{position: 'fixed', top: '18%', right: '6%', borderRadius: '100%', boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)"}} onClick={() => {setShow(true); setAccion("Agregar") }} className="btn btn-icon btn-warning btn-hover-light btn-md mx-3">
                        <span>+</span>
                    </a>

                    <div style={barraBusqueda}>
                        <input
                            type="text"
                            placeholder="Buscar"
                            style={textField}
                            name="busqueda"
                            value={busqueda}
                            onChange={onChange}
                        />
                        <button type="button" style={btnBuscar}>
                            <Search />
                        </button>
                    </div>

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
                        noDataComponent="No existen datos para mostrar"
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