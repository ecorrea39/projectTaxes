import React from "react";
import { getIn } from 'formik';

export default function BaseSelect (props) {
    const { field, form: { touched, errors }, myClass, ...rest } = props;
    
    return (
        <>
            <select 
                type="text" 
                className={
                    `form-control 
                    ${myClass}
                    ${getIn(touched, field.name) && getIn(errors, field.name) && 'is-invalid'}
                `}
                {...field} 
                {...rest} 
            >
                {props.children}
            </select>
            {getIn(touched, field.name) && getIn(errors, field.name) && (
                <span className="invalid-feedback">
                    {getIn(errors, field.name)}
                </span>
            )}
        </>
    )
}