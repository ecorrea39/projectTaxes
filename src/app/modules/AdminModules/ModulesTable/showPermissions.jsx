import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import style from "../panel.module.css";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export const ShowPermissions = (props) => {

    const { permissions } = props;
    
    const TablePermisoList = () => {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Modulos del sistema</th>
                        <th>Leer</th>
                        <th>Escribir</th>
                        <th>Eliminar</th>
                        <th>Ejecutar</th>
                        <th>Exportar</th>
                        <th>Importar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        permissions.map((element,index)=>(
                            <tr key={index}>
                                <td>{element.modulo}</td>
                                {
                                    element.permisos.map((permiso,index)=>(
                                        <td key={index}>
                                        { 
                                            permiso.active ? <CheckBoxIcon color="primary" /> :
                                            <CheckBoxOutlineBlankIcon />
                                        }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )
    }

    return (
        <>
            <Row className="mb-4">
                <Col className="mb-2" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" >
                    <span className={style.titleAddPermisos} >
                        <VpnKeyOutlinedIcon style={{color:"#0091ea"}} /> Permisos para el Grupo 
                    </span>
                </Col>
            </Row>
            
            <Row className="mb-4">
                <Col className="mb-2" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" >
                    <TablePermisoList data={permissions} />
                </Col>
            </Row>

        </>
    )
}