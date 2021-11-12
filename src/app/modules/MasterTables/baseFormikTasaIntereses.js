import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikTasaIntereses = ({formik, props, anos}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("ano", registroSeleccionado.ano);
            formik.setFieldValue("mes", registroSeleccionado.mes);
            formik.setFieldValue("tasa_bcv", registroSeleccionado.tasa_bcv);
            formik.setFieldValue("recargo_cot", registroSeleccionado.recargo_cot);
            formik.setFieldValue("tasa_intereses_mora", registroSeleccionado.tasa_intereses_mora);
            formik.setFieldValue("ngaceta", registroSeleccionado.ngaceta);
            formik.setFieldValue("fecha_gaceta", registroSeleccionado.fecha_gaceta);
        }
    },[]);

    return (
        <>
            <Row className="mb-4">
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-4">
                    <label htmlFor="ano_declaracion" className="font-weight-bold">Año</label>
                    <Field
                        id="ano"
                        name="ano"
                        type="select"
                        component={BaseSelect}>
                        <option value="" disabled>seleccione</option>
                        {
                            anos.map((s, i) => {
                                return <option key={i} value={s}>{s}</option>
                            })
                        }
                    </Field>
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-4">
                    <label htmlFor="ano_declaracion" className="font-weight-bold">Mes</label>
                    <Field
                        id="mes"
                        name="mes"
                        type="select"
                        component={BaseSelect}>
                        <option value="" disabled>seleccione</option>
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </Field>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6" className="mb-4">
                    <label htmlFor="tasa_bcv" className="font-weight-bold">Tasa de interés B.C.V.</label>
                    <Field
                        id="tasa_bcv"
                        name="tasa_bcv"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                    <label htmlFor="recargo_cot" className="font-weight-bold">Recargo C.O.T.</label>
                    <Field
                        id="recargo_cot"
                        name="recargo_cot"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="mb-4">
                    <label htmlFor="tasa_intereses_mora" className="font-weight-bold">Tasa de interés Art. 66 C.O.T.</label>
                    <Field
                        id="tasa_intereses_mora"
                        name="tasa_intereses_mora"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6" className="mb-4">
                    <label htmlFor="ngaceta" className="font-weight-bold">Gaceta</label>
                    <Field
                        id="ngaceta"
                        name="ngaceta"
                        component={BaseInput}
                    />
                </Col>
                <Col xs="12" sm="12" md="6" lg="6" xl="6" xxl="6" className="mb-4">
                    <label htmlFor="fecha_gaceta" className="font-weight-bold">Fecha gaceta</label>
                    <Field
                        id="fecha_gaceta"
                        name="fecha_gaceta"
                        component={BaseInput}
                        type="date"
                    />
                </Col>
            </Row>
        </>
    )
}