import React from "react";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import BlockIcon from '@material-ui/icons/Block';
import { Tooltip } from "@material-ui/core";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { NavLink } from "react-router-dom";

export const ActionsRowGroups = ({row, actionsRow,alertNotice,permissions}) => {

    const statusAction = row.status == "0" ? "Desactivar" : row.status == "1" ? "Activar" : "Deshabilitado";

    return (
        <>
            <Tooltip title="Modificar" arrow placement="top">
                <NavLink className="btn btn-icon btn-hover-light btn-sm mx-3"
                        onClick={() => actionsRow(row)}
                        to="grupos/modificar">
                    <ListAltOutlinedIcon style={{color:"#0091ea"}} />
                </NavLink>
            </Tooltip>
            
            <Tooltip title={statusAction} arrow placement="top">
                <a onClick={() => alertNotice(statusAction,row) }
                    className="btn btn-icon btn-hover-light btn-sm" >
                    { row.status == "0" && <CheckBoxOutlineBlankOutlinedIcon style={{color:"#62727b"}} /> }
                    { row.status == "1" && <CheckBoxOutlinedIcon style={{color:"#64dd17"}} /> }
                    { row.status == "2" && <BlockIcon style={{color:"#b71c1c"}} /> }
                </a>
            </Tooltip>

            <Tooltip title="Permisos" arrow placement="top">
                <a onClick={() => permissions(row)}
                    className="btn btn-icon btn-hover-light btn-sm mx-3">
                    <VpnKeyOutlinedIcon style={{color:"#263238"}} />
                </a>
            </Tooltip>
        </>
    )
}