import React, { useContext } from "react";
import {Modal} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from 'yup';
import { BaseFormik } from "./baseFormik";
import { regexNameGroup } from "../../../helpers";
import GroupsContext from "../../../context/groups/groupsContext";

export const ModalActionsGroups = (props) => {

    const { action, title } = props;
    const { addNewGroup, updateGroup, formPermisos } = useContext(GroupsContext);

    const handleSubmit = async (values, actions) => {
       
        if(action == "add") {
            values.permisos = formPermisos;
            console.log(values)
            await addNewGroup(values);
        } else {
            await updateGroup(values);
        }

        actions.setSubmitting(false);
        actions.resetForm();
        props.onHide();
        
    }

    const initialValues = { nombre_grupo: "", permisos: [] };
    const updateValues = { nombre_grupo: "", status: "",  fecha_creacion: ""};

    const validationSchemaInitial = Yup.object().shape({
        nombre_grupo: Yup.string()
            .required('- Campo obligatorio -')
            .min(4, '- El nombre del grupo debe tener al menos 4 carecteres. -')
            .max(50, '- El nombre del grupo debe tener maximo de 35 carecteres. -')
            .matches(regexNameGroup, '- Nombre del grupo invalido. -')
    });
    const validationSchemaUpdate = Yup.object().shape({
        nombre_grupo: Yup.string()
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
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">

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
                        <Modal.Body className="overlay overlay-block cursor-default p-10">

                            <h5 className="align-items-start flex-column pb-3">
                                <span className="card-label font-weight-bolder text-dark mb-4">{title}</span>
                            </h5>

                            <BaseFormik props={props} formik={formik} />

                        </Modal.Body>
                    )
                }
            </Formik>

        </Modal>
    );
}