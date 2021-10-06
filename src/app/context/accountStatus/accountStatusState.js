import React, { useEffect, useState} from 'react';
import {clientAxios} from '../../config/configAxios';
import AccountStatusContext from './accountStatusContext';
import odb from './../../helpers/odb';

export const AccountStatusState = ({ children }) => {

    const [anos, setAnos] = useState([]);
    const [trimestres, setTrimestres] = useState([]);

    /* -- deuda trimestres declarados --*/
    const [totalDeudaTrim, setTotalDeudaTrim] = useState();
    const [detalleDeudaTrim, setDetalleDeudaTrim] = useState([]);
    const [detalleDeudaTrimOriginal, setDetalleDeudaTrimOriginal] = useState([]);

    /* -- deuda efectos y cuentas por pagar --*/
    const [totalDeudaCxP, setTotalDeudaCxP] = useState();
    const [detalleDeudaCxP, setDetalleDeudaCxP] = useState([]);
    const [detalleDeudaCxPOriginal, setDetalleDeudaCxPOriginal] = useState([]);

    /* -- pagos  --*/
    const [totalPagos, setTotalPagos] = useState();
    const [detallePagosTrim, setDetallePagosTrim] = useState([]);
    const [detallePagosTrimOriginal, setDetallePagosTrimOriginal] = useState([]);

    const [totalCreditoFisTemp, setTotalCreditoFisTemp] = useState();
    const [detallePagosCxP, setDetallePagosCxP] = useState([]);
    const [detallePagosCxPOriginal, setDetallePagosCxPOriginal] = useState([]);

    const [totalCreditoFisAprob, setTotalCreditoFisAprob] = useState();
    const [detalleCreditoFis, setDetalleCreditoFis] = useState([]);
    const [detalleCreditoFisOriginal, setDetalleCreditoFisOriginal] = useState([]);

    const nrif = odb.get('rif');

    useEffect(() => {
        getAnos();
        getTrimestres();
        getResumen();
        getDetalleDeudaTrimestresDeclarados();
        getDetalleDeudaCtasEfectosPorPagar();
        getDetallePagosTrimestresDeclarados();
    },[]);

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

    const getResumen = async () => {

        try {
            const respuesta = await clientAxios.get(`/balance/${nrif}`);
            //console.log('respuesta ', respuesta)
            if(respuesta.data.data[0] !== null) {
                setTotalDeudaTrim(respuesta.data.data[0].attributes.total);
            } else {
                setTotalDeudaTrim(0);
            }

            if(respuesta.data.data[1] !== null) {
                //setDeudaTrim(respuesta.data.data[1].attributes.total);
            } else {
                setTotalDeudaCxP(0);
            }

            setTotalPagos(0);
            setTotalCreditoFisTemp(0);
            setTotalCreditoFisAprob(0);
        } catch (error) {
            console.log(error)
        }
    }

    const getDetalleDeudaTrimestresDeclarados = async () => {

        let arreglo = [];
        const detalleTrimestre = [];

        try {
            const respuesta = await clientAxios.get(`/tribute_declaration/${nrif}`, clientAxios);
            arreglo = respuesta.data.data;
            console.log('respuesta ', respuesta)

            arreglo.map((x, i) => {
                detalleTrimestre.push(
                    {
                        "id": arreglo[i].id,
                        "concepto_pago": arreglo[i].attributes.concepto_pago,
                        "concepto_pago_name": arreglo[i].attributes['concepto_pago_concepto.name'],
                        "trimestre": arreglo[i].attributes.trimestre,
                        "ano_declaracion": arreglo[i].attributes.ano_declaracion,
                        "fecha_emision": arreglo[i].attributes.concepto_pago === 2 ? formatearfecha(new Date(arreglo[i].attributes.fecha_emision), 'DMY') : '',
                        "monto_pagado": arreglo[i].attributes.monto_pagado,
                        "ntrabajadores": arreglo[i].attributes.ntrabajadores,
                        "monto_tributo": arreglo[i].attributes.monto_tributo,
                        "monto_intereses": arreglo[i].attributes.monto_intereses,
                        "monto_multa": arreglo[i].attributes.monto_multa,
                        "estatus": arreglo[i].attributes.estatus
                    }
                )
            });

            setDetalleDeudaTrim(detalleTrimestre.filter(x=> x.estatus === 1 || x.estatus === 2));
            setDetalleDeudaTrimOriginal(detalleTrimestre.filter(x=> x.estatus === 1 || x.estatus === 2));
        } catch (error) {
            console.log(error)
        }
    }

    const getDetalleDeudaCtasEfectosPorPagar = () => {

        let arreglo = [];
        const detalleCxP = [];

        try {
            /*const respuesta = await clientAxios.get(`/balance/${nrif}`);
            console.log('respuesta ', respuesta)
            arreglo = respuesta.data.data;

            arreglo.map((x, i) => {
                detalleCxP.push(
                    {
                        "id": arreglo[i].id,
                        "concepto_pago": arreglo[i].attributes.concepto_pago,
                        "concepto_pago_name": arreglo[i].attributes['concepto_pago_concepto.name'],
                        "trimestre": arreglo[i].attributes.trimestre,
                        "ano_declaracion": arreglo[i].attributes.ano_declaracion,
                        "fecha_emision": arreglo[i].attributes.concepto_pago === 2 ? formatearfecha(new Date(arreglo[i].attributes.fecha_emision), 'DMY') : '',
                        "monto_pagado": arreglo[i].attributes.monto_pagado,
                        "ntrabajadores": arreglo[i].attributes.ntrabajadores,
                        "monto_tributo": arreglo[i].attributes.monto_tributo,
                        "monto_intereses": arreglo[i].attributes.monto_intereses,
                        "monto_multa": arreglo[i].attributes.monto_multa,
                    }
                )
            });*/

            const detalleCxP = [
                {
                    concepto_pago: "10",
                    concepto_pago_name: "Resolución por incumplimiento deberes formales",
                    componentes: "",
                    fecha_notificacion: "2021-05-06",
                    numero_documento: "",
                    numero_giro: "",
                    valor_mmv: "",
                    numero_veces_mmv: "50",
                    monto: "150000"
                },
                {
                    concepto_pago: "11",
                    concepto_pago_name: "Resolución por incumplimiento deberes materiales",
                    componentes: "",
                    fecha_notificacion: "2021-05-07",
                    numero_documento: "",
                    numero_giro: "",
                    valor_mmv: "",
                    numero_veces_mmv: "50",
                    monto: "150000"
                },
                {
                    concepto_pago: "3",
                    concepto_pago_name: "Acta de reparo",
                    componentes: "",
                    fecha_notificacion: "2021-05-07",
                    numero_documento: "CUL-20210901-123456",
                    numero_giro: "",
                    valor_mmv: "",
                    numero_veces_mmv: "",
                    monto: "800000"
                },
                {
                    concepto_pago: "3",
                    concepto_pago_name: "Acta de reparo",
                    componentes: "",
                    fecha_notificacion: "2021-05-07",
                    numero_documento: "CUL-20210901-000002",
                    numero_giro: "",
                    valor_mmv: "",
                    numero_veces_mmv: "",
                    monto: "800000"
                },
                {
                    concepto_pago: "4",
                    concepto_pago_name: "Sanción por acta de reparo",
                    componentes: "",
                    fecha_notificacion: "2021-06-09",
                    numero_documento: "CUL-20210901-000001",
                    numero_giro: "",
                    valor_mmv: "",
                    numero_veces_mmv: "",
                    monto: "800000"
                },
                {
                    concepto_pago: "7",
                    concepto_pago_name: "Giro por convenio de pago",
                    componentes: "",
                    fecha_notificacion: "2021-06-09",
                    numero_documento: "",
                    numero_giro: "02/02",
                    valor_mmv: "",
                    numero_veces_mmv: "",
                    monto: "0"
                },
                {
                    concepto_pago: "7",
                    concepto_pago_name: "Giro por convenio de pago",
                    componentes: "",
                    fecha_notificacion: "2021-05-09",
                    numero_documento: "",
                    numero_giro: "01/02",
                    valor_mmv: "",
                    numero_veces_mmv: "",
                    monto: "100000"
                }
            ];

            setDetalleDeudaCxP(detalleCxP);
            setDetalleDeudaCxPOriginal(detalleCxP);
        } catch (error) {
            console.log(error)
        }
    }

    const getDetallePagosTrimestresDeclarados = () => {

        let arreglo = [];
        const detallePagosTrim = [];

        try {
            /*const respuesta = await clientAxios.get(`/balance/${nrif}`);
            console.log('respuesta ', respuesta)
            arreglo = respuesta.data.data;

            arreglo.map((x, i) => {
                detallePagosTrim.push(
                    {
                        "id": arreglo[i].id,
                        "concepto_pago": arreglo[i].attributes.concepto_pago,
                        "concepto_pago_name": arreglo[i].attributes['concepto_pago_concepto.name'],
                        "trimestre": arreglo[i].attributes.trimestre,
                        "ano_declaracion": arreglo[i].attributes.ano_declaracion,
                        "fecha_emision": arreglo[i].attributes.concepto_pago === 2 ? formatearfecha(new Date(arreglo[i].attributes.fecha_emision), 'DMY') : '',
                        "monto_pagado": arreglo[i].attributes.monto_pagado,
                        "ntrabajadores": arreglo[i].attributes.ntrabajadores,
                        "monto_tributo": arreglo[i].attributes.monto_tributo,
                        "monto_intereses": arreglo[i].attributes.monto_intereses,
                        "monto_multa": arreglo[i].attributes.monto_multa,
                    }
                )
            });*/

            const detallePagosTrim = [
                {
                    concepto_pago: "1",
                    concepto_pago_name: "Aporte patronal 2%",
                    ano_declaracion: 2021,
                    trimestre: 1,
                    fecha_pago: "2021-03-28",
                    banco: "1",
                    banco_name: "Banco de Venzuela",
                    referencia: "1234567890",
                    monto_pagado: "15000",
                    clave: "tributo",
                },
                {
                    concepto_pago: "1",
                    concepto_pago_name: "Aporte patronal 2%",
                    ano_declaracion: 2021,
                    trimestre: 2,
                    fecha_pago: "2021-06-30",
                    banco: "1",
                    banco_name: "Banco de Venzuela",
                    referencia: "1234567890",
                    monto_pagado: "15000.45",
                    clave: "tributo"
                },
                {
                    concepto_pago: "1",
                    concepto_pago_name: "Aporte patronal 2%",
                    ano_declaracion: 2021,
                    trimestre: 3,
                    fecha_pago: "2021-09-30",
                    banco: "1",
                    banco_name: "Banco de Venzuela",
                    referencia: "1234567890",
                    monto_pagado: "15000.33",
                    clave: "tributo"
                }
            ];

            setDetallePagosTrim(detallePagosTrim);
            setDetallePagosTrimOriginal(detallePagosTrim);
        } catch (error) {
            console.log(error)
        }
    }

    const filtarAccountStatus = async (values, tipo) => {

        const { ano_declaracion, trimestre, searchText } = values;
        const filter = {};
        filter.ano_declaracion = ano_declaracion !== "" ? +ano_declaracion : undefined;
        filter.trimestre = trimestre !== "" ? +trimestre : undefined;
        /*
        filter.model = searchText;
        if (searchText) {
            filter.manufacture = searchText;
            filter.VINCode = searchText;
        }*/

        let lista = []
        switch (tipo) {
            case "deudatrim":
                lista = detalleDeudaTrimOriginal;
                break;

            case "deudactasxpagar":
                console.log('paso 2')
                lista = detalleDeudaCxPOriginal;
                break;

            case "pagostrim":
                lista = detalleDeudaCxPOriginal;
                break;

            default:
                break;
        }

        let nuevo = [];
        if(filter.ano_declaracion === undefined && filter.trimestre === undefined) {
            nuevo = lista;
        } else if(filter.ano_declaracion !== undefined && filter.trimestre === undefined) {
            nuevo = lista.filter(x=> x.ano_declaracion === Number(filter.ano_declaracion));
        } else if(filter.ano_declaracion === undefined && filter.trimestre !== undefined) {
            nuevo = lista.filter(x=> x.trimestre === Number(filter.trimestre));
        } else if(filter.ano_declaracion !== undefined && filter.trimestre !== undefined) {
            nuevo = lista.filter(x=> x.ano_declaracion === Number(filter.ano_declaracion) && x.trimestre === Number(filter.trimestre));
        } else {
            nuevo = lista.filter(x=> x.ano_declaracion === Number(filter.ano_declaracion) && x.trimestre === Number(filter.trimestre));
        }

        setDetalleDeudaTrim(nuevo);
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

    const valuesContext = {
        anos,
        trimestres,
        totalDeudaTrim,
        detalleDeudaTrim,
        totalDeudaCxP,
        detalleDeudaCxP,
        totalPagos,
        detallePagosTrim,
        detallePagosCxP,
        totalCreditoFisTemp,
        totalCreditoFisAprob,
        detalleCreditoFis,
        filtarAccountStatus,
        formatearfecha,
        formatNumber
    }

    return (
        <AccountStatusContext.Provider value={valuesContext}>
            {children}
        </AccountStatusContext.Provider>
    )
}