import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import BaseInput from "../Forms/BaseInputs";
import  styles from './styles.module.css';
import TaxesContext from "../../context/taxes/taxesContext";

export const InputsTaxes = ({listDeclaraciones}) => {

    const {conceptos} = useContext(TaxesContext);

    const selectConcepto = (c) => {
        let concepto = conceptos.find(concepto => concepto.id === c )
        return concepto.name;
    }

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h4>Información de Tributos</h4>
                </Col>
            </Row>
            {
                listDeclaraciones.map((element,index)=>(
                    <Row key={index} className="mt-4 mb-4">
                        <Col xs="12">
                            <h6>{selectConcepto(element.conceptoId)}</h6>
                        </Col>
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
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                ))
            }
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto-tributo" className="font-weight-bold">
                        Subtotal del tributo
                    </label>
                    <Field
                        id="monto-tributo"
                        name="montoTributo"
                        component={BaseInput}
                        maxLength="10"
                        disabled
                    />
                </Col>
                {/*<Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="intereses" className="font-weight-bold">
                        Interes de mora
                    </label>
                    <Field
                        id="intereses"
                        name="intereses"
                        component={BaseInput}
                        maxLength="10"
                    />
                </Col>
                <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="multa" className="font-weight-bold">
                        Multa %
                    </label>
                    <Field
                        id="multa"
                        name="multa"
                        component={BaseInput}
                        maxLength="10"
                    />
                </Col>*/}
            </Row>
        </>
    )

}