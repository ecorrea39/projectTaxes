import React, { useEffect, useState} from 'react';
import {clientAxios, requestConfig } from '../../config/configAxios';
import TaxesContext from './taxesContext';
import odb from './../../helpers/odb';

export const TaxesState = ({ children }) => {

    const [stepTaxes, setStepTaxes ] = useState(2);
    const [bancos, setBancos] = useState([]);
    const [conceptos, setConceptos] = useState([]);
    const [anos, setAnos] = useState([]);
    const [trimestres, setTrimestres] = useState([]);
    const [formatoFechaFutura, setFormatoFechaFutura] = useState();    
    const [formDataPayment, setFormDataPayment] = useState({});
    const [formDataDeclaration, setFormDataDeclaration] = useState({});
    const [userData, setUserData] = useState({});
    const [historico, setHistorico] = useState([]);
    const [declaracionsustitutiva, setDeclaracionsustitutiva] = useState(false);
    const [totalTributoDeclarado, setTotalTributoDeclarado ] = useState(0);
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

    let [declaracionSeleccionada, setDeclaracionSeleccionada] = useState([]);

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
            const respuesta = await clientAxios.get(`/users/${rif}`);
            setUserData(respuesta.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getHistoricoDeclaraciones = async () => {

        let arreglo = [];

        try {
            const respuesta = await clientAxios.get(`/tribute_declaration/${nrif}`, axiosConfig);
            arreglo = respuesta.data.data;

            arreglo.map((x, i) => {
                historico.push(
                    {
                        "id": arreglo[i].id,
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
                        "fecha_emision": arreglo[i].attributes.fecha_emision,
                        "fecha_declaracion": arreglo[i].attributes.fecha_declaracion,
                        "estatus": estatus[arreglo[i].attributes.estatus]
                    }
                )
            })
            setHistorico(historico);

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

    const sustituirDeclaracion = (seleccion) => {

        declaracionSeleccionada = [];

        try {
            setDeclaracionsustitutiva(true);
            declaracionSeleccionada.push(seleccion)
            console.log('declaracionSustitutiva ', declaracionSeleccionada)

            if (declaracionSeleccionada[0].estatus === 'definitiva') {
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submitPayment = async (formData) => {
        
        try {
            requestConfig.data.type = "savePaymentDec";
            // ESTO SE DEBE OPTIMIZAR CON URGENCIA
            formData.conceptos.map((element,index)=>{

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
            setFormDataPayment(formData);
            requestConfig.data.attributes = formData;
            const respuesta = await clientAxios.post('/payment_declaration/', requestConfig);
            setStepTaxes(stepTaxes+1);
        } catch (error) {
            console.log(error)
        }
       
    }

    const submitDeclaration = async (valores) => {

        try {

            const data = {
                jsonapi: { version: '1.0' },
                data: {
                    type: "saveTributeDeclaration",
                    id: nrif,
                    attributes: valores.declaraciones
                }
            }

            const respuesta = await clientAxios.post('/tribute_declaration/', data, axiosConfig);
            console.log('respuesta ', respuesta);
            let total = 0;
            valores.declaraciones.map((x, i) => {
                let calculo = 0;
                if(x.concepto_pago === 1) {
                    calculo = Number(x.monto_pagado) * (2/100)
                } else {
                    calculo = Number(x.monto_pagado) * (0.5/100)
                }
                total = total + calculo;
            });
            console.log('total ', total)

            setTotalTributoDeclarado(total);
            setStepTaxes(stepTaxes+1);
        } catch (error) {
            console.log(error)
        }
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
        declaracionsustitutiva,
        sustituirDeclaracion,
        totalTributoDeclarado,
        setActaR, actaReparo,
        reAdmin, setReAdmin,
        reCul, setReCul,
        debForm, setDebForm,
        debMat, setDebMat,
        creditoFiscal, setCreditoFiscal
    }

    return (
        <TaxesContext.Provider value={valuesContext}>
            {children}
        </TaxesContext.Provider>
    )
}