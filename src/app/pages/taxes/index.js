import React from 'react'
import TaxesModule from '../../modules/Taxes/TaxesModules';
import {TaxesState} from "../../context/taxes/taxesState";

const TaxesPage = () => {
  return (
    <TaxesState>
      <TaxesModule />
    </TaxesState>
  )
}

export default TaxesPage;