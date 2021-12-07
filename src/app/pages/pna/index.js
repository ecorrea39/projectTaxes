import React from 'react'
import PnaModule from '../../modules/Pna/pnaModules';
import { PnaState } from "../../context/pna/pnaState";

const PnaPage = () => {
    return (
        <PnaState>
            <PnaModule />
        </PnaState>
    )
}

export default PnaPage;