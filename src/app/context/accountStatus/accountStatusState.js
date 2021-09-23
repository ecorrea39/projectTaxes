import React, { useEffect, useState} from 'react';
import clientAxios from '../../config/configAxios';
import AccountStatusContext from './accountStatusContext';
import odb from './../../helpers/odb';

export const AccountStatusState = ({ children }) => {

    const [deudaTrim, setDeudaTrim] = useState();
    const [deudaCxP, setDeudaCxP] = useState();
    const [pagos, setPagos] = useState();
    const [creditoFisTemp, setCreditoFisTemp] = useState();
    const [creditoFisAprob, setCreditoFisAprob] = useState();

    useEffect(() => {
        getTotalDeudaTrimestresDeclarados();
        getTotalDeudaEfectosCuentasPagar();
        getTotalPagos();
        getTotalCreditoFiscalSaldoTemporal();
        getTotalCreditoFiscalSaldoAprobado();
    },[]);

    const getTotalDeudaTrimestresDeclarados = async () => {

        try {
            const respuesta = await clientAxios.get('/balance/deuda_trimestre/');
            setDeudaTrim(respuesta.data.data[0][0].attributes['monto']);
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalDeudaEfectosCuentasPagar = async () => {

        try {
            //const respuesta = await clientAxios.get('/balance/deuda_trimestre/');
            //setDeudaCxP(respuesta.data.data[0][0].attributes['monto']);
            setDeudaCxP(0.00);
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalPagos = async () => {

        try {
            //const respuesta = await clientAxios.get('/balance/deuda_trimestre/');
            //setDeudaCxP(respuesta.data.data[0][0].attributes['monto']);
            setPagos(0.00);
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalCreditoFiscalSaldoTemporal = async () => {

        try {
            //const respuesta = await clientAxios.get('/balance/deuda_trimestre/');
            //setDeudaCxP(respuesta.data.data[0][0].attributes['monto']);
            setCreditoFisTemp(0.00);
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalCreditoFiscalSaldoAprobado = async () => {

        try {
            //const respuesta = await clientAxios.get('/balance/deuda_trimestre/');
            //setDeudaCxP(respuesta.data.data[0][0].attributes['monto']);
            setCreditoFisAprob(0.00);
        } catch (error) {
            console.log(error)
        }
    }

    const valuesContext = {
        deudaTrim, deudaCxP, pagos, creditoFisTemp, creditoFisAprob
    }

    return (
        <AccountStatusContext.Provider value={valuesContext}>
            {children}
        </AccountStatusContext.Provider>
    )
}