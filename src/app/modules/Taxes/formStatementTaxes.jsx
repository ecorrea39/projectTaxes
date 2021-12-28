import React, {useContext, useEffect, useState} from "react";
import { ReactDOM } from 'react-dom';
import { FieldArray, Field, Form, Formik } from "formik";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";
import { initialValuesDeclaration } from "./initialValues";
import { SchemaDeclaration } from "./validateSchemas";
import BaseInput from "../Forms/BaseInputs";
import TaxesContext from "../../context/taxes/taxesContext";
import BaseSelect from "../Forms/BaseSelect";
import Checkbox from "../Forms/BaseCheckbox";
import ModalHistoricalDeclaration from './modalHistoricalDeclaration';
import DeleteIcon from '@material-ui/icons/Delete';
import { BaseFormikStatementTaxes } from './baseFormikStatementTaxes';

function FormStatementTaxes({ step }) {

    const {
        conceptos, anos, trimestres, formatoFechaFutura, setFormDataDeclaration,
        submitDeclaration, formatearfecha, nrif, declaracionSeleccionada, declaracionSustitutiva,
        selConcepto, showSelConcepto, setStepTaxes, revisarDeclaracion  } = useContext(TaxesContext);

    const concepts = conceptos.filter(x => x.id < 3);
    const seleccionado = selConcepto;
    const [show, setShow] = useState(false);

    const declaSeleccionada = declaracionSeleccionada;

    const handleSubmit = async (values, actions) => {
        setFormDataDeclaration(values);
        let response = await submitDeclaration(values);
        actions.resetForm(initialValuesDeclaration);
    };

    return (
        <>
            <Row className="mt-6 mb-6">
                <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <span className="btn btn-info font-size-sm w-100" onClick={()=>setStepTaxes(1)}>Declaración y Pagos</span>
                </Col>
                <Col className="mt-1 mb-2" xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <span className="btn btn-info font-size-sm w-100" onClick={()=>setStepTaxes(2)}>Pagos</span>
                </Col>
            </Row>

            <Formik
                initialValues={initialValuesDeclaration}
                validationSchema={SchemaDeclaration}
                onSubmit = { (values, actions) => { handleSubmit(values, actions)  }}
            >
                {
                    formik => (
                        <Form>
                            <BaseFormikStatementTaxes
                                formik={formik}
                                concepts={concepts}
                                anos={anos}
                                trimestres={trimestres}
                                formatearfecha={formatearfecha}
                                formatoFechaFutura={formatoFechaFutura}
                                showSelConcepto={showSelConcepto}
                                seleccionado={seleccionado}
                                nrif={nrif}
                                show={show}
                                declaracionSustitutiva={declaracionSustitutiva}
                                declaSeleccionada={declaSeleccionada}
                                revisarDeclaracion={revisarDeclaracion}
                            />
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default FormStatementTaxes;