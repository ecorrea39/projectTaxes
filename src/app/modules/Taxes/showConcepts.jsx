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
        creditoFiscal, setCreditoFiscal, formatoFechaFutura } = useContext(TaxesContext);

    const conceptos = formik.values.conceptos;

    const handleActa = (value,input) => {    
        setActaR({
            ...actaReparo,
            [input] : value
        });
    }
    const handleReAdmin = (value,input) => {
        setReAdmin({
            ...reAdmin,
            [input] : value
        })
    }
    const handleReCul = (value,input) => {    
        setReCul({
            ...reCul,
            [input] : value
        })
    }
    const handleDebFormales = (value,input) => {    
        setDebForm({
            ...debForm,
            [input] : value
        })
    }
    const handleDebMat = (value,input) => {    
        setDebMat({
            ...debMat,
            [input] : value
        })
    }
    const handleCredito = (value,input) => {    
        setCreditoFiscal({
            ...creditoFiscal,
            [input] : value
        })
    }

    return (
        <>
            <Col>
                { conceptos.includes("3") && <ActaReparo formatoFecha={formatoFechaFutura} extraOnChange={handleActa} /> }
                { conceptos.includes("4") && <ResolucionAdministrativa extraOnChange={handleReAdmin} /> }
                { conceptos.includes("5") && <ResolucionCulminatoriaSumario extraOnChange={handleReCul} /> }
                { conceptos.includes("6") && <IncumplimientoDeberesFormales extraOnChange={handleDebFormales} /> }
                { conceptos.includes("7") && <IncumplimientoDeberesMateriales extraOnChange={handleDebMat} /> }
                { conceptos.includes("8") && <ConvenioPago /> }
                { conceptos.includes("9") && <ChequeDevuelto /> }
                { conceptos.includes("10") && <MultasPorcentuales />}
                { conceptos.includes("11") && <InteresesMoratorios />}
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