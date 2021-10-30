import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikBancosRecaudadores = ({formik, props}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("nom_banco", registroSeleccionado.nom_banco);
            formik.setFieldValue("cod_banco", registroSeleccionado.cod_banco);
            formik.setFieldValue("is_active", registroSeleccionado.is_active);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name" className="font-weight-bold">Nombre del banco</label>
                    <Field
                        id="nom_banco"
                        name="nom_banco"
                        component={BaseInput}
                        onKeyUp={(e) => validarDescripcion(e, props)}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="cod_banco" className="font-weight-bold">Código banco</label>
                    <Field
                        id="cod_banco"
                        name="cod_banco"
                        component={BaseInput}
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