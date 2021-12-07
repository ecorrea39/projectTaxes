import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikMunicipios = ({formik, props}) => {

    const { registroSeleccionado, estados, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("cod_municipio", registroSeleccionado.cod_municipio);
            formik.setFieldValue("id_estado", registroSeleccionado.id_estado);
            formik.setFieldValue("descripcion", registroSeleccionado.descripcion);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="id_estado" className="font-weight-bold">Estado</label>
                    <Field
                        id="id_estado"
                        name="id_estado"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            estados.map((s) => {
                                return <option key={s.id} value={s.id}>{s.descripcion}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="cod_municipio" className="font-weight-bold">Código municipio</label>
                    <Field
                        id="cod_municipio"
                        name="cod_municipio"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="descripcion" className="font-weight-bold">Municipio</label>
                    <Field
                        id="descripcion"
                        name="descripcion"
                        component={BaseInput}
                        onKeyUp={(e) => validarDescripcion(e, props, formik)}
                    />
                </Col>
            </Row>
        </>
    )
}