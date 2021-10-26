import * as Yup from 'yup';

export const SchemaTablesCol1 = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    estatus: Yup.boolean()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol2 = Yup.object().shape({
    nrif: Yup.string()
        .required('- Campo obligatorio -'),
    fecha: Yup.string()
        .required('- Campo obligatorio -'),
    formato: Yup.string()
});
