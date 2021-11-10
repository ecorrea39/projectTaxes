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
    const [motores, setMotores] = useState([]);
    const [actividadesEconomicas, setActividadesEconomicas] = useState([]);
    const [conceptos, setConceptos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [registrosMercantiles, setRegistrosMercantiles] = useState([]);
    const [medidaValor, setMedidaValor] = useState([]);
    const [motivoSancion, setMotivoSancion] = useState([]);
    const [formDataTables, setFormDataTables] = useState({});
    const [registroSeleccionado, setRegistroSeleccionado] = useState({});

    useEffect(() => {
        getBancos();
        getTrimestres();
        getFormasPago();
        getCuentasRecaudadoras();
        getEstatus();
        getClaseEmpresa();
        getMotores();
        getActividadesEconomicas();
        getConceptos();
        getRegistrosMercantiles();
        getEstados();
        getMedidaValor();
        getMotivoSancion();
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
                        "nom_banco": arreglo[i].attributes.nom_banco,
                        "cod_banco": arreglo[i].attributes.cod_banco,
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
                        "descripcion": arreglo[i].attributes.descripcion,
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

    const getMotores = async () => {

        try {
            const respuesta = await clientAxios.get('/engines/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setMotores(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getActividadesEconomicas = async () => {

        try {
            const respuesta = await clientAxios.get('/economic_activity/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                        "codigo": arreglo[i].attributes.codigo,
                        "id_motor": arreglo[i].attributes.id_motor,
                        "motor": arreglo[i].attributes['motor_motore.name']
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setActividadesEconomicas(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getConceptos = async () => {

        try {
            const respuesta = await clientAxios.get('/payment_concepts/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                        "clave": arreglo[i].attributes.clave
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setConceptos(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getRegistrosMercantiles = async () => {

        try {
            const respuesta = await clientAxios.get('/oficinas_saren/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "id_estado": arreglo[i].attributes.id_estado,
                        "estado_name": arreglo[i].attributes['id_estado_estado.descripcion'],
                        "registradores": arreglo[i].attributes.registradores,
                        "oficina": arreglo[i].attributes.oficina,
                        "direccion_oficina": arreglo[i].attributes.direccion_oficina,
                        "telefono_contacto": arreglo[i].attributes.telefono_contacto,
                        "correo": arreglo[i].attributes.correo
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setRegistrosMercantiles(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getEstados = async () => {

        try {
            const respuesta = await clientAxios.get('/geographic_data_estados/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "cod_estado": arreglo[i].attributes.cod_estado,
                        "descripcion": arreglo[i].attributes.descripcion
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setEstados(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getMedidaValor = async () => {

        try {
            const respuesta = await clientAxios.get('/medida_valor/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "fecha": arreglo[i].attributes.fecha,
                        "valor": arreglo[i].attributes.valor
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setMedidaValor(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getMotivoSancion = async () => {

        try {
            const respuesta = await clientAxios.get('/motivo_sancion/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                        "nveces_mmv": arreglo[i].attributes.nveces_mmv
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setMotivoSancion(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const obtenerValores = (valores) => {
        setRegistroSeleccionado(valores);
    }

    const limpiarSeleccionado = () => {
        setRegistroSeleccionado({});
    }

    const validarDescripcion = (e, props) => {

        let busqueda = false;
        let valor = e.target.value.toUpperCase();

        switch (props.tabla) {
            case "trimestre":
                trimestres.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "forma-pago":
                formasPago.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "estatus-entidad-trabajo":
                estatus.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "clase-empresa":
                claseEmpresa.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "bancos-recaudadores":
                bancos.map((x) => {
                    if(x.nom_banco.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "motores-productivos":
                motores.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "actividad-economica":
                actividadesEconomicas.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "conceptos":
                conceptos.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;
            case "motivo-sancion":
                motivoSancion.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            default:
                break;
        }

        if(busqueda) {
            Swal.fire({
                title: props.titulo,
                text: "La descripción ya existe !",
                icon: "info",
                button: "Ok",
                timer: 2000
            });
        }
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
                            urlTabla = `/trimestres/${valores.id}`;
                            break;

                        case "forma-pago":
                            urlTabla = `/formas_pago/${valores.id}`;
                            break;

                        case "cuentas-recaudadoras":
                            urlTabla = `/cuentas_banco/${valores.id}`;
                            break;

                        case "estatus-entidad-trabajo":
                            urlTabla = `/estatus/${valores.id}`;
                            break;

                        case "clase-empresa":
                            urlTabla = `/company_class/${valores.id}`;
                            break;

                        case "bancos-recaudadores":
                            urlTabla = `/banks/${valores.id}`;
                            break;

                        case "motores-productivos":
                            urlTabla = `/engines/${valores.id}`;
                            break;

                        case "actividad-economica":
                            urlTabla = `/economic_activity/${valores.id}`;
                            break;

                        case "conceptos":
                            urlTabla = `/payment_concepts/${valores.id}`;
                            break;

                        case "registros-mercantiles":
                            urlTabla = `/oficinas_saren/${valores.id}`;
                            break;

                        case "medida-valor":
                            urlTabla = `/medida_valor/${valores.id}`;
                            break;

                        case "motivo-sancion":
                            urlTabla = `/motivo_sancion/${valores.id}`;
                            break;

                        default:
                            break;
                    }

                    const respuesta = clientAxios.delete(urlTabla, requestConfig);

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

                            case "motores-productivos":
                                getMotores();
                                break;

                            case "actividad-economica":
                                getActividadesEconomicas();
                                break;

                            case "conceptos":
                                getConceptos();
                                break;

                            case "registros-mercantiles":
                                getRegistrosMercantiles();
                                break;

                            case "medida-valor":
                                getMedidaValor();
                                break;

                            case "motivo-sancion":
                                getMotivoSancion();
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

                case "motores-productivos":
                    dataType = "saveEngines";
                    urlTabla = "/engines/";
                    break;

                case "actividad-economica":
                    dataType = "saveEconomicActivity";
                    urlTabla = "/economic_activity/";
                    break;

                case "conceptos":
                    dataType = "payment_concepts";
                    urlTabla = "/payment_concepts/";
                    break;

                case "registros-mercantiles":
                    dataType = "oficinas_saren";
                    urlTabla = "/oficinas_saren/";
                    break;

                case "medida-valor":
                    dataType = "saveMedidaValor";
                    urlTabla = "/medida_valor/";
                    break;

                case "motivo-sancion":
                    dataType = "saveMotivoSancion";
                    urlTabla = "/motivo_sancion/";
                    break;

                default:
                    break;
            }

            requestConfig.data.type = dataType;
            requestConfig.data.attributes = valores;
            requestConfig.data.id = (props.accion !== 'Agregar') ? valores.id : '';

            console.log('requestConfig ', requestConfig)

            if(props.accion === 'Agregar') {
                const respuesta = await clientAxios.post(urlTabla, requestConfig);
            } else {
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

                    case "motores-productivos":
                        getMotores();
                        break;

                    case "actividad-economica":
                        getActividadesEconomicas();
                        break;

                    case "conceptos":
                        getConceptos();
                        break;

                    case "registros-mercantiles":
                        getRegistrosMercantiles();
                        break;

                    case "medida-valor":
                        getMedidaValor();
                        break;

                    case "motivo-sancion":
                        getMotivoSancion();
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
                timer: 2000
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
        motores,
        actividadesEconomicas,
        conceptos,
        registrosMercantiles,
        estados,
        medidaValor,
        motivoSancion,
        submitMasterTables,
        setFormDataTables,
        deleteMasterTables,
        registroSeleccionado,
        obtenerValores,
        limpiarSeleccionado,
        validarDescripcion
    }

    return (
        <MasterTablesContext.Provider value={valuesContext}>
            {children}
        </MasterTablesContext.Provider>
    )
}