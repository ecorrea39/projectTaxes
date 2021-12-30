import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import TaxesContext from "../../context/taxes/taxesContext";
import BaseInputMonto from "../Forms/BaseInputMonto";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Tooltip } from "@material-ui/core";

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
                        Tributos
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
                        Interes
                    </label>
                    <Tooltip title="Esto es un calculo aproximado de los interes." arrow placement="top">
                        <HelpOutlineIcon className="ml-2 mr-2" style={{fontSize: "16px"}} />
                    </Tooltip>
                   
                    <Field
                        id="intereses"
                        name="montoIntereses"
                        component={BaseInputMonto}
                        maxLength="20"
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Multas %
                    </label>
                    <Tooltip title="Esto es un calculo aproximado de la multa %." arrow placement="top">
                        <HelpOutlineIcon className="ml-2 mr-2" style={{fontSize: "16px"}} />
                    </Tooltip>
                    <Field
                        id="multa"
                        name="montoMulta"
                        component={BaseInputMonto}
                        maxLength="20"
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-tributo" className="font-weight-bold">
                        Total a pagar
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