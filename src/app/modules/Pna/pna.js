import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import {Modal, Table} from "react-bootstrap";
import DataTable  from 'react-data-table-component';
import PnaContext from "../../context/pna/pnaContext";
import paginationFactory from "react-bootstrap-table2-paginator";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ModalPna from "./modalPna";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Search from '@material-ui/icons/Search';

function Pna({}) {

    const { deletePna, pna, obtenerValores } = useContext(PnaContext);
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

    const columnas = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "50px"
        },
        {
            name: "Nº R.I.F.",
            selector: row => row.uid,
            sortable: true,
            maxWidth: "80px"
        },
        {
            name: "Contribuyente",
            selector: row => row.name,
            sortable: true,
            maxWidth: "300px"
        },
        {
            name: "Cumple obligación",
            selector: row => row.cumple,
            sortable: true,
            maxWidth: "150px"
        },
        {
            name: "Nº certificado",
            selector: row => row.numero_certificado,
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

                    <a title="eliminar" style={styleBtn} onClick={() => deletePna(row)}
                       className="btn btn-icon btn-hover-light btn-sm">
                        <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                        </span>
                    </a>
                </>
            )
        }
    ];

    const titulo = titulo;
    const data = pna;
    const colTab = columnas;

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

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

    }

    const actualizarData = (d) => { data = d }

    const onChange = async (e) => {
        e.persist();
        await setBusqueda(e.target.value);
        filtrarElementos();
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
                            {" "}
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

            <ModalPna
                show={show}
                onHide={() => setShow(false)}
                titulo={titulo}
                columnas={columnas}
                accion={accion}
            />

        </>
    );
}

export default Pna;