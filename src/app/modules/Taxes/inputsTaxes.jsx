import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import TaxesContext from "../../context/taxes/taxesContext";
import BaseInputMonto from "../Forms/BaseInputMonto";

export const InputsTaxes = () => {

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h4>Subtotales tributos</h4>
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-tributo" className="font-weight-bold">
                        Monto del tributo
                    </label>
                    <Field
                        id="monto-tributo"
                        name="montoTributo"
                        component={BaseInputMonto}
                        maxLength="20"
                        disabled
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="intereses" className="font-weight-bold">
                        Interes de mora
                    </label>
                    <Field
                        id="intereses"
                        name="montoIntereses"
                        component={BaseInputMonto}
                        maxLength="20"
                        disabled
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Multa %
                    </label>
                    <Field
                        id="multa"
                        name="montoMulta"
                        component={BaseInputMonto}
                        maxLength="20"
                        disabled
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-tributo" className="font-weight-bold">
                        Monto a pagar
                    </label>
                    <Field
                        id="monto"
                        name="montoPagar"
                        component={BaseInputMonto}
                        maxLength="20"
                    />
                </Col>
            </Row>
        </>
    )

}