import React, { useContext } from "react";
import { ReactDOM } from 'react-dom'
import { FieldArray, Field, Form, Formik } from "formik";
import { Button, Col, Row, Card } from "react-bootstrap";
import { initialValuesDeclaration } from "./initialValues";
import { SchemaDeclaration } from "./validateSchemas";
import BaseInput from "../Forms/BaseInputs";
import TaxesContext from "../../context/taxes/taxesContext";
import BaseSelect from "../Forms/BaseSelect";

function FormStatementTaxes({ step }) {

    const { conceptos, anos, trimestres, formatoFechaFutura, setFormDataDeclaration, submitDeclaration } = useContext(TaxesContext);

    const handleSubmit = async (values) => {
        console.log('values ', values)
        setFormDataDeclaration(values);
        let response = await submitDeclaration(values);
    };

    const style_card = {
        borderRadius: "5px",
        boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)",
        padding: "20px 35px 20px 35px"
    }

    const declaracion = {
        "concepto_pago": "",
        "ano_declaracion": "",
        "trimestre": "",
        "ntrabajadores": "",
        "monto_pagado": "",
        "monto_tributo": "0",
        "monto_multa": "",
        "monto_intereses": "",
        "terms": "",
        "fecha_emision": "",
        "ntrabajadores_liquidados": "0",
        "sustitutiva": "1",
        "estatus": "1"
    }

    const estatus = ['eliminada', 'creada', 'definitiva', 'pagada' ];

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
                                <Col xs="12">
                                    <h3>Declaración de tributos</h3>
                                </Col>
                                <Col xs="12">
                                    <span>
                                        Ingrese y verifique correctamente los datos de su declaración, ya que una vez registrada no podrá modificar ni eliminar el registro.
                                    </span>
                                </Col>
                            </Row>
                            <Row className="mt-12 mb-12">
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button onClick={()=> {formik.values.declaraciones.push(declaracion)}} variant="outline-info" size="md" className="w-100">Nueva declaración</Button>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="outline-info" size="md" className="w-100">Declaración sustitutiva</Button>
                                </Col>
                            </Row>

                            <FieldArray name="declaraciones">
                                {({push, remove}) => (
                                    <>
                                        {formik.values.declaraciones.map((r, index) => {
                                            return (
                                                <Card key={index} style={style_card}>
                                                    <Row className="mt-12 mb-12">
                                                        <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                                            <label htmlFor="concepto-pago" className="font-weight-bold">
                                                                Concepto de pago
                                                            </label>
                                                            <Field
                                                                id="concepto_pago"
                                                                name={`declaraciones[${index}].concepto_pago`}
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
                                                        <Col xs="2">
                                                            <Button
                                                            onClick={() => formik.values.declaraciones.splice(index, 1)}
                                                                variant="danger" title="eliminar" size="md"
                                                                className="circle"
                                                                style={{color: "white"}}>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-12 mb-12">
                                                        <Col xs="12">
                                                            <h5>Información de la declaración</h5>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-12 mb-12">
                                                        <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                            <span>Selecciona la cantidad de trabajadores que posee para completar la Declaración
                                                                y Reporte de pago de tributos
                                                            </span>
                                                        </Col>
                                                    </Row>

                                                    <Row className="mt-12 mb-12">
                                                        <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                                            <label htmlFor="ano_declaracion"
                                                                   className="font-weight-bold">
                                                                Año
                                                            </label>
                                                            <Field
                                                                id="ano_declatacion"
                                                                name={`declaraciones[${index}].ano_declaracion`}
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
                                                                name={`declaraciones[${index}].trimestre`}
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
                                                                name={`declaraciones[${index}].ntrabajadores`}
                                                                component={BaseInput}
                                                            />
                                                        </Col>
                                                        <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                                            <label htmlFor="monto_pagado" className="font-weight-bold">
                                                                Pago nómina trimestral
                                                            </label>
                                                            <Field
                                                                id="monto_pagado"
                                                                name={`declaraciones[${index}].monto_pagado`}
                                                                component={BaseInput}
                                                            />
                                                        </Col>
                                                        <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                                            <label htmlFor="fecha_emision" className="font-weight-bold">
                                                                Fecha de emisión de orden de pago
                                                            </label>
                                                            <Field
                                                                id="fecha_emision"
                                                                name={`declaraciones[${index}].fecha_emision`}
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
                                                                name={`declaraciones[${index}].monto_tributo`}
                                                                component={BaseInput}
                                                                disabled
                                                            />
                                                        </Col>
                                                        <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                                            <label htmlFor="monto_intereses" className="font-weight-bold">
                                                                Monto intereses
                                                            </label>
                                                            <Field
                                                                id="monto_intereses"
                                                                name={`declaraciones[${index}].monto_intereses`}
                                                                component={BaseInput}
                                                                disabled
                                                            />
                                                        </Col>
                                                        <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                                            <label htmlFor="monto_multa" className="font-weight-bold">
                                                                Monto multa
                                                            </label>
                                                            <Field
                                                                id="monto_multa"
                                                                name={`declaraciones[${index}].monto_multa`}
                                                                component={BaseInput}
                                                                disabled
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-12 mb-12">
                                                        <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                            <label htmlFor="terms">
                                                                <Field
                                                                    id="terms"
                                                                    name={`declaraciones[${index}].terms`}
                                                                    type="checkbox"
                                                                    component={BaseInput}
                                                                />
                                                                Declaro bajo fe de juramento, que la información aquí suministrada es fiel y exacta y
                                                                estará sometida a control posterior, so pena de incurrir en suministrar información incompleta, falso-forjado
                                                                ó errónea conforme a los parámetros previstos en el Código Orgánico Tributario.
                                                            </label>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            )
                                        })}
                                    </>
                                )}
                            </FieldArray>
                            <Row style={{"paddingTop":"3%"}}>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="outline-danger" size="lg" className="w-100">Cancelar</Button>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button type="submit" onClick={()=>console.log(formik.errors, formik.values)}
                                            variant="success" size="lg" className="w-100">Declarar</Button>
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