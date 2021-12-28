import React, {useContext, useState, useEffect} from "react";
import ReactDOM from "react-dom"
import {Button, Card, Col, Modal, Row, Table} from "react-bootstrap";
import {FieldArray, Field, Form, Formik} from "formik";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import ModalHeader from "react-bootstrap/ModalHeader";

import { BaseFormik } from "./baseFormik";
import { initialValuesFusionarEmpresas } from "./initialValues";
import { SchemaFusionarEmpresas } from "./validateSchemas";

import FusionarEmpresasContext from "../../context/fusionarEmpresas/fusionarEmpresasContext";

function ModalFusionarEmpresas(props) {

    const { submitFusionarEmpresas, contrib  } = useContext(FusionarEmpresasContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    let contribuyente = contrib;

    const handleSubmit = async (values, actions) => {
        let response = await submitFusionarEmpresas(values, props);
        actions.resetForm(initialValuesFusionarEmpresas);
    };

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Card style={styleCard}>
                    <Formik
                        initialValues={initialValuesFusionarEmpresas}
                        validationSchema={SchemaFusionarEmpresas}
                        onSubmit = { (values, actions) => { handleSubmit(values, actions) }}
                    >
                        {
                            formik => (

                                <>
                                    <Modal.Body className="overlay overlay-block cursor-default">
                                        <h5 className="align-items-start flex-column pb-3">
                                            <span className="card-label font-weight-bolder text-dark mb-4">Agregar Fusionar Entidades de Trabajo</span>
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
                                                            className="btn btn-sm btn-info font-size-sm w-100">Guardar</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal.Body>
                                </>
                            )
                        }
                    </Formik>
                </Card>
            </Modal>
        </>
    );
}

export default ModalFusionarEmpresas;