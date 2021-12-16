import React, { useContext } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import UsersContext from "../../../context/users/usersContext";
import { BaseFormik } from "./baseFormik";
import { initialValues, validationSchema } from "./schemaFormik";

export const CreateUser = (props) => {

    let history = useHistory();
    const { action } = props;
    const { addNewUser, updateUser } = useContext(UsersContext);

    const handleSubmit = async (values, actions) => {
        if(action == "add") {
            values.telefono = values.cod_area+"-"+values.telefono;
            console.log(values)
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
                    <BaseFormik props={props} formik={formik} history={history} />
                )
            }
        </Formik>
    )
}