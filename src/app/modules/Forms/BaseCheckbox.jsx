import React from "react";
import css from './checkbox.module.css'
import {getIn} from "formik";

export default function Checkbox (props) {
    const { field, form: { touched, errors, handleChange }, label, formik, isChecked, modulo, permiso, extraOnChange, ...rest } = props;
    field.onChange = e => {
        console.log(e)
        handleChange(e)
        // onChange personalizado
        if (typeof extraOnChange !== 'undefined') {
            props.extraOnChange(e,modulo,permiso);
        }
    }
    if(isChecked) {
        console.log(permiso)
        field.checked = true
    }
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