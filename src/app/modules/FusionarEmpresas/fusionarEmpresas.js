import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import {Modal, Table} from "react-bootstrap";
import DataTable  from 'react-data-table-component';
import FusionarEmpresasContext from "../../context/fusionarEmpresas/fusionarEmpresasContext";
import paginationFactory from "react-bootstrap-table2-paginator";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ModalFusionarEmpresas from "./modalFusionarEmpresas";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Search from '@material-ui/icons/Search';

function FusionarEmpresas({titulo}) {

    const { fusionarEmpresas, filtrarElementos } = useContext(FusionarEmpresasContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const styleBtn = { borderRadius: '100%'}
    const [show, setShow] = useState(show);
    const [accion, setAccion] = useState("");
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
            width: "50px"
        },
        {
            name: "R.I.F. Entidad Fusionada",
            selector: row => row.nriffusionada,
            sortable: true,
            width: "200px"
        },
        {
            name: "Entidad Fusionada",
            selector: row => row.namefusionada,
            sortable: true,
            maxWidth: "350px"
        },
        {
            name: "R.I.F. Entidad que Absorbe",
            selector: row => row.nrifabsorbe,
            sortable: true,
            width: "200px"
        },
        {
            name: "Entidad que Absorbe",
            selector: row => row.nameabsorbe,
            sortable: true,
            maxWidth: "350px"
        }
    ];

    titulo = titulo;
    const data = fusionarEmpresas;
    const colTab = columnas;

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

    const onChange = (e) => {
        e.persist();
        setBusqueda(e.target.value);
        filtrarElementos(e.target.value);
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

            <ModalFusionarEmpresas
                show={show}
                onHide={() => setShow(false)}
                titulo={titulo}
                columnas={columnas}
                accion={accion}
            />

        </>
    );
}

export default FusionarEmpresas;