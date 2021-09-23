import React, {useEffect, useMemo} from "react";
import {Tab, Tabs, Card} from "react-bootstrap";

import AccountStatusContext from "../../context/accountStatus/accountStatusContext";
import TitleFormAccountStatus from "./titleFormAccountStatus";
import DeudasTrimestresDeclarados from '../AccountStatus/deudasTrimestresDeclarados';
import DeudasEfectosCuentasPagar from '../AccountStatus/deudasEfectosCuentasPagar';
import PagosCreditosTrimestresDeclarados from '../AccountStatus/pagosCreditosTrimestresDeclarados';
import PagosCreditosEfectosCuentasPagar from '../AccountStatus/pagosCreditosEfectosCuentasPagar';
import PagosCreditosSaldoCompensar from '../AccountStatus/pagosCreditosSaldoCompensar';
import Resumen from '../AccountStatus/resumen'

function AccountStatusModules({className, baseColor = "primary", widgetHeight = "150px"}) {

    const title = "Estado de Cuenta del Contribuyente";

    return (

        <div className="row">
            <div className="col-lg-12">
                <div className={`card card-custom card-stretch gutter-b`}>
                    {/* Header */}
                    <div className="card-header border-0 pt-5">
                        <TitleFormAccountStatus title={title}/>
                    </div>
                    {/* Body */}
                    <div className="card-body d-flex flex-column">
                        {
                            <Card style={{width: '100%', height: '100%', padding: '2%'}}>
                                <Tabs id="estado-cuenta" style={{padding: '2%'}} className="mb-3">
                                    <Tab eventKey="resumen" title="Resumen" style={{padding: '3%'}}>
                                        <Resumen/>
                                    </Tab>
                                    <Tab eventKey="deudas" title="Deudas" style={{padding: '3%'}}>
                                        <DeudasTrimestresDeclarados/>
                                        <br/>
                                        <DeudasEfectosCuentasPagar/>
                                    </Tab>
                                    <Tab eventKey="pagos-creditos" title="Pagos y Créditos">
                                        <PagosCreditosTrimestresDeclarados/>
                                        <br/>
                                        <PagosCreditosEfectosCuentasPagar/>
                                        <br/>
                                        <PagosCreditosSaldoCompensar/>
                                    </Tab>
                                </Tabs>
                            </Card>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountStatusModules;