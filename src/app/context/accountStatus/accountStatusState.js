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

    const [detalleTrim, setDetalleTrim] = useState([]);

    const rif = odb.get('rif');

    useEffect(() => {
        getResumen();
    },[]);

    const getResumen = async () => {

        try {
            const respuesta = await clientAxios.get('/balance/'+{rif});
            setDeudaTrim(respuesta.data.data[0].attributes.total);
            setDeudaCxP(0.00);
            setPagos(0.00);
            setCreditoFisTemp(0.00);
            setCreditoFisAprob(0.00);
        } catch (error) {
            console.log(error)
        }
    }

    const getDetalleDeudaTrimestresDeclarados = async () => {

        try {
            //const respuesta = await clientAxios.get('/balance/deuda_trimestre/');
            setDetalleTrim([]);
        } catch (error) {
            console.log(error)
        }
    }

    const valuesContext = {
        deudaTrim, deudaCxP, pagos, creditoFisTemp, creditoFisAprob, detalleTrim
    }

    return (
        <AccountStatusContext.Provider value={valuesContext}>
            {children}
        </AccountStatusContext.Provider>
    )
}