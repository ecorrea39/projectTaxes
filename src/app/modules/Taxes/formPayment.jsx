import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { initialValuesPayment } from "./initialValues";
import { SchemaPayment } from "./validateSchemas";
import TaxesContext from "../../context/taxes/taxesContext";
import { BaseFormik } from "./baseFormik";
import Swal from "sweetalert2";

function FormPayment() {

    const {
            submitPayment, setFormDataPayment, conceptos, totalTributoDeclarado, formDataDeclaration,
            actaReparo, reAdmin, reCul, debForm, debMat, creditoFiscal, conv, cheq, multa, intereses
        } = useContext(TaxesContext);
    const [filterConcepts, setFilterConcepts] = useState([]);
    const [detallesDeclaraciones, setDetDeclaraciones] = useState([]);

    const calcularMonto = (values) => {
        let detallesConceptos = [];
        let montoTotal = totalTributoDeclarado;
        // ESTO SE DEBE OPTIMIZAR CON URGENCIA
        values.conceptos.map((element,index)=>{
            let concepto = {
                idConcepto: "",
                detalle: {
                    monto: "", // Monto del concepto
                    monto_multa: "", // Monto de la multa del concepto
                    monto_intereses: "", // Monto de intereses del concepto
                    nro_doc: "", // Numero de documento/acta/resolucion/cheque de conceptops
                    fecha_concp: "", // Fecha del documento/acta/resolucion/cheque
                    fecha_vcto_giro: "", // Fecha Vencimiento de Giro Convenio de pago
                    fecha_nota_debito: "", // Fecha nota deito del cheque
                    nota_debito: "",
                    nro_giro: ""
                }
            };

            concepto.idConcepto = element;

            if (element == 3) {
                concepto.detalle.monto = actaReparo.montoActa;
                concepto.detalle.fecha_concp = actaReparo.fechaActa;
                concepto.detalle.nro_doc = actaReparo.numActa;
                montoTotal += actaReparo.montoActa;
            }
            if (element == 4) {
                concepto.detalle.nro_doc = reAdmin.numResolucionAdmin;
                concepto.detalle.fecha_concp = reAdmin.fechaResolucionAdmin;
                concepto.detalle.monto = reAdmin.montoMultaResolucionAdmin;
                concepto.detalle.monto_intereses = reAdmin.montoInteresesResolucionAdmin;
                montoTotal += reAdmin.montoMultaResolucionAdmin;
            }
            if (element == 5) {
                concepto.detalle.nro_doc = reCul.numResolucionCul;
                concepto.detalle.fecha_concp = reCul.fechaResolucionCul;
                concepto.detalle.monto = reCul.montoMultaResolucionCul;
                montoTotal += reCul.montoMultaResolucionCul;
            }
            if (element == 6) {
                concepto.detalle.nro_doc = debForm.numResolucionForm;
                concepto.detalle.fecha_concp = debForm.fechaResolucionForm;
                concepto.detalle.monto = debForm.montoMultaResolucionForm;
                montoTotal += debForm.montoMultaResolucionForm;
            }
            if (element == 7) {
                concepto.detalle.nro_doc = debMat.numResolucionMat;
                concepto.detalle.fecha_concp = debMat.fechaResolucionMat;
                concepto.detalle.monto = debMat.montoMultaResolucionMat;
                montoTotal += debMat.montoMultaResolucionMat;
            }
            if (element == 8) {
                concepto.detalle.nro_doc = conv.numConvPago;
                concepto.detalle.fecha_concp = conv.fechaConvenio;
                concepto.detalle.nro_giro = conv.numGiroConvenioPago;
                concepto.detalle.fecha_vcto_giro = conv.fechaVencConvenio;
                concepto.detalle.monto = conv.montoConvenio;
                concepto.detalle.monto_intereses = conv.montoInteresesConvenio;
                montoTotal += conv.montoConvenio;
            }
            if (element == 9) {
                concepto.detalle.nro_doc = cheq.numCheque;
                concepto.detalle.fecha_concp = cheq.fechaCheque;
                concepto.detalle.nota_debito = cheq.notaDebito;
                concepto.detalle.fecha_nota_debito = cheq.fechaNotaDebito;
                concepto.detalle.monto = cheq.montoCheque;
                montoTotal += cheq.montoCheque;
            }
            if (element == 10) {
                concepto.detalle.monto = multa.montoMulta;
                montoTotal += multa.montoMulta;
            }
            if (element == 11) {
                concepto.detalle.monto = intereses.montoInteresesMoratorios;
                montoTotal += intereses.montoInteresesMoratorios;
            }
            if (element == 12) {
                concepto.detalle.monto = creditoFiscal.montoCredito;
                montoTotal += creditoFiscal.montoCredito;
            }
            detallesConceptos.push(concepto);
        });
        values.detallesConceptos = detallesConceptos;
        console.log(montoTotal)
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

    const createListDetails = () => {
        let array = [];
        formDataDeclaration.declaraciones.map((element,index) => {
            let detalles = {
                monto: element.monto_tributo,
                intereses: element.monto_intereses,
                multa: element.monto_multa,
                name: "",
                conceptoId: element.concepto_pago,
                id: index+1
            }
            array.push(detalles);
        });
        setDetDeclaraciones(array);
    }
    
    useEffect(()=>{
        setFilterConcepts(conceptos.filter(x => x.id > 2)); 
        createListDetails();
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
                                conceptos={filterConcepts}
                                listDeclaraciones={detallesDeclaraciones} />
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default FormPayment;