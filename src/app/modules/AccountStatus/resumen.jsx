import React, {useContext} from "react";

import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../src/_metronic/_helpers";
import AccountStatusContext from "../../context/accountStatus/accountStatusContext";

function Resumen({className}) {

    const { totalDeudaTrim, totalDeudaCxP, totalPagos, totalCreditoFisTemp, totalCreditoFisAprob } = useContext(AccountStatusContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px", marginTop: "3%" }

    function FormatNumber(number) {
        return  new Intl.NumberFormat("ES-ES", {
            style: "currency",
            currency: "VEF"
        }).format(number)
    }

    return (
        <>
            <div className={`card card-custom bg-radial-gradient-primary ${className}`} style={{width: '100%'}}>
                <div className="card-header border-0 pt-5">
                    <h3 className="card-title font-weight-bolder text-white">
                        Totales Resumen Estado de Cuenta del Contribuyente
                    </h3>
                    <div className="card-toolbar svg-icon svg-icon-3x svg-icon-white ml-n2">
                        <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                    </div>
                </div>

                <div className="card-body d-flex flex-column p-0" style={styleCard}>

                    <div className="card-spacer bg-white card-rounded flex-grow-1">
                        <div className="row m-0">
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-arrange.svg")} />
                                    Total deuda trimestres declarados
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(totalDeudaTrim)}</div>
                            </div>
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                                    Total deuda efectos y cuentas por pagar
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(totalDeudaCxP)}</div>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                                    Total saldos pagados
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(totalPagos)}</div>
                            </div>
                            <div className="col px-12 py-6"></div>
                        </div>
                        <div className="row m-0">
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                                    Total crédito fiscal | Saldo temporal a compensar
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(totalCreditoFisTemp)}</div>
                            </div>
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                                    Total crédito fiscal | Saldo aprobado certificado de crédito fiscal
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{FormatNumber(totalCreditoFisAprob)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resumen;