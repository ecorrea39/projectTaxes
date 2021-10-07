import React from "react";
import css from './checkbox.module.css'
import {getIn} from "formik";

export default function Checkbox (props) {
    const { field, form: { touched, errors }, label, handleCheck, formik, ...rest } = props;
    return (
        <label className={css.container}>
            <input 
                type="checkbox"
                className={
                    `form-control
                    ${getIn(touched, field.name) && getIn(errors, field.name) && 'is-invalid'}
                `}
                {...field} 
                {...rest}
            />
            <span className={css.checkmark}></span>
            <span className={css.label}>
                {label}
            </span>
            {getIn(touched, field.name) && getIn(errors, field.name) && (
                <span className="invalid-feedback">
                    {getIn(errors, field.name)}
                </span>
            )}
        </label>
    )
}