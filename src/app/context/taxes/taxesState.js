import React, { useEffect, useState} from 'react';
import TaxesContext from './taxesContext';

export const TaxesState = ({ children }) => {

    const valuesContext = {
        
    }

    return (
        <TaxesContext.Provider
            value={valuesContext}
        >
            {children}
        </TaxesContext.Provider>
    )
}