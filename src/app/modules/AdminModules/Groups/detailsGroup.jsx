import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import GroupsContext from "../../../context/groups/groupsContext";
import { ShowPermissions } from "../ModulesTable/showPermissions";
import styles from "../panel.module.css";

export const DetailsGroup = ({grupoId}) => {

    const { getGrupoInfo, groupSlct, statusList } = useContext(GroupsContext);

    const selectStatus = (id) => {
        let status = statusList.find(element => element.status == id );
        return status.name;
    }

    const Content = () => {

        return (
        <>
            <Row className="mb-4">
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Nombre del grupo
                    </label> 
                    <span className={styles.spanDetail}>
                       {groupSlct.attributes.name}
                    </span>
                </Col>
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Fecha de creación:
                    </label> 
                    <span className={styles.spanDetail}>
                        {groupSlct.attributes.fecha}
                    </span>
                </Col>
                <Col xs="12" sm="12" md="2" lg="3" xl="3" xxl="3">
                    <label className={styles.labelDetail}>
                        Estatus del grupo:
                    </label> 
                    <span className={styles.spanDetail}>
                        { selectStatus(groupSlct.attributes.status) }
                    </span>
                </Col>
            </Row>
            
            <Row className="mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <ShowPermissions permissions={groupSlct.attributes.permisos} />
                </Col>
            </Row>
        </>
        )
    }

    useEffect(()=>{
        console.log(grupoId)
        if(grupoId) {
            getGrupoInfo(grupoId);
        }
    },[])

    return (
        <>{groupSlct != "" &&  <Content />}</>      
    )
}