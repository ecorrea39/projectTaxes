import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {Tab, Tabs, Table, Card, Dropdown} from "react-bootstrap";
import DeudasTrimestresDeclarados from '../AccountStatus/DeudasTrimestresDeclarados';
import DeudasEfectosCuentasPagar from '../AccountStatus/DeudasEfectosCuentasPagar';
import PagosCreditosTrimestresDeclarados from '../AccountStatus/PagosCreditosTrimestresDeclarados';
import PagosCreditosEfectosCuentasPagar from '../AccountStatus/PagosCreditosEfectosCuentasPagar';
import PagosCreditosSaldoCompensar from '../AccountStatus/PagosCreditosSaldoCompensar';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../src/_metronic/_helpers";

function FormAccountStatus({className,baseColor = "primary",widgetHeight = "150px"}) {

    return (
        <>
            <Card style={{width: '100%', height: '100%'}}>
                <Tabs id="estado-cuenta" style={{padding: '2%'}} className="mb-3">
                    <Tab eventKey="resumen" title="Resumen" style={{padding: '3%'}}>

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
                                <div id="kt_mixed_widget_6_chart" style={{height: "25px"}}/>
                                <div className="card-spacer bg-white card-rounded flex-grow-1">
                                    {/* begin::Row */}
                                    <div className="row m-0">
                                        <div className="col px-4 py-4 mr-4">
                                            <div className="font-size-sm text-muted font-weight-bold">
                                                Trimestres declarados
                                            </div>
                                            <div className="font-size-h4 font-weight-bolder">50.710,00</div>
                                        </div>
                                        <div className="col px-4 py-4 mr-4">
                                            <div className="font-size-sm text-muted font-weight-bold">
                                                Efectos y cuentas por pagar
                                            </div>
                                            <div className="font-size-h4 font-weight-bolder">2.600.000,00</div>
                                        </div>
                                        <div className="col px-4 py-4 mr-4">
                                            <div className="font-size-sm text-muted font-weight-bold">
                                                Saldo pagados
                                            </div>
                                            <div className="font-size-h4 font-weight-bolder">3.170.700,00</div>
                                        </div>
                                    </div>
                                    <div className="row m-0">
                                        <div className="col px-6 py-6">
                                            <div className="font-size-sm text-muted font-weight-bold">
                                                Crédito fiscal | Saldo temporal
                                            </div>
                                            <div className="font-size-h4 font-weight-bolder">500.000,00</div>
                                        </div>
                                        <div className="col px-6 py-6">
                                            <div className="font-size-sm text-muted font-weight-bold">
                                                Crédito fiscal | Saldo aprobado
                                            </div>
                                            <div className="font-size-h4 font-weight-bolder">100.000,00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*
                        <Card bg="primary" style={{width: '20rem'}}>
                            <Card.Body>
                                <Card.Title>
                                    Trimestres declarados
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card bg="secondary" style={{width: '18rem'}}>
                            <Card.Body>
                                <Card.Title>
                                    Efectos y cuentas por pagar
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card bg="" style={{width: '18rem'}}>
                            <Card.Body>
                                <Card.Title>
                                    Saldos pagados
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card bg="" style={{width: '18rem'}}>
                            <Card.Body>
                                <Card.Title>
                                    Crédito fiscal
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card style={{width: '18rem'}}>
                            <Card.Img variant="top" src=""/>
                            <Card.Body>
                                <Card.Title>Crédito fiscal</Card.Title>
                                <Card.Text>
                                    <div>
                                        <span>Saldo temporal a compensar por crédito fiscal</span>
                                    </div>
                                    <div>
                                        <span>150.000.000,00</span>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>*/}
                    </Tab>
                    <Tab eventKey="deudas" title="Deudas" style={{padding: '3%'}}>
                        <DeudasTrimestresDeclarados />
                        <br/>
                        <DeudasEfectosCuentasPagar />
                    </Tab>
                    <Tab eventKey="pagos-creditos" title="Pagos y Créditos">
                        <PagosCreditosTrimestresDeclarados />
                        <br/>
                        <PagosCreditosEfectosCuentasPagar />
                        <br/>
                        <PagosCreditosSaldoCompensar />
                    </Tab>
                </Tabs>
            </Card>
        </>
    );
}

export default FormAccountStatus;


