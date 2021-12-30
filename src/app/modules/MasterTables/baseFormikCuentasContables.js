import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikCuentasContables = ({formik, props}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    const listGrupo = ['Activo','Capital', 'Cuenta de Orden', 'Ingresos'];
    const listSubGrupo = ['Activo Circulante','Cuenta de Orden Activo','Cuenta de Orden Pasivo','Ingresos','Otros Ingresos','Superavit'];
    const listAuxiliar = ['Cuenta de Orden Activo','Cuenta de Orden Pasivo','Cuenta por Cobrar','Efectivo Caja y Banco','Efectos por Cobrar','Ingresos','Otros Ingresos','Superavit Acumulado'];

    useEffect(() => {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("concepto", registroSeleccionado.concepto);
            formik.setFieldValue("codigo_cuenta", registroSeleccionado.codigo_cuenta);
            formik.setFieldValue("naturaleza_cuenta", registroSeleccionado.naturaleza_cuenta);
            formik.setFieldValue("grupo", registroSeleccionado.grupo);
            formik.setFieldValue("sub_grupo", registroSeleccionado.sub_grupo);
            formik.setFieldValue("auxiliar", registroSeleccionado.auxiliar);
        }
    },[]);

    return (
        <>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="concepto" className="font-weight-bold">Concepto</label>
                    <Field
                        id="concepto"
                        name="concepto"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="codigo_cuenta" className="font-weight-bold">Código cuenta</label>
                    <Field
                        id="codigo_cuenta"
                        name="codigo_cuenta"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <label htmlFor="naturaleza_cuenta" className="font-weight-bold">Naturaleza cuenta</label>
                    <Field
                        id="naturaleza_cuenta"
                        name="naturaleza_cuenta"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        <option value="Debe">Debe</option>
                        <option value="Haber">Haber</option>
                    </Field>
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <label htmlFor="grupo" className="font-weight-bold">Grupo</label>
                    <Field
                        id="grupo"
                        name="grupo"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            listGrupo.map((s) => {
                                return <option key={s} value={s}>{s}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <label htmlFor="sub_grupo" className="font-weight-bold">Sub-Grupo</label>
                    <Field
                        id="sub_grupo"
                        name="sub_grupo"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            listSubGrupo.map((s) => {
                                return <option key={s} value={s}>{s}</option>
                            })
                        }
                    </Field>
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <label htmlFor="auxiliar" className="font-weight-bold">Auxiliar</label>
                    <Field
                        id="auxiliar"
                        name="auxiliar"
                        type="select"
                        component={BaseSelect}>

                        <option value="" disabled>seleccione</option>
                        {
                            listAuxiliar.map((s) => {
                                return <option key={s} value={s}>{s}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>
        </>
    )
}