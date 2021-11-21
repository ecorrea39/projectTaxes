import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { BaseFormik } from "./baseFormik";
import { regexNameGroup } from "../../../helpers";
import GroupsContext from "../../../context/groups/groupsContext";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateGroup = (props) => {

    let history = useHistory();
    const { action, title } = props;
    const { addNewGroup, updateGroup, formPermisos } = useContext(GroupsContext);

    const handleSubmit = async (values, actions) => {
        
        values.permisos = formPermisos;

        if(action == "add") {
            await addNewGroup(values);
            Swal.fire({
                title: `Operación exitosa`,
                text: `El grupo ${values.name} fue creado con exito.`,
                button: "Ok",
                icon: 'success'
            });
        } else {
            await updateGroup(values);
        }

        actions.setSubmitting(false);
        actions.resetForm();
        history.push("/panel/grupos");
       
    }

    const initialValues = { name: "", permisos: [] };
    const updateValues = { name: "", status: "",  fecha_creacion: ""};

    const validationSchemaInitial = Yup.object().shape({
        name: Yup.string()
            .required('- Campo obligatorio -')
            .min(4, '- El nombre del grupo debe tener al menos 4 carecteres. -')
            .max(50, '- El nombre del grupo debe tener maximo de 35 carecteres. -')
            .matches(regexNameGroup, '- Nombre del grupo invalido. -')
    });
    const validationSchemaUpdate = Yup.object().shape({
        name: Yup.string()
            .required('- Campo obligatorio -')
            .min(4, '- El nombre del grupo debe tener al menos 4 carecteres. -')
            .max(50, '- El nombre del grupo debe tener maximo de 35 carecteres. -')
            .matches(regexNameGroup, '- Nombre del grupo invalido. -'),
        status: Yup.string()
            .required('- Campo obligatorio -'),
        id_status: Yup.string()
            .required('- Campo obligatorio -'),
        fecha_creacion: Yup.string()
            .required('- Campo obligatorio -')
    });

    return (
        <Formik
            initialValues={
                action == "add" ? initialValues : updateValues
            }
            validationSchema={
                action == "add" ? validationSchemaInitial : validationSchemaUpdate
            }
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