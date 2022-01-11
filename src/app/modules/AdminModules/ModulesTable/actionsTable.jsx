import React from "react";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import BlockIcon from '@material-ui/icons/Block';
import { Tooltip } from "@material-ui/core";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { NavLink } from "react-router-dom";
import PrintIcon from '@material-ui/icons/Print';

export const ActionsTable = ({
    row, actions, baseUrl,
    handleDetails, handlePermissions, handleAlertNotice, handlePrintInfo}) => {

    let statusAction = row.attributes.status ? "Activar" : "Desactivar";
  
    const Action = ({action}) => {
        return (
            <>
                { action == "details" && 
                <Tooltip title="Ver detalles" arrow placement="top">
                    <NavLink className="btn btn-icon btn-hover-light btn-sm"
                            onClick={() => handleDetails(row,"detalles")}
                            to={baseUrl+"detalles"}>
                        <FindInPageOutlinedIcon style={{color:"#ba000d"}} />
                    </NavLink>
                </Tooltip> }

                { action == "update" && 
                <Tooltip title="Modificar" arrow placement="top">
                    <NavLink className="btn btn-icon btn-hover-light btn-sm"
                            onClick={() => handleDetails(row,"modificar")}
                            to={baseUrl+"modificar"}>
                        <ListAltOutlinedIcon style={{color:"#0091ea"}} />
                    </NavLink>
                </Tooltip> }

                { action == "status" && 
                <Tooltip title={statusAction} arrow placement="top">
                    <a onClick={() => handleAlertNotice(statusAction,row) }
                        className="btn btn-icon btn-hover-light btn-sm" >
                        { row.attributes.status == "0" && <CheckBoxOutlinedIcon style={{color:"#64dd17"}} /> }
                        { row.attributes.status == "1" && <CheckBoxOutlineBlankOutlinedIcon style={{color:"#62727b"}} />}
                        { row.attributes.status == "2" && <BlockIcon style={{color:"#b71c1c"}} /> }
                    </a>
                </Tooltip> }

                { action == "permissions" && 
                <Tooltip title="Permisos" arrow placement="top">
                    <a onClick={() => handlePermissions(row)}
                        className="btn btn-icon btn-hover-light btn-sm">
                        <VpnKeyOutlinedIcon style={{color:"#263238"}} />
                    </a>
                </Tooltip> }

                { action == "print" && 
                <Tooltip title="Imprimir información" arrow placement="top">
                    <a onClick={() =>  handlePrintInfo(row.id)}
                        className="btn btn-icon btn-hover-light btn-sm">
                        <PrintIcon style={{color:"#263238"}} />
                    </a>
                </Tooltip> }
            </>
        )
    }

    return (
        <>
        {
            actions.map((action,index)=>(
                <Action key={index} action={ action } />
            ))
        }
            
        </>
    )
}