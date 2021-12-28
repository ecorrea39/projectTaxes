import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import {Button, Card, Col, Row} from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import FusionarEmpresasContext from "../../context/pna/pnaContext";

export const BaseFormik = ({formik, props}) => {

    const { registroSeleccionado, validarNroTrabajadores } = useContext(FusionarEmpresasContext);

    return (
        <>
            <h5 className="mt-4 mb-4">Datos Entidad de Trabajo a Fusionar</h5>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
                    <label htmlFor="tipo_fusionar" className="font-weight-bold">Tipo</label>
                    <Field
                        id="tipo_fusionar"
                        name="tipo_fusionar"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>...</option>
                        <option value="j">J</option>
                        <option value="g">G</option>
                    </Field>
                </Col>
                <Col xs="12" sm="9" md="9" lg="9" xl="9" xxl="9">
                    <label htmlFor="rif_fusionar" className="font-weight-bold">Número de RIF</label>
                    <Field
                        id="rif_fusionar_"
                        name="rif_fusionar"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name_fusionar" className="font-weight-bold">Entidad de Trabajo</label>
                    <Field
                        id="name_fusionar"
                        name="name_fusionar"
                        component={BaseInput}
                        disabled
                    />
                </Col>
            </Row>
            <h5 className="mt-4 mb-4">Datos de Entidad de Trabajo que Absorbe</h5>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
                    <label htmlFor="tipo_absorbe" className="font-weight-bold">Tipo</label>
                    <Field
                        id="tipo_absorbe"
                        name="tipo_absorbe"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>...</option>
                        <option value="j">J</option>
                        <option value="g">G</option>
                    </Field>
                </Col>
                <Col xs="12" sm="9" md="9" lg="9" xl="9" xxl="9">
                    <label htmlFor="rif_absorbe" className="font-weight-bold">Número de RIF</label>
                    <Field
                        id="rif_absorbe"
                        name="rif_absorbe"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="name_absorve" className="font-weight-bold">Entidad de Trabajo</label>
                    <Field
                        id="name_absorbe"
                        name="name_absorbe"
                        component={BaseInput}
                        disabled
                    />
                </Col>
            </Row>
        </>
    )
}