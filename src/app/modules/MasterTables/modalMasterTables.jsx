import React, {useContext, useState, useEffect} from "react";
import ReactDOM from "react-dom"
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { FieldArray, Field, Form, Formik } from "formik";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import Checkbox from "../Forms/BaseCheckbox";
import ModalHeader from "react-bootstrap/ModalHeader";

function ModalMasterTables(props, title) {

    console.log('titulo', title)

    const {submitMasterTables} = useContext(MasterTablesContext);

    const handleSubmit = async (values, actions) => {
        //setFormDataDeclaration(values);
        let response = await submitMasterTables(values);
        //actions.resetForm(initialValuesDeclaration);
    };

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

                <Formik>
                    {({handleSubmit}) => (
                        <>
                            <Modal.Header closeButton>
                                <span className="card-label font-weight-bolder text-dark">Agregar Registro</span>
                            </Modal.Header>
                            <Modal.Body className="overlay overlay-block cursor-default">
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
                                            >
                                                <option value="" disabled>seleccione</option>
                                                <option value="true">Activo</option>
                                                <option value="false">No activo</option>
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        {/*
                                        <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                            <a href="#" className="btn btn-outline-info font-size-sm w-100"
                                               onClick={props.onHide}>Cancelar</a>
                                        </Col>*/}
                                        <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                            <a type="submit" className="btn btn-outline-info font-size-sm w-100"
                                               onClick={() => handleSubmit()}>Guardar</a>
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal.Body>
                        </>
                    )}
                </Formik>

            </Modal>
        </>
    );
}

export default ModalMasterTables;