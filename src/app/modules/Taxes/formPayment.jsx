import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { initialValuesPayment } from "./initialValues";
import { SchemaPayment } from "./validateSchemas";
import BaseInput from "../Forms/BaseInputs";
import TaxesContext from "../../context/taxes/taxesContext";
import BaseSelect from "../Forms/BaseSelect";

function FormPayment({ step }) {

    const { bancos, submitPayment } = useContext(TaxesContext);

    const handleSubmit = async (values, actions) => {
        let response = await submitPayment();
    }

    return (
        <>
            <Formik
                initialValues={initialValuesPayment}
                validationSchema={SchemaPayment}
                onSubmit={handleSubmit}
            >
                {
                    formik => (
                        <Form>
                            <Row className="mt-4 mb-4">
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <label htmlFor="referencia" className="font-weight-bold">
                                        Numero de referencia
                                    </label>
                                    <Field
                                        id="referencia"
                                        name="nreferencia"
                                        placeholder="Ej: 999999"
                                        component={BaseInput}
                                    />
                                </Col>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <label htmlFor="modalidad-pago" className="font-weight-bold">
                                        Modalidad de pago
                                    </label>
                                    <Field
                                        type="select"
                                        component={BaseSelect}
                                        id="modalidad-pago"
                                        name="modo_pago"
                                    >
                                        <option value="" disabled>. . .</option>
                                        <option value="1">Transferencia Electrónica</option>
                                        <option value="2">Depósito en Taquilla</option>
                                    </Field>
                                </Col>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <label htmlFor="banco-pago" className="font-weight-bold">
                                        Banco
                                    </label>
                                    <Field
                                        type="select"
                                        component={BaseSelect}
                                        id="banco-pago"
                                        name="banco"
                                    >
                                        <option value="" disabled>. . .</option>
                                        {
                                            bancos.map(element => (
                                                <option
                                                    key={element.id}
                                                    value={element.id}
                                                >
                                                    {element.attributes.nom_banco}
                                                </option>
                                            ))
                                        }
                                    </Field>
                                </Col>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <label htmlFor="monto" className="font-weight-bold">
                                        Monto (Bs).
                                    </label>
                                    <Field
                                        id="monto"
                                        name="monto"
                                        component={BaseInput}
                                    />
                                </Col>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <label htmlFor="monto" className="font-weight-bold">
                                        Monto (Bs).
                                    </label>
                                    <Field
                                        id="monto"
                                        name="monto"
                                        component={BaseInput}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col xs="12">
                                    <h5>Información del tributo</h5>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="monto-tributo" className="font-weight-bold">
                                        Monto del tributo
                                    </label>
                                    <Field
                                        id="monto-tributo"
                                        name="monto_tributo"
                                        component={BaseInput}
                                    />
                                </Col>
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="intereses" className="font-weight-bold">
                                        Interes de mora
                                    </label>
                                    <Field
                                        id="intereses"
                                        name="intereses"
                                        component={BaseInput}
                                    />
                                </Col>
                                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
                                    <label htmlFor="multa" className="font-weight-bold">
                                        Multa %
                                    </label>
                                    <Field
                                        id="multa"
                                        name="multa"
                                        component={BaseInput}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button variant="outline-danger" size="lg" className="w-100">Cancelar</Button>
                                </Col>
                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button type="submit" variant="success" size="lg" className="w-100">Guardar Pago</Button>
                                </Col>
                            </Row>
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default FormPayment;