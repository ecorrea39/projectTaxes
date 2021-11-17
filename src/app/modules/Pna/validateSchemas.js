import * as Yup from 'yup';

export const SchemaPnaCol = Yup.object().shape({
    tipo: Yup.string()
        .required('- Campo obligatorio -'),
    rif: Yup.string()
        .required('- Campo obligatorio -'),
    name: Yup.string(),
    cumple_obligacion: Yup.string()
        .required('- Campo obligatorio -'),
    numero_certificado: Yup.string()
        .required('- Campo obligatorio -')
});

