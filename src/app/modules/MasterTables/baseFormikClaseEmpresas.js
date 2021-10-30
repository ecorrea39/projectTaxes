import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikClaseEmpresas = ({formik, props}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("name", registroSeleccionado.name);
            formik.setFieldValue("descripcion", registroSeleccionado.descripcion);
            formik.setFieldValue("is_active", registroSeleccionado.is_active);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name" className="font-weight-bold">Nombre</label>
                    <Field
                        id="name"
                        name="name"
                        component={BaseInput}
                        onKeyUp={(e) => validarDescripcion(e, props)}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="descripcion" className="font-weight-bold">Descripción</label>
                    <Field
                        type="textarea"
                        id="descripcion"
                        name="descripcion"
                        component={BaseInput}
                        onKeyUp={(e) => validarDescripcion(e, props)}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="is_active" className="font-weight-bold">Estatus</label>
                    <Field
                        id="is_active"
                        name="is_active"
                        type="select"
                        component={BaseSelect}
                        disabled={props.accion === 'Agregar' ? true : false}>
                        <option value="" disabled>seleccione</option>
                        <option value="true">Activo</option>
                        <option value="false">No activo</option>
                    </Field>
                </Col>
            </Row>
        </>
    )
}