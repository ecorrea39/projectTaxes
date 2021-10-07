import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { initialValuesPayment } from "./initialValues";
import { SchemaPayment } from "./validateSchemas";
import TaxesContext from "../../context/taxes/taxesContext";
import { BaseFormik } from "./baseFormik";


function FormPayment() {

    const { bancos, submitPayment, setFormDataPayment, conceptos, totalTributoDeclarado } = useContext(TaxesContext);
    const [filterConcepts, setFilterConcepts] = useState([]);

    const handleSubmit = async (values) => {
        console.log("ValuesForm ", values)
        setFormDataPayment(values);
        let response = await submitPayment(values);
    }
    
    useEffect(()=>{
        setFilterConcepts(conceptos.filter(x => x.id > 2)); 
    },[conceptos]);

    return (
        <>
            <Formik
                initialValues={initialValuesPayment}
                validationSchema={SchemaPayment}
                onSubmit={handleSubmit}
            >
                {
                    formik => (
                        <Form>
                            <BaseFormik
                                formik={formik}
                                conceptos={filterConcepts} />
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default FormPayment;