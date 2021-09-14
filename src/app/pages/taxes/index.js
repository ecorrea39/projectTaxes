import React from 'react'
import TaxesModule from '../../modules/Taxes/taxesModules';
import {TaxesState} from "../../context/taxes/taxesState";

const TaxesPage = () => {
  return (
    <TaxesState>
      <TaxesModule />
    </TaxesState>
  )
}

export default TaxesPage;