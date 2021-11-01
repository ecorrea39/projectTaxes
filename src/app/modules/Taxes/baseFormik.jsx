import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import ShowConcept from "./showConcepts";
import Checkbox from "../Forms/BaseCheckbox";
import { InputsTaxes } from "./inputsTaxes";
import TaxesContext from "../../context/taxes/taxesContext";
import { ListConcepts } from "./listConcepts";
import { Link } from "react-router-dom";

export const BaseFormik = ({conceptos,formik,listDeclaraciones}) => {

    const {
        bancos, totalTributoDeclarado, setCreditoFiscal, declaracionesRealizadas,
        formatoFechaFutura, modalidadesPagos, formDataDeclaration } = useContext(TaxesContext);
    
    const [deducible, setDeducible] = useState(0);

    const calcularCreditoFiscal = (montoPagado) => {
        
        let resta = parseInt(montoPagado) - parseInt(totalTributoDeclarado);
        let array = formik.values.conceptos;
        let indice = array.indexOf("12");
        
        if ( resta > 0 )  {
            // setDeducible(resta);
            if(indice == -1) {
                formik.setFieldValue("conceptos", [...array, "12"]);
            }
            // ESTO SE DEBE CAMBIAR 
            setCreditoFiscal({
                montoCredito: resta
            });
            formik.setFieldValue("montoCredito", resta);
        } else {
            // setDeducible(0);
            array.splice(indice, 1);
            formik.setFieldValue("conceptos", array);
            // ESTO SE DEBE CAMBIAR 
            setCreditoFiscal({montoCredito: ""});
            formik.setFieldValue("montoCredito", "");
        }
    }

    useEffect(()=>{
        if (totalTributoDeclarado != null) {
            formik.setFieldValue("montoTributo", totalTributoDeclarado );
        }
    },[totalTributoDeclarado]);

    useEffect(()=>{
        if(totalTributoDeclarado > 0) {
            calcularCreditoFiscal(formik.values.monto);
        }
    },[formik.values.monto]);

    useEffect(()=>{
        formik.setFieldValue("tributos", declaracionesRealizadas);
    },[]);

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                    <label htmlFor="referencia" className="font-weight-bold">
                        Numero de referencia
                    </label>
                    <Field
                        id="referencia"
                        name="nro_referencia"
                        placeholder="Ej: 999999"
                        component={BaseInput}
                        maxLength="10"
                        minLength="4"
                    />
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                    <label htmlFor="modalidad-pago" className="font-weight-bold">
                        Modalidad de pago
                    </label>
                    <Field
                        type="select"
                        component={BaseSelect}
                        id="modalidad-pago"
                        name="tipo_transaccion"
                    >
                        <option value="" disabled>. . .</option>
                        {
                            modalidadesPagos.map(element => (
                                <option
                                    key={element.id}
                                    value={element.id}
                                >
                                    {element.attributes.name}
                                </option>
                            ))
                        }
                    </Field>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mb-6">
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
                                    {element.attributes["id_banco_banco.nom_banco"]}
                                </option>
                            ))
                        }
                    </Field>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="monto" className="font-weight-bold">
                        Monto (Bs).
                    </label>
                    <Field
                        id="monto"
                        name="monto"
                        component={BaseInput}
                        maxLength="10"
                    />
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="fecha-pago" className="font-weight-bold">
                        Fecha del pago
                    </label>
                    <Field
                        id="fecha-pago"
                        type="date"
                        name="fecha"
                        component={BaseInput}
                        max={formatoFechaFutura}
                    />
                </Col>
            </Row>

            {
                formDataDeclaration.declaraciones && <InputsTaxes listDeclaraciones={listDeclaraciones} formik={formik} />
            }
            
            {
                <ListConcepts formik={formik} conceptos={conceptos} />
            }
            
            <Row>
                <ShowConcept
                    formik={formik}
                />
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <Link size="lg" className="btn btn-danger font-size-lg w-100" to="/dashboard">Cancelar</Link>
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <Button
                        type="submit"
                        variant="success"
                        size="lg"
                        className="w-100"
                        onClick={()=>console.log(formik.errors,formik.values)}>Guardar Pago</Button>
                </Col>
        </Row>
        </>
    )
}