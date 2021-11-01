import { Field } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Checkbox from "../Forms/BaseCheckbox";


export const ListConcepts = ({conceptos,formik}) => {

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h4>Otros Conceptos de Pagos</h4>
                </Col>
            </Row>
            <Row>
            {
                conceptos.map((element,key) => (
                    <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" key={key}>
                        <Field
                            type="checkbox" 
                            component={Checkbox} 
                            name="conceptos"
                            label={element.name}
                            value={element.id}
                            formik={formik}
                        />
                    </Col>
                ))
            }
            </Row>
        </>
    )
}