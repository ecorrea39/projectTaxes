import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import { FieldArray, Field, Form, Formik } from "formik";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";

import { initialValuesFusionarEmpresas } from "./initialValues";
import { SchemaFusionarEmpresas } from "./validateSchemas";

import BaseInput from "../Forms/BaseInputs";
import FusionarEmpresasContext from "../../context/fusionarEmpresas/fusionarEmpresasContext";
import BaseSelect from "../Forms/BaseSelect";


function FusionarEmpresas() {

    const { submitFusionarEmpresas, contrib  } = useContext(FusionarEmpresasContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    let contribuyente = contrib;

    const handleSubmit = async (values, actions) => {
        let response = await submitFusionarEmpresas(values);
        actions.resetForm(initialValuesFusionarEmpresas);
    };

    useEffect(() => {
        contribuyente = contrib
    },[]);

    return (
        <>
            <Card style={styleCard}>
                <Formik
                    initialValues={initialValuesFusionarEmpresas}
                    validationSchema={SchemaFusionarEmpresas}
                    onSubmit = { (values, actions) => { handleSubmit(values, actions) }}
                >
                    {
                        formik => (
                            <Form>
                                <Card.Subtitle className="mt-4 mb-4">Datos Entidad de Trabajo a Fusionar</Card.Subtitle>
                                <Row className="mt-4 mb-8">
                                    <Col xs="12" sm="2" md="2" lg="2" xl="2" xxl="2">
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
                                    <Col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
                                        <label htmlFor="rif_fusionar" className="font-weight-bold">Número de RIF</label>
                                        <Field
                                            id="rif_fusionar_"
                                            name="rif_fusionar"
                                            component={BaseInput}
                                        />
                                    </Col>
                                    <Col xs="12" sm="7" md="7" lg="7" xl="7" xxl="7">
                                        <label htmlFor="name_fusionar" className="font-weight-bold">Entidad de Trabajo</label>
                                        <Field
                                            id="name_fusionar"
                                            name="name_fusionar"
                                            component={BaseInput}
                                            disabled
                                        />
                                    </Col>
                                </Row>
                                <Card.Subtitle className="mt-4 mb-4" >Datos de Entidad de Trabajo que Absorbe</Card.Subtitle>
                                <Row className="mt-4 mb-8">
                                    <Col xs="12" sm="2" md="2" lg="2" xl="2" xxl="2">
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
                                    <Col xs="12" sm="3" md="3" lg="3" xl="3" xxl="3">
                                        <label htmlFor="rif_absorbe" className="font-weight-bold">Número de RIF</label>
                                        <Field
                                            id="rif_absorbe"
                                            name="rif_absorbe"
                                            component={BaseInput}
                                        />
                                    </Col>
                                    <Col xs="12" sm="7" md="7" lg="7" xl="7" xxl="7">
                                        <label htmlFor="name_absorve" className="font-weight-bold">Entidad de Trabajo</label>
                                        <Field
                                            id="name_absorbe"
                                            name="name_absorbe"
                                            component={BaseInput}
                                            disabled
                                        />
                                    </Col>
                                </Row>

                                <Row style={{"paddingTop":"3%"}}>
                                    <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                        <a href="/dashboard" className="btn btn-danger font-size-lg w-100">Cancelar</a>
                                    </Col>
                                    <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                        <Button type="submit" onClick={()=>console.log(formik.errors, formik.values)}
                                                variant="success" className="btn btn-success font-size-lg w-100">Ejecutar proceso</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }
                </Formik>
            </Card>
        </>
    );
}

export default FusionarEmpresas;