export const initialValuesPayment = {
    nreferencia: "",
    modo_pago: "",
    banco: "",
    monto: "",
    monto_tributo: "",
    intereses: "",
    multa: ""
}

/*
export const initialValuesDeclaration = {
    rif: "",
    concepto_pago: "",
    concepto_pago_name: "",
    ano_declaracion: "",
    trimestre: "",
    ntrabajadores: "",
    ntrabajadores_liquidados: "0",
    monto_pagado: "",
    monto_tributo: "0",
    terms: "",
    sustitutiva: "1",
    fecha_emision: "",
    estatus: "1"

}*/

export const initialValuesDeclaration = {
    declaraciones: [{
        concepto_pago: "",
        ano_declaracion: "",
        trimestre: "",
        ntrabajadores: "",
        monto_pagado: "",
        monto_tributo: "0",
        terms: "",
        fecha_emision: "",
        ntrabajadores_liquidados: "0",
        sustitutiva: "1",
        estatus: "1"
    }],
}