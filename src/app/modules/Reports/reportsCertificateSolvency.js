import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import { FieldArray, Field, Form, Formik } from "formik";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";

import { initialValuesReportCertificateSolvency } from "./initialValues";
import { SchemaReportCertificateSolvency } from "./validateSchemas";

import BaseInput from "../Forms/BaseInputs";
import ReportsContext from "../../context/reports/reportsContext";
import BaseSelect from "../Forms/BaseSelect";


function ReportsCertificateSolvency() {

    const { formatoFechaFutura, formatoReporte, submitReportsCertificateSolvency, setFormDataReports, contrib  } = useContext(ReportsContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px"}
    const formato = formatoReporte;
    let contribuyente = contrib;

    const handleSubmit = async (values, actions) => {
        //setFormDataReports(values);
        let response = await submitReportsCertificateSolvency(values);
        actions.resetForm(initialValuesReportCertificateSolvency);
    };

    useEffect(() => {
        contribuyente = contrib
    },[]);

    return (
        <>
            <Card style={styleCard}>
                <Row className="mt-4 mb-4">
                    <Col xs="12">
                        <h3>Certificado de Solvencia</h3>
                    </Col>
                </Row>
                <Formik
                    initialValues={initialValuesReportCertificateSolvency}
                    validationSchema={SchemaReportCertificateSolvency}
                    onSubmit = { (values, actions) => { handleSubmit(values, actions) }}
                >
                    {
                        formik => (
                            <Form>
                                <Row className="mt-4 mb-4">
                                    <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12"
                                         className="mb-6">
                                        <label htmlFor="nrif" className="font-weight-bold">Contribuyente</label>
                                        <Field
                                            id="nrif"
                                            name={"nrif"}
                                            type="select"
                                            component={BaseSelect}
                                        >
                                            <option value="" disabled>seleccione</option>
                                            {
                                                contribuyente.map((s) => {
                                                    return <option key={s.rif} value={s.rif}>{s.rif + " | " + s.nombre}</option>
                                                })
                                            }
                                        </Field>
                                    </Col>
                                    <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6"
                                         className="mb-6">
                                        <label htmlFor="fecha" className="font-weight-bold">Fecha de solicitud</label>
                                        <Field
                                            id="fecha"
                                            name={"fecha"}
                                            component={BaseInput}
                                            type="date"
                                            max={formatoFechaFutura}
                                        />
                                    </Col>
                                    <Col xs="12" sm="12" md="12" lg="6" xl="6" xxl="6"
                                         className="mb-6">
                                        <label htmlFor="nrif" className="font-weight-bold">Formato reporte</label>
                                        <Field
                                            id="formato"
                                            name={"formato"}
                                            type="select"
                                            component={BaseSelect}
                                        >
                                            <option value="" disabled>seleccione</option>
                                            {
                                                formato.map((s) => {
                                                    return <option key={s} value={s}>{s}</option>
                                                })
                                            }
                                        </Field>
                                    </Col>
                                </Row>

                                <Row style={{"paddingTop":"3%"}}>
                                    <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                        <a href="/dashboard" className="btn btn-danger font-size-lg w-100">Cancelar</a>
                                    </Col>
                                    <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                        <Button type="submit" onClick={()=>console.log(formik.errors, formik.values)}
                                        variant="success" className="btn btn-success font-size-lg w-100">Reporte</Button>
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

export default ReportsCertificateSolvency;