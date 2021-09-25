import React from "react";
import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";

export const ActaReparo = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Acta de Reparo</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="multa" className="font-weight-bold">
                        Numero del Acta
                    </label>
                    <Field
                        id="numActa"
                        name="numActa"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="fecha" className="font-weight-bold">
                        Fecha
                    </label>
                    <Field
                        id="fecha"
                        name="fecha_acta"
                        type="date"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="multa" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="montoActa"
                        name="montoActa"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const SancionActaReparo = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Sanción por Acta de Reparo</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="multa" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-credito-fiscal"
                        name="monto_credito_fiscal"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const InteresesMoraXCobrar = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Intereses de Mora por Cobrar</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="multa" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-credito-fiscal"
                        name="monto_credito_fiscal"
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
                    <h5>Reposición Cheque Devuelto</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Nro. Cheque
                    </label>
                    <Field
                        id="num-cheque"
                        name="num_cheque"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-cheque" className="font-weight-bold">
                        Fecha Cheque
                    </label>
                    <Field
                        id="fecha-cheque"
                        name="fecha_cheque"
                        type="date"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-cheque" className="font-weight-bold">
                        Fecha Cheque
                    </label>
                    <Field
                        id="fecha-cheque-registro"
                        name="fecha_cheque_registro"
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
                        name="monto_cheque"
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
                    <h5>Giro por Convenio de Pago</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Nro. Convenio Pago
                    </label>
                    <Field
                        id="num-conv-pago"
                        name="num_conv_pago"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-convenio" className="font-weight-bold">
                        Fecha convenio
                    </label>
                    <Field
                        id="fecha-convenio"
                        name="fecha_convenio"
                        type="date"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Nro. Giro
                    </label>
                    <Field
                        id="num-conv-pago"
                        name="num_conv_pago"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-convenio" className="font-weight-bold">
                        Fecha
                    </label>
                    <Field
                        id="fecha-convenio-registro"
                        name="fecha_convenio_registro"
                        type="date"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-credito-fiscal"
                        name="monto_credito_fiscal"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const MultasRecargos = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Multas y Recargos</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="monto-multa" className="font-weight-bold">
                        Multa
                    </label>
                    <Field
                        id="monto-multa"
                        name="monto_multa"
                        component={BaseInput}
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
                    <h5>Intereses Moratorios</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-intereses-moratorios" className="font-weight-bold">
                        Intereses Moratorios
                    </label>
                    <Field
                        id="monto-intereses-moratorios"
                        name="monto_intereses_moratorios"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                    <label htmlFor="tipo_documento" className="font-weight-bold">
                        Tipo Documento
                    </label>
                    <Field
                        type="select"
                        component={BaseSelect}
                        id="tipo-documento"
                        name="tipo_documento"
                    >
                        <option value="" disabled>. . .</option>
                        <option value="Acta">Acta</option>
                        <option value="Cheque Devuelto">Cheque Devuelto</option>
                        <option value="Giros">Giros</option>
                    </Field>
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const IncumplimientoDeberesFormales = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Resolución por Incumplimiento de Deberes Formales</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="multa" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-credito-fiscal"
                        name="monto_credito_fiscal"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const IncumplimientoDeberesMateriales = () => {
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Resolución por Incumplimiento de Deberes Materiales</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                    <label htmlFor="multa" className="font-weight-bold">
                        Monto
                    </label>
                    <Field
                        id="monto-credito-fiscal"
                        name="monto_credito_fiscal"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export const CreditoFiscal = () => {
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
                        name="monto_credito_fiscal"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}