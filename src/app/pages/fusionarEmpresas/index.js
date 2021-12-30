import React from 'react'
import FusionarEmpresasModule from '../../modules/FusionarEmpresas/fusionarEmpresasModules';
import { FusionarEmpresasState } from "../../context/fusionarEmpresas/fusionarEmpresasState";

const FusionarEmpresasPage = () => {
    return (
        <FusionarEmpresasState>
            <FusionarEmpresasModule />
        </FusionarEmpresasState>
    )
}

export default FusionarEmpresasPage;