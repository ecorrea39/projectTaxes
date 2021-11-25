import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikMedidaValor = ({formik, props}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("fecha", registroSeleccionado.fecha_original);
            formik.setFieldValue("valor", registroSeleccionado.valor);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="mb-4">
                    <label htmlFor="fecha" className="font-weight-bold">Fecha</label>
                    <Field
                        id="fecha"
                        name="fecha"
                        component={BaseInput}
                        type="date"
                    />
                </Col>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="valor" className="font-weight-bold">Valor</label>
                    <Field
                        id="valor"
                        name="valor"
                        component={BaseInput}
                    />
                </Col>
            </Row>
        </>
    )
}