import React, {useContext, useState, useEffect} from "react";
import ReactDOM from "react-dom"
import {Button, Col, Modal, Row, Table} from "react-bootstrap";
import {FieldArray, Field, Form, Formik} from "formik";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import Checkbox from "../Forms/BaseCheckbox";
import ModalHeader from "react-bootstrap/ModalHeader";

import {initialValuesTablesCol1} from "./initialValues";
import {SchemaTablesCol1} from "./validateSchemas";

function ModalMasterTables(props) {

    const {submitMasterTables, setFormDataTables} = useContext(MasterTablesContext);

    const handleSubmit = async (values, actions) => {
        setFormDataTables(values);
        let response = await submitMasterTables(values, props);
        actions.resetForm(initialValuesTablesCol1);
    };

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

                <Formik
                    initialValues={initialValuesTablesCol1}
                    validationSchema={SchemaTablesCol1}
                    onSubmit = { (values, actions) => { handleSubmit(values, actions)  }}
                >
                    {
                        formik => (
                            <>
                                <Modal.Body className="overlay overlay-block cursor-default">
                                    <h5 className="align-items-start flex-column pb-3">
                                        <span className="card-label font-weight-bolder text-dark mb-4">{props.accion} {props.titulo}</span>
                                    </h5>

                                    <Form className="form form-label-right">
                                        <Row className="mt-4 mb-4">
                                            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                <label htmlFor="name" className="font-weight-bold">Descripción</label>
                                                <Field
                                                    id="name"
                                                    name="name"
                                                    component={BaseInput}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mt-4 mb-8">
                                            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                <label htmlFor="is_active" className="font-weight-bold">Estatus</label>
                                                <Field
                                                    id="is_active"
                                                    name="is_active"
                                                    type="select"
                                                    component={BaseSelect}
                                                    disabled={props.accion === 'Agregar' ? true: false}>
                                                    <option value="" disabled>seleccione</option>
                                                    <option value="true">Activo</option>
                                                    <option value="false">No activo</option>
                                                </Field>
                                            </Col>
                                        </Row>
                                        <Row className="mb-4" style={{justifyContent: "center"}}>
                                            <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                                                <Button type="submit"
                                                        onClick={() => props.onHide()}
                                                        className="btn btn-sm btn-danger font-size-sm w-100">Cerrar</Button>
                                            </Col>

                                            <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                                                <Button type="submit"
                                                        onClick={() => console.log(formik.errors, formik.values)}
                                                        className="btn btn-sm btn-info font-size-sm w-100">{props.accion === 'Agregar' ? 'Guardar' : 'Actualizar'}</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                            </>
                        )
                    }
                </Formik>
            </Modal>
        </>
    );
}

export default ModalMasterTables;