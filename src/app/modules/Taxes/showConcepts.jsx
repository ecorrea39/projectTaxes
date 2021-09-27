import React from "react";
import { Col, Row } from "react-bootstrap";
import {
    ActaReparo, ChequeDevuelto, ConvenioPago,
    CreditoFiscal, IncumplimientoDeberesFormales,
    IncumplimientoDeberesMateriales, InteresesMoratorios,
    MultasPorcentuales, ResolucionAdministrativa, ResolucionCulminatoriaSumario
} from "./inputsTypeConcept";

function ShowConcept({concepts}) {

    return (
        <Col>
            { concepts.includes("3") && <ActaReparo /> }
            { concepts.includes("4") &&  true }
            { concepts.includes("5") && <InteresesMoratorios /> }
            { concepts.includes("6") && <ChequeDevuelto /> }
            { concepts.includes("7") && <ConvenioPago /> }
            { concepts.includes("8") && <MultasPorcentuales /> }
            { concepts.includes("9") && true }
            { concepts.includes("10") && <IncumplimientoDeberesFormales /> }
            { concepts.includes("11") && <IncumplimientoDeberesMateriales /> }
            { concepts.includes("12") && <CreditoFiscal /> }
        </Col>
    )
}

export default ShowConcept;