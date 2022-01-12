import React, { useContext, useEffect } from "react";
import { Field } from "formik";
import { Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikDiasFestivos = ({formik, props, anos}) => {

    const { registroSeleccionado } = useContext(MasterTablesContext);

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("ano", registroSeleccionado.ano);
            formik.setFieldValue("fecha", registroSeleccionado.fecha_original);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="mb-4">
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
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="mb-4">
                    <label htmlFor="fecha" className="font-weight-bold">Día festivo</label>
                    <Field
                        id="fecha"
                        name="fecha"
                        component={BaseInput}
                        type="date"
                    />
                </Col>
            </Row>
        </>
    )
}