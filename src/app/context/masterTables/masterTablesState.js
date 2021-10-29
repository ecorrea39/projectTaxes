import React, { useEffect, useState} from 'react';
import { clientAxios, requestConfig } from '../../config/configAxios';
import MasterTablesContext from './masterTablesContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const MasterTablesState = ({ children }) => {

    const [bancos, setBancos] = useState([]);
    const [trimestres, setTrimestres] = useState([]);
    const [formasPago, setFormasPago] = useState([]);
    const [estatus, setEstatus] = useState([]);
    const [cuentasRecaudadoras, setCuentasRecaudadoras] = useState([]);
    const [claseEmpresa, setClaseEmpresa] = useState([]);
    const [formDataTables, setFormDataTables] = useState({});
    const [registroSeleccionado, setRegistroSeleccionado] = useState({});

    useEffect(() => {
        getBancos();
        getTrimestres();
        getFormasPago();
        getCuentasRecaudadoras();
        getEstatus();
        getClaseEmpresa();
    },[]);

    const getBancos = async () => {

        try {
            const respuesta = await clientAxios.get('/banks/');
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.nom_banco,
                        "is_active": arreglo[i].attributes.is_active
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setBancos(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const getTrimestres = async () => {

        try {
            const respuesta = await clientAxios.get('/trimestres/', clientAxios);
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                        "is_active": arreglo[i].attributes.is_active
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setTrimestres(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const getFormasPago = async () => {

        try {
            const respuesta = await clientAxios.get('/formas_pago/', clientAxios);
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                        "is_active": arreglo[i].attributes.is_active
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setFormasPago(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const getCuentasRecaudadoras = async () => {

        try {
            const respuesta = await clientAxios.get('/cuentas_banco/', clientAxios);
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "id_banco": arreglo[i].attributes.id_banco,
                        "name": arreglo[i].attributes['id_banco_banco.nom_banco'],
                        "cuenta_tipo": arreglo[i].attributes.cuenta_tipo,
                        "cuenta_nro": arreglo[i].attributes.cuenta_nro,
                        "is_active": arreglo[i].attributes.is_active
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setCuentasRecaudadoras(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const getEstatus = async () => {

        try {
            const respuesta = await clientAxios.get('/estatus/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                        "is_active": arreglo[i].attributes.is_active
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setEstatus(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getClaseEmpresa = async () => {

        try {
            const respuesta = await clientAxios.get('/company_class/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                        "is_active": arreglo[i].attributes.is_active
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setClaseEmpresa(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const obtenerValores = (valores) => {
        console.log('valores ', valores)
        setRegistroSeleccionado(valores);
    }

    const deleteMasterTables = async (tabla, titulo, valores) => {

        let dataType = "";
        let urlTabla = ""

        try {
            Swal.fire({
                title: titulo,
                text: 'Esta seguro de eliminar el registro?',
                icon: 'info',
                showDenyButton: true,
                denyButtonText: `Cancelar`,
                confirmButtonText: 'Eliminar',
            }).then((result) => {

                if (result.isConfirmed) {
                    switch (tabla) {
                        case "trimestre":
                            dataType = "saveTrimestres";
                            urlTabla = "/trimestres/";
                            break;

                        case "forma-pago":
                            dataType = "saveFormasPago";
                            urlTabla = "/formas_pago/";
                            break;

                        case "cuentas-recaudadoras":
                            dataType = "saveCuentasBanco";
                            urlTabla = "/cuentas_banco/";
                            break;

                        case "estatus-entidad-trabajo":
                            dataType = "saveEstatus";
                            urlTabla = "/estatus/";
                            break;

                        case "clase-empresa":
                            dataType = "saveCompanyClass";
                            urlTabla = "/company_class/";
                            break;

                        case "bancos-recaudadores":
                            dataType = "banks";
                            urlTabla = "/banks/";
                            break;

                        default:
                            break;
                    }

                    requestConfig.data.type = dataType;
                    requestConfig.data.attributes = valores;
                    requestConfig.data.id = valores.id;
                    requestConfig.data.attributes.is_active = !valores.is_active;

                    const respuesta = clientAxios.put(urlTabla, requestConfig);

                    Swal.fire({
                        title: titulo,
                        text: "Registro elimnado con éxito!",
                        icon: "success",
                        button: "Ok",
                        timer: 1500
                    }).then((value) => {
                        switch (tabla) {
                            case "trimestre":
                                getTrimestres();
                                break;

                            case "forma-pago":
                                getFormasPago();
                                break;

                            case "cuentas-recaudadoras":
                                getCuentasRecaudadoras();
                                break;

                            case "estatus-entidad-trabajo":
                                getEstatus();
                                break;

                            case "clase-empresa":
                                getClaseEmpresa();
                                break;

                            case "bancos-recaudadores":
                                getBancos();
                                break;

                            default:
                                break;
                        }
                    });
                }
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: titulo,
                text: "Error al intentar eliminar registro!",
                icon: "error",
                button: "Ok",
            });
        }
    }

    const submitMasterTables = async (valores, props) => {

        let dataType = "";
        let urlTabla = ""

        try {

            switch (props.tabla) {
                case "trimestre":
                    dataType = "saveTrimestres";
                    urlTabla = "/trimestres/";
                    break;

                case "forma-pago":
                    dataType = "saveFormasPago";
                    urlTabla = "/formas_pago/";
                    break;

                case "cuentas-recaudadoras":
                    dataType = "saveCuentasBanco";
                    urlTabla = "/cuentas_banco/";
                    break;

                case "estatus-entidad-trabajo":
                    dataType = "saveEstatus";
                    urlTabla = "/estatus/";
                    break;

                case "clase-empresa":
                    dataType = "saveCompanyClass";
                    urlTabla = "/company_class/";
                    break;

                case "bancos-recaudadores":
                    dataType = "banks";
                    urlTabla = "/banks/";
                    break;

                default:
                    break;
            }

            requestConfig.data.type = dataType;
            requestConfig.data.attributes = valores;
            requestConfig.data.id = (props.accion !== 'Agregar') ? valores.id : '';

            console.log('requestConfig ', requestConfig)

            if(props.accion === 'Agregar') {
                console.log('agrgar')
                const respuesta = await clientAxios.post(urlTabla, requestConfig);
            } else {
                console.log('modificar')
                const respuesta = await clientAxios.put(urlTabla, requestConfig);
            }

            props.onHide();
            Swal.fire({
                title: props.titulo,
                text: `Datos ${ props.accion === 'Agregar'? 'guadados' : 'actualizados' } con éxito!`,
                icon: "success",
                button: "Ok",
                timer: 1500
            }).then((value) => {
                switch (props.tabla) {
                    case "trimestre":
                        getTrimestres();
                        break;

                    case "forma-pago":
                        getFormasPago();
                        break;

                    case "cuentas-recaudadoras":
                        getCuentasRecaudadoras();
                        break;

                    case "estatus-entidad-trabajo":
                        getEstatus();
                        break;

                    case "clase-empresa":
                        getClaseEmpresa();
                        break;

                    case "bancos-recaudadores":
                        getBancos();
                        break;

                    default:
                        break;
                }
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: props.titulo,
                text: `Error al intentar ${ props.accion === 'Agregar' ? 'guardar' : 'actualizar' } registro!`,
                icon: "error",
                button: "Ok",
            });
        }
    }

    const valuesContext = {
        bancos,
        trimestres,
        formasPago,
        cuentasRecaudadoras,
        estatus,
        claseEmpresa,
        submitMasterTables,
        setFormDataTables,
        deleteMasterTables,
        registroSeleccionado,
        obtenerValores
    }

    return (
        <MasterTablesContext.Provider value={valuesContext}>
            {children}
        </MasterTablesContext.Provider>
    )
}