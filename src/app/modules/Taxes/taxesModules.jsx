import React, { useContext } from "react";
import TaxesContext from "../../context/taxes/taxesContext";
import FormPayment from "./formPayment";
import ReceiptPayment from "./receiptPayment";
import TitleFormTaxes from "./titleFormTaxes";

function TaxesModule() {

  const { stepTaxes } = useContext(TaxesContext);
  const title = stepTaxes == 1 ? "Información del pago" : 
                stepTaxes == 2 ? "Recibo de Pago" : "Información del pago";

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={`card card-custom card-stretch gutter-b`}>
          {/* Header */}
          <div className="card-header border-0 pt-5">
            <TitleFormTaxes title={title}/>
          </div>
          {/* Body */}
          <div className="card-body d-flex flex-column">
            {
              stepTaxes == 1 ? <FormPayment /> : <ReceiptPayment />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaxesModule;