import React, { useContext } from "react";
import { Col, Row, Accordion, Card, Button } from "react-bootstrap";
import { Field } from "formik";
import  styles from './styles.module.css';
import TaxesContext from "../../context/taxes/taxesContext";
import css from '../Forms/checkbox.module.css';
import { formatearMontos, formatearMontosIII } from "../../helpers";
import BaseInputMonto from "../Forms/BaseInputMonto";

export const ListTaxes = ({listDeclaraciones,formik, calcularMontosTotates}) => {

    const {conceptos} = useContext(TaxesContext);

    const selectConcepto = (c) => {
        let concepto = conceptos.find(concepto => concepto.id == c )
        return concepto.name;
    }

    const handleAddCocept = (e,conc) => {
        e.persist();
        let checkEd = e.target.checked;
        let tributos = formik.values.tributos;
        let indice = tributos.indexOf(conc.idTributo);

        if(checkEd) {
            tributos.push(conc.idTributo)
            formik.setFieldValue("tributos", tributos);
            calcularMontosTotates(tributos,"suma");
        } else {
            tributos.splice(indice, 1);
            formik.setFieldValue("tributos", tributos);
            calcularMontosTotates(tributos,"resta");
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
                                                    onChange={(e)=> { handleAddCocept(e,element); element.checked = !element.checked} }
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
                                                        <Field
                                                            name="tributos"
                                                            component={BaseInputMonto}
                                                            maxLength="20"
                                                            value={ element.monto }
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                                                        <label className="font-weight-bold">
                                                            Interés de mora
                                                        </label>
                                                        <Field
                                                            name="intereses"
                                                            component={BaseInputMonto}
                                                            maxLength="20"
                                                            value={ element.intereses }
                                                            disabled
                                                        />
                                                        
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
        </>
    )

}