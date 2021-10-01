import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import { FieldArray, Field, Form, Formik } from "formik";
import {Button, Col, Row, Card, Modal} from "react-bootstrap";
import { initialValuesDeclaration } from "./initialValues";
import { SchemaDeclaration } from "./validateSchemas";
import BaseInput from "../Forms/BaseInputs";
import TaxesContext from "../../context/taxes/taxesContext";
import BaseSelect from "../Forms/BaseSelect";
import Checkbox from "../Forms/BaseCheckbox";
import ModalHistoricalDeclaration from './modalHistoricalDeclaration';
import DeleteIcon from '@material-ui/icons/Delete';


function FormStatementTaxes({ step }) {

    const { conceptos, anos, trimestres, formatoFechaFutura, setFormDataDeclaration, submitDeclaration, formatearfecha, nrif } = useContext(TaxesContext);
    const label_terms = "Declaro bajo fe de juramento, que la información aquí suministrada es fiel y exacta y estará sometida a control posterior, so pena de incurrir en suministrar información incompleta, falso-forjado ó errónea conforme a los parámetros previstos en el Código Orgánico Tributario.";
    const [show, setShow] = useState(false);
    const concepts = conceptos.filter(x => x.id < 3);

    let [conceptoSeleccionado, setConceptoSeleccionado] = useState([]);
    let [seleccionado, setSeleccionado] = useState();

    const handleSubmit = async (values) => {
        setFormDataDeclaration(values);
        let response = await submitDeclaration(values);
    };

    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "20px 35px 20px 35px", marginTop: "3%" }
    const styleBtnEliminar = { marginTop: '23px', borderRadius: '100%', position: 'absolute' }

    const declaracion = {
        "concepto_pago": "",
        "ano_declaracion": "",
        "trimestre": "",
        "ntrabajadores": "",
        "monto_pagado": "",
        "monto_tributo": "0",
        "monto_multa": "0",
        "monto_intereses": "0",
        "terms": "",
        "fecha_emision": "",
        "fecha_declaracion": formatearfecha(new Date(), 'YMD'),
        "ntrabajadores_liquidados": "0",
        "sustitutiva": "1",
        "estatus": "1"
    }

    const calculateTaxes = (valores, i) => { // tributos

        let arreglo = [];
        let monto = 0;

        try {
            arreglo = valores;
            let valorNomina = arreglo[i].monto_pagado;
            let ntrab = arreglo[i].ntrabajadores;
            let tipo = arreglo[i].concepto_pago === '1' ? 'aporte-2%' : 'aporte-0.5%' ;

            switch (tipo) {
                case "aporte-2%":
                    monto = ntrab > 4 && nrif.charAt(0).toUpperCase() !== 'G' ? valorNomina * (2 / 100): 0;
                    break;

                case "aporte-0.5%":
                    monto = ntrab > 4 ? valorNomina * (0.5 / 100): 0;
                    break;

                default:
                    monto = 0;
                    break;
            }

            arreglo[i].monto_tributo = monto;

        } catch (error) {
            console.log(error)
        }

        arreglo.monto_tributo = monto.toFixed(2);
    }

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <a href="#" className="btn btn-info font-size-sm w-100">Declaración y Pagos</a>

                </Col>
                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <a href="#" className="btn btn-info font-size-sm w-100">Pagos</a>
                </Col>
            </Row>

            <Formik
                initialValues={initialValuesDeclaration}
                validationSchema={SchemaDeclaration}
                onSubmit={handleSubmit}
            >
                {

                    formik => (
                        <Form>
                            <Row className="mt-4 mb-4">
                                <Col xs="12">
                                    <h3>Declaración de tributos</h3>
                                </Col>
                                <Col xs="12">
                                    <span>
                                        Ingrese y verifique correctamente los datos de su declaración, ya que una vez registrada no podrá modificar ni eliminar el registro.
                                    </span>
                                </Col>
                            </Row>
                            <FieldArray name="declaraciones">

                                {({push, remove}) => (
                                    <>
                                        <Row className="mt-4 mb-4">
                                            <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                                <a href="#" className="btn btn-outline-info font-size-sm w-100"
                                                   onClick={()=> {formik.values.declaraciones.push(declaracion)}}>Nueva declaración</a>

                                            </Col>
                                            <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                                <a href="#" className="btn btn-outline-info font-size-sm w-100"
                                                   onClick={() => setShow(true)}>Declaración sustitutiva</a>
                                            </Col>
                                        </Row>

                                        {formik.values.declaraciones.map((r, index) => {
                                            return (
                                                <Card key={index} style={styleCard}>
                                                    <Row className="mt-4 mb-4">
                                                        <Col xs="10" sm="10" md="10" lg="6" xl="6" xxl="6">
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
                                                                    concepts.map((s) => {
                                                                        return <option key={s.id} value={s.id}>{s.name}</option>
                                                                    })
                                                                }
                                                            </Field>
                                                        </Col>
                                                        <Col xs="2" sm="2" md="2" lg="6" xl="6" xxl="6">
                                                            <a href="#" size="sm" title="eliminar concepto" className="btn btn-danger font-weight-bolder font-size-sm mr-3"
                                                               onClick={() => formik.values.declaraciones.splice(index, 1)} style={styleBtnEliminar}><DeleteIcon /></a>
                                                        </Col>
                                                    </Row>
                                                    <div>
                                                        <Row className="mt-4 mb-4">
                                                            <Col xs="12" sm="9" md="9" lg="9" xl="9" xxl="9">
                                                                <h5>Información de la declaración</h5>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-4 mb-4">
                                                            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                                <span>Selecciona la cantidad de trabajadores que posee para completar la Declaración
                                                                    y Reporte de pago de tributos
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-4 mb-4">
                                                            <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                                                                <label htmlFor="ano_declaracion" className="font-weight-bold">
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
                                                            <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
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
                                                            <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                                                                <label htmlFor="ntrabajadores" className="font-weight-bold">
                                                                    Cantidad trabajadores en nómina
                                                                </label>
                                                                <Field
                                                                    id="ntrabajadores"
                                                                    name={`declaraciones[${index}].ntrabajadores`}
                                                                    component={BaseInput}
                                                                    onBlur={calculateTaxes(formik.values.declaraciones, index)}
                                                                />
                                                            </Col>
                                                            {
                                                                Number(seleccionado) === 2 &&

                                                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                                                                    <label htmlFor="ntrabajadores" className="font-weight-bold">
                                                                        Cantidad trabajadores líquidados
                                                                    </label>
                                                                    <Field
                                                                        id="ntrabajadores_liquidados"
                                                                        name={`declaraciones[${index}].ntrabajadores_liquidados`}
                                                                        component={BaseInput}
                                                                    />
                                                                </Col>
                                                            }

                                                            <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                                                                <label htmlFor="monto_pagado" className="font-weight-bold">
                                                                    {Number(seleccionado) !== 2? 'Pago nómina trimestral' : 'Total Aguinaldos / Utilidades'}
                                                                </label>
                                                                <Field
                                                                    id="monto_pagado"
                                                                    name={`declaraciones[${index}].monto_pagado`}
                                                                    component={BaseInput}
                                                                    onBlur={calculateTaxes(formik.values.declaraciones, index)}
                                                                />
                                                            </Col>

                                                            {
                                                                Number(seleccionado) === 2 &&

                                                                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                                                                    <label htmlFor="fecha_emision"
                                                                           className="font-weight-bold">
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
                                                            }
                                                            <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                                                                <label htmlFor="monto_tributo" className="font-weight-bold">
                                                                    Monto tributo
                                                                </label>
                                                                <Field
                                                                    id="monto_tributo"
                                                                    type="text"
                                                                    name={`declaraciones[${index}].monto_tributo`}
                                                                    component={BaseInput}
                                                                    disabled
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-4 mb-4">
                                                            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                                <label htmlFor="terms">
                                                                    <Field
                                                                        id="terms"
                                                                        type="checkbox"
                                                                        component={Checkbox}
                                                                        name={`declaraciones[${index}].terms`}
                                                                        label={label_terms}
                                                                    />
                                                                </label>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Card>
                                            )
                                        })}
                                    </>
                                )}
                            </FieldArray>
                            <Row style={{"paddingTop":"3%"}}>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <a href="/dashboard" className="btn btn-danger font-size-sm w-100"
                                       onClick={() => setShow(true)}>Cancelar</a>

                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <Button type="submit" onClick={()=>console.log(formik.errors, formik.values)}
                                            variant="success" className="btn btn-success font-size-sm w-100">Declarar</Button>
                                </Col>
                            </Row>
                        </Form>
                    )
                }
            </Formik>

            <ModalHistoricalDeclaration
                show={show}
                onHide={() => setShow(false)}
            />

        </>
    );
}

export default FormStatementTaxes;