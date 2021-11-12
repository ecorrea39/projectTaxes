import React, { useEffect, useState} from 'react';
import {clientAxios, requestConfig } from '../../config/configAxios';
import GroupsContext from './groupsContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const GroupsState = ({ children }) => {


    const valuesContext = {
        
    }

    return (
        <GroupsContext.Provider value={valuesContext}>
            {children}
        </GroupsContext.Provider>
    )

}