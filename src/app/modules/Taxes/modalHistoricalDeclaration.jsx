import React, {useContext, useState} from "react";
import ReactDOM from "react-dom"
import {Button, Col, Modal, Row, Table} from "react-bootstrap";
import { FieldArray, Field, Form, Formik } from "formik";
import DeudasTrimestresDeclarados from '../../modules/AccountStatus/deudasTrimestresDeclarados';
import TaxesContext from "../../context/taxes/taxesContext";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../src/_metronic/_helpers";
import DataTable from 'react-data-table-component';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import paginationFactory from 'react-bootstrap-table2-paginator'
import Search from "@material-ui/icons/Search";

function ModalHistoricalDeclaration(props) {

    const { estatus, formatNumber, historico, formatearfecha, sustituirDeclaracion, anos, trimestres, filtarHistorico } = useContext(TaxesContext);
    const selectStatus = estatus;

    const sortIcon = <ArrowDownward />;

    let [selected, setSelected] = useState(false);

    const columnas = [
        {
            name: "",
            button: true,
            cell: row => (
                <>
                    <input type="checkbox" name={'selector'} onClick={()=>sustituirDeclaracion(row, props)} />
                </>
            ),
            width: "15px"
        },
        {
            name: "Concepto",
            selector: row => row.concepto_pago_name,
            sortable: true,
            maxWidth: "200px"
        },
        {
            name: "Año",
            selector: row => row.ano_declaracion,
            sortable: true,
            width: "60px"
        },
        {
            name: "Trim.",
            selector: row => row.trimestre,
            sortable: true,
            width: "70px"
        },
        {
            name: "Fecha declarac.",
            selector: row => row.fecha_declaracion,
            sortable: true,
            width: "130px"
        },
        {
            name: "Fecha emisión",
            selector: row => row.fecha_emision,
            sortable: true,
            maxWidth: "130px"
        },
        {
            name: "Monto",
            selector: row => row.monto_pagado,
            sortable: true,
            maxWidth: "100px"
        },
        {
            name: "Cant. Trab.",
            selector: row => row.ntrabajadores,
            sortable: true,
            maxWidth: "120px"
        },
        {
            name: "Monto tributo",
            selector: row => row.monto_tributo,
            sortable: true,
            maxWidth: "150px"
        },
        {
            name: "Estatus",
            selector: row => row.estatus_name,
            sortable: true,
            maxWidth: "100px"
        }
    ];

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
            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body>
                    <div className="tab-content px-5">
                        <h3>
                            <span className="card-label font-weight-bolder text-dark">Declaración de tributos</span>
                            <br/>
                            <span className="text-muted mt-3 font-weight-bold font-size-sm">Histórico de tributos declarados</span>
                        </h3>
                        <div>
                            <a href="#" variant="outline-info"
                               className="btn btn-info font-weight-bolder font-size-sm mr-3"
                               size="sm"
                               data-dismiss="modal" data-backdrop="false"
                               style={{position: 'absolute', top: '5%', right: '10%' }}
                               onClick={props.onHide}>Cerrar</a>
                        </div>
                    </div>
                    <div className="px-5 mt-6 border-0 ">
                        <div>
                            <Formik
                                initialValues={{
                                    ano_declaracion: "",
                                    trimestre: "",
                                    estatus: ""
                                }}
                                onSubmit={(values) => {
                                    filtarHistorico(values);
                                }}
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
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>

                    <div className="tab-content px-5">
                        <div className="table-responsive">

                            <DataTable
                                columns={columnas}
                                data={historico}
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
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalHistoricalDeclaration;