import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { initialValuesPayment } from "./initialValues";
import { SchemaPayment } from "./validateSchemas";
import TaxesContext from "../../context/taxes/taxesContext";
import { BaseFormik } from "./baseFormik";
import Swal from "sweetalert2";

function FormPayment() {

    const {
            bancos, submitPayment, setFormDataPayment, conceptos, totalTributoDeclarado,
            actaReparo, reAdmin, reCul, debForm, debMat, creditoFiscal
        } = useContext(TaxesContext);
    const [filterConcepts, setFilterConcepts] = useState([]);

    const calcularMonto = (values) => {
        let detallesConceptos = [];
        let montoTotal = totalTributoDeclarado;
        // ESTO SE DEBE OPTIMIZAR CON URGENCIA
        values.conceptos.map((element,index)=>{
            let concepto = {
                idConcepto: "",
                detalle: {
                    monto: "", // Monto del concepto
                    montoMulta: "", // Monto de la multa del concepto
                    motoIntereses: "", // Monto de intereses del concepto
                    nroDoc: "", // Numero de documento/acta/resolucion/cheque de conceptops
                    fechaConcp: "", // Fecha del documento/acta/resolucion/cheque
                    fechaVctoGiro: "", // Fecha Vencimiento de Giro Convenio de pago
                    fechaNotaDebito: "" // Fecha nota deito del cheque
                }
            };

            concepto.idConcepto = element;

            if (element == 3) {
                concepto.detalle.monto = actaReparo.montoActa;
                concepto.detalle.fechaConcp = actaReparo.fechaActa;
                concepto.detalle.fechaConcp = actaReparo.numActa;
                montoTotal += actaReparo.montoActa;
            }
            if (element == 4) {
                concepto.detalle.nroDoc = reAdmin.numResolucionAdmin;
                concepto.detalle.fechaConcp = reAdmin.fechaResolucionAdmin;
                concepto.detalle.montoMulta = reAdmin.montoMultaResolucionAdmin;
                concepto.detalle.motoIntereses = reAdmin.montoInteresesResolucionAdmin;
                montoTotal += reAdmin.montoMultaResolucionAdmin;
                montoTotal += reAdmin.montoInteresesResolucionAdmin;
            }
            if (element == 5) {
                concepto.detalle.nroDoc = reCul.numResolucionCul;
                concepto.detalle.fechaConcp = reCul.fechaResolucionCul;
                concepto.detalle.montoMulta = reCul.montoMultaResolucionCul;
                montoTotal += reCul.montoMultaResolucionCul;
            }
            if (element == 6) {
                concepto.detalle.nroDoc = debForm.numResolucionForm;
                concepto.detalle.fechaConcp = debForm.fechaResolucionForm;
                concepto.detalle.montoMulta = debForm.montoMultaResolucionForm;
                montoTotal += debForm.montoMultaResolucionForm;
            }
            if (element == 7) {
                concepto.detalle.nroDoc = debMat.numResolucionMat;
                concepto.detalle.fechaConcp = debMat.fechaResolucionMat;
                concepto.detalle.montoMulta = debMat.montoMultaResolucionMat;
                montoTotal += debMat.montoMultaResolucionMat;
            }
            if (element == 8) {
                concepto.detalle = {};
            }
            if (element == 9) {
                concepto.detalle = {};
            }
            if (element == 10) {
                concepto.detalle = {};
            }
            if (element == 11) {
                concepto.detalle = {};
            }
            if (element == 12) {
                concepto.detalle.monto = creditoFiscal.montoCredito;
                montoTotal += creditoFiscal.montoCredito;
            }
            detallesConceptos.push(concepto);
        });
        values.detallesConceptos = detallesConceptos;
        return {continue: montoTotal <= values.monto, newValues: values};
    }

    const handleSubmit = async (values) => {
        let calculo = calcularMonto(values);
        if(calculo.continue) {
            setFormDataPayment(calculo.newValues);
            await submitPayment(calculo.newValues);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'El monto total de la transaccion es inferior a los montos declarados.',
                showConfirmButton: false,
                timer: 4000
            });
        }
    }
    
    useEffect(()=>{
        setFilterConcepts(conceptos.filter(x => x.id > 2)); 
    },[conceptos]);

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
                            <BaseFormik
                                formik={formik}
                                conceptos={filterConcepts} />
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default FormPayment;