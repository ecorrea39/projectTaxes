import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikDiasFestivos = ({formik, props}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("ano", registroSeleccionado.ano);
            formik.setFieldValue("fecha", registroSeleccionado.fecha);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name" className="font-weight-bold">Año</label>
                    <Field
                        id="ano"
                        name="ano"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="mb-4">
                    <label htmlFor="fecha" className="font-weight-bold">Día festivo</label>
                    <Field
                        id="fecha"
                        name="fecha"
                        component={BaseInput}
                        type="date"
                    />
                </Col>
            </Row>
        </>
    )
}