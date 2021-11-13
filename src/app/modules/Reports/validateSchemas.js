import * as Yup from 'yup';

export const SchemaReportCertificateSolvency = Yup.object().shape({
    nrif: Yup.string()
        .required('- Campo obligatorio -'),
    ano: Yup.string()
        .required('- Campo obligatorio -'),
    trimestre: Yup.string()
        .required('- Campo obligatorio -'),
    fecha: Yup.string()
        .required('- Campo obligatorio -'),
    formato: Yup.string()
});
