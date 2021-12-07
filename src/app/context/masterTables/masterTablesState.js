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
    const [municipios, setMunicipios] = useState([]);
    const [registrosMercantiles, setRegistrosMercantiles] = useState([]);
    const [medidaValor, setMedidaValor] = useState([]);
    const [motivoSancion, setMotivoSancion] = useState([]);
    const [diasFestivos, setDiasFestivos] = useState([]);
    const [anos, setAnos] = useState([]);
    const [tasaIntereses, setTasaIntereses] = useState([]);
    const [sectores, setSectores] = useState([]);
    const [vialidades, setVialidades] = useState([]);
    const [locales, setLocales] = useState([]);
    const [edificaciones, setEdificaciones] = useState([]);
    const [tipoDocumento, setTipoDocumento] = useState([]);
    const [tipoContribuyente, setTipoContribuyente] = useState([]);
    const [cuentasContables, setCuentasContables] = useState([]);
    const [firmasAutorizadas, setFirmasAutorizadas] = useState([]);
    const [unidadEstadal, setUnidadEstadal] = useState([]);
    const [formDataTables, setFormDataTables] = useState({});
    const [registroSeleccionado, setRegistroSeleccionado] = useState({});

    const listReportes = ["Certificado de Solvencia","Resolución de incumplimiento de deberes formales"];
    const listRegiones = ['Central','Centro Occidental','Dependencias Federales','Guayana','La Guaira','Los Andres','Los Llanos','Nor Oriental','Otras Dependencias Federales (M)','Región Capital','Registro de Normalización (Municipio)','Zuliana'];
    const listRedi = ['Redi Andres','Redi Central','Redi Centro Occidente','Redi Guayana','Redi Llanos','Redi Oriente'];

    let dataAux = [];

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
        getMunicipios();
        getMedidaValor();
        getMotivoSancion();
        getDiasFestivos();
        getTasaIntereses();
        getAnos();
        getSectores();
        getVialidades();
        getLocales();
        getEdificaciones();
        getTipoDocumento();
        getTipoContribuyente();
        getCuentasContables();
        getFirmasAutorizadas();
        getUnidadEstadalTributos();
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
                        "id": arreglo[i].id,
                        "cod_estado": arreglo[i].attributes.cod_estado,
                        "descripcion": arreglo[i].attributes.descripcion,
                        "region": arreglo[i].attributes.region,
                        "redi": arreglo[i].attributes.redi,
                        "unidad_estadal": arreglo[i].attributes.unidad_estadal
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setEstados(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getMunicipios = async () => {

        try {
            const respuesta = await clientAxios.get('/geographic_data_municipios/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "cod_municipio": arreglo[i].attributes.cod_municipio,
                        "id_estado": arreglo[i].attributes.id_estado,
                        "descripcion": arreglo[i].attributes.descripcion,
                        "estado": arreglo[i].attributes['id_estado_estado.descripcion']
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setMunicipios(lista);

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
                        "fecha": formatearfecha(new Date(arreglo[i].attributes.fecha), 'DMY'),
                        "fecha_original": arreglo[i].attributes.fecha,
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

    const getDiasFestivos = async () => {

        try {
            const respuesta = await clientAxios.get('/dias_festivos/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "ano": arreglo[i].attributes.ano,
                        "fecha": formatearfecha(new Date(arreglo[i].attributes.fecha), 'DMY'),
                        "fecha_original": arreglo[i].attributes.fecha
                    }
                )
            });
            lista.sort((a, b) => a.ano - b.ano ? -1 : +(a.ano > b.ano));
            setDiasFestivos(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getTasaIntereses = async () => {

        try {
            const respuesta = await clientAxios.get('/tasa_intereses/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "ano": arreglo[i].attributes.ano,
                        "mes": arreglo[i].attributes.mes,
                        "tasa_bcv": arreglo[i].attributes.tasa_bcv,
                        "recargo_cot": arreglo[i].attributes.recargo_cot,
                        "tasa_intereses_mora": arreglo[i].attributes.tasa_intereses_mora,
                        "ngaceta": arreglo[i].attributes.ngaceta,
                        "fecha_gaceta": arreglo[i].attributes.fecha_gaceta
                    }
                )
            });
            lista.sort((a, b) => a.ano - b.ano ? -1 : +(a.ano > b.ano));
            setTasaIntereses(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getAnos = async () => {

        try {
            let fecha = new Date();
            let ano = Number(fecha.getFullYear())+1;
            let res = [];
            for (let i = 0; i < 11; i++) {
                res.push(ano);
                ano--;
            }
            setAnos(res);
        } catch (error) {
            console.log(error)
        }

    }

    const getSectores = async () => {

        try {
            const respuesta = await clientAxios.get('/sectores/', clientAxios);

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
            setSectores(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getVialidades = async () => {

        try {
            const respuesta = await clientAxios.get('/vialidades/', clientAxios);

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
            setVialidades(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getLocales = async () => {

        try {
            const respuesta = await clientAxios.get('/locales/', clientAxios);

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
            setLocales(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getEdificaciones = async () => {

        try {
            const respuesta = await clientAxios.get('/edificaciones/', clientAxios);

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
            setEdificaciones(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getTipoDocumento = async () => {

        try {
            const respuesta = await clientAxios.get('/tipo_documento/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "codigo": arreglo[i].attributes.codigo,
                        "name": arreglo[i].attributes.name
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setTipoDocumento(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getTipoContribuyente = async () => {

        try {
            const respuesta = await clientAxios.get('/tipo_contribuyente/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                        "descripcion": arreglo[i].attributes.descripcion
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setTipoContribuyente(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getCuentasContables = async () => {

        try {
            const respuesta = await clientAxios.get('/cuentas_contables/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "concepto": arreglo[i].attributes.concepto,
                        "codigo_cuenta": arreglo[i].attributes.codigo_cuenta,
                        "naturaleza_cuenta": arreglo[i].attributes.naturaleza_cuenta,
                        "grupo": arreglo[i].attributes.grupo,
                        "sub_grupo": arreglo[i].attributes.sub_grupo,
                        "auxiliar": arreglo[i].attributes.auxiliar
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setCuentasContables(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getFirmasAutorizadas = async () => {

        try {
            const respuesta = await clientAxios.get('/firmas_autorizadas/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "documento": listReportes.filter(x => x === arreglo[i].attributes.documento),
                        "reporte": "",
                        "nombre": arreglo[i].attributes.nombre,
                        "cargo": arreglo[i].attributes.cargo,
                        "ngaceta": arreglo[i].attributes.ngaceta,
                        "fecha_gaceta": arreglo[i].attributes.fecha_gaceta,
                        "orden_administrativa": arreglo[i].attributes.orden_administrativa
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setFirmasAutorizadas(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getUnidadEstadalTributos = async () => {

        try {
            const respuesta = await clientAxios.get('/unidad_estadal/', clientAxios);

            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "cod": arreglo[i].attributes.cod,
                        "asignacion": arreglo[i].attributes.asignacion
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setUnidadEstadal(lista);

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

    const validarDescripcion = (e, props, formik) => {

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

            case "sectores":
                sectores.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "vialidades":
                vialidades.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "locales":
                locales.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "edificaciones":
                edificaciones.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "tipo_documento":
                tipoDocumento.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "tipo_contribuyente":
                tipoContribuyente.map((x) => {
                    if(x.name.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "estados":
                estados.map((x) => {
                    if(x.descripcion.toUpperCase().trim() === valor.trim()) {
                        busqueda = true;
                    }
                });
                break;

            case "municipios":
                municipios.map((x) => {
                    if(x.descripcion.toUpperCase().trim() === valor.trim() && Number(x.id_estado) === Number(formik.values.id_estado)) {
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

                        case "dias-festivos":
                            urlTabla = `/dias_festivos/${valores.id}`;
                            break;

                        case "tasa-intereses":
                            urlTabla = `/tasa_intereses/${valores.id}`;
                            break;

                        case "sectores":
                            urlTabla = `/sectores/${valores.id}`;
                            break;

                        case "vialidades":
                            urlTabla = `/vialidades/${valores.id}`;
                            break;

                        case "locales":
                            urlTabla = `/locales/${valores.id}`;
                            break;

                        case "edificaciones":
                            urlTabla = `/edificaciones/${valores.id}`;
                            break;

                        case "tipo-documentos":
                            urlTabla = `/tipo_documento/${valores.id}`;
                            break;

                        case "tipo-contribuyente":
                            urlTabla = `/tipo_contribuyente/${valores.id}`;
                            break;

                        case "cuentas-contables":
                            urlTabla = `/cuentas_contables/${valores.id}`;
                            break;

                        case "firmas-autorizadas":
                            urlTabla = `/firmas_autorizadas/${valores.id}`;
                            break;

                        case "estados":
                            urlTabla = `/geographic_data_estados/${valores.id}`;
                            break;

                        case "municipios":
                            urlTabla = `/geographic_data_municipios/${valores.id}`;
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
                        actualizarTablas(tabla);
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

                case "dias-festivos":
                    dataType = "saveDiasFestivos";
                    urlTabla = "/dias_festivos/";
                    break;

                case "tasa-intereses":
                    dataType = "saveTasaIntereses";
                    urlTabla = "/tasa_intereses/";
                    break;

                case "sectores":
                    dataType = "saveSectores";
                    urlTabla = "/sectores/";
                    break;

                case "vialidades":
                    dataType = "saveVialidades";
                    urlTabla = "/vialidades/";
                    break;

                case "locales":
                    dataType = "saveLocales";
                    urlTabla = "/locales/";
                    break;

                case "edificaciones":
                    dataType = "saveEdificaciones";
                    urlTabla = "/edificaciones/";
                    break;

                case "tipo-documentos":
                    dataType = "saveTipoDocumento";
                    urlTabla = "/tipo_documento/";
                    break;

                case "tipo-contribuyente":
                    dataType = "saveTipoContribuyente";
                    urlTabla = "/tipo_contribuyente/";
                    break;

                case "cuentas-contables":
                    dataType = "saveCuentasContables";
                    urlTabla = "/cuentas_contables/";
                    break;

                case "firmas-autorizadas":
                    dataType = "saveFirmasAutorizadas";
                    urlTabla = "/firmas_autorizadas/";
                    break;

                case "estados":
                    dataType = "saveGeographicDataEstados";
                    urlTabla = "/geographic_data_estados/";
                    break;

                case "municipios":
                    dataType = "saveGeographicDataMunicipios";
                    urlTabla = "/geographic_data_municipios/";
                    break;

                default:
                    break;
            }

            requestConfig.data.type = dataType;
            requestConfig.data.attributes = valores;
            requestConfig.data.id = (props.accion !== 'Agregar') ? valores.id : '';

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
                actualizarTablas(props.tabla);
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

    const actualizarTablas = (tablaName) => {

        switch (tablaName) {
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

            case "dias-festivos":
                getDiasFestivos();
                break;

            case "tasa-intereses":
                getTasaIntereses();
                break;

            case "sectores":
                getSectores();
                break;

            case "vialidades":
                getVialidades();
                break;

            case "locales":
                getLocales();
                break;

            case "edificaciones":
                getEdificaciones();
                break;

            case "tipo-documentos":
                getTipoDocumento();
                break;

            case "tipo-contribuyente":
                getTipoContribuyente();
                break;

            case "cuentas-contables":
                getCuentasContables();
                break;

            case "firmas-autorizadas":
                getFirmasAutorizadas();
                break;

            case "estados":
                getEstados();
                break;

            case "municipios":
                getMunicipios();
                break;

            default:
                break;
        }
    }

    const filtrarElementos = async (tabla, palabra, columnas) => {

        await getListaOriginal(tabla);

        let search = ""

        /* trimestre, forma-pago, estatus-entidad, motores, sectores, vialidades, locales, edificaciones */
        if (columnas === 'col-1') {
            search = dataAux.filter(item =>
                item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase()) || item.id.toString().includes(palabra)
            );
        }

        /* cuentas recaudadoras */
        if (columnas === 'col-2') {
            search = dataAux.filter(item =>
                item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.cuenta_tipo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.cuenta_nro.toString().includes(palabra)

            );
        }

        /* bancos recaudadores */
        if (columnas === 'col-3') {
            search = dataAux.filter(item =>
                item.nom_banco.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.cod_banco.toString().includes(palabra)
            );
        }

        /* clase de empresas */
        if (columnas === 'col-4') {
            search = dataAux.filter(item =>
                item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
            );
        }

        /* actividades económicas */
        if (columnas === 'col-5') {
            search = dataAux.filter(item =>
                item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.codigo.toString().includes(palabra)
                || item.motor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
            );
        }

        /* conceptos */
        if (columnas === 'col-6') {
            search = dataAux.filter(item =>
                item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.clave.toString().includes(palabra)
            );
        }

        /* registros mercantiles */
        if (columnas === 'col-7') {
            search = dataAux.filter(item =>
                item.estado_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.oficina.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
            );
        }

        /* medida valor */
        if (columnas === 'col-8') {
            search = dataAux.filter(item =>
                item.id.toString().includes(palabra)
                || item.fecha.toString().includes(palabra)
                || item.valor.toString().includes(palabra)
            );
        }

        /* motivo de sanción */
        if (columnas === 'col-9') {
            search = dataAux.filter(item =>
                item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.nveces_mmv.toString().includes(palabra)
            );
        }

        /* días festivos */
        if (columnas === 'col-10') {//aqui
            search = dataAux.filter(item =>
                item.ano.toString().includes(palabra)
                || item.fecha.toString().includes(palabra)
            );
        }

        /* tasa intereses */
        if (columnas === 'col-11') {//aqui
            search = dataAux.filter(item =>
                item.ano.toString().includes(palabra)
                || item.mes.toString().includes(palabra)
                || item.tasa_bcv.toString().includes(palabra)
                || item.recargo_cot.toString().includes(palabra)
                || item.tasa_intereses_mora.toString().includes(palabra)
                || item.ngaceta.toString().includes(palabra)
                || item.fecha_gaceta.toString().includes(palabra)
            );
        }

        /* tipo de documento */
        if (columnas === 'col-12') {
            search = dataAux.filter(item =>
                item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.codigo.toString().includes(palabra)
            );
        }

        /* tipo de contribuyente */
        if (columnas === 'col-13') {
            search = dataAux.filter(item =>
                item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
            );
        }

        /* cuentas contables */
        if (columnas === 'col-14') {
            search = dataAux.filter(item => //aqui
                item.concepto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.codigo_cuenta.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.naturaleza_cuenta.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.grupo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.sub_grupo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.auxiliar.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
            );
        }

        /* firmas autorizadas */
        if (columnas === 'col-15') {
            search = dataAux.filter(item =>
                item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.cargo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.ngaceta.toString().includes(palabra)
                || item.fecha_gaceta.toString().includes(palabra)
                || item.orden_administrativa.toString().includes(palabra)
            );
        }

        /* estados */
        if (columnas === 'col-16') {
            search = dataAux.filter(item =>
                item.region.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.redi.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.cod_estado.toString().includes(palabra)
                || item.unidad_estadal.toString().includes(palabra)
            );
        }

        /* municipios */
        if (columnas === 'col-17') {
            search = dataAux.filter(item =>
                item.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.estado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase())
                || item.id.toString().includes(palabra)
                || item.cod_municipio.toString().includes(palabra)
            );
        }

        if(palabra === '') {
            actualizarTablas(tabla);
        } else {
            switch (tabla) {
                case "trimestre":
                    setTrimestres(search);
                    break;

                case "forma-pago":
                    setFormasPago(search);
                    break;

                case "cuentas-recaudadoras":
                    setCuentasRecaudadoras(search);
                    break;

                case "estatus-entidad-trabajo":
                    setEstatus(search);
                    break;

                case "clase-empresa":
                    setClaseEmpresa(search);
                    break;

                case "bancos-recaudadores":
                    setBancos(search);
                    break;

                case "motores-productivos":
                    setMotores(search);
                    break;

                case "actividad-economica":
                    setActividadesEconomicas(search);
                    break;

                case "conceptos":
                    setConceptos(search);
                    break;

                case "registros-mercantiles":
                    setRegistrosMercantiles(search);
                    break;

                case "medida-valor":
                    setMedidaValor(search);
                    break;

                case "motivo-sancion":
                    setMotivoSancion(search);
                    break;

                case "dias-festivos":
                    setDiasFestivos(search);
                    break;

                case "tasa-intereses":
                    setTasaIntereses(search);
                    break;

                case "sectores":
                    setSectores(search);
                    break;

                case "vialidades":
                    setVialidades(search);
                    break;

                case "locales":
                    setLocales(search);
                    break;

                case "edificaciones":
                    setEdificaciones(search);
                    break;

                case "tipo-documentos":
                    setTipoDocumento(search);
                    break;

                case "tipo-contribuyente":
                    setTipoContribuyente(search);
                    break;

                case "cuentas-contables":
                    setCuentasContables(search);
                    break;

                case "firmas-autorizadas":
                    setFirmasAutorizadas(search);
                    break;

                case "estados":
                    setEstados(search);
                    break;

                case "municipios":
                    setMunicipios(search);
                    break;

                default:
                    break;
            }

        }

    }

    const formatearfecha = (f, formato) => {
        const ano = f.getFullYear();
        const mes = ("0" + (f.getMonth()+1)).substr(-2);
        const dia = ("0" + f.getDate()).substr(-2);

        let fecha;

        if(formato === 'DMY') fecha = `${dia}-${mes}-${ano}`
        else if(formato === 'YMD') fecha = `${ano}-${mes}-${dia}`;

        return fecha;
    }

    const getListaOriginal = (tablaName) => {

        switch (tablaName) {
            case "trimestre":
                dataAux = trimestres;
                break;

            case "forma-pago":
                dataAux = formasPago;
                break;

            case "cuentas-recaudadoras":
                dataAux = cuentasRecaudadoras;
                break;

            case "estatus-entidad-trabajo":
                dataAux = estatus;
                break;

            case "clase-empresa":
                dataAux = claseEmpresa;
                break;

            case "bancos-recaudadores":
                dataAux = bancos;
                break;

            case "motores-productivos":
                dataAux = motores;
                break;

            case "actividad-economica":
                dataAux = actividadesEconomicas;
                break;

            case "conceptos":
                dataAux = conceptos;
                break;

            case "registros-mercantiles":
                dataAux = registrosMercantiles;
                break;

            case "medida-valor":
                dataAux = medidaValor;
                break;

            case "motivo-sancion":
                dataAux = motivoSancion;
                break;

            case "dias-festivos":
                dataAux = diasFestivos;
                break;

            case "tasa-intereses":
                dataAux = tasaIntereses;
                break;

            case "sectores":
                dataAux = sectores;
                break;

            case "vialidades":
                dataAux = vialidades;
                break;

            case "locales":
                dataAux = locales;
                break;

            case "edificaciones":
                dataAux = edificaciones;
                break;

            case "tipo-documentos":
                dataAux = tipoDocumento;
                break;

            case "tipo-contribuyente":
                dataAux = tipoContribuyente;
                break;

            case "cuentas-contables":
                dataAux = cuentasContables;
                break;

            case "firmas-autorizadas":
                dataAux = firmasAutorizadas;
                break;

            case "estados":
                dataAux = estados;
                break;

            case "municipios":
                dataAux = municipios;
                break;

            default:
                break;
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
        municipios,
        medidaValor,
        motivoSancion,
        diasFestivos,
        tasaIntereses,
        anos,
        sectores,
        vialidades,
        locales,
        edificaciones,
        tipoDocumento,
        tipoContribuyente,
        cuentasContables,
        firmasAutorizadas,
        unidadEstadal,
        listReportes,
        listRegiones,
        listRedi,
        submitMasterTables,
        setFormDataTables,
        deleteMasterTables,
        registroSeleccionado,
        obtenerValores,
        limpiarSeleccionado,
        validarDescripcion,
        filtrarElementos
    }

    return (
        <MasterTablesContext.Provider value={valuesContext}>
            {children}
        </MasterTablesContext.Provider>
    )
}