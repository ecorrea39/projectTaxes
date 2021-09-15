import React, { useEffect, useState} from 'react';
import clientAxios from '../../config/configAxios';
import TaxesContext from './taxesContext';

export const TaxesState = ({ children }) => {

    const [stepTaxes, setStepTaxes ] = useState(1);

    const [bancos, setBancos] = useState([]);

    const [conceptos, setConceptos] = useState([]);

    const [anos, setAnos] = useState([]);

    const [trimestres, setTrimestres] = useState([]);
    
    const [formDatataPayment, setFormDtaPayment] = useState({});

    const [userData, setUserData] = useState({});

    useEffect(() => {
        getBancos();
        getConceptos();
        getAnos();
        getTrimestres();
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
            let concepto_pago = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                concepto_pago.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                    }
                )
            });
            concepto_pago.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
            concepto_pago = concepto_pago.filter(x => x.name === 'Aporte patronal 2%' || x.name === 'Aporte de los trabajadores 0,5%');
            setConceptos(concepto_pago)

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

    const submitPayment = async () => {
        setStepTaxes(stepTaxes+1);
    }

    const submitDeclaration = async () => {
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
        formDatataPayment,
        userData,
        setFormDtaPayment,
        getUserData
    }

    return (
        <TaxesContext.Provider value={valuesContext}>
            {children}
        </TaxesContext.Provider>
    )
}