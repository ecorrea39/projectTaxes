import * as Yup from 'yup';

export const SchemaPayment = Yup.object({
    nreferencia: Yup.string()
        .required('- Campo obligatorio -'),
    modo_pago: Yup.string()
        .required('- Campo obligatorio -'),
    banco: Yup.string()
        .required('- Campo obligatorio -'),
    monto: Yup.string()
        .required('- Campo obligatorio -'),
    monto_tributo: Yup.string()
        .required('- Campo obligatorio -'),
    intereses: Yup.string(),
    multa: Yup.string(),
});

export const SchemaDeclaration = Yup.object({
    concepto_pago: Yup.string()
        .required('- Campo obligatorio -'),
    ano_declaracion: Yup.string()
        .required('- Campo obligatorio -'),
    trimestre: Yup.string()
        .required('- Campo obligatorio -'),
    ntrabajadores: Yup.number()
        .min(0)
        .required('- Campo obligatorio -'),
    monto_pagado: Yup.string()
        .required('- Campo obligatorio -'),
    monto_tributo: Yup.string()
        .required('- Campo obligatorio -'),
    terms: Yup.boolean()
        .required('- Campo obligatorio -'),
    fecha_emision: Yup.date()
        .required('- Campo obligatorio -'),
});