import React from "react";
import { getIn } from 'formik';

export default function BaseInput (props) {

    const { field, form: { touched, errors, handleChange }, extraOnChange, ...rest } = props
    field.onChange = e => {
        handleChange(e)
        
        // onChange personalizado
        if (typeof extraOnChange !== 'undefined') {
            props.extraOnChange(e.target.value)
        }
    }

    return (
        <>
            <input 
                type="text" 
                className={
                    `form-control
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
        </>
    )
}