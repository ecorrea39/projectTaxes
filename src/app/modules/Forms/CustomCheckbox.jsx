import css from './customCheckbox.module.css';
import React from "react";
import { getIn } from 'formik';

export default function CustomCheckbox (props) {
    console.log(props)
    return (
        <label className={css.container}>
            <input 
                type="checkbox"
                name={props.name} 
                value={props.element.id}
                checked={props.checked}
                onClick={props.onClick}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            <span className={css.checkmark}></span>
            <span className={css.label}>
                {props.element.name}
            </span>
        </label>
    )
}