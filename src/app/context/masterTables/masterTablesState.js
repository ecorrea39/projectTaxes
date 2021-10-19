import React, { useEffect, useState} from 'react';
import {clientAxios} from '../../config/configAxios';
import MasterTablesContext from './masterTablesContext';
import odb from './../../helpers/odb';

export const MasterTablesState = ({ children }) => {

    const nrif = odb.get('rif');

    useEffect(() => {
    },[]);

    const valuesContext = {
    }

    return (
        <MasterTablesContext.Provider value={valuesContext}>
            {children}
        </MasterTablesContext.Provider>
    )
}