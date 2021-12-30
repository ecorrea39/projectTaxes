import * as Yup from 'yup';
import { 
    regexNameGroup, regexName,
    textoAndNumber, regexPhoneNumber,
    regexCI 
} from "../../../helpers";

export const initialValues = {
    cedula: "",
    nombre: "",
    apellido: "",
    usuario: "",
    status: false,
    grupo: "",
    correo: "",
    unid_estatal_tributo: "",
    cargo: "",
    departamento: "",
    contrasenia: "",
    numero_telefono: "",
    cod_telefono: "0412",
    id_user: "",
    id_auth: ""
}

export const validationSchema = Yup.object().shape({
    cedula: Yup.string()
        .required('- Campo obligatorio -')
        .min(6, '- La cédula debe tener al menos 6 carácteres. -')
        .max(9, '- La cédula debe tener máximo de 9 carácteres. -')
        .matches(regexCI, '- Cédula inválida. -'),
    nombre: Yup.string()
        .required('- Campo obligatorio -')
        .min(3, '- El nombre debe tener al menos 3 carácteres. -')
        .max(50, '- El nombre debe tener máximo de 50 carácteres. -')
        .matches(regexName, '- Nombre inválido. -'),
    apellido: Yup.string()
        .required('- Campo obligatorio -')
        .min(3, '- El apellido debe tener al menos 3 carácteres. -')
        .max(50, '- El apellido debe tener máximo de 50 carácteres. -')
        .matches(regexName, '- Apellido inválido. -'),
    usuario: Yup.string()
        .required('- Campo obligatorio -')
        .min(3, '- El usuario debe tener al menos 3 carácteres. -')
        .max(50, '- El usuario debe tener máximo de 50 carácteres. -')
        .matches(textoAndNumber, '- Usuario inválido. -'),
    status: Yup.string()
        .required('- Campo obligatorio -'),
    grupo: Yup.string()
        .required('- Campo obligatorio -'),
    unid_estatal_tributo: Yup.string()
        .required('- Campo obligatorio -'),
    correo: Yup.string().email("Correo inválido")
        .required('- Campo obligatorio -'),
    contrasenia: Yup.string()
        .min(8, '- La contraseña debe tener minimo 8 carácteres. -')
        .max(16, '- La contraseña debe tener máximo de 16 carácteres. -')
        .required('- Campo obligatorio -'),
    cargo: Yup.string()
        .required('- Campo obligatorio -'),
    numero_telefono: Yup.string()
        .matches(regexPhoneNumber, '- Telefono inválido. -')
        .required('- Campo obligatorio -'),
    cod_telefono: Yup.string()
        .required('- Campo obligatorio -'),
    fecha_creacion: Yup.string()
});