import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import PnaContext from "../../context/pna/pnaContext";

export const BaseFormik = ({formik, props}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(PnaContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("user_id", registroSeleccionado.user_id);
            formik.setFieldValue("cumple_obligacion", registroSeleccionado.cumple_obligacion);
            formik.setFieldValue("numero_certificado", registroSeleccionado.numero_certificado);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name" className="font-weight-bold">Número de RIF</label>
                    <Field
                        id="rif"
                        name="rif"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name" className="font-weight-bold">Contribuyente</label>
                    <Field
                        id="name"
                        name="name"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name" className="font-weight-bold">Descripción</label>
                    <Field
                        id="name"
                        name="name"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="cumple_obligacion" className="font-weight-bold">Cumple obligación</label>
                    <Field
                        id="cumple_obligacion"
                        name="cumple_obligacion"
                        type="select"
                        component={BaseSelect}>
                        <option value="" disabled>seleccione</option>
                        <option value="true">Cumple</option>
                        <option value="false">No cumple</option>
                    </Field>
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="numero_certificado" className="font-weight-bold">Número certificado</label>
                    <Field
                        id="numero_certificado"
                        name="numero_certificado"
                        component={BaseInput}
                    />
                </Col>
            </Row>
        </>
    )
}