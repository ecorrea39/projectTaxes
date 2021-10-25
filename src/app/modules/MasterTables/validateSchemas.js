import * as Yup from 'yup';

export const SchemaTables = Yup.object().shape({
    nrif: Yup.string()
        .required('- Campo obligatorio -'),
    fecha: Yup.string()
        .required('- Campo obligatorio -'),
    formato: Yup.string()
});
