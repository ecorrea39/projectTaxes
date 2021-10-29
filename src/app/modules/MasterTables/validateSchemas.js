import * as Yup from 'yup';
import { regexNumber } from '../../helpers'

export const SchemaTablesCol1 = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    is_active: Yup.boolean()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol2 = Yup.object().shape({
    id_banco: Yup.number()
        .required('- Campo obligatorio -'),
    cuenta_tipo: Yup.string()
        .required('- Campo obligatorio -'),
    cuenta_nro: Yup.string()
        .required('- Campo obligatorio -')
        .min(20, '- Debe ingresar un mínimo de 20 digitos -')
        .max(20, '- Debe ingresar un máximo de 20 digitos -')
        .matches(regexNumber, '- Solo debe ingresar números -'),
    is_active: Yup.boolean()
        .required('- Campo obligatorio -')
});
