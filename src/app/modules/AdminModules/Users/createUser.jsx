import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { regexNameGroup } from "../../../helpers";
import UsersContext from "../../../context/users/usersContext";
import { BaseFormik } from "./baseFormik";

export const CreateUser = (props) => {

    let history = useHistory();
    const { action } = props;
    const { addNewUser, updateUser } = useContext(UsersContext);

    const initialValues = {
        nombre: "",
        apellido: "",
        correo: "",
        grupo: "",
        status: "",
        unid_estatal_tributo: "",
        usuario: ""
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('- Campo obligatorio -')
            .min(3, '- El nombre debe tener al menos 3 carecteres. -')
            .max(50, '- El nombre debe tener maximo de 50 carecteres. -')
            .matches(regexNameGroup, '- Nombre invalido. -'),
        apellido: Yup.string()
            .required('- Campo obligatorio -')
            .min(3, '- El apellido debe tener al menos 3 carecteres. -')
            .max(50, '- El apellido debe tener maximo de 50 carecteres. -')
            .matches(regexNameGroup, '- Apellido invalido. -'),
        usuario: Yup.string()
            .required('- Campo obligatorio -')
            .min(3, '- El nombre del grupo debe tener al menos 3 carecteres. -')
            .max(50, '- El nombre del grupo debe tener maximo de 50 carecteres. -')
            .matches(regexNameGroup, '- Usuario invalido. -'),
        status: Yup.string()
            .required('- Campo obligatorio -'),
        grupo: Yup.string()
            .required('- Campo obligatorio -'),
        unid_estatal_tributo: Yup.string()
            .required('- Campo obligatorio -'),
        correo: Yup.string().email("Correo invalido")
            .required('- Campo obligatorio -'),
        fecha_creacion: Yup.string()
    });

    const handleSubmit = async (values, actions) => {

        if(action == "add") {
            await addNewUser(values);
            Swal.fire({
                title: `Operación exitosa`,
                text: `El usuario ${values.nombre + " " + values.apellido} fue creado con exito.`,
                button: "Ok",
                icon: 'success'
            });
        } else {
            await updateUser(values);
        }

        actions.setSubmitting(false);
        actions.resetForm();
        history.push("/panel/usuarios");
       
    }

    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ validationSchema }
            onSubmit={handleSubmit}
        >
            {
                formik => (
                    <BaseFormik props={props} formik={formik} />
                )
            }
        </Formik>
    )
}