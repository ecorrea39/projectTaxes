import * as Yup from 'yup';
import {Card, Col} from "react-bootstrap";
import {Field} from "formik";
import React from "react";

export const SchemaFusionarEmpresas = Yup.object().shape({
    tipo_fusionar: Yup.string()
        .required('- Campo obligatorio -'),
    rif_fusionar: Yup.string()
        .required('- Campo obligatorio -'),
    tipo_absorbe: Yup.string()
        .required('- Campo obligatorio -'),
    rif_absorbe: Yup.string()
        .required('- Campo obligatorio -')
});
