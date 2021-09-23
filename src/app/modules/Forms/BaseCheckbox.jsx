import React from "react";
import css from './checkbox.module.css'

export default function Checkbox (props) {
    const { field, form: { touched, errors }, label, handleCheck, formik, ...rest } = props;
    return (
        <label className={css.container}>
            <input 
                type="checkbox"
                {...field} 
                {...rest} 
            />
            <span className={css.checkmark}></span>
            <span className={css.label}>
                {label}
            </span>
        </label>
    )
}