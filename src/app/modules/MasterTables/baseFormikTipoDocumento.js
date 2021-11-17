import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikTipoDocumento = ({formik, props}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("codigo", registroSeleccionado.codigo);
            formik.setFieldValue("name", registroSeleccionado.name);
        }
    },[]);

    return (
        <>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="mb-4">
                    <label htmlFor="codigo" className="font-weight-bold">Código</label>
                    <Field
                        id="codigo"
                        name="codigo"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="mb-4">
                    <label htmlFor="name" className="font-weight-bold">name</label>
                    <Field
                        id="name"
                        name="name"
                        component={BaseInput}
                        onKeyUp={(e) => validarDescripcion(e, props)}
                    />
                </Col>
            </Row>
        </>
    )
}