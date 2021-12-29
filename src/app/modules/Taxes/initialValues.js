export const initialValuesSummary = {
    montoTributo: "",
    montoIntereses: "",
    montoMulta: "",
    montoPagar: "",
    conceptos: [],
    tributos: [],
    detallesConceptos:[]
}

export const initialValuesPayment = {
    nro_referencia:"",
    tipo_transaccion: "",
    banco_id: "",
    monto: "",
    totalTributos: "",
    fecha: ""
}

export const initialValuesDeclaration = {
    declaraciones: [{
        concepto_pago: "",
        ano_declaracion: "",
        trimestre: "",
        ntrabajadores: "",
        monto_pagado: "",
        monto_tributo: "0",
        monto_multa: "0",
        monto_intereses: "0",
        terms: "",
        fecha_emision: "",
        fecha_declaracion: "",
        ntrabajadores_liquidados: "0",
        sustitutiva: "1",
        estatus: "1"
    }],
    termG: ""
}