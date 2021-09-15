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