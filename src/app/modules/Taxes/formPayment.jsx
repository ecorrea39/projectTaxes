import React, { useContext } from "react";
import { Form, Formik } from "formik";
import { initialValuesPayment } from "./initialValues";
import { SchemaPayment } from "./validateSchemas";
import TaxesContext from "../../context/taxes/taxesContext";
import { BaseFormik } from "./baseFormik";
import { formatearMontosII } from "../../helpers";

function FormPayment() {

    const { submitPayment, formSummary, setFormDataPayment } = useContext(TaxesContext);

    const handleSubmit = async (values) => {
        let monto = parseFloat( formatearMontosII(values.monto) )
        let formData = Object.assign(values,formSummary);
        formData.monto = monto;
        setFormDataPayment(formData);
        console.log(formData)
        await submitPayment(formData);
    }

    return (
        <>
            <Formik
                initialValues={initialValuesPayment}
                validationSchema={SchemaPayment}
                onSubmit={handleSubmit}
                formnovalidate
            >
                {
                    formik => (
                        <Form>
                            <BaseFormik formik={formik} />
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default FormPayment;