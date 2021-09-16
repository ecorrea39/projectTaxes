import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { initialValuesDeclaration } from "./initialValues";
import { SchemaDeclaration } from "./validateSchemas";
import BaseInput from "../Forms/BaseInputs";
import TaxesContext from "../../context/taxes/taxesContext";
import BaseSelect from "../Forms/BaseSelect";

function FormStatementTaxes({ step }) {

    const { conceptos, anos, trimestres, formatoFechaFutura, setFormDataDeclaration, submitDeclaration } = useContext(TaxesContext);

    const handleSubmit = async (values) => {
        setFormDataDeclaration(values);
        let response = await submitDeclaration();
    };

    const estatus = ['eliminada', 'creada', 'sustitutiva 1', 'sustitutiva 2', 'pagada', 'definitiva'];

    return (
        <>
            <Formik
                initialValues={initialValuesDeclaration}
                validationSchema={SchemaDeclaration}
                onSubmit={handleSubmit}
            >
                {
                    formik => (
                        <Form>
                            <Row className="mt-12 mb-12">
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <label htmlFor="concepto-pago" className="font-weight-bold">
                                        Concepto de pago
                                    </label>

                                    <Field
                                        id="concepto-pago"
                                        name="concepto_pago"
                                        type="select"
                                        component={BaseSelect}
                                    >
                                        <option value="" disabled>seleccione</option>
                                        {
                                            conceptos.map((s) => {
                                                return <option key={s.id} value={s.id}>{s.name}</option>
                                            })
                                        }
                                    </Field>
                                </Col>
                                <Col xs="2" >
                                    {" "}
                                <Button variant="danger" title="eliminar" size="md" className="circle"
                                        style={{ color: "white" }}>
                                </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="outline-info" size="md" className="w-100">Nueva declaración</Button>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="outline-info" size="md" className="w-100">Declaración sustitutiva</Button>
                                </Col>
                            </Row>
                            <Row className="mt-12 mb-12">
                                <Col xs="12">
                                    <h5>Información de la declaración</h5>
                                </Col>
                            </Row>
                            <Row className="mt-12 mb-12">
                                <Col xs="12">
                                    <h5>Selecciona la cantidad de trabajadores que posee para completar la Declaración
                                        y Reporte de pago de tributos
                                    </h5>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="ano_declaracion" className="font-weight-bold">
                                        Año
                                    </label>
                                    <Field
                                        id="ano_declatacion"
                                        name="ano_declaracion"
                                        type="select"
                                        component={BaseSelect}
                                    >
                                        <option value="" disabled>seleccione</option>
                                        {
                                            anos.map((s, i) => {
                                                return <option key={i} value={s}>{s}</option>
                                            })
                                        }
                                    </Field>
                                </Col>
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="trimestre" className="font-weight-bold">
                                        Trimestre
                                    </label>
                                    <Field
                                        id="trimestre"
                                        name="trimestre"
                                        type="select"
                                        component={BaseSelect}
                                    >
                                        <option value="" disabled>seleccione</option>
                                        {
                                            trimestres.map((s) => {
                                                return <option key={s.id} value={s.id}>{s.name}</option>
                                            })
                                        }
                                    </Field>
                                </Col>
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="ntrabajadores" className="font-weight-bold">
                                        Cantidad trabajadores en nómina
                                    </label>
                                    <Field
                                        id="ntrabajadores"
                                        name="ntrabajadores"
                                        component={BaseInput}
                                    />
                                </Col>
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="monto_pagado" className="font-weight-bold">
                                        Pago nómina trimestral
                                    </label>
                                    <Field
                                        id="monto_pagado"
                                        name="monto_pagado"
                                        component={BaseInput}
                                    />
                                </Col>
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="fecha_emision" className="font-weight-bold">
                                        Fecha de emisión de orden de pago
                                    </label>
                                    <Field
                                        id="fecha_emision"
                                        name="fecha_emision"
                                        component={BaseInput}
                                        type="date"
                                        max={formatoFechaFutura}
                                    />
                                </Col>
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="monto_tributo" className="font-weight-bold">
                                        Monto tributo
                                    </label>
                                    <Field
                                        id="monto_tributo"
                                        name="monto_tributo"
                                        component={BaseInput}
                                        disabled
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-3">
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <Field
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        component={BaseInput}
                                    />
                                    <label htmlFor="terms">
                                        <input type="checkbox" />
                                        Declaro bajo fe de juramento, que la información aquí suministrada es fiel y exacta y
                                        estará sometida a control posterior, so pena de incurrir en suministrar información incompleta, falso-forjado
                                        ó errónea conforme a los parámetros previstos en el Código Orgánico Tributario.
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="outline-danger" size="lg" className="w-100">Cancelar</Button>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button type="submit" variant="success" size="lg" className="w-100">Declarar</Button>
                                </Col>
                            </Row>
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default FormStatementTaxes;