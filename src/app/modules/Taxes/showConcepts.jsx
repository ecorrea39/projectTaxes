import React, {useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import { Field, FieldArray } from "formik";
import {
    ActaReparo, ChequeDevuelto, ConvenioPago,
    CreditoFiscal, IncumplimientoDeberesFormales,
    IncumplimientoDeberesMateriales, InteresesMoratorios,
    MultasPorcentuales, ResolucionAdministrativa, ResolucionCulminatoriaSumario
} from "./inputsTypeConcept";
import BaseInput from "../Forms/BaseInputs";

function ShowConcept({formik}) {

    const concepts = formik.values.conceptos;

    const addItems = () => {

        for(let i=0; i<concepts.length; i++) {
            if ( concepts[i] == "3" )
            {
                formik.values.conceptosAPagar.push({
                    idConcepto: "3",
                    numActa: "",
                    fecha: "",
                    monto: ""
                })
            }
        }

    }

    useEffect(()=>{

    },[concepts])

    return (
        <Col>
            {/*<FieldArray
                name="conceptosAPagar"
                render={arrayHelpers => (
                    <div>
                        {formik.values.conceptosAPagar.map((cp, index) => (
                            <div key={index}>
                               
                                <Field
                                    name={`conceptosAPagar[${index}].monto`}
                                    component={BaseInput}
                                />
                    
                            </div>
                        ))}
                    </div>
                )}
            />*/}
            { concepts.includes("3") && <ActaReparo /> }
            { concepts.includes("4") && <ResolucionAdministrativa /> }
            { concepts.includes("5") && <ResolucionCulminatoriaSumario /> }
            { concepts.includes("6") && <IncumplimientoDeberesFormales /> }
            { concepts.includes("7") && <IncumplimientoDeberesMateriales /> }
            { concepts.includes("8") && <ConvenioPago /> }
            { concepts.includes("9") && <ChequeDevuelto /> }
            { concepts.includes("10") && <MultasPorcentuales />}
            { concepts.includes("11") && <InteresesMoratorios />}
            { concepts.includes("12") && <CreditoFiscal /> }
        </Col>
    )
}

export default ShowConcept;