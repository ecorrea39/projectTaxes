import { Field } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";

export const InputsByConcepts = (props) => {

    console.log(props)

    const Inputs = () => {

        switch(props.element.idConcepto) {
            case "3":
                return (
                    <Row>
                        <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                            <label htmlFor="multa" className="font-weight-bold">
                                Numero del Acta
                            </label>
                            <Field
                                id="nroDoc"
                                name={`conceptosAPagar[${props.index}].nroDoc`}
                                component={BaseInput}
                            />
                        </Col>
                        <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                            <label htmlFor="fecha-acta" className="font-weight-bold">
                                Fecha
                            </label>
                            <Field
                                id="fecha-acta"
                                name={`conceptosAPagar[${props.index}].fechaTipoConcp`}
                                type="date"
                                component={BaseInput}
                            />
                        </Col>
                        <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                            <label htmlFor="monto-acta" className="font-weight-bold">
                                Monto
                            </label>
                            <Field
                                id="monto-acta"
                                name={`conceptosAPagar[${props.index}].monto`}
                                component={BaseInput}
                            />
                        </Col>
                    </Row>
                )
            case "4":
                return (
                    <>
                        otro concepto 4
                    </>
                )
            case "5":
                return (
                    <>
 otro concepto 5
                    </>
                )
            case "6":
                return (
                    <>
 otro concepto 6
                    </>
                )
            default:
                return (
                    <>
 otro concepto D
                    </>
                )
         
        }

    }

    return (
        <>
            <Inputs />
        </>
    )
}