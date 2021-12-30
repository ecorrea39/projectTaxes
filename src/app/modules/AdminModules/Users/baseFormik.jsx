import React, { useContext, useEffect, useState } from "react";
import { Field, Form } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../../Forms/BaseInputs";
import BaseSelect from "../../Forms/BaseSelect";
import UsersContext from "../../../context/users/usersContext";
import styles from "../panel.module.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export const BaseFormik = ({props,formik,history}) => {

    const { action } = props;
    const { userSlct, groupsList, unidadesEstatales } = useContext(UsersContext);
    const [showPass, setShowPass] = useState(false);

    const generatePasswordRand = (length,type) => {
        var characters;
        switch(type){
            case 'num':
                characters = "0123456789";
                break;
            case 'alf':
                characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                break;
            default:
                characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                break;
        }
        var pass = "";
        for (var i=0; i < length; i++){
            if(type == 'rand'){
                pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
            }else{
                pass += characters.charAt(Math.floor(Math.random()*characters.length));   
            }
        }
        formik.setFieldValue("contrasenia", pass);
    }

    const back = () => {
        formik.resetForm();
        history.push("/panel/usuarios/");
    }

    useEffect(()=>{
        if(action == "update") {
            if(userSlct) {
                let data = {
                    nombre: userSlct.attributes.name,
                    apellido: userSlct.attributes.surname,
                    usuario: userSlct.attributes.uid,
                    status: userSlct.attributes.status,
                    user_id: userSlct.id,
                    correo: userSlct.attributes.mail,
                    grupo:  userSlct.attributes["user_grupos_usuarios.grupo_id"],

                    unid_estatal_tributo: "",
                    cargo: "",
                    departamento: "",
                    contrasenia: "",
                    numero_telefono: "",
                    cod_telefono: "",
                    cargo: "",
                    id_auth: "",
                }
                formik.setValues(data);
            } else {
                history.push("/panel/usuarios/");
            }
        } else {
            formik.resetForm();
        }
    },[action]);

    return (
        <Form className="form form-label-right" autoComplete="false">
            <Row className="mt-4 mb-4">
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="nombre-usuario" className="font-weight-bold">
                        Cédula
                    </label>
                    <Field
                        id="cedula-usuario"
                        name="cedula"
                        placeholder="Ej: V10111223"
                        component={BaseInput}
                        maxLength="9"
                        minLength="6"
                    />
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="nombre-usuario" className="font-weight-bold">
                        Nombre
                    </label>
                    <Field
                        id="nombre-usuario"
                        name="nombre"
                        placeholder="Ej: Pedro"
                        component={BaseInput}
                        maxLength="50"
                        minLength="3"
                    />
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="apellido-usuario" className="font-weight-bold">
                        Apellido
                    </label>
                    <Field
                        id="apellido-usuario"
                        name="apellido"
                        placeholder="Ej: Perez"
                        component={BaseInput}
                        maxLength="50"
                        minLength="3"
                    />
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="apellido-usuario" className="font-weight-bold">
                        Cargo
                    </label>
                    <Field
                        id="cargo-usuario"
                        name="cargo"
                        placeholder="Ej: Administrator"
                        component={BaseInput}
                        maxLength="50"
                        minLength="3"
                    />
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="apellido-usuario" className="font-weight-bold d-block">
                        Teléfono movil
                    </label>
                    <Field
                        type="select"
                        id="cod-tlfn-usuario"
                        name="cod_telefono"
                        component={BaseSelect}
                        myClass={styles.inputCodigoTlf}
                    >
                        <option value="0412">0412</option>
                        <option value="0414">0414</option>
                        <option value="0424">0424</option>
                        <option value="0416">0416</option>
                        <option value="0426">0416</option>
                    </Field>
                    <Field
                        id="telefono-usuario"
                        name="numero_telefono"
                        placeholder="Ej: Administrator"
                        component={BaseInput}
                        maxLength="50"
                        minLength="3"
                        myClass={styles.inputTlf}
                    />
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="correo-usuario" className="font-weight-bold">
                        Correo
                    </label>
                    <Field
                        id="correo-usuario"
                        name="correo"
                        placeholder="Ej: ejemplo@gmail.com"
                        component={BaseInput}
                        maxLength="70"
                    />
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="usuario" className="font-weight-bold">
                        Nombre de usuario
                    </label>
                    <Field
                        id="usuario"
                        name="usuario"
                        placeholder="Ej: pperex"
                        component={BaseInput}
                        maxLength="70"
                    />
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="usuario" className="font-weight-bold">
                        Grupo
                    </label>
                    <Field
                        type="select"
                        id="grupo"
                        name="grupo"
                        component={BaseSelect}
                    >
                        <option value="">. . .</option>
                        {
                            groupsList.map(element => (
                                <option
                                    key={element.id}
                                    value={element.id}
                                >
                                    {element.name}
                                </option>
                            ))
                        }
                    </Field>
                    <small id="emailHelp" className="form-text text-muted">
                        Grupo al cual el usuario pertenecera en el sistema.
                    </small>
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="usuario" className="font-weight-bold">
                        Unidad Estatal de Tributo 
                    </label>
                    <Field
                        type="select"
                        id="status"
                        name="unid_estatal_tributo"
                        component={BaseSelect}
                    >
                        <option value="" disabled>. . .</option>
                        {
                            unidadesEstatales.map( (element,index) => (
                                <option
                                    key={index}
                                    value={element.attributes.cod}
                                >
                                    {element.attributes.asignacion}
                                </option>
                            ))
                        }
                    </Field>
                    
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="usuario" className="font-weight-bold">
                        Contraseña temporal
                    </label>
                    <Field
                        type={showPass ? "text" : "password"}
                        id="contrasenia-usuario"
                        name="contrasenia"
                        placeholder=". . ."
                        component={BaseInput}
                        maxLength="16"
                        minLength="8"
                    />
                    { showPass ? 
                        <VisibilityOffIcon className={styles.iconShowPass} onClick={()=>setShowPass(false)} />  
                        : <VisibilityIcon className={styles.iconShowPass} onClick={()=>setShowPass(true)} />
                    }
                    <small id="passHelp" className={styles.generatePass} onClick={()=>generatePasswordRand(8,"alf")}>
                       Genere una contraseña temporal AQUÍ.
                    </small>
                </Col>
            </Row>

            <Row className="mb-2" style={{justifyContent: "center"}}>

                <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                    <Button 
                        type="submit"
                        onClick={()=>console.log(formik)}
                        className="btn btn-sm btn-info font-size-sm w-100">
                            {props.action === 'add' ? 'Guardar' : 'Actualizar'}
                    </Button>
                </Col>

                <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                    <Button
                        onClick={()=>back()}
                        className="btn btn-sm btn-danger font-size-sm w-100">Cancelar</Button>
                </Col>

            </Row>
        </Form>
    )
}