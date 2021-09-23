import React from "react";
import { Col, Row } from "react-bootstrap";
import {
    ActaReparo, ChequeDevuelto, ConvenioPago,
    CreditoFiscal, IncumplimientoDeberesFormales,
    IncumplimientoDeberesMateriales, InteresesMoratorios,
    InteresesMoraXCobrar, MultasRecargos, SancionActaReparo
} from "./inputsTypeConcept";

function ShowConcept({concepts}) {

    return (
        <Col>
            { concepts.includes("3") && <ActaReparo /> }
            { concepts.includes("4") && <SancionActaReparo /> }
            { concepts.includes("5") && <InteresesMoraXCobrar /> }
            { concepts.includes("6") && <ChequeDevuelto /> }
            { concepts.includes("7") && <ConvenioPago /> }
            { concepts.includes("8") && <MultasRecargos /> }
            { concepts.includes("9") && <InteresesMoratorios /> }
            { concepts.includes("10") && <IncumplimientoDeberesFormales /> }
            { concepts.includes("11") && <IncumplimientoDeberesMateriales /> }
            { concepts.includes("12") && <CreditoFiscal /> }
        </Col>
    )
}

export default ShowConcept;