import React, {useContext, useState, useEffect} from "react";
import ReactDOM from "react-dom"
import {Button, Col, Modal, Row, Table} from "react-bootstrap";
import {FieldArray, Field, Form, Formik} from "formik";
import PnaContext from "../../context/pna/pnaContext";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import ModalHeader from "react-bootstrap/ModalHeader";
import { initialValues } from "./initialValues";
import { SchemaPnaCol } from "./validateSchemas";
import { BaseFormik } from "./baseFormik";

function ModalPna(props) {

    const { pna, submitPna, setFormDataTables, registroSeleccionado, setFormDataPna } = useContext(PnaContext);

    const handleSubmit = async (values, actions) => {
        setFormDataPna(values);
        let response = await submitPna(values, props);
        actions.resetForm(initialValues);
    };

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

                <Formik
                    initialValues={initialValues}
                    validationSchema={SchemaPnaCol}
                    onSubmit = { (values, actions) => { handleSubmit(values, actions)  }}
                >
                    {
                        formik => (
                            <>
                                <Modal.Body className="overlay overlay-block cursor-default p-10">
                                    <h5 className="align-items-start flex-column pb-3">
                                        <span className="card-label font-weight-bolder text-dark mb-4">{props.accion} {props.titulo}</span>
                                    </h5>

                                    <Form className="form form-label-right">

                                        <BaseFormik
                                            formik={formik}
                                            props={props}
                                        />

                                        <Row className="mb-2" style={{justifyContent: "center"}}>
                                            <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                                                <Button onClick={() => props.onHide()}
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

export default ModalPna;