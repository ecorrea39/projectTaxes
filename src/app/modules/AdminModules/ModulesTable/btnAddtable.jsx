import React, { useContext, useEffect, useState } from "react";
import panel from "../panel.module.css";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';

export const BtnAddTable = ({link, icon}) => {
    
    return (
        <>
            <NavLink className={`
                    btn btn-icon btn-warning btn-hover-light btn-md
                    rounded-circle ${panel.btnAddItem}`}
                    to={`${link}`}>
                { icon == "add" ? <AddIcon></AddIcon> : <ArrowBackIcon></ArrowBackIcon> }
            </NavLink>
            {/*<a  title="Agregar"
                onClick={handleAdd}
                className={`
                    btn btn-icon btn-warning btn-hover-light btn-md
                    rounded-circle ${panel.btnAddItem}`}>
            <AddIcon></AddIcon>
            </a>*/}
        </>
    )
}