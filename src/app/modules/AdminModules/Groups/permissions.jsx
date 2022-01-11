import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import style from "../panel.module.css";
import Checkbox from '@material-ui/core/Checkbox';

export const Permissions = (props) => {

    const {permissions,formPermisos,setFormPermisos,dataGrupo,action} = props;
    
    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    const handleChange = (e, modulo, permiso) => {
        let isChecked = e.target.checked;
        let namePermission = permiso;
        let IDmodulo = modulo.modulo_id;
        /** Es una copia del state donde se guardan los permisos  */
        let selected = [...formPermisos];
        // Obtengo la posicion en el array del objeto segun el modulo que se estan asignando los permisos
        let findModulo = selected.findIndex(item => item.modulo_id == IDmodulo);
        // Obtengo el objeto segun el modulo que activa el evento
        let UPpermisos = selected.find( m => m.modulo_id == IDmodulo );
        console.log(UPpermisos)
        // Cambio el valor del permiso
        UPpermisos[namePermission] = isChecked;
        // Elimino el objeto completo
        // selected.splice(findModulo,1);
        // Asigno el nuevo objeto modificado
        // selected.push(UPpermisos);
        // Actualizo el state
        setFormPermisos(selected);
    }

    const handleChangeUP = (e, modulo, permiso) => {
        console.log(e, modulo, permiso)
        let isChecked = e.target.checked;
        let namePermission = permiso;
        let IDmodulo = modulo.modulo_id;
        /** Es una copia del state donde se guardan los permisos  */
        let selected = {...dataGrupo};
        // Obtengo la posicion en el array del objeto segun el modulo que se estan asignando los permisos
        // let findModulo = selected.findIndex(item => item.modulo_id == IDmodulo);
        // Obtengo el objeto segun el modulo que activa el evento
        let listPermisos = selected.attributes.permisos;

        let UPpermisos = listPermisos.find( m => m.modulo_id == IDmodulo );
        console.log(UPpermisos)
        // Cambio el valor del permiso
        UPpermisos[namePermission] = !modulo[namePermission];
        // Elimino el objeto completo
        // selected.splice(findModulo,1);
        // Asigno el nuevo objeto modificado
        // selected.push(UPpermisos);
        // Actualizo el state
        setFormPermisos(selected);
        
    }

    const isChecked = (data, permiso) => {
        return data[permiso]
    }

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
                                <td>
                                    <Checkbox
                                        checked={isChecked(element,"leer")}
                                        name={element.modulo}
                                        value={"leer"}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        onChange={(e)=>{
                                            action == "update" ?
                                                handleChangeUP(e,element,"leer") :
                                                handleChange(e,element,"leer") 
                                        }}
                                    />
                                </td>
                                <td>
                                    <Checkbox
                                        name={element.modulo}
                                        value={"escribir"}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        checked={isChecked(element,"escribir")}
                                        onChange={(e)=>{
                                            action == "update" ?
                                                handleChangeUP(e,element,"escribir") :
                                                handleChange(e,element,"escribir") 
                                        }}
                                    />
                                </td>
                                <td>
                                    <Checkbox
                                        name={element.modulo}
                                        value={"eliminar"}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        checked={isChecked(element,"eliminar")}
                                        onChange={(e)=>{
                                            action == "update" ?
                                                handleChangeUP(e,element,"eliminar") :
                                                handleChange(e,element,"eliminar") 
                                        }}
                                    />
                                </td>
                                <td>
                                    <Checkbox
                                        name={element.modulo}
                                        value={"ejecutar"}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        checked={isChecked(element,"ejecutar")}
                                        onChange={(e)=>{
                                            action == "update" ?
                                                handleChangeUP(e,element,"ejecutar") :
                                                handleChange(e,element,"ejecutar") 
                                        }}
                                    />
                                </td>
                                <td>
                                    <Checkbox
                                        name={element.modulo}
                                        value={"exportar"}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        checked={isChecked(element,"exportar")}
                                        onChange={(e)=>{
                                            action == "update" ?
                                                handleChangeUP(e,element,"exportar") :
                                                handleChange(e,element,"exportar") 
                                        }}
                                    />
                                </td>
                                <td>
                                    <Checkbox
                                        name={element.modulo}
                                        value={"importar"}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        checked={isChecked(element,"importar")}
                                        onChange={(e)=>{
                                            action == "update" ?
                                                handleChangeUP(e,element,"importar") :
                                                handleChange(e,element,"importar") 
                                        }}
                                    />
                                </td>                                
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
                        <VpnKeyOutlinedIcon style={{color:"#0091ea"}} /> Asignar permisos al Grupo
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