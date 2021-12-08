import React, {useEffect, useState, Fragment, useContext} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import DataTable  from 'react-data-table-component';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { PlayCircleTwoTone } from '@ant-design/icons';
import Search from '@material-ui/icons/Search';
import './QueryList.css';
import { clientAxios, requestConfig } from '../../config/configAxios';
import Swal from "sweetalert2";
import { Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AuthContext from "../../store/auth-context";
import jwt_decode from "jwt-decode";

import QueryBuilder from '../QueryBuilder/QueryBuilder'; 
import QueryRunner from '../QueryRunner/QueryRunner';

const { confirm } = Modal;

const QueryList = () => {
    const authCtx = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [allQuerys, setAllQuerys] = useState([]);
    const [filterQuerys, setFilterQuerys] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [view, setView] = useState("main");
    const [editRow, setEditRow] = useState({});
    const [uId, setUId] = useState("");

    const styleBtn = { borderRadius: '100%'}
    const sortIcon = <ArrowDownward />;

    const textField = { height: "32px", width: "400px", border: "1px solid #e5e5e5", padding: "0 32px 0 16px", color: "black" }
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

    const paginationOptions = {
        rowsPerPageText: "Consultas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

    const columnas = [
        {
            name: "ID",
            selector: row => Number(row.id),
            sortable: true,
            maxWidth: "20px"
        },
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: true,
            maxWidth: "130px"
        },
        {
            name: "Título",
            selector: row => row.titulo,
            sortable: true,
            maxWidth: "180px"
        },
        {
            name: "Descripción",
            selector: row => row.descripcion,
            sortable: true,
            maxWidth: "350px"
        },
        {
            name: "Acciones",
            button: true,
            cell: row => (
                <>
                    <a title="Ejecutar" style={styleBtn}  onClick={() => onExecute(row)}
                        className="btn btn-icon btn-hover-light btn-sm"
                    >
                        <PlayCircleTwoTone className="play-btn" />
                    </a>
    
                    {uId === row['created_by_user.uid'] &&
                        <a title="Modificar" onClick={() => onEdit(row)}
                        style={styleBtn} className="btn btn-icon btn-hover-light btn-sm">
                            <span className="svg-icon svg-icon-md svg-icon-info">
                                <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}/>
                            </span>
                        </a>
                    }
    
                    {uId === row['created_by_user.uid'] &&
                        <a title="Eliminar" onClick={() => onDelete(row)}
                        style={styleBtn} className="btn btn-icon btn-hover-light btn-sm">
                            <span className="svg-icon svg-icon-md svg-icon-danger">
                                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}/>
                            </span>
                        </a>
                    }
                </>
            )
        }
    ];
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        enableLoading();
        const token = authCtx.token;
        const decoded = jwt_decode(token);
        setUId(decoded && decoded.data ? decoded.data.uid : '');

        let Querys = [];
        
        try {
            const respuesta = await clientAxios.get('/dynamic_query/query/');
            Querys = await respuesta.data.data.map(data => {
                return {
                    id: data.id,
                    ...data.attributes
                };
            });

            setAllQuerys(Querys);
            setFilterQuerys(Querys);

            disableLoading();
        } catch (error) {
            console.log(error);
            disableLoading();
            Swal.fire({
                title: "Resultado de la operación",
                text: "Ocurrió un error obteniendo la data",
                icon: "error",
                timer: 1500
            }).then(() => {
                return;
            });
        }
    }

    const enableLoading = () => {
        setLoading(true);
    };
    
    const disableLoading = () => {
        setLoading(false);
    };

    const onExecute = (row) => {
        setEditRow(row);
        setView('run');
    }

    const onEdit = (row) => {
        setEditRow(row);
        setView('build');
    }

    const confirmDelete = async (id) => {
        requestConfig.data.type = 'operateQuery';
        requestConfig.data.attributes = {};
        requestConfig.data.id = id;
        
        const respuesta = await clientAxios.put(`/dynamic_query/query/${id}`, requestConfig);
        console.log(respuesta);
        fetchData();
    }

    const onDelete = async (row) => {
        confirm({
            title: `¿Seguro que desea eliminar la consulta '${row.id}'?`,
            icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
            content: 'Esta acción no puede deshacerse',
            okText: 'Eliminar',
            cancelText: 'Cancelar',
            okButtonProps: {
                type: 'primary',
                danger: true
            },
            onOk: () => {
                confirmDelete(row.id);
            },
        });
    }

    const cambiarVista = (vista) => {
        setView(vista);
        if (vista === 'main') fetchData();
        if (vista === 'build') setEditRow({});
    }

    const onChange = (e) => {
        setBusqueda(e.target.value);
        const buscar = e.target.value.toLowerCase();
        
        const filtered_data = allQuerys.filter(query => {
            let found = false;

            found = query.nombre.toLowerCase().includes(buscar) ||
                query.titulo.toLowerCase().includes(buscar) ||
                query.descripcion.toLowerCase().includes(buscar);

            return found; 
        });

        setFilterQuerys(filtered_data);
    }

    return (
        <Fragment>
            { view === 'main' && 
                <Card bg="default" text="success">
                    <Card.Body>

                        <Row>
                            <Col md={4}>
                                <Card.Title>
                                    <div className="card-title">
                                        Consultas Dinámicas
                                    </div>
                                </Card.Title>
                            </Col>
                        </Row>

                        <Card.Body>
                            <Container>
                                <div className="tab-content">
                                    <div className="table-responsive">

                                        <a title="Agregar"
                                            className="btn btn-icon btn-warning btn-hover-light btn-md mx-3 add-btn"
                                            onClick={() => cambiarVista('build')}
                                        >
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

                                        <div className="data-table">
                                            <DataTable
                                                columns={columnas}
                                                data={filterQuerys}
                                                pagination
                                                paginationComponentOptions={paginationOptions}
                                                fixedHeader
                                                fixedHeaderScrollHeight="500px"
                                                paginationPerPage={5}
                                                paginationRowsPerPageOptions={[5, 10, 25, 50]}
                                                sortIcon={sortIcon}
                                                customStyles={customStyles}
                                                responsive={true}
                                                noDataComponent="No existen datos para mostrar, agregue una consulta a través del botón '+'"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </Card.Body>
                    </Card.Body>
                </Card>
            }

            { view === 'build' && 
                <QueryBuilder 
                regresar={() => cambiarVista('main')} 
                editar={editRow}
                /> }
            
            { view === 'run' && 
                <QueryRunner 
                regresar={() => cambiarVista('main')} 
                queryData={editRow}
                /> }
        </Fragment>
    );
}

export default QueryList;