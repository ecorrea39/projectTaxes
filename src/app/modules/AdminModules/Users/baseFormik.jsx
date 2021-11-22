import React, { useContext, useEffect } from "react";
import { Field, Form } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import BaseInput from "../../Forms/BaseInputs";
import BaseSelect from "../../Forms/BaseSelect";
import UsersContext from "../../../context/users/usersContext";

export const BaseFormik = ({props,formik}) => {

    const { action } = props;
    const { userSlct, groupsList, unidadesEstatales } = useContext(UsersContext);
    
    useEffect(()=>{
        if(action == "update") {
            formik.setValues(userSlct);
        } else {
            formik.resetForm();
        }
    },[action]);

    return (
        <Form className="form form-label-right">
            <Row className="mt-4 mb-4">
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
                        Usuario
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
                        id="status"
                        name="grupo"
                        component={BaseSelect}
                    >
                        <option value="" disabled>. . .</option>
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
                            unidadesEstatales.map(element => (
                                <option
                                    key={element.id}
                                    value={element.cod}
                                >
                                    {element.asignacion}
                                </option>
                            ))
                        }
                    </Field>
                </Col>
            </Row>

            <Row className="mb-2" style={{justifyContent: "center"}}>

                <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                    <Button 
                        type="submit"
                        className="btn btn-sm btn-info font-size-sm w-100">
                            {props.action === 'add' ? 'Guardar' : 'Actualizar'}
                    </Button>
                </Col>

                <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                    <Button
                        className="btn btn-sm btn-danger font-size-sm w-100">Cerrar</Button>
                </Col>

            </Row>
        </Form>
    )
}