import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";

export const BaseFormikRegistrosMercantiles = ({formik, props, estados}) => {

    const { registroSeleccionado, validarDescripcion } = useContext(MasterTablesContext);

    useEffect(()=> {
        if(props.accion === 'Modificar') {
            formik.setFieldValue("id", registroSeleccionado.id);
            formik.setFieldValue("id_estado", registroSeleccionado.id_estado);
            formik.setFieldValue("oficina", registroSeleccionado.oficina);
            formik.setFieldValue("direccion_oficina", registroSeleccionado.direccion_oficina);
            formik.setFieldValue("telefono_contacto", registroSeleccionado.telefono_contacto);
            formik.setFieldValue("correo", registroSeleccionado.correo);
            formik.setFieldValue("registradores", registroSeleccionado.registradores);
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
                                return <option key={s.cod_estado} value={s.cod_estado}>{s.descripcion}</option>
                            })
                        }
                    </Field>
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="oficina" className="font-weight-bold">Oficina</label>
                    <Field
                        id="oficina"
                        name="oficina"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="direccion_oficina" className="font-weight-bold">Dirección</label>
                    <Field
                        id="direccion_oficina"
                        name="direccion_oficina"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="telefono_contacto" className="font-weight-bold">Teléfono contacto</label>
                    <Field
                        id="telefono_contacto"
                        name="telefono_contacto"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="correo" className="font-weight-bold">Correo electrónico</label>
                    <Field
                        id="correo"
                        name="correo"
                        component={BaseInput}
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-8">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <label htmlFor="registradores" className="font-weight-bold">Registradores</label>
                    <Field
                        id="registradores"
                        name="registradores"
                        component={BaseInput}
                    />
                </Col>
            </Row>
        </>
    )
}