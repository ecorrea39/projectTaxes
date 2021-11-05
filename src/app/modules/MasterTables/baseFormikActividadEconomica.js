import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikActividadEconomica = ({formik, props, motores}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(()=> {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("name", registroSeleccionado.name);
            formik.setFieldValue("codigo", registroSeleccionado.codigo);
            formik.setFieldValue("id_motor", registroSeleccionado.id_motor);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name" className="font-weight-bold">Descripción</label>
                    <Field
                        id="name"
                        name="name"
                        component={BaseInput}
                        onKeyUp={(e) => validarDescripcion(e, props)}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="codigo" className="font-weight-bold">Código actividad</label>
                    <Field
                        id="codigo"
                        name="codigo"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="id_motor" className="font-weight-bold">Motor productivo</label>
                    <Field
                        id="id_motor"
                        name="id_motor"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            motores.map((s) => {
                                return <option key={s.id} value={s.id}>{s.name}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>
        </>
    )
}