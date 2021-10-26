import React, { useEffect, useState} from 'react';
import {clientAxios} from '../../config/configAxios';
import AccountStatusContext from './accountStatusContext';
import odb from './../../helpers/odb';

export const AccountStatusState = ({ children }) => {

    const [anos, setAnos] = useState([]);
    const [trimestres, setTrimestres] = useState([]);
    const [formatoFechaFutura, setFormatoFechaFutura] = useState();

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
    const [totalCreditoFisTemp, setTotalCreditoFisTemp] = useState();
    const [totalCreditoFisAprob, setTotalCreditoFisAprob] = useState();

    const [detallePagosTrim, setDetallePagosTrim] = useState([]);
    const [detallePagosTrimOriginal, setDetallePagosTrimOriginal] = useState([]);

    const [detallePagosCxP, setDetallePagosCxP] = useState([]);
    const [detallePagosCxPOriginal, setDetallePagosCxPOriginal] = useState([]);

    const [detalleCreditoFis, setDetalleCreditoFis] = useState([]);
    const [detalleCreditoFisOriginal, setDetalleCreditoFisOriginal] = useState([]);

    const nrif = odb.get('rif');

    useEffect(() => {
        getAnos();
        getTrimestres();
        getFechaFutura();
        getResumen();
        getDetalleDeudaTrimestresDeclarados();
        getDetalleDeudaCtasEfectosPorPagar();
        getDetalleCreditoFiscal();
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

    const getResumen = async () => {

        try {
            const respuesta = await clientAxios.get(`/balance/${nrif}`);

            (respuesta.data.data[0] !== null) ? setTotalDeudaTrim(respuesta.data.data[0].attributes.total): setTotalDeudaTrim(0);
            (respuesta.data.data[1] !== null) ? setTotalDeudaCxP(respuesta.data.data[1].attributes.total): setTotalDeudaCxP(0);
            (respuesta.data.data[2] !== null) ? setTotalPagos(respuesta.data.data[2].attributes.total): setTotalPagos(0);
            (respuesta.data.data[3] !== null) ? setTotalCreditoFisTemp(respuesta.data.data[3].attributes.total): setTotalCreditoFisTemp(0);
            (respuesta.data.data[4] !== null) ? setTotalCreditoFisAprob(respuesta.data.data[4].attributes.total): setTotalCreditoFisAprob(0);

        } catch (error) {
            console.log(error)
        }
    }

    {/* deudas trimestres */}
    const getDetalleDeudaTrimestresDeclarados = async () => {

        let arreglo = [];
        const detalleTrimestre = [];

        try {
            const respuesta = await clientAxios.get(`/balance/detail/${nrif}`, clientAxios);
            arreglo = respuesta.data.data[0].attributes['deuda-trimestre'][0];

            arreglo.map((x, i) => {
                detalleTrimestre.push(
                    {
                        "id": arreglo[i].id,
                        "concepto_pago": arreglo[i].concepto_pago,
                        //"concepto_pago_name": arreglo[i].attributes['concepto_pago_concepto.name'],
                        "trimestre": arreglo[i].trimestre,
                        "ano_declaracion": arreglo[i].ano_declaracion,
                        "fecha_emision": arreglo[i].concepto_pago === 2 ? formatearfecha(new Date(arreglo[i].fecha_emision), 'DMY') : '',
                        "monto_pagado": arreglo[i].monto_pagado,
                        "ntrabajadores": arreglo[i].ntrabajadores,
                        "monto_tributo": arreglo[i].monto_tributo,
                        "monto_intereses": arreglo[i].monto_intereses,
                        "monto_multa": arreglo[i].monto_multa,
                        "estatus": arreglo[i].estatus
                    }
                )
            });

            setDetalleDeudaTrim(detalleTrimestre.filter(x=> x.estatus === 1 || x.estatus === 2));
            setDetalleDeudaTrimOriginal(detalleTrimestre.filter(x=> x.estatus === 1 || x.estatus === 2));
        } catch (error) {
            console.log(error)
        }
    }

    {/* deudas cuentas y efectos por pagar */}
    const getDetalleDeudaCtasEfectosPorPagar = async () => {

        let arreglo = [];
        const detalleCxP = [];

        try {
            const respuesta = await clientAxios.get(`/balance/detail/${nrif}`, clientAxios);
            arreglo = respuesta.data.data[0].attributes['deuda-efectos-cuentas'][0];

            arreglo.map((x, i) => {
                detalleCxP.push(
                    {
                        "id": arreglo[i].id,
                        //"concepto_pago": arreglo[i].concepto_pago,
                        //"concepto_pago_name": arreglo[i].attributes['concepto_pago_concepto.name'],
                        //"componentes": arreglo[i].componentes,
                        "fecha_documento": formatearfecha(new Date(arreglo[i].fecha_documento), 'DMY'),
                        "numero_documento": arreglo[i].numero_documento,
                        "numero_giro": arreglo[i].numero_giro,
                        "valor_mmv": 300.25,
                        //"nveces_mmv": arreglo[i].nveces_mmv,
                        "nveces_mmv": 50,
                        "monto": 300.25 * 50,
                        "estatus": arreglo[i].estatus
                    }
                )
            });

            setDetalleDeudaCxP(detalleCxP);
            setDetalleDeudaCxPOriginal(detalleCxP);
        } catch (error) {
            console.log(error)
        }
    }

    const getDetallePagosTrimestresDeclarados = async () => {

        let arreglo = [];
        const detallePagosTrim = [];

        try {
            const respuesta = await clientAxios.get(`/balance/detail/${nrif}`, clientAxios);
            arreglo = respuesta.data.data[0].attributes['pagos-efectos-cuentas'][0];

            arreglo.map((x, i) => {
                detallePagosTrim.push(
                    {
                        "id": arreglo[i].id,
                        "concepto_pago": arreglo[i].concepto_pago,
                        "concepto_pago_name": arreglo[i].concepto_pago_name,
                        "ano_declaracion": arreglo[i].ano_declaracion,
                        "trimestre": arreglo[i].trimestre,

                        "fecha_pago": arreglo[i].fecha_pago,
                        "banco": arreglo[i].banco,
                        "banco_name": arreglo[i].banco_nombre,
                        "referencia": arreglo[i].referencia,
                        "monto_pagado": arreglo[i].monto_pagado,
                        "clave": arreglo[i].clave
                    }
                )
            });

            setDetallePagosTrim(detallePagosTrim);
            setDetallePagosTrimOriginal(detallePagosTrim);
        } catch (error) {
            console.log(error)
        }
    }

    const getDetallePagosCtasEfectosPorPagar = async () => {

        let arreglo = [];
        const detallePagosTrim = [];

        try {
            const respuesta = await clientAxios.get(`/balance/detail/${nrif}`, clientAxios);
            arreglo = respuesta.data.data[0].attributes['pagos-efectos-cuentas'][0];

            arreglo.map((x, i) => {
                detallePagosCxP.push(
                    {

                        "id": arreglo[i].id,
                        //"concepto_pago": arreglo[i].concepto_pago,
                        //"concepto_pago_name": arreglo[i].attributes['concepto_pago_concepto.name'],
                        //"componentes": arreglo[i].componentes,
                        "numero_documento": arreglo[i].numero_documento,
                        "numero_giro": arreglo[i].numero_giro,

                        "fecha_pago": arreglo[i].fecha_pago,
                        "banco": arreglo[i].banco,
                        "banco_name": arreglo[i].banco_nombre,
                        "referencia": arreglo[i].referencia,
                        "monto_pagado": arreglo[i].monto_pagado,
                        "clave": arreglo[i].clave
                    }
                )
            });

            setDetallePagosCxP(detallePagosCxP);
            setDetallePagosCxPOriginal(detallePagosCxP);
        } catch (error) {
            console.log(error)
        }
    }

    const getDetalleCreditoFiscal = async () => {

        let arreglo = [];
        const detalleCreditoFiscal = [];

        try {
            const respuesta = await clientAxios.get(`/balance/detail/${nrif}`, clientAxios);
            arreglo = respuesta.data.data[0].attributes[''][0];

            arreglo.map((x, i) => {
                detalleCreditoFiscal.push(
                    {

                        "id": arreglo[i].id,
                        //"concepto_pago": arreglo[i].concepto_pago,
                        //"concepto_pago_name": arreglo[i].attributes['concepto_pago_concepto.name'],
                        //"componentes": arreglo[i].componentes,
                        "numero_documento": arreglo[i].numero_documento,
                        "numero_giro": arreglo[i].numero_giro,

                        "fecha_pago": arreglo[i].fecha_pago,
                        "banco": arreglo[i].banco,
                        "banco_name": arreglo[i].banco_nombre,
                        "referencia": arreglo[i].referencia,
                        "monto_pagado": arreglo[i].monto_pagado,
                        "clave": arreglo[i].clave
                    }
                )
            });

            setDetalleCreditoFis(detalleCreditoFiscal);
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

    const getFechaFutura = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let day = fecha.getDate();
        if (month < 10) month = '0' + month.toString();
        if (day < 10) day = '0' + day.toString();
        setFormatoFechaFutura(year + '-' + month + '-' + day);
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
        formatNumber,
        formatoFechaFutura
    }

    return (
        <AccountStatusContext.Provider value={valuesContext}>
            {children}
        </AccountStatusContext.Provider>
    )
}