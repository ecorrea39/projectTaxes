import React from "react";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import BlockIcon from '@material-ui/icons/Block';
import { Tooltip } from "@material-ui/core";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { NavLink } from "react-router-dom";
import PrintIcon from '@material-ui/icons/Print';

export const ActionsTable = ({module, row, actionsRow,alertNotice,permissions,urlUpdate,printInfo}) => {

    let statusAction = "";
    // mientras que samuel termina los endpoins de usuarios
    if(module) {
        statusAction = row.status == "0" ? "Activar" : row.status == "1" ? "Desactivar" : "Deshabilitado";
    } else {
        statusAction = row.attributes.status == "0" ? "Activar" : row.attributes.status == "1" ? "Desactivar" : "Deshabilitado";
    }
   

    return (
        <>
            <Tooltip title="Modificar" arrow placement="top">
                <NavLink className="btn btn-icon btn-hover-light btn-sm mx-3"
                        onClick={() => actionsRow(row)}
                        to={urlUpdate}>
                    <ListAltOutlinedIcon style={{color:"#0091ea"}} />
                </NavLink>
            </Tooltip>
            
            { module == "user" ?
                <Tooltip title={statusAction} arrow placement="top">
                    <a onClick={() => alertNotice(statusAction,row) }
                        className="btn btn-icon btn-hover-light btn-sm" >
                        { row.status == "0" && <CheckBoxOutlineBlankOutlinedIcon style={{color:"#62727b"}} /> }
                        { row.status == "1" && <CheckBoxOutlinedIcon style={{color:"#64dd17"}} /> }
                        { row.status == "2" && <BlockIcon style={{color:"#b71c1c"}} /> }
                    </a>
                </Tooltip>
                :
                <Tooltip title={statusAction} arrow placement="top">
                    <a onClick={() => alertNotice(statusAction,row) }
                        className="btn btn-icon btn-hover-light btn-sm" >
                        { row.attributes.status == "0" && <CheckBoxOutlineBlankOutlinedIcon style={{color:"#62727b"}} /> }
                        { row.attributes.status == "1" && <CheckBoxOutlinedIcon style={{color:"#64dd17"}} /> }
                        { row.attributes.status == "2" && <BlockIcon style={{color:"#b71c1c"}} /> }
                    </a>
                </Tooltip>
            }

            {
                permissions && 
                <Tooltip title="Permisos" arrow placement="top">
                    <a onClick={() => permissions(row)}
                        className="btn btn-icon btn-hover-light btn-sm mx-3">
                        <VpnKeyOutlinedIcon style={{color:"#263238"}} />
                    </a>
                </Tooltip>
            }
            
            {
                printInfo && 
                <Tooltip title="Imprimir información" arrow placement="top">
                    <a onClick={() => printInfo(row.id)}
                        className="btn btn-icon btn-hover-light btn-sm mx-3">
                        <PrintIcon style={{color:"#263238"}} />
                    </a>
                </Tooltip>
            }
            
        </>
    )
}