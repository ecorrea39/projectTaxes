import React, { useEffect, useState} from 'react';
import {clientAxios} from '../../config/configAxios';
import AccountStatusContext from './accountStatusContext';
import odb from './../../helpers/odb';

export const AccountStatusState = ({ children }) => {

    const [anos, setAnos] = useState([]);
    const [trimestres, setTrimestres] = useState([]);
    const [deudaTrim, setDeudaTrim] = useState();
    const [deudaCxP, setDeudaCxP] = useState();
    const [pagos, setPagos] = useState();
    const [creditoFisTemp, setCreditoFisTemp] = useState();
    const [creditoFisAprob, setCreditoFisAprob] = useState();

    const [detalleTrim, setDetalleTrim] = useState([]);

    const nrif = odb.get('rif');

    useEffect(() => {
        getAnos();
        getTrimestres();
        getResumen();
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
                setDeudaTrim(respuesta.data.data[0].attributes.total);
            } else {
                setDeudaTrim(0);
            }

            if(respuesta.data.data[1] !== null) {
                setDeudaTrim(respuesta.data.data[1].attributes.total);
            } else {
                setDeudaCxP(0);
            }

            setPagos(0);
            setCreditoFisTemp(0);
            setCreditoFisAprob(0);
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
        anos, trimestres, deudaTrim, deudaCxP, pagos, creditoFisTemp, creditoFisAprob, detalleTrim
    }

    return (
        <AccountStatusContext.Provider value={valuesContext}>
            {children}
        </AccountStatusContext.Provider>
    )
}