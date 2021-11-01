import React, {useContext, useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import { Field, FieldArray } from "formik";
import {
    ActaReparo, ChequeDevuelto, ConvenioPago,
    CreditoFiscal, IncumplimientoDeberesFormales,
    IncumplimientoDeberesMateriales, InteresesMoratorios,
    MultasPorcentuales, ResolucionAdministrativa, ResolucionCulminatoriaSumario
} from "./inputsTypeConcept";
import BaseInput from "../Forms/BaseInputs";
import { InputsByConcepts } from "./inputsByConcepts";
import TaxesContext from "../../context/taxes/taxesContext";

function ShowConcept({formik}) {

    const { setActaR, actaReparo,
        reAdmin, setReAdmin,
        reCul, setReCul,
        debForm, setDebForm,
        debMat, setDebMat,
        setConv, conv,
        cheq, setCheq,
        intereses, setIntereses,
        multa, setMulta,
        creditoFiscal, setCreditoFiscal, formatoFechaFutura } = useContext(TaxesContext);

    const conceptos = formik.values.conceptos;

    const handleActa = (value,input) => {    
        setActaR({
            ...actaReparo,
            [input] : parseInt(value)
        });
    }
    const handleReAdmin = (value,input) => {
        setReAdmin({
            ...reAdmin,
            [input] : parseInt(value)
        })
    }
    const handleReCul = (value,input) => {    
        setReCul({
            ...reCul,
            [input] : parseInt(value)
        })
    }
    const handleDebFormales = (value,input) => {    
        setDebForm({
            ...debForm,
            [input] : parseInt(value)
        })
    }
    const handleDebMat = (value,input) => {    
        setDebMat({
            ...debMat,
            [input] : parseInt(value)
        })
    }
    const handleCredito = (value,input) => {    
        setCreditoFiscal({
            ...creditoFiscal,
            [input] : parseInt(value)
        })
    }
    const handleConv = (value,input) => {
        setConv({
            ...conv,
            [input] : parseInt(value)
        })
    }
    const handleCheq = (value,input) => {
        setCheq({
            ...cheq,
            [input] : parseInt(value)
        })
    }
    const handleMulta = (value,input) => {
        setMulta({
            ...multa,
            [input] : parseInt(value)
        })
    }
    const handleIntereses = (value,input) => {
        setIntereses({
            ...intereses,
            [input] : parseInt(value)
        })
    }

    return (
        <>
            <Col>
                { conceptos.includes("3") && <ActaReparo formatoFecha={formatoFechaFutura} extraOnChange={handleActa} /> }
                { conceptos.includes("4") && <ResolucionAdministrativa formatoFecha={formatoFechaFutura} extraOnChange={handleReAdmin} /> }
                { conceptos.includes("5") && <ResolucionCulminatoriaSumario formatoFecha={formatoFechaFutura} extraOnChange={handleReCul} /> }
                { conceptos.includes("6") && <IncumplimientoDeberesFormales formatoFecha={formatoFechaFutura} extraOnChange={handleDebFormales} /> }
                { conceptos.includes("7") && <IncumplimientoDeberesMateriales formatoFecha={formatoFechaFutura} extraOnChange={handleDebMat} /> }
                { conceptos.includes("8") && <ConvenioPago formatoFecha={formatoFechaFutura} extraOnChange={handleConv}/> }
                { conceptos.includes("9") && <ChequeDevuelto formatoFecha={formatoFechaFutura} extraOnChange={handleCheq} /> }
                { conceptos.includes("10") && <MultasPorcentuales extraOnChange={handleMulta}/>}
                { conceptos.includes("11") && <InteresesMoratorios extraOnChange={handleIntereses}/>}
                { conceptos.includes("12") && <CreditoFiscal extraOnChange={handleCredito} /> }
            </Col>

            {/*<Col>
                <FieldArray name="conceptosAPagar">
                    {({ push, remove }) => (
                        <>
                        {formik.values.conceptosAPagar.map((c, index) => {
                            return (
                                <InputsByConcepts element={c} key={index} index={index} />
                            );
                        })}
                        </>
                    )}
                </FieldArray>
            </Col>
            */}
        </>
    )
}

export default ShowConcept;