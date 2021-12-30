import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikEstados = ({formik, props}) => {

    const { registroSeleccionado, listRegiones, listRedi, unidadEstadal, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("cod_estado", registroSeleccionado.cod_estado);
            formik.setFieldValue("region", registroSeleccionado.region);
            formik.setFieldValue("redi", registroSeleccionado.redi);
            formik.setFieldValue("unidad_estadal", registroSeleccionado.unidad_estadal);
            formik.setFieldValue("descripcion", registroSeleccionado.descripcion);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="cod_estado" className="font-weight-bold">Código estado</label>
                    <Field
                        id="cod_estado"
                        name="cod_estado"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="descripcion" className="font-weight-bold">Estado</label>
                    <Field
                        id="descripcion"
                        name="descripcion"
                        component={BaseInput}
                        onKeyUp={(e) => validarDescripcion(e, props)}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="region" className="font-weight-bold">Región</label>
                    <Field
                        id="region"
                        name="region"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            listRegiones.map((s) => {
                                return <option key={s} value={s}>{s}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="redi" className="font-weight-bold">Redi</label>
                    <Field
                        id="redi"
                        name="redi"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            listRedi.map((s) => {
                                return <option key={s} value={s}>{s}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>

            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="unidad_estadal" className="font-weight-bold">Unidad estadal</label>
                    <Field
                        id="unidad_estadal"
                        name="unidad_estadal"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            unidadEstadal.map((s) => {
                                return <option key={s.id} value={s.id}>{s.asignacion}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>
        </>
    )
}