import React, { useEffect, useState} from 'react';
import TaxesContext from './taxesContext';

export const TaxesState = ({ children }) => {

    const [stepTaxes, setStepTaxes ] = useState(1);
    
    const valuesContext = {
        stepTaxes,
        setStepTaxes 
    }

    return (
        <TaxesContext.Provider
            value={valuesContext}
        >
            {children}
        </TaxesContext.Provider>
    )
}