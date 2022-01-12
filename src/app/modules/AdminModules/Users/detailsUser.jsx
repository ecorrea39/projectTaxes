import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UsersContext from "../../../context/users/usersContext";
import { Button, Col, Row } from "react-bootstrap";
import styles from "../panel.module.css";
import { ShowPermissions } from "../ModulesTable/showPermissions";

export const DetailsUser = () => {

    const { userSlct, selectGroup, selectUST } = useContext(UsersContext);

    const Content = () => {

        return (
        <>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        C.I:
                    </label> 
                    <span className={styles.spanDetail}>
                        
                    </span>
                </Col>
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Nombre y Apellido:
                    </label> 
                    <span className={styles.spanDetail}>
                        { userSlct.attributes.name + " " + userSlct.attributes.surname }
                    </span>
                </Col>
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Num. Teléfono:
                    </label> 
                    <span className={styles.spanDetail}>
                        { userSlct.attributes.codigo_telefono + "-" + userSlct.attributes.numero_telefono }
                    </span>
                </Col>
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Correo:
                    </label> 
                    <span className={styles.spanDetail}>
                        { userSlct.attributes.mail }
                    </span>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Cargo:
                    </label> 
                    <span className={styles.spanDetail}>
                        { userSlct.attributes.cargo }
                    </span>
                </Col>
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Nombre de usuario:
                    </label> 
                    <span className={styles.spanDetail}>
                       { userSlct.attributes.uid }
                    </span>
                </Col>
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Grupo asignado:
                    </label> 
                    <span className={styles.spanDetail}>
                        { selectGroup( userSlct.attributes.permisos[0].grupo_id ) }
                    </span>
                </Col>
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Unidad estatal de tributos:
                    </label> 
                    <span className={styles.spanDetail}>
                        { selectUST(userSlct.attributes.id_auth) }
                    </span>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                       Fecha de registro:
                    </label> 
                    <span className={styles.spanDetail}>
                        { userSlct.attributes.fecha_de_registro }
                    </span>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <ShowPermissions permissions={userSlct.attributes.permisos} />
                </Col>
            </Row>
        </>
        )
    }

    return (
        <>{userSlct != "" &&  <Content />}</>       
    )
}