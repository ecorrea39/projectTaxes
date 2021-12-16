import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikFirmasAutorizadas = ({formik, props}) => {

    const { registroSeleccionado, listReportes } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("documento", registroSeleccionado.documento);
            formik.setFieldValue("concepto", registroSeleccionado.concepto);
            formik.setFieldValue("nombre", registroSeleccionado.nombre);
            formik.setFieldValue("cargo", registroSeleccionado.cargo);
            formik.setFieldValue("ngaceta", registroSeleccionado.ngaceta);
            formik.setFieldValue("fecha_gaceta", registroSeleccionado.fecha_gaceta);
            formik.setFieldValue("orden_administrativa", registroSeleccionado.orden_administrativa);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="documento" className="font-weight-bold">Reporte</label>
                    <Field
                        id="documento"
                        name="documento"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            listReportes.map((s) => {
                                return <option key={s} value={s}>{s}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>

            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="nombre" className="font-weight-bold">Responsable</label>
                    <Field
                        id="nombre"
                        name="nombre"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="cargo" className="font-weight-bold">Cargo</label>
                    <Field
                        id="cargo"
                        name="cargo"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <label htmlFor="ngaceta" className="font-weight-bold">Número gaceta</label>
                    <Field
                        id="ngaceta"
                        name="ngaceta"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <label htmlFor="fecha_gaceta" className="font-weight-bold">Fecha gaceta</label>
                    <Field
                        id="fecha_gaceta"
                        name="fecha_gaceta"
                        component={BaseInput}
                        type="date"
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="orden_administrativa" className="font-weight-bold">Orden administrativa</label>
                    <Field
                        id="orden_administrativa"
                        name="orden_administrativa"
                        component={BaseInput}
                    />
                </Col>
            </Row>

        </>
    )
}