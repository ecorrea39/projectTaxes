import React from "react";
import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import BaseInput from "../Forms/BaseInputs";

export const InputsTaxes = () => {

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Información del tributo</h5>
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
                        component={BaseInput}
                        disabled
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="intereses" className="font-weight-bold">
                        Interes de mora
                    </label>
                    <Field
                        id="intereses"
                        name="intereses"
                        component={BaseInput}
                        maxLength="10"
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Multa %
                    </label>
                    <Field
                        id="multa"
                        name="multa"
                        component={BaseInput}
                        maxLength="10"
                    />
                </Col>
            </Row>
        </>
    )

}