import React, { useEffect, useState} from 'react';
import clientAxios from '../../config/configAxios';
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

    useEffect(() => {
        getBancos();
        getConceptos();
        getAnos();
        getTrimestres();
        getFechaFutura();
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

    const getFechaFutura = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let day = fecha.getDate();
        if (month < 10) month = '0' + month.toString();
        if (day < 10) day = '0' + day.toString();
        setFormatoFechaFutura(year + '-' + month + '-' + day);
    }

    const submitPayment = async () => {
        setStepTaxes(stepTaxes+1);
    }

    const submitDeclaration = async (v) => {

        const axiosConfig = {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: 'Bearer ' + odb.get('authToken')
            }
        };

        //const arrayData = Array.from(v.declaraciones);
        //console.log('arrayData ', arrayData)

        const data = {
            jsonapi: { version: '1.0' },
            data: {
                type: "saveTributeDeclaration",
                id: odb.get('rif'),
                attributes: v.declaraciones
            }
        };

        console.log('axiosConfig ', axiosConfig);
        console.log('data ', data);

        const respuesta = await clientAxios.post('/tribute_declaration/', data, axiosConfig);

        console.log('respuesta ', respuesta)

        setStepTaxes(stepTaxes+1);
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
        formatoFechaFutura
    }

    return (
        <TaxesContext.Provider value={valuesContext}>
            {children}
        </TaxesContext.Provider>
    )
}