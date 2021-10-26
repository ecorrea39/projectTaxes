import * as Yup from 'yup';

const regexNumber = /^[0-9]+$/;

export const SchemaPayment = Yup.object().shape({
    nroReferencia: Yup.string()
        .required('- Campo obligatorio -'),
    tipoTransaccion: Yup.string()
        .required('- Campo obligatorio -'),
    banco: Yup.string()
        .required('- Campo obligatorio -'),
    monto: Yup.string()
        .required('- Campo obligatorio -'),
    fecha: Yup.string()
        .required('- Campo obligatorio -')
});



export const SchemaDeclaration= Yup.object({
    declaraciones: Yup.array().of(
        Yup.object().shape({
            concepto_pago: Yup.string()
                .required('- Campo obligatorio -'),
            ano_declaracion: Yup.string()
                .required('- Campo obligatorio -'),
            trimestre: Yup.string()
                .required('- Campo obligatorio -'),
            ntrabajadores: Yup.string()
                .required('- Campo obligatorio -')
                .max(6, 'Debe ingresar un maximo de 10 digitos')
                .matches(regexNumber, '- Solo debe ingresar numeros -'),
            monto_pagado: Yup.string()
                .required('- Campo obligatorio -'),
            monto_tributo: Yup.string(),
            monto_multa: Yup.string(),
            monto_intereses: Yup.string(),
            fecha_declaracion: Yup.date(),
            terms: Yup.boolean()
                .required('- Campo obligatorio -'),
            ntrabajadores_liquidados: Yup.string()
                .max(6, 'Debe ingresar un maximo de 6 digitos')
                .matches(regexNumber, '- Solo debe ingresar numeros -'),
            sustitutiva: Yup.string(),
            estatus: Yup.string(),
            fecha_emision: Yup.date()
                .when('concepto_pago', {
                    is: 2,
                    then: Yup.string().required('- Campo obligatorio -')
                })
                
        })
    )
});