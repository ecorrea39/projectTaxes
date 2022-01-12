import React, { useEffect, useState} from 'react';
import {clientAxios, requestConfig } from '../../config/configAxios';
import TaxesContext from './taxesContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const TaxesState = ({ children }) => {

    const [stepTaxes, setStepTaxes ] = useState(1);
    const [bancos, setBancos] = useState([]);
    const [usts, setUSTs] = useState([]);
    const [conceptos, setConceptos] = useState([
       /* {clave: "01", id: "1", name: "Aporte patronal 2%"},
        {clave: "02", id: "2", name: "Aporte de los trabajadores 0,5%"},
        {clave: "03", id: "3", name: "Acta de reparo"},
        {clave: "04", id: "4", name: "Resolucion administrativa"},
        {clave: "05", id: "5", name: "Resolución culminatoria del sumario"},
        {clave: "06", id: "6", name: "Resolucion por incumplimiento deberes formales"},
        {clave: "07", id: "7", name: "Resolucion por incumplimiento deberes materiales"},
        {clave: "08", id: "8", name: "Convenio de pago"},
        {clave: "09", id: "9", name: "Cheques devueltos"},
        {clave: "10", id: "10", name: "Multas porcentuales"},
        {clave: "11", id: "11", name: "Intereses de mora"},
        {clave: "12", id: "12", name: "Crédito fiscal"}*/
    ]);
    const [anos, setAnos] = useState([]);
    const [trimestres, setTrimestres] = useState([]);
    const [formatoFechaFutura, setFormatoFechaFutura] = useState();    
    const [formDataPayment, setFormDataPayment] = useState({});
    const [formSummary, setFormSummary] = useState({});
    const [formDataDeclaration, setFormDataDeclaration] = useState({
        /*declaraciones: [
            {
                ano_declaracion: "2020",
                concepto_pago: "1",
                estatus: "1",
                fecha_declaracion: "2020-04-13", // para calcular los iteres del 2%
                fecha_emision: "0001-01-01", // para calcular los interes de 0.5%
                monto_intereses: "0",
                monto_multa: "0",
                monto_pagado: "1875",
                monto_tributo: 37.5,
                ntrabajadores: "25",
                ntrabajadores_liquidados: "0",
                sustitutiva: "1",
                terms: true,
                trimestre: "1"
            },
            {
                ano_declaracion: "2021",
                concepto_pago: "1",
                estatus: "1",
                fecha_declaracion: "2020-04-22",
                fecha_emision: "0001-01-01",
                monto_intereses: "0",
                monto_multa: "0",
                monto_pagado: "1875",
                monto_tributo: 37.5,
                ntrabajadores: "25",
                ntrabajadores_liquidados: "0",
                sustitutiva: "1",
                terms: true,
                trimestre: "1"
            }
        ],
        termsG: true*/
    });
    const [userData, setUserData] = useState({});
    const [historico, setHistorico] = useState([]);
    const [historicoOriginal, setHistoricoOriginal] = useState([]);
    //const [historicoFilter, setHistoricoFilter] = useState([]);
    const [declaracionSustitutiva, setDeclaracionSustitutiva] = useState(false);
    const [declaracionSeleccionada, setDeclaracionSeleccionada] = useState([]);
    const [totalTributoDeclarado, setTotalTributoDeclarado] = useState();
    const [declaracionesRealizadas, setDeclaracionesRealizadas] = useState([
        /*{
            attributes: {
                data: {
                    ano_declaracion: "2021",
                    concepto_pago: 1,
                    createdAt: "2021-12-22T18:37:42.996Z",
                    created_by: 2,
                    estatus: 1,
                    fecha_declaracion: "2020-04-22",
                    fecha_emision: "0001-01-01T00:00:00.000Z",
                    id: 6,
                    last_modified_by: null,
                    monto_intereses: "0.00",
                    monto_multa: "0.00",
                    monto_pagado: "2500.00",
                    monto_tributo: "50.15",
                    ntrabajadores: 25,
                    ntrabajadores_liquidados: 0,
                    sustitutiva: 1,
                    terms: true,
                    trimestre: 1,
                    updatedAt: "2021-12-22T18:37:42.996Z",
                    users_id: 2
                },
                typw: "tributeDeclaration"
            }
        },
        {
            attributes: {
                data: {
                    ano_declaracion: "2021",
                    concepto_pago: 1,
                    createdAt: "2021-12-22T18:37:42.996Z",
                    created_by: 2,
                    estatus: 1,
                    fecha_declaracion: "2020-04-22",
                    fecha_emision: "0001-01-01T00:00:00.000Z",
                    id: 7,
                    last_modified_by: null,
                    monto_intereses: "0.00",
                    monto_multa: "0.00",
                    monto_pagado: "2500.00",
                    monto_tributo: "50.00",
                    ntrabajadores: 25,
                    ntrabajadores_liquidados: 0,
                    sustitutiva: 1,
                    terms: true,
                    trimestre: 1,
                    updatedAt: "2021-12-22T18:37:42.996Z",
                    users_id: 2
                },
                typw: "tributeDeclaration"
            }
        }    */
    ]);
    const [selConcepto, setSelConcepto] = useState([]);
    const estatus = ['eliminada', 'creada', 'definitiva', 'pagada' ];
    const nrif = odb.get('rif');
    const [modalidadesPagos, setModalidadPagos] = useState([]);
    const [linkRecibo, setLinkRecibo] = useState("");
    const [codigoUnico, setCondigoUnico] = useState("");

    const [actaReparo, setActaR] = useState({
        numActa: "",
        fechaActa: "",
        montoActa: ""});
    const [reAdmin, setReAdmin] = useState({
        numResolucionAdmin: "",
        fechaResolucionAdmin: "",
        montoMultaResolucionAdmin: "",
        montoInteresesResolucionAdmin: ""
    });
    const [reCul, setReCul] = useState({
        numResolucionCul: "",
        fechaResolucionCul: "",
        montoMultaResolucionCul: ""
    });
    const [debForm, setDebForm] = useState({
        numResolucionForm: "",
        fechaResolucionForm: "",
        montoMultaResolucionForm: ""
    });
    const [debMat, setDebMat] = useState({
        numResolucionMat: "",
        fechaResolucionMat: "",
        montoMultaResolucionMat: ""
    });
    const [conv, setConv] = useState({
        numConvPago: "",
        fechaConvenio: "",
        numGiroConvenioPago: "",
        fechaVencConvenio: "",
        montoConvenio: "",
        montoInteresesConvenio: ""
    });
    const [cheq, setCheq] = useState({
        numCheque: "",
        fechaCheque: "",
        notaDebito: "",
        fechaNotaDebito: "",
        montoCheque: ""
    });
    const [multa, setMulta] = useState({
        montoMulta: ""
    });
    const [intereses, setIntereses] = useState({
        montoInteresesMoratorios: ""
    });
    const [creditoFiscal, setCreditoFiscal] = useState({
        montoCredito: ""
    });

    useEffect(() => {
        getBancos();
        getConceptos();
        getModalidadDePagos();
        getAnos();
        getTrimestres();
        getHistoricoDeclaraciones();
        getFechaFutura();
        formatearfecha(new Date(), 'YMD');
        getUST();
    },[]);

    const getUST = async () => {

        try {
            const respuesta = await clientAxios.get('/unidad_estadal/');
            setUSTs(respuesta.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    const getBancos = async () => {

        try {
            const respuesta = await clientAxios.get('/cuentas_banco/');
            setBancos(respuesta.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    const getModalidadDePagos = async () => {

        try {
            const respuesta = await clientAxios.get('/formas_pago/');
            setModalidadPagos(respuesta.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    const getConceptos = async () => {

        try {
            const respuesta = await clientAxios.get('/payment_concepts/');
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "clave": arreglo[i].attributes.clave,
                        "name": arreglo[i].attributes.name,
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setConceptos(lista);

        } catch (error) {
            console.log(error)
        }

    }

    const getAnos = async () => {

        try {
            let fecha = new Date();
            let ano = Number(fecha.getFullYear());
            let res = [];
            for (let i = 0; i < 10; i++) {
                res.push(ano);
                ano--;
            }
            setAnos(res);
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
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setTrimestres(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const getUserData = async (rif) => {
        
        try {
            requestConfig.data.type = "userCompany";
            const respuesta = await clientAxios.get(`/users/${rif}`);
            //const respuesta = await clientAxios.post(`/user_company/`, requestConfig);
            setUserData(respuesta.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    const getHistoricoDeclaraciones = async () => {

        let arreglo = [];
        const histo = [];

        try {
            const respuesta = await clientAxios.get(`/tribute_declaration/${nrif}`, clientAxios);
            arreglo = respuesta.data.data;

            arreglo.map((x, i) => {
                histo.push(
                    {
                        "id": arreglo[i].id,
                        "selector": false,
                        "concepto_pago": arreglo[i].attributes.concepto_pago,
                        "concepto_pago_name": arreglo[i].attributes['concepto_pago_concepto.name'],
                        "trimestre": arreglo[i].attributes.trimestre,
                        "ano_declaracion": arreglo[i].attributes.ano_declaracion,
                        "ntrabajadores": arreglo[i].attributes.ntrabajadores,
                        "ntrabajadores_liquidados": arreglo[i].attributes.ntrabajadores_liquidados,
                        "monto_pagado": arreglo[i].attributes.monto_pagado,
                        "monto_tributo": arreglo[i].attributes.monto_tributo,
                        "terms": arreglo[i].attributes.terms,
                        "sustitutiva": arreglo[i].attributes.sustitutiva,
                        "fecha_emision": arreglo[i].attributes.concepto_pago === 2 ? formatearfecha(new Date(arreglo[i].attributes.fecha_emision), 'DMY') : '',
                        "fecha_declaracion": formatearfecha(new Date(arreglo[i].attributes.fecha_declaracion), 'DMY'),
                        "estatus": arreglo[i].attributes.estatus,
                        "estatus_name": estatus[arreglo[i].attributes.estatus]
                    }
                )
            })
            histo.sort(fieldSorter(['concepto_pago','ano_declaracion', 'trimestre']));
            setHistorico(histo);
            setHistoricoOriginal(histo);

        } catch (error) {
            console.log(error)
        }

    }

    const fieldSorter = (fields) => (a, b) => fields.map(o => {
        let dir = 1;
        if (o[0] === '-') { dir = -1; o=o.substring(1); }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);

    const getFechaFutura = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let day = fecha.getDate();
        if (month < 10) month = '0' + month.toString();
        if (day < 10) day = '0' + day.toString();
        setFormatoFechaFutura(year + '-' + month + '-' + day);
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

    function formatNumber(number) {
        return new Intl.NumberFormat("ES-ES", {
            style: "currency",
            currency: "VED"
        }).format(number)
    }

    const sustituirDeclaracion = (i, props) => {

        const seleccion = i;

        try {
            if (seleccion.estatus === 2 || seleccion.estatus === 3 ) {
                Swal.fire({
                    title: "Declaración de tributos",
                    text: "Declaración seleccionada con estatus Definitiva/Pagada, no puede ser modificada",
                    icon: 'warning',
                    denyButtonText: `Ok`
                });
            } else {
                Swal.fire({
                    title: 'Declaración de tributos',
                    text: "Esta seguro de sustituir la declaración?",
                    icon: 'info',
                    showDenyButton: true,
                    confirmButtonText: 'Sustituir',
                    denyButtonText: `Cancelar`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setDeclaracionSustitutiva(true);
                        setDeclaracionSeleccionada(seleccion)
                        props.onHide();
                    } else if (result.isDenied) {
                        setDeclaracionSustitutiva(false);
                        setDeclaracionSeleccionada([]);
                        setHistorico(historicoOriginal);
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }


    const validateAmount = (montoConcepto, monto) => {
        if(montoConcepto + totalTributoDeclarado > monto) {
            Swal.fire({
                icon: 'error',
                title: "Pago de tributos",
                text: 'Verifique que los montos de los conceptos no superen al monto del pago.',
                showConfirmButton: true,
                timer: 3000
            })
            return;
        }
    }

    const submitPayment = async (formData) => {
        
        try {
            requestConfig.data.type = "savePaymentDec";
            requestConfig.data.id = "j333333332"; // -> SI CAMBIO ESTE RIF FALLA LA PETICION
            requestConfig.data.attributes = formData;
            console.log(requestConfig)
            const respuesta = await clientAxios.post('/payment_declaration/', requestConfig);
            setLinkRecibo(process.env.REACT_APP_API_URL+"reports/recibos_pago/"+respuesta.data.data.id);
            setStepTaxes(stepTaxes+1);
            Swal.fire({
                title: "Pago de tributos",
                text: "Su Pago fue registrado con Éxito.",
                button: "Ok",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
            console.log(error)
        }
    }

    const filtarHistorico = async (values) => {

        const { estatus, ano_declaracion, trimestre, searchText } = values;
        const filter = {};
        filter.ano_declaracion = ano_declaracion !== "" ? +ano_declaracion : undefined;
        filter.trimestre = trimestre !== "" ? +trimestre : undefined;
        filter.estatus = estatus !== "" ? estatus: undefined;

        let nuevo = [];
        if(filter.ano_declaracion === undefined && filter.trimestre === undefined && filter.estatus === undefined) {
            nuevo = historicoOriginal;
        } else if(filter.ano_declaracion !== undefined && filter.trimestre === undefined && filter.estatus === undefined) {
            nuevo = historicoOriginal.filter(x=> x.ano_declaracion === Number(filter.ano_declaracion));
        } else if(filter.ano_declaracion === undefined && filter.trimestre !== undefined && filter.estatus === undefined) {
            nuevo = historicoOriginal.filter(x=> x.trimestre === Number(filter.trimestre));
        } else if(filter.ano_declaracion === undefined && filter.trimestre === undefined && filter.estatus !== undefined) {
            nuevo = historicoOriginal.filter(x=> x.estatus === Number(filter.estatus));
        } else if(filter.ano_declaracion !== undefined && filter.trimestre !== undefined && filter.estatus == undefined) {
            nuevo = historicoOriginal.filter(x=> x.ano_declaracion === Number(filter.ano_declaracion) && x.trimestre === Number(filter.trimestre));
        } else if(filter.ano_declaracion !== undefined && filter.trimestre === undefined && filter.estatus !== undefined) {
            nuevo = historicoOriginal.filter(x=> x.ano_declaracion === Number(filter.ano_declaracion) && x.estatus === Number(filter.estatus));
        } else if(filter.ano_declaracion === undefined && filter.trimestre !== undefined && filter.estatus !== undefined) {
            nuevo = historicoOriginal.filter(x=> x.trimestre === Number(filter.trimestre) && x.estatus === Number(filter.estatus));
        } else {
            nuevo = historicoOriginal.filter(x=> x.ano_declaracion === Number(filter.ano_declaracion) && x.trimestre === Number(filter.trimestre) && x.estatus === filter.estatus);
        }

        setHistorico(nuevo);
    }

    const submitDeclaration = async (valores) => {

        let respuesta = "";

        try {
            let total = 0;
            valores.declaraciones.map((x, i) => {
                total = Number(total) + Number(x.monto_tributo);
                if(x.fecha_emision === '') x.fecha_emision = '0001-01-01';
                if(x.fecha_declaracion === '') x.fecha_declaracion = formatearfecha(new Date(), 'YMD');
                x.terms = valores.termsG;
            });

            setTotalTributoDeclarado(total);

            requestConfig.data.type = "saveTributeDeclaration";
            requestConfig.data.attributes = (declaracionSustitutiva === false) ? valores.declaraciones : valores.declaraciones[0];
            requestConfig.data.id = (declaracionSustitutiva === false) ? nrif : valores.declaraciones[0].id;

            if(declaracionSustitutiva === false) {
                respuesta = await clientAxios.post('/tribute_declaration/', requestConfig);
            } else {
                respuesta = await clientAxios.put('/tribute_declaration/', requestConfig);
            }

            Swal.fire({
                title: "Declaración de tributos",
                text: "Datos guardados con éxito!",
                icon: "success",
                button: "Ok",
                timer: 2000
            }).then((value) => {
                if (total > 0) {
                    Swal.fire({
                        title: 'Declaración de tributos',
                        text: "Esta seguro de realizar el pago de tributos?",
                        icon: 'info',
                        showDenyButton: true,
                        confirmButtonText: 'Si',
                        denyButtonText: `No`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setDeclaracionesRealizadas(respuesta.data.data)
                            setStepTaxes(stepTaxes+1)
                        }
                    });
                }
                setDeclaracionSustitutiva(false);
                setDeclaracionSeleccionada([]);
                getHistoricoDeclaraciones();
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Declaración de tributos",
                text: "Error al guardar declaración de tributos!",
                icon: "error",
                button: "Ok",
                timer: 2000
            }).then((value) => {
                setStepTaxes(stepTaxes)
            });

        }
    }

    const revisarDeclaracion = (valores, i) => {

        let con = valores[i].concepto_pago;
        let ano = valores[i].ano_declaracion;
        let tri = valores[i].trimestre;
        let fecha_actual = new Date();
        let ano_actual = fecha_actual.getFullYear(); 

        let fecha_final_tri1 = new Date(ano_actual,3,31);
        let fecha_final_tri2 = new Date(ano_actual,6,30);
        let fecha_final_tri3 = new Date(ano_actual,9,30);
        let fecha_final_tri4 = new Date(ano_actual,12,31);

        try {

            let buscarHistorico = [];
            let buscarActual = [];

            if(con !== '' && ano !=='' && tri !=='') {

                if(Number(ano) === Number(ano_actual)) {
                    let mostrar_mensaje = false
                   
                    if(Number(tri) === 1) {                        
                        if(Date.parse(ano_actual) <= Date.parse(fecha_final_tri1)) {
                            mostrar_mensaje = true;
                        }
                    }

                    if(Number(tri) === 2) {                        
                        if(Date.parse(ano_actual) <= Date.parse(fecha_final_tri2)) {
                            mostrar_mensaje = true;
                        }
                    }

                    if(Number(tri) === 3) {                        
                        if(Date.parse(ano_actual) <= Date.parse(fecha_final_tri3)) {
                            mostrar_mensaje = true;
                        }
                    }

                    if(Number(tri) === 4) {                        
                        if(Date.parse(ano_actual) <= Date.parse(fecha_final_tri4)) {
                            mostrar_mensaje = true;
                        }
                    }


                    if(mostrar_mensaje) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Declaración de tributos',
                            text: "Periodo seleccionada para declarar no habilitado!",
                            button: "Ok",
                            timer: 2000
                        });
                        valores[i].trimestre = "";        
                    }

                }
    
                buscarActual = valores.filter(x => Number(x.concepto_pago) === Number(con) && Number(x.ano_declaracion) === Number(ano) && Number(x.trimestre) === Number(tri));
                buscarHistorico = historico.filter(x => Number(x.concepto_pago) === Number(con) && Number(x.ano_declaracion) === Number(ano) && Number(x.trimestre) === Number(tri));

                if( buscarActual.length > 1 || buscarHistorico.length  ) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Declaración de tributos',
                        text: "Periodo para declarar ya existe!",
                        button: "Ok",
                        timer: 2000
                    });
                    valores[i].trimestre = "";
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const showSelConcepto = (a) => {

        let arreglo = a;
        let tmp = [];
        arreglo.map(x => {
            tmp.push(Number(x.concepto_pago))
        });
        setSelConcepto(tmp);
        getTrimestres();

    }

    const valuesContext = {
        stepTaxes,
        bancos,
        conceptos,
        anos,
        trimestres,
        formatoFechaFutura,
        historico,
        estatus,
        formDataPayment,
        formSummary,
        formDataDeclaration,
        userData,
        nrif,
        declaracionSeleccionada,
        declaracionSustitutiva,
        totalTributoDeclarado,
        selConcepto,
        modalidadesPagos,
        linkRecibo,
        declaracionesRealizadas,
        actaReparo,
        reAdmin,
        reCul,
        debForm,
        debMat,
        creditoFiscal,
        conv,
        cheq,
        multa,
        intereses,
        codigoUnico,
        usts,
        setUSTs,
        setCondigoUnico,
        setFormSummary,
        setFormDataDeclaration,
        submitPayment,
        submitDeclaration,
        setFormDataPayment,
        getUserData,
        setStepTaxes,
        formatearfecha,
        formatNumber,
        sustituirDeclaracion,
        setTotalTributoDeclarado,
        setActaR,
        setReAdmin,
        setReCul,
        setDebForm,
        setDebMat,
        setCreditoFiscal,
        setConv,
        setCheq,
        setMulta,
        setIntereses,
        filtarHistorico,
        showSelConcepto,
        setModalidadPagos,
        setLinkRecibo,
        setDeclaracionesRealizadas,
        revisarDeclaracion
    }

    return (
        <TaxesContext.Provider value={valuesContext}>
            {children}
        </TaxesContext.Provider>
    )
}