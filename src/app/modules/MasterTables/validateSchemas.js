import * as Yup from 'yup';
import { regexNumber } from '../../helpers'

export const SchemaTablesCol1 = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    is_active: Yup.boolean()
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
});

export const SchemaTablesCol3 = Yup.object().shape({
    nom_banco: Yup.string()
        .required('- Campo obligatorio -'),
    cod_banco: Yup.string()
        .required('- Campo obligatorio -')
        .min(4, '- Debe ingresar un mínimo de 4 digitos -')
        .max(4, '- Debe ingresar un máximo de 4 digitos -'),
    is_active: Yup.boolean()
});

export const SchemaTablesCol4 = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    descripcion: Yup.string(),
    is_active: Yup.boolean()
});

export const SchemaTablesCol5 = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    codigo: Yup.string()
        .required('- Campo obligatorio -')
        .min(4, '- Debe ingresar un mínimo de 4 digitos -')
        .max(4, '- Debe ingresar un máximo de 4 digitos -'),
    id_motor: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol6 = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    clave: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol7 = Yup.object().shape({
    id_estado: Yup.string()
        .required('- Campo obligatorio -'),
    registradores: Yup.string(),
    oficina: Yup.string()
        .required('- Campo obligatorio -'),
    direccion_oficina: Yup.string(),
    telefono_contacto: Yup.string(),
    correo: Yup.string()
});

export const SchemaTablesCol8 = Yup.object().shape({
    fecha: Yup.date()
        .required('- Campo obligatorio -'),
    valor: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol9 = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    neveces_mmv: Yup.number()
        .min(0, '- valor mínimo es cero -')
});

export const SchemaTablesCol10 = Yup.object().shape({
    ano: Yup.number()
        .required('- Campo obligatorio -'),
    fecha: Yup.date()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol11 = Yup.object().shape({
    ano: Yup.number()
        .required('- Campo obligatorio -'),
    mes: Yup.number()
        .required('- Campo obligatorio -'),
    tasa_bcv: Yup.string()
        .required('- Campo obligatorio -'),
    recargo_cot: Yup.string()
        .required('- Campo obligatorio -'),
    tasa_intereses_mora: Yup.string()
        .required('- Campo obligatorio -'),
    ngaceta: Yup.string()
        .required('- Campo obligatorio -'),
    fecha_gaceta: Yup.date()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol12 = Yup.object().shape({
    codigo: Yup.string()
        .required('- Campo obligatorio -')
        .min(3, '- Debe ingresar un mínimo de 3 digitos -')
        .max(3, '- Debe ingresar un máximo de 3 digitos -'),
    name: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol13 = Yup.object().shape({
    name: Yup.string()
        .required('- Campo obligatorio -'),
    descripcion: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol14 = Yup.object().shape({
    concepto: Yup.string()
        .required('- Campo obligatorio -'),
    codigo_cuenta: Yup.string()
        .required('- Campo obligatorio -'),
    naturaleza_cuenta: Yup.string()
        .required('- Campo obligatorio -'),
    grupo: Yup.string()
        .required('- Campo obligatorio -'),
    sub_grupo: Yup.string()
        .required('- Campo obligatorio -'),
    auxiliar: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol15 = Yup.object().shape({
    documento: Yup.string()
        .required('- Campo obligatorio -'),
    nombre: Yup.string()
        .required('- Campo obligatorio -'),
    cargo: Yup.string()
        .required('- Campo obligatorio -'),
    ngaceta: Yup.string()
        .required('- Campo obligatorio -'),
    fecha_gaceta: Yup.string()
        .required('- Campo obligatorio -'),
    orden_administrativa: Yup.string()
});

export const SchemaTablesCol16 = Yup.object().shape({
    cod_estado: Yup.string()
        .required('- Campo obligatorio -'),
    region: Yup.string()
        .required('- Campo obligatorio -'),
    redi: Yup.string()
        .required('- Campo obligatorio -'),
    unidad_estadal: Yup.string(),
    descripcion: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol17 = Yup.object().shape({
    cod_municipio: Yup.string()
        .required('- Campo obligatorio -'),
    id_estado: Yup.string()
        .required('- Campo obligatorio -'),
    descripcion: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol18 = Yup.object().shape({
    id_municipio: Yup.string()
        .required('- Campo obligatorio -'),
    descripcion: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol19 = Yup.object().shape({
    id_estado: Yup.string()
        .required('- Campo obligatorio -'),
    id_municipio: Yup.string()
        .required('- Campo obligatorio -'),
    descripcion: Yup.string()
        .required('- Campo obligatorio -')
});

export const SchemaTablesCol20 = Yup.object().shape({
    cod: Yup.string()
        .required('- Campo obligatorio -'),
    asignacion: Yup.string()
        .required('- Campo obligatorio -')
});











