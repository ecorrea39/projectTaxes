import React, {useContext, useState, useEffect} from "react";

import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../src/_metronic/_helpers";
import {clientAxios} from "../../config/configAxios";

function Resumen({className}) {

    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px", marginTop: "3%" }

    const [totalDeudaTrim, setTotalDeudaTrim] = useState();
    const [totalDeudaCxP, setTotalDeudaCxP] = useState();
    const [totalPagos, setTotalPagos] = useState();
    const [totalCreditoFisTemp, setTotalCreditoFisTemp] = useState();
    const [totalCreditoFisAprob, setTotalCreditoFisAprob] = useState();

    const nrif = localStorage.getItem('rif');

    useEffect(() => {
        getResumen()
    }, []);

    function FormatNumber(number) {
        return  new Intl.NumberFormat("ES-ES", {
            style: "currency",
            currency: "VEF"
        }).format(number)
    }

    const getResumen = async () => {

        try {
            const respuesta = await clientAxios.get(`/balance/${nrif}`);

            (respuesta.data.data[0] !== null) ? setTotalDeudaTrim(respuesta.data.data[0].attributes.total): setTotalDeudaTrim(0);
            (respuesta.data.data[1] !== null) ? setTotalDeudaCxP(respuesta.data.data[1].attributes.total): setTotalDeudaCxP(0);
            (respuesta.data.data[2] !== null) ? setTotalPagos(respuesta.data.data[2].attributes.total): setTotalPagos(0);
            (respuesta.data.data[3] !== null) ? setTotalCreditoFisTemp(respuesta.data.data[3].attributes.total): setTotalCreditoFisTemp(0);
            (respuesta.data.data[4] !== null) ? setTotalCreditoFisAprob(respuesta.data.data[4].attributes.total): setTotalCreditoFisAprob(0);

        } catch (error) {
            console.log(error)
        }
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
                                <div className="font-size-h4 font-weight-bolder">{typeof totalDeudaTrim !== "undefined" ? FormatNumber(totalDeudaTrim) : FormatNumber(0)}</div>
                            </div>
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                                    Total deuda efectos y cuentas por pagar
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{typeof totalDeudaCxP !== "undefined" ? FormatNumber(totalDeudaCxP) : FormatNumber(0)}</div>
                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                                    Total saldos pagados
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{typeof totalPagos !== "undefined" ? FormatNumber(totalPagos) : FormatNumber(0)}</div>
                            </div>
                            <div className="col px-12 py-6"></div>
                        </div>
                        <div className="row m-0">
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                                    Total crédito fiscal | Saldo temporal a compensar
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{typeof totalCreditoFisTemp !== "undefined" ? FormatNumber(totalCreditoFisTemp) : FormatNumber(0)}</div>
                            </div>
                            <div className="col px-12 py-6">
                                <div className="font-size-sm text-muted font-weight-bold">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} />
                                    Total crédito fiscal | Saldo aprobado certificado de crédito fiscal
                                </div>
                                <div className="font-size-h4 font-weight-bolder">{typeof totalCreditoFisAprob !== "undefined" ? FormatNumber(totalCreditoFisAprob) : FormatNumber(0)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resumen;