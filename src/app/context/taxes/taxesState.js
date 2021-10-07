import React, { useEffect, useState} from 'react';
import {clientAxios, requestConfig } from '../../config/configAxios';
import TaxesContext from './taxesContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const TaxesState = ({ children }) => {

    const [stepTaxes, setStepTaxes ] = useState(1);
    const [bancos, setBancos] = useState([]);
    const [conceptos, setConceptos] = useState([]);
    const [anos, setAnos] = useState([]);
    const [trimestres, setTrimestres] = useState([]);
    const [formatoFechaFutura, setFormatoFechaFutura] = useState();    
    const [formDataPayment, setFormDataPayment] = useState({});
    const [formDataDeclaration, setFormDataDeclaration] = useState({});
    const [userData, setUserData] = useState({});
    const [historico, setHistorico] = useState([]);
    const [historicoOriginal, setHistoricoOriginal] = useState([]);
    const [historicoFilter, setHistoricoFilter] = useState([]);
    const [declaracionSustitutiva, setDeclaracionSustitutiva] = useState(false);
    const [declaracionSeleccionada, setDeclaracionSeleccionada] = useState([]);
    const [totalTributoDeclarado, setTotalTributoDeclarado ] = useState(0);
    const [selConcepto, setSelConcepto] = useState([]);
    const estatus = ['eliminada', 'creada', 'definitiva', 'pagada' ];
    const nrif = odb.get('rif');

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
        montoMultaResolucionForm: "",

    });
    const [debMat, setDebMat] = useState({
        numResolucionMat: "",
        fechaResolucionMat: "",
        montoMultaResolucionMat: ""
    });
    const [creditoFiscal, setCreditoFiscal] = useState({
        montoCredito: ""
    });

    // ESTO NO HACE FALTA EL clientAxios YA INCLUYE ESTA CONFIGURACION
    const axiosConfig = {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: 'Bearer ' + odb.get('authToken')
        }
    }

<<<<<<< HEAD
=======
    //let [declaracionSeleccionada, setDeclaracionSeleccionada] = useState([]);

>>>>>>> lp-edo-cuentas
    useEffect(() => {
        getBancos();
        getConceptos();
        getAnos();
        getTrimestres();
        getHistoricoDeclaraciones();
        getFechaFutura();
        formatearfecha(new Date(), 'YMD');
    },[]);

    const getBancos = async () => {

        try {
            const respuesta = await clientAxios.get('/banks/');
            setBancos(respuesta.data.data)
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
            const array = [
                { "id": "1", "name": "Trimestre 1"},
                { "id": "2", "name": "Trimestre 2"},
                { "id": "3", "name": "Trimestre 3"},
                { "id": "4", "name": "Trimestre 4"}
            ];
            setTrimestres(array.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name)));
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
            setHistorico(histo);
            setHistoricoOriginal(histo);

        } catch (error) {
            console.log(error)
        }

    }

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
            currency: "VEF"
        }).format(number)
    }

    const sustituirDeclaracion = (seleccion, i, props) => {

        try {
            if (seleccion.estatus === 2) {
                Swal.fire({
                    title: "Declaración de tributos",
                    text: "Declaración seleccionada con estatus Definitiva, no puede ser modificada",
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

    const submitPayment = async (formData) => {
        
        try {
            formData.detallesConceptos = [];
            //console.log("formDataSubmit ",formData)
            requestConfig.data.type = "savePaymentDec";
            requestConfig.data.id = "j333333332"; // -> SI CAMBIO ESTE RIF FALLA LA PETICION
            // ESTO SE DEBE OPTIMIZAR CON URGENCIA
            formData.conceptos.map((element,index)=>{
                //console.log("index ",element)
                let concepto = {
                    idConcepto: "",
                    detalle: {
                        monto: "", // Monto del concepto
                        montoMulta: "", // Monto de la multa del concepto
                        motoIntereses: "", // Monto de intereses del concepto
                        nroDoc: "", // Numero de documento/acta/resolucion/cheque de conceptops
                        fechaConcp: "", // Fecha del documento/acta/resolucion/cheque
                        fechaVctoGiro: "", // Fecha Vencimiento de Giro Convenio de pago
                        fechaNotaDebito: "" // Fecha nota deito del cheque
                    }
                };

                concepto.idConcepto = element;

                if (element == 3) {
                    concepto.detalle.monto = actaReparo.montoActa;
                    concepto.detalle.fechaConcp = actaReparo.fechaActa;
                    concepto.detalle.fechaConcp = actaReparo.numActa;
                }
                if (element == 4) {
                    concepto.detalle.nroDoc = reAdmin.numResolucionAdmin;
                    concepto.detalle.fechaConcp = reAdmin.fechaResolucionAdmin;
                    concepto.detalle.montoMulta = reAdmin.montoMultaResolucionAdmin;
                    concepto.detalle.motoIntereses = reAdmin.montoInteresesResolucionAdmin
                }
                if (element == 5) {
                    concepto.detalle.nroDoc = reCul.numResolucionCul;
                    concepto.detalle.fechaConcp = reCul.fechaResolucionCul;
                    concepto.detalle.montoMulta = reCul.montoMultaResolucionCul;
                }
                if (element == 6) {
                    concepto.detalle.nroDoc = debForm.numResolucionForm;
                    concepto.detalle.fechaConcp = debForm.fechaResolucionForm;
                    concepto.detalle.montoMulta = debForm.montoMultaResolucionForm;
                }
                if (element == 7) {
                    concepto.detalle.nroDoc = debMat.numResolucionMat;
                    concepto.detalle.fechaConcp = debMat.fechaResolucionMat;
                    concepto.detalle.montoMulta = debMat.montoMultaResolucionMat;
                }
                if (element == 8) {
                    concepto.detalle = {};
                }
                if (element == 9) {
                    concepto.detalle = {};
                }
                if (element == 10) {
                    concepto.detalle = {};
                }
                if (element == 11) {
                    concepto.detalle = {};
                }
                if (element == 12) {
                    concepto.detalle.monto = creditoFiscal.montoCredito;
                }
                formData.detallesConceptos.push(concepto);
            });
            //console.log("formDataEnd ",formData)
            setFormDataPayment(formData);
            requestConfig.data.attributes = formData;
            const respuesta = await clientAxios.post('/payment_declaration/', requestConfig);
            setStepTaxes(stepTaxes+1);

            Swal.fire({
                icon: 'success',
                title: 'Su Pago fue registrado con Éxito.',
                showConfirmButton: false,
                timer: 2000
            })
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
        /*
        filter.model = searchText;
        if (searchText) {
            filter.manufacture = searchText;
            filter.VINCode = searchText;
        }*/

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

        try {
            let total = 0;
            valores.declaraciones.map((x, i) => {
                total = total + x.monto_tributo;
                if(x.fecha_emision === '') x.fecha_emision = '0001-01-01';
                if(x.fecha_declaracion === '') x.fecha_declaracion = formatearfecha(new Date(), 'YMD');
            });

            setTotalTributoDeclarado(total);

            requestConfig.data.type = "saveTributeDeclaration";
            requestConfig.data.attributes = valores.declaraciones;
            requestConfig.data.id = (!declaracionSustitutiva) ? nrif : valores.declaraciones[0].id;

            if(!declaracionSustitutiva) {
                const respuesta = await clientAxios.post('/tribute_declaration/', requestConfig);
            } else {
                const respuesta = await clientAxios.put('/tribute_declaration/', requestConfig);
            }

            Swal.fire({
                title: "Declaración de tributos",
                text: "Datos guardados con éxito!",
                icon: "success",
                button: "Ok",
                timer: 1500
            }).then((value) => {
                if (total > 0) {
                    setStepTaxes(stepTaxes+1)
                } else {
                    //setStepTaxes(1)
                }
                setDeclaracionSustitutiva(false);
                setDeclaracionSeleccionada([]);
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Declaración de tributos",
                text: "Error al guardar declaración de tributos!",
                icon: "error",
                button: "Ok",
            }).then((value) => {
                setStepTaxes(stepTaxes)
            });

        }
    }

    const showSelConcepto = (a) => {

        let arreglo = a;
        let tmp = [];
        arreglo.map(x => {
            tmp.push(Number(x.concepto_pago))
        });
        setSelConcepto(tmp);

    }

    const valuesContext = {
        stepTaxes,
        bancos,
        conceptos,
        anos,
        trimestres,
        setStepTaxes,
        submitPayment,
        submitDeclaration,
        formDataPayment,
        setFormDataDeclaration,
        userData,
        setFormDataPayment,
        getUserData,
        formatoFechaFutura,
        historico,
        estatus,
        formatearfecha,
        formatNumber,
        nrif,
        declaracionSeleccionada,
        declaracionSustitutiva,
        sustituirDeclaracion,
        totalTributoDeclarado,
        setActaR, actaReparo,
        reAdmin, setReAdmin,
        reCul, setReCul,
        debForm, setDebForm,
        debMat, setDebMat,
        creditoFiscal, setCreditoFiscal,
        filtarHistorico,
        selConcepto,
        showSelConcepto
    }

    return (
        <TaxesContext.Provider value={valuesContext}>
            {children}
        </TaxesContext.Provider>
    )
}