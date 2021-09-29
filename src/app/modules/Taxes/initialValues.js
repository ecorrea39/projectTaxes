export const initialValuesPayment = {
    nroReferencia: "",
    tipoTransaccion: "",
    banco: "",
    monto: "",
    fechaPago: "",
    monto_tributo: "",
    intereses: "",
    multa: "",
    conceptos: [],
    conceptosAPagar:[],
    monto_credito_fiscal: ""
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
}