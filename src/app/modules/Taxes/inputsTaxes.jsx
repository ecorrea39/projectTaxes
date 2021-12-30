import React, { useContext, useEffect } from "react";
import { Col, Row, Accordion, Card, Button } from "react-bootstrap";
import { Field } from "formik";
import BaseInput from "../Forms/BaseInputs";
import  styles from './styles.module.css';
import TaxesContext from "../../context/taxes/taxesContext";
import Checkbox from "../Forms/BaseCheckbox";
import css from '../Forms/checkbox.module.css';
import BaseInputMonto from "../Forms/BaseInputMonto";

export const InputsTaxes = ({listDeclaraciones,formik, calcularCreditoFiscal}) => {

    const {conceptos,totalTributoDeclarado,setTotalTributoDeclarado} = useContext(TaxesContext);

    const selectConcepto = (c) => {
        let concepto = conceptos.find(concepto => concepto.id === c )
        return concepto.name;
    }

    const handleAddCocept = (e,conc) => {
        e.persist();
        let checkEd = e.target.checked;
        let tributos = formik.values.tributos;
        let indice = tributos.indexOf(conc.conceptoId);

        if(checkEd) {
            setTotalTributoDeclarado(totalTributoDeclarado+conc.monto);
            formik.setFieldValue("tributos", [...tributos, conc.conceptoId]);
        } else {
            setTotalTributoDeclarado(totalTributoDeclarado-conc.monto);
            tributos.splice(indice, 1);
            formik.setFieldValue("tributos", tributos);
        }
    }
    
    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h4>Información de Tributos</h4>
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <Accordion defaultActiveKey="0">
                    {
                        listDeclaraciones.map((element,index)=>(
                            <Row key={index} >
                                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                    <Card>
                                        <Card.Header className="pl-3 pr-3 pt-2">
                                            <label className={css.container}>
                                                <input 
                                                    type="checkbox"
                                                    className={`form-control`}
                                                    onChange={(e)=> { handleAddCocept(e,element); element.checked = !element.checked}}
                                                    value={element.conceptoId}
                                                    checked={element.checked}
                                                />
                                                <span className={css.checkmark}></span>
                                                <span className={css.label}>
                                                    {`Pagar ${selectConcepto(element.conceptoId)}`}
                                                </span>
                                            </label>
                                            <Accordion.Toggle as={Button} variant="link" eventKey={index} className="float-right">
                                                Ver detalles
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={index}>
                                            <Card.Body>
                                                <Row>
                                                    <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                                                        <label className="font-weight-bold">
                                                            Monto del tributo
                                                        </label>
                                                        <div className={styles.inputDisabled}>
                                                            {
                                                                element.monto
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                                                        <label className="font-weight-bold">
                                                            Interés de mora
                                                        </label>
                                                        <div className={styles.inputDisabled}>
                                                            {
                                                                element.intereses
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                                                        <label className="font-weight-bold">
                                                            Multa %
                                                        </label>
                                                        <div className={styles.inputDisabled}>
                                                            {
                                                                element.multa
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Col>
                            </Row>
                        ))
                    }
                    </Accordion>
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h6>Subtotales tributos</h6>
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-tributo" className="font-weight-bold">
                        Monto del tributo
                    </label>
                    <Field
                        id="monto-tributo"
                        name="montoTributo"
                        component={BaseInputMonto}
                        maxLength="20"
                        disabled
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="intereses" className="font-weight-bold">
                        Interes de mora
                    </label>
                    <Field
                        id="intereses"
                        name="montoIntereses"
                        component={BaseInputMonto}
                        maxLength="20"
                        disabled
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Multa %
                    </label>
                    <Field
                        id="multa"
                        name="montoMulta"
                        component={BaseInputMonto}
                        maxLength="20"
                        disabled
                    />
                </Col>
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-tributo" className="font-weight-bold">
                        Monto a pagar
                    </label>
                    <Field
                        id="monto"
                        name="montoPagar"
                        component={BaseInputMonto}
                        maxLength="20"
                    />
                </Col>
            </Row>
        </>
    )

}