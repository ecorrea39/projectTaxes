import * as Yup from 'yup';

export const SchemaPnaCol = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    is_active: Yup.boolean()
});

