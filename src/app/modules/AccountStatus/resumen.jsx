import React, {useContext, useState} from "react";

import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../src/_metronic/_helpers";
import AccountStatusContext from "../../context/accountStatus/accountStatusContext";

function Resumen({className}) {

    const { deudaTrim, deudaCxP, pagos, creditoFisTemp, creditoFisAprob } = useContext(AccountStatusContext);

    function FormatNumber(number) {
        return  new Intl.NumberFormat("ES-ES", {
            style: "currency",
            currency: "VEF"
        }).format(number)
    }

    return (
        <>
            <div className={`card card-custom bg-radial-gradient-primary ${className}`} style={{width: '80%'}}>
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title font-weight-bolder text-white">
                        Estado de Cuenta del Contribuyente
                    </h3>
                    <div className="card-toolbar svg-icon svg-icon-3x svg-icon-white ml-n2">
                        <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                    </div>
                </div>

                <div className="card-body d-flex flex-column p-0">
                    <div id="kt_mixed_widget_6_chart" style={{height: "15px"}}/>
                    <div className="card-spacer bg-white card-rounded flex-grow-1">
                        {/* begin::Row */}
                        <div className="row m-0">
                            <div className="col px-4 py-4 mr-4">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    Trimestres declarados
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(deudaTrim)}</div>
                            </div>
                            <div className="col px-4 py-4 mr-4">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    Efectos y cuentas por pagar
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(deudaCxP)}</div>
                            </div>
                            <div className="col px-4 py-4 mr-4">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    Saldo pagados
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(pagos)}</div>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col px-6 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    Crédito fiscal | Saldo temporal
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(creditoFisTemp)}</div>
                            </div>
                            <div className="col px-6 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    Crédito fiscal | Saldo aprobado
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(creditoFisAprob)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resumen;