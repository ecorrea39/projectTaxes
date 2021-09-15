import React, { useEffect, useState} from 'react';
import clientAxios from '../../config/configAxios';
import TaxesContext from './taxesContext';

export const TaxesState = ({ children }) => {

    const [stepTaxes, setStepTaxes ] = useState(1);

    const [bancos, setBancos] = useState([]);

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

    const submitPayment = async () => {

    }

    const valuesContext = {
        stepTaxes,
        bancos,
        setStepTaxes,
        submitPayment
    }

    return (
        <TaxesContext.Provider
            value={valuesContext}
        >
            {children}
        </TaxesContext.Provider>
    )
}