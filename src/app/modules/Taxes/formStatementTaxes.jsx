import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { initialValuesDeclaration } from "./initialValues";
import { SchemaDeclaration } from "./validateSchemas";
import BaseInput from "../Forms/BaseInputs";
import TaxesContext from "../../context/taxes/taxesContext";
import BaseSelect from "../Forms/BaseSelect";

function FormStatementTaxes({step}) {

    const {conceptos, anos, trimestres, submitDeclaration} = useContext(TaxesContext);

    const handleSubmit = async (values, actions) => {
        let response = await submitDeclaration();
    }

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
                                <Col xs="11" sm="5" md="5" lg="5" xl="5" xxl="5">
                                    <label htmlFor="concepto-pago" className="font-weight-bold">
                                        Concepto de pago
                                    </label>
                                    <Field
                                        type="select"
                                        component={BaseSelect}
                                        id="concepto-pago"
                                        name="concepto_pago"
                                    >
                                        <option value="" disabled>seleccione</option>
                                        {
                                            conceptos.map((s) => {
                                                return <option key={s.id} value={s.id}>{s.name}</option>
                                            })
                                        }
                                    </Field>
                                </Col>
                                <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1">
                                    <Button variant="danger" title="eliminar" size="lg" className="w-100"
                                            style={{ color: "white", background: "silver" }}>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="success" size="lg" className="w-100">Nueva declaración</Button>
                                </Col>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="success" size="lg" className="w-100">Declaración sustitutiva</Button>
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
                            </Row>
                            <Row className="mt-4 mb-4">
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
                            <Row>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="outline-danger" size="lg" className="w-100">Cancelar</Button>
                                </Col>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
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