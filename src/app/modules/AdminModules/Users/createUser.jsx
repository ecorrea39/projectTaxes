import React, { useContext } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import UsersContext from "../../../context/users/usersContext";
import { BaseFormik } from "./baseFormik";
import { initialValues, validationSchema, validationSchemaUP } from "./schemaFormik";

export const CreateUser = (props) => {

    let history = useHistory();
    const { action } = props;
    const { addNewUser, updateUser, userSlct } = useContext(UsersContext);

    const handleSubmit = async (values, actions) => {
        console.log(values)
        if(action == "add") {
           
            await addNewUser(values);
            Swal.fire({
                title: `Operación exitosa`,
                text: `El usuario ${values.nombre + " " + values.apellido} fue registrado con exito.`,
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
            validationSchema={ action == "add" ? validationSchema : validationSchemaUP }
            onSubmit={handleSubmit}
        >
            {
                formik => (
                    <BaseFormik
                        props={props}
                        formik={formik}
                        history={history} />
                )
            }
        </Formik>
    )
}