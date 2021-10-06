import React from "react";
import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";

export const ActaReparo = ({extraOnChange}) => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Acta de Reparo</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="numActa" className="font-weight-bold">
                        Numero del Acta
                    </label>
                    <Field
                        id="numActa"
                        name="numActa"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="fecha-acta" className="font-weight-bold">
                        Fecha
                    </label>
                    <Field
                        id="fecha-acta"
                        name="fechaActa"
                        type="date"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="montoActa" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="montoActa"
                        name="montoActa"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const InteresesMoratorios = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Intereses de Mora</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-intereses-moratorios" className="font-weight-bold">
                        Intereses Moratorios
                    </label>
                    <Field
                        id="monto-intereses-moratorios"
                        name="montoInteresesMoratorios"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const ChequeDevuelto = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Cheque Devuelto</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="num-cheque" className="font-weight-bold">
                        Nro. Cheque
                    </label>
                    <Field
                        id="num-cheque"
                        name="numCheque"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-cheque" className="font-weight-bold">
                        Fecha Cheque
                    </label>
                    <Field
                        id="fecha-cheque"
                        name="fechaCheque"
                        type="date"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="nota-debito" className="font-weight-bold">
                        Nota de Debito
                    </label>
                    <Field
                        id="nota-debito"
                        name="notaDebito"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-nota-debito" className="font-weight-bold">
                        Fecha Nota de Debito
                    </label>
                    <Field
                        id="fecha-nota-debito"
                        name="fechaNotaDebito"
                        type="date"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-cheque" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-cheque"
                        name="montoCheque"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const ConvenioPago = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Convenio de Pago</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="num-conv-pago" className="font-weight-bold">
                        Nro. Convenio Pago
                    </label>
                    <Field
                        id="num-conv-pago"
                        name="numConvPago"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-convenio" className="font-weight-bold">
                        Fecha Convenio
                    </label>
                    <Field
                        id="fecha-convenio"
                        name="fechaConvenio"
                        type="date"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="num-giro-pago" className="font-weight-bold">
                        Nro. Giro
                    </label>
                    <Field
                        id="num-giro-pago"
                        name="numGiroConvenioPago"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-venc-convenio" className="font-weight-bold">
                        Fecha
                    </label>
                    <Field
                        id="fecha-venc-convenio"
                        name="fechaVencConvenio"
                        type="date"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-convenio" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-convenio"
                        name="montoConvenio"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-intereses" className="font-weight-bold">
                        Monto Intereses de Mora
                    </label>
                    <Field
                        id="monto-interese"
                        name="montoInteresesConvenio"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const MultasPorcentuales = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Multas Porcentuales</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="monto-multa" className="font-weight-bold">
                        Multa
                    </label>
                    <Field
                        id="monto-multa"
                        name="montoMulta"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const IncumplimientoDeberesFormales = ({extraOnChange}) => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Resolución por Incumplimiento de Deberes Formales</h5>
                </Col>
            </Row>
            <Row>
            <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="num-resolucion-form" className="font-weight-bold">
                        Nro. Resolución
                    </label>
                    <Field
                        id="num-resolucion-form"
                        name="numResolucionForm"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-resolucion-form" className="font-weight-bold">
                        Fecha Resolución
                    </label>
                    <Field
                        id="fecha-resolucion-form"
                        name="fechaResolucionForm"
                        type="date"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="monto-resolucion-form" className="font-weight-bold">
                        Monto Multa
                    </label>
                    <Field
                        id="monto-resolucion-form"
                        name="montoMultaResolucionForm"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const IncumplimientoDeberesMateriales = ({extraOnChange}) => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Resolución por Incumplimiento de Deberes Materiales</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="num-resolucion-mat" className="font-weight-bold">
                        Nro. Resolución
                    </label>
                    <Field
                        id="num-resolucion-mat"
                        name="numResolucionMat"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-resolucion-mat" className="font-weight-bold">
                        Fecha Resolución
                    </label>
                    <Field
                        id="fecha-resolucion-mat"
                        name="fechaResolucionMat"
                        type="date"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="monto-multa-resolucion-mat" className="font-weight-bold">
                        Monto Multa
                    </label>
                    <Field
                        id="monto-multa-resolucion-mat"
                        name="montoMultaResolucionMat"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const CreditoFiscal = ({extraOnChange}) => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Saldo a Compensar por Crédito Fiscal</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="multa" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-credito-fiscal"
                        name="montoCredito"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const ResolucionAdministrativa = ({extraOnChange}) => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Resolucion Administrativa</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="num-resolucion-admin" className="font-weight-bold">
                        Nro. Resolución
                    </label>
                    <Field
                        id="num-resolucion-admin"
                        name="numResolucionAdmin"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-resolucion-admin" className="font-weight-bold">
                        Fecha Resolución
                    </label>
                    <Field
                        id="fecha-resolucion-admin"
                        name="fechaResolucionAdmin"
                        type="date"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-multa-resolucion-admin" className="font-weight-bold">
                        Monto Multa
                    </label>
                    <Field
                        id="monto-multa-resolucion-admin"
                        name="montoMultaResolucionAdmin"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-intereses-resolucion-admin" className="font-weight-bold">
                        Monto Intereses
                    </label>
                    <Field
                        id="monto-interese-resolucion-admin"
                        name="montoInteresesResolucionAdmin"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const ResolucionCulminatoriaSumario = ({extraOnChange}) => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Resolucion Culminatoria Sumario</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="num-resolucion-admin" className="font-weight-bold">
                        Nro. Resolución
                    </label>
                    <Field
                        id="num-resolucion-cul"
                        name="numResolucionCul"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-resolucion-cul" className="font-weight-bold">
                        Fecha Resolución
                    </label>
                    <Field
                        id="fecha-resolucion-cul"
                        name="fechaResolucionCul"
                        type="date"
                        component={BaseInput}
                        extraOnChange={extraOnChange}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-multa-resolucion-cul" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-multa-resolucion-cul"
                        name="montoMultaResolucionCul"
                        component={BaseInput}
                        extraOnChange={extraOnChange}   
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}