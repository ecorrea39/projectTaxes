import * as Yup from 'yup';
import { regexNumber } from '../../helpers';

export const SchemaSummary = Yup.object().shape({
    montoPagar: Yup.string()
        .required('- Campo obligatorio -')
        .max(10, 'Debe ingresar un máximo de 10 digitos'),
    montoTributo: Yup.string()
        .required('- Campo obligatorio -')
        .max(10, 'Debe ingresar un máximo de 10 digitos'),
    intereses: Yup.string()
        .max(10, 'Debe ingresar un máximo de 10 digitos')
        .matches(regexNumber, '- Solo se permiten numeros -'),
    multa: Yup.string()
        .max(10, 'Debe ingresar un maximo de 10 digistos')
        .matches(regexNumber, '- Solo se permiten numeros -')
});

export const SchemaPayment = Yup.object().shape({
    nro_referencia: Yup.string()
        .required('- Campo obligatorio -')
        .min(4, '- Debe ingresar al menos los ultimos 4 digistos de la referencia. -')
        .max(10, '- Debe ingresar un máximo de 10 digistos de la referencia. -')
        .matches(regexNumber, '- Numero de referencia invalido. -'),
    tipo_transaccion: Yup.string()
        .required('- Campo obligatorio -'),
    banco_id: Yup.string()
        .required('- Campo obligatorio -'),
    monto: Yup.string()
        .required('- Campo obligatorio -')
        .max(10, 'Debe ingresar un máximo de 10 digitos'),
    totalTributos: Yup.string()
        .required('- Campo obligatorio -')
        .max(10, 'Debe ingresar un máximo de 10 digitos'),
    fecha: Yup.date()
        .required('- Campo obligatorio -')
        .max(new Date(), "La fecha ingresada no esta permitida")
});

export const SchemaDeclaration = Yup.object({
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
            terms: Yup.boolean(),
            ntrabajadores_liquidados: Yup.string()
                .max(6, 'Debe ingresar un máximo de 6 digitos')
                .matches(regexNumber, '- Solo debe ingresar números -'),
            sustitutiva: Yup.string(),
            estatus: Yup.string(),
            fecha_emision: Yup.date()
                .when('concepto_pago', {
                    is: 2,
                    then: Yup.string().required('- Campo obligatorio -')
                })
                
        }),
    ),
    termsG: Yup.boolean()
        .required('- Campo obligatorio -')
});