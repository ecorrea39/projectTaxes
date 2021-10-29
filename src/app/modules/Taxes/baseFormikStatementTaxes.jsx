import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Field, FieldArray} from "formik";
import DeleteIcon from "@material-ui/icons/Delete";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import Checkbox from "../Forms/BaseCheckbox";
import ModalHistoricalDeclaration from './modalHistoricalDeclaration';

export const BaseFormikStatementTaxes = ({ concepts, formik, anos, trimestres, formatearfecha, formatoFechaFutura, showSelConcepto, seleccionado, nrif, declaracionSustitutiva, declaSeleccionada }) => {

    const label_terms = "Declaro bajo fe de juramento, que la información aquí suministrada es fiel y exacta y estará sometida a control posterior, so pena de incurrir en suministrar información incompleta, falso-forjado ó errónea conforme a los parámetros previstos en el Código Orgánico Tributario.";
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", padding: "8px 35px 5px 35px", marginTop: "2%" }
    const styleBtnEliminar = { marginTop: '23px', borderRadius: '100%', position: 'absolute' }
    const [show, setShow] = useState(show);

    const cargarDatosDeclaraciones = (values) => {

        if(declaracionSustitutiva === true ) {

            let f2 = "";
            let f_emision = "";
            let f_declaracion = values.fecha_declaracion.split('-');
            let f1 = f_declaracion[2]+'-'+f_declaracion[1]+'-'+f_declaracion[0];

            if(values.concepto_pago === 2) {
                f_emision = values.fecha_emision.split('-');
                f2 = f_emision[2]+'-'+f_emision[1]+'-'+f_emision[0];
            } else {
                let f2 = '';
            }

            formik.setFieldValue("declaraciones[0].id", values.id.toString());
            formik.setFieldValue("declaraciones[0].rif", nrif);
            formik.setFieldValue("declaraciones[0].concepto_pago", values.concepto_pago.toString());
            formik.setFieldValue("declaraciones[0].ano_declaracion", values.ano_declaracion.toString());
            formik.setFieldValue("declaraciones[0].trimestre", Number(values.trimestre));
            formik.setFieldValue("declaraciones[0].ntrabajadores", values.ntrabajadores.toString());
            formik.setFieldValue("declaraciones[0].monto_pagado", values.monto_pagado.toString());
            formik.setFieldValue("declaraciones[0].monto_tributo", Number(values.monto_tributo));
            formik.setFieldValue("declaraciones[0].monto_multa", 0);
            formik.setFieldValue("declaraciones[0].monto_intereses", 0);
            formik.setFieldValue("declaraciones[0].terms", values.terms);
            formik.setFieldValue("declaraciones[0].fecha_emision", (values.concepto_pago === 2) ? formatearfecha(new Date(f2), 'YMD') : '');
            formik.setFieldValue("declaraciones[0].fecha_declaracion", formatearfecha(new Date(f1), 'YMD'));
            formik.setFieldValue("declaraciones[0].ntrabajadores_liquidados", Number(values.ntrabajadores_liquidados));
            formik.setFieldValue("declaraciones[0].sustitutiva", (Number(values.sustitutiva) + 1).toString());
            formik.setFieldValue("termsG", values.terms);

            if(Number(values.sustitutiva) + 1 < 3) {
                formik.setFieldValue("declaraciones[0].estatus", 1);
            } else {
                formik.setFieldValue("declaraciones[0].estatus", 2);
            }

            let arr = [];
            arr.push(values);
            showSelConcepto(arr);
        }
    }

    useEffect(()=> {
        cargarDatosDeclaraciones(declaSeleccionada);
    }, [declaSeleccionada]);

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
                {
                    ({push, remove, resetForm }) => (
                        <>
                            <Row className="mt-4 mb-4">
                                <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <a href="#" className="btn btn-outline-info font-size-sm w-100"
                                       onClick={() => {formik.values.declaraciones.push(declaracion)}}>Nueva declaración</a>
                                </Col>
                                <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                                    <a href="#" className="btn btn-outline-info font-size-sm w-100"
                                       onClick={() => setShow(true)}>Declaración sustitutiva</a>
                                </Col>
                            </Row>

                            {formik.values.declaraciones.map((r, index) => {
                                return (
                                    <Card key={index} style={styleCard}>
                                        <Row className="mt-4 mb-4">
                                            <Col xs="10" sm="10" md="10" lg="6" xl="6" xxl="6">
                                                <label htmlFor="concepto_pago" className="font-weight-bold">Concepto de pago</label>
                                                <Field
                                                    id="concepto_pago"
                                                    name={`declaraciones[${index}].concepto_pago`}
                                                    type="select"
                                                    component={BaseSelect}
                                                    onClick={()=>showSelConcepto(formik.values.declaraciones)}
                                                    disabled={declaracionSustitutiva}
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
                                                <a href="#" size="sm" title="eliminar concepto"
                                                   className="btn btn-danger font-weight-bolder font-size-sm mr-3"
                                                   onClick={() => formik.values.declaraciones.splice(index, 1)}
                                                   style={styleBtnEliminar}><DeleteIcon/></a>
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
                                                    <span>
                                                        Selecciona la cantidad de trabajadores que posee para completar la Declaración y Reporte de pago de tributos
                                                    </span>
                                                </Col>
                                            </Row>
                                            <Row className="mt-4 mb-4">
                                                <Col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3" className="mb-6">
                                                    <label htmlFor="ano_declaracion" className="font-weight-bold">Año</label>
                                                    <Field
                                                        id="ano_declatacion"
                                                        name={`declaraciones[${index}].ano_declaracion`}
                                                        type="select"
                                                        component={BaseSelect}
                                                        disabled={declaracionSustitutiva}>
                                                        <option value="" disabled>seleccione</option>
                                                        {
                                                            anos.map((s, i) => {
                                                                return <option key={i} value={s}>{s}</option>
                                                            })
                                                        }
                                                    </Field>
                                                </Col>
                                                <Col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3" className="mb-6">
                                                    <label htmlFor="trimestre" className="font-weight-bold">Trimestre</label>
                                                    <Field
                                                        id="trimestre"
                                                        name={`declaraciones[${index}].trimestre`}
                                                        type="select"
                                                        component={BaseSelect}
                                                        disabled={declaracionSustitutiva}>
                                                        <option value="" disabled>seleccione</option>
                                                        {
                                                            trimestres.map((s) => {
                                                                return <option key={s.id} value={s.id}>{s.name}</option>
                                                            })
                                                        }
                                                    </Field>
                                                </Col>
                                                <Col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3" className="mb-6">
                                                    <label htmlFor="ntrabajadores" className="font-weight-bold">Cant. trab. en nómina</label>
                                                    <Field
                                                        id="ntrabajadores"
                                                        name={`declaraciones[${index}].ntrabajadores`}
                                                        component={BaseInput}
                                                        onBlur={calculateTaxes(formik.values.declaraciones, index)}
                                                    />
                                                </Col>

                                                { seleccionado[index] === 2 &&
                                                    <Col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3" className="mb-6">
                                                        <label htmlFor="ntrabajadores" className="font-weight-bold">Cant. trab. líquidados</label>
                                                        <Field
                                                            id="ntrabajadores_liquidados"
                                                            name={`declaraciones[${index}].ntrabajadores_liquidados`}
                                                            component={BaseInput}
                                                        />
                                                    </Col>
                                                }

                                                <Col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3" className="mb-6">
                                                    <label htmlFor="monto_pagado" className="font-weight-bold">
                                                        { seleccionado[index] !== 2 ? 'Pago nómina trimestral' : 'Total Aguinaldos / Utilidades' }
                                                    </label>
                                                    <Field
                                                        id="monto_pagado"
                                                        name={`declaraciones[${index}].monto_pagado`}
                                                        component={BaseInput}
                                                        onBlur={calculateTaxes(formik.values.declaraciones, index)}
                                                    />
                                                </Col>

                                                { seleccionado[index] === 2 &&
                                                    <Col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3" className="mb-6">
                                                        <label htmlFor="fecha_emision" className="font-weight-bold">Fecha emisión orden de pago</label>
                                                        <Field
                                                            id="fecha_emision"
                                                            name={`declaraciones[${index}].fecha_emision`}
                                                            component={BaseInput}
                                                            type="date"
                                                            max={formatoFechaFutura}
                                                        />
                                                    </Col>
                                                }

                                                <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="mb-4">
                                                    <label htmlFor="monto_tributo" className="font-weight-bold">Monto tributo</label>
                                                    <Field
                                                        id="monto_tributo"
                                                        type="text"
                                                        name={`declaraciones[${index}].monto_tributo`}
                                                        component={BaseInput}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                )
                            })}

                            <Row className="pt-6">
                                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                    <label htmlFor="terms">
                                        <Field
                                            id="termsG"
                                            type="checkbox"
                                            component={Checkbox}
                                            name={`termsG`}
                                            label={label_terms}
                                        />
                                    </label>
                                </Col>
                            </Row>
                        </>
                    )
                }
            </FieldArray>

            <Row>
                <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <a href="/dashboard" className="btn btn-danger font-size-lg w-100"
                       onClick={() => setShow(true)}>Cancelar</a>

                </Col>
                <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <Button type="submit" onClick={()=>console.log(formik.errors, formik.values)}
                            variant="success" className="btn btn-success font-size-lg w-100">Declarar</Button>
                </Col>
            </Row>

            <ModalHistoricalDeclaration
                show={show}
                onHide={() => setShow(false)}
            />

        </>
    )
}