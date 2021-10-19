import React from 'react'
import MasterTablesModule from '../../modules/MasterTables/masterTablesModules';
import { MasterTablesState } from "../../context/masterTables/masterTablesState";

const MasterTablesPage = () => {
    return (
        <MasterTablesState>
            <MasterTablesModule />
        </MasterTablesState>
    )
}

export default MasterTablesPage;