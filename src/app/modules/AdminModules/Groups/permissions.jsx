import React from "react";
import { Card, Col, Row, Accordion, Button } from "react-bootstrap";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { Field } from "formik";
import style from "../panel.module.css";
import css from '../../Forms/checkbox.module.css';
import Checkbox from "../../Forms/BaseCheckbox";

export const Permissions = (props) => {

    const {permissions,formik,formPermisos,setFormPermisos} = props;

    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    const handleChange = (e, IDmodulo, permiso) => {

        let isChecked = e.target.checked;
        let namePermission = permiso.name;
        /** Es una copia del state donde se guardan los permisos  */
        let selected = [...formPermisos];
        // Obtengo la posicion en el array del objeto segun el modulo que se estan asignando los permisos
        let findModulo = selected.findIndex(item => item.modulo_id === IDmodulo);
        // Obtengo el objeto segun el modulo que activa el evento
        let UPpermisos = selected.find( m => m.modulo_id === IDmodulo );
        // Cambio el valor del permiso
        UPpermisos[namePermission] = isChecked;
        // Elimino el objeto completo
        selected.splice(findModulo,1);
        // Asigno el nuevo objeto modificado
        selected.push(UPpermisos);
        // Actualizo el state
        setFormPermisos(selected);
    }

    const ListPermissions = ({element}) => {
        
        return (
            <>
                <Row className="mb-4">
                    <Col className="mb-2" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" >
                        <span className={style.titleModule}>{element.modulo}</span>
                    </Col>
                    {
                    element.permisos.map((permiso,pindex)=>(
                        <Col key={pindex} className="mb-2" xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" >
                            <Field
                                id={permiso.name}
                                name={ `${element.modulo}` }
                                type="checkbox" 
                                component={Checkbox}
                                label={capitalize(permiso.name)}
                                value={`${permiso.name}`}
                                formik={formik}
                                // modulo={element.modulo}
                                modulo={element.modulo_id}
                                permiso={permiso}
                                extraOnChange={handleChange}
                            />
                        </Col>
                    ))
                    }
                </Row>
                <hr />
            </>
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

            {
                permissions.map((element,index)=>(
                    <ListPermissions key={index} element={element} />
                ))
            }


            {/*
            <Row className="mt-4 mb-4">
                <Col xs="12">
                    <Accordion defaultActiveKey="0">
                    {
                        permissions.map((element,index)=>(
                            
                        <Row key={index}>
                            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                <Card key={element.id_modulo}>
                                    <Card.Header className="pl-3 pr-3">
                                        <label className={css.container} style={{marginTop: "9px"}}>
                                            <input 
                                                type="checkbox"
                                                className={`form-control`}
                                                onChange={(e)=> console.log(e)}
                                            />
                                            <span className={css.checkmark}></span>
                                            <span className={css.label , style.titleModule}>
                                                {element.modulo}
                                            </span>
                                        </label>
                                        <Accordion.Toggle className="p-0" as={Button} variant="link" eventKey={element.id_modulo} className="float-right">
                                            Ver Permisos
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={element.id_modulo}>
                                        <Card.Body>
                                            <Row>
                                            {
                                            element.permisos.map((permiso,pindex)=>(
                                                <Col key={pindex} className="mb-2" xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" >
                                                    <Field
                                                        id={permiso.name}
                                                        name={ `${element.modulo}` }
                                                        type="checkbox" 
                                                        component={Checkbox}
                                                        label={permiso.name}
                                                        value={`${permiso.name}`}
                                                        formik={formik}
                                                        // modulo={element.modulo}
                                                        modulo={element.id_modulo}
                                                        permiso={permiso}
                                                        extraOnChange={handleChange}
                                                    />
                                                </Col>
                                            ))
                                            }
                                            </Row>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Col>
                            
                        </Row>
                        ))
                    }
                    </Accordion>
                </Col>
            </Row>
                */}
        </>
    )
}