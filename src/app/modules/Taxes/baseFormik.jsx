import React, { useContext, useEffect, useState } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import ShowConcept from "./showConcepts";
import Checkbox from "../Forms/BaseCheckbox";
import { InputsTaxes } from "./inputsTaxes";
import TaxesContext from "../../context/taxes/taxesContext";

export const BaseFormik = ({conceptos,formik}) => {

    const { bancos, totalTributoDeclarado, setCreditoFiscal } = useContext(TaxesContext);

    /**VALIDACIONES PENTIEN
     * EL MONTO A PAGAR PUEDE SER MENOR A EL MONTO DEL TRIBUTO ?
     * EL MONTO DEL TRIBUTO NO PUEDE SER 0
     * BLOQUEAR EL CAMPO DEL MONTO DEL TRIBUTO
     * MOSTRAR LA INFORMACION CORRECTA EN EL RECIBO
     * LA SUMATORIA DE LOS MONTOS DE CADA CONCEPTOS + EL MONTO DE LA DECLARACION CON EL MONTO DEL PAGO
     */

    const calcularCreditoFiscal = (montoPagado) => {
        
        let resta = parseInt(montoPagado) - parseInt(totalTributoDeclarado);
        let array = formik.values.conceptos;
        console.log( resta > 0 )
        if ( resta > 0 )  {
            formik.setFieldValue("conceptos", [...array, "12"]);
            // ESTO SE DEBE CAMBIAR 
            setCreditoFiscal({
                montoCredito: resta
            });
            formik.setFieldValue("montoCredito", resta);
        } else {
            let indice = array.indexOf("12");
            array.splice(indice, 1);
            formik.setFieldValue("conceptos", array);
            // ESTO SE DEBE CAMBIAR 
            setCreditoFiscal({montoCredito: ""});
            formik.setFieldValue("montoCredito", "");
        }
    }

    useEffect(()=>{
        if (totalTributoDeclarado != null && totalTributoDeclarado > 0) {
            formik.setFieldValue("montoTributo", totalTributoDeclarado );
        }
    },[]);

    useEffect(()=>{
       calcularCreditoFiscal(formik.values.monto);
     },[formik.values.monto]);

    return (
        <>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mb-6">
                    <label htmlFor="referencia" className="font-weight-bold">
                        Numero de referencia
                    </label>
                    <Field
                        id="referencia"
                        name="nroReferencia"
                        placeholder="Ej: 999999"
                        component={BaseInput}
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
                        name="tipoTransaccion"
                    >
                        <option value="" disabled>. . .</option>
                        <option value="Transferencia Electrónica">Transferencia Electrónica</option>
                        <option value="Depósito en Taquilla">Depósito en Taquilla</option>
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
                                    {element.attributes.nom_banco}
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
                    />
                </Col>
            </Row>
            
            { totalTributoDeclarado != null && <InputsTaxes /> }

            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <h5>Otros Conceptos de Pagos</h5>
                </Col>
            </Row>
            <Row>
            {
                conceptos.map((element,key) => (
                    <Col xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" key={key}>
                        <Field
                            type="checkbox" 
                            component={Checkbox} 
                            name="conceptos"
                            label={element.name}
                            value={element.id}
                            formik={formik}
                        />
                    </Col>
                ))
            }
            </Row>
            <Row>
                <ShowConcept
                    formik={formik}
                />
            </Row>
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                    <Button variant="outline-danger" size="lg" className="w-100">Cancelar</Button>
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