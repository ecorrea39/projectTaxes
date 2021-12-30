import React from "react";
import { getIn } from 'formik';
import NumberFormat from 'react-number-format';
import { formatearMontos } from "../../helpers";

export default function BaseInputMonto (props) {

    const { field, form: { touched, errors, handleChange }, extraOnChange, myClass, type, ...rest } = props
    field.onChange = e => {
        handleChange(e)
        // onChange personalizado
        if (typeof extraOnChange !== 'undefined') {
            props.extraOnChange(e.target.value,e.target.name);
        }
    }

    return (
        <>
            <NumberFormat 
                type={type ? type : "text"}
                decimalSeparator={','}
                // prefix={'Bs. D '}
                className={
                    `form-control
                    ${myClass}
                    ${getIn(touched, field.name) && getIn(errors, field.name) && 'is-invalid'}
                `}
                {...field}
                {...rest} 
            />
            {getIn(touched, field.name) && getIn(errors, field.name) && (
                <span className="invalid-feedback">
                    {getIn(errors, field.name)}
                </span>
            )}
            <small id="monto" className="form-text text-muted">
                Debe expresar el monto con decimales separador por coma (,), Ej: 20,10 .
            </small>
        </>
    )
}