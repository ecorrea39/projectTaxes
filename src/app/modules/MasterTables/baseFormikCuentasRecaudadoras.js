import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikCuentasRecaudadoras = ({formik, props, bancos}) => {

    const { registroSeleccionado } = useContext(MasterTablesContext);

    useEffect(()=> {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("id_banco", registroSeleccionado.id_banco);
            formik.setFieldValue("cuenta_tipo", registroSeleccionado.cuenta_tipo);
            formik.setFieldValue("cuenta_nro", registroSeleccionado.cuenta_nro);
            formik.setFieldValue("is_active", registroSeleccionado.is_active);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="id_banco" className="font-weight-bold">Banco</label>
                    <Field
                        id="id_banco"
                        name="id_banco"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            bancos.map((s) => {
                                return <option key={s.id} value={s.id}>{s.nom_banco}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="cuenta_tipo" className="font-weight-bold">Tipo de cuenta</label>
                    <Field
                        id="cuenta_tipo"
                        name="cuenta_tipo"
                        type="select"
                        component={BaseSelect}>
                        <option value="" disabled>seleccione</option>
                        <option value="Ahorro">Ahorro</option>
                        <option value="Corriente">Corriente</option>
                    </Field>
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="cuenta_nro" className="font-weight-bold">Número de cuenta</label>
                    <Field
                        id="cuenta_nro"
                        name="cuenta_nro"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            {/*
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
            </Row>*/}
        </>
    )
}