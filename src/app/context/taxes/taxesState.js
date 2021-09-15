import React, { useEffect, useState} from 'react';
import clientAxios from '../../config/configAxios';
import TaxesContext from './taxesContext';

export const TaxesState = ({ children }) => {

    const [stepTaxes, setStepTaxes ] = useState(1);

    const [bancos, setBancos] = useState([]);

    const [formDatataPayment, setFormDtaPayment] = useState({});

    const [userData, setUserData] = useState({});

    useEffect(() => {
        getBancos();
    },[]);

    const getBancos = async () => {

        try {
            const respuesta = await clientAxios.get('/banks/');
            setBancos(respuesta.data.data)
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

    const valuesContext = {
        stepTaxes,
        bancos,
        formDatataPayment,
        userData,
        setFormDtaPayment,
        setStepTaxes,
        submitPayment,
        getUserData
    }

    return (
        <TaxesContext.Provider
            value={valuesContext}
        >
            {children}
        </TaxesContext.Provider>
    )
}