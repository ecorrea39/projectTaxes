import React, {useContext, useState, useEffect} from "react";
import ReactDOM from "react-dom"
import {Button, Col, Modal, Row, Table} from "react-bootstrap";
import {FieldArray, Field, Form, Formik} from "formik";
import MasterTablesContext from "../../context/masterTables/masterTablesContext";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import BaseInput from "../Forms/BaseInputs";
import BaseSelect from "../Forms/BaseSelect";
import Checkbox from "../Forms/BaseCheckbox";
import ModalHeader from "react-bootstrap/ModalHeader";
import {initialValuesTablesCol1, initialValuesTablesCol2} from "./initialValues";
import {SchemaTablesCol1, SchemaTablesCol2} from "./validateSchemas";

function ModalMasterTables(props) {

    console.log('props ', props)

    const {bancos, submitMasterTables, setFormDataTables} = useContext(MasterTablesContext);

    let initialValuesTables = "";
    let schemaTables = ""

    switch (props.tabla) {
        case "trimestre":
            initialValuesTables = initialValuesTablesCol1;
            schemaTables = SchemaTablesCol1;
            break;
        case "forma-pago":
            initialValuesTables = initialValuesTablesCol1;
            schemaTables = SchemaTablesCol1;
            break;
        case "cuentas-recaudadoras":
            initialValuesTables = initialValuesTablesCol2;
            schemaTables = SchemaTablesCol2;
            break;
        default:
            break;
    }

    const handleSubmit = async (values, actions) => {
        setFormDataTables(values);
        let response = await submitMasterTables(values, props);
        actions.resetForm(initialValuesTables);
    };

    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>

                <Formik
                    initialValues={initialValuesTables}
                    validationSchema={schemaTables}
                    onSubmit = { (values, actions) => { handleSubmit(values, actions)  }}
                >
                    {
                        formik => (
                            <>
                                <Modal.Body className="overlay overlay-block cursor-default">
                                    <h5 className="align-items-start flex-column pb-3">
                                        <span className="card-label font-weight-bolder text-dark mb-4">{props.accion} {props.titulo}</span>
                                    </h5>

                                    <Form className="form form-label-right">

                                        {
                                            props.columnas === 'col-1' &&
                                            <>
                                                <Row className="mt-4 mb-4">
                                                    <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                        <label htmlFor="name" className="font-weight-bold">Descripción</label>
                                                        <Field
                                                            id="name"
                                                            name="name"
                                                            component={BaseInput}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                        {
                                            props.columnas === 'col-2' &&
                                            <>
                                                <Row className="mt-4 mb-8">
                                                    <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                        <label htmlFor="id_banco" className="font-weight-bold">Banco</label>
                                                        <Field
                                                            id="id_banco"
                                                            name="id_banco"
                                                            type="select"
                                                            component={BaseSelect}>

                                                            <option value="" disabled>seleccione</option>
                                                            {
                                                                bancos.map((s) => {
                                                                    return <option key={s.id} value={s.id}>{s.attributes.nom_banco}</option>
                                                                })
                                                            }
                                                        </Field>
                                                    </Col>
                                                </Row>
                                            </>

                                        }
                                        {
                                            props.columnas === 'col-2' &&
                                            <>
                                                <Row className="mt-4 mb-8">
                                                    <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                        <label htmlFor="cuenta_tipo" className="font-weight-bold">Tipo de cuenta</label>
                                                        <Field
                                                            id="cuenta_tipo"
                                                            name="cuenta_tipo"
                                                            type="select"
                                                            component={BaseSelect}>
                                                            <option value="" disabled>seleccione</option>
                                                            <option value="ahorro">Ahorro</option>
                                                            <option value="corriente">Corriente</option>
                                                        </Field>
                                                    </Col>
                                                </Row>
                                            </>

                                        }
                                        {
                                            props.columnas === 'col-2' &&
                                            <>
                                                <Row className="mt-4 mb-4">
                                                    <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                        <label htmlFor="cuenta_nro" className="font-weight-bold">Número de cuenta</label>
                                                        <Field
                                                            id="cuenta_nro"
                                                            name="cuenta_nro"
                                                            component={BaseInput}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>

                                        }

                                        <Row className="mt-4 mb-8">
                                            <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                <label htmlFor="is_active" className="font-weight-bold">Estatus</label>
                                                <Field
                                                    id="is_active"
                                                    name="is_active"
                                                    type="select"
                                                    component={BaseSelect}
                                                    disabled={props.accion === 'Agregar' ? true : false}>
                                                    <option value="" disabled>seleccione</option>
                                                    <option value="true">Activo</option>
                                                    <option value="false">No activo</option>
                                                </Field>
                                            </Col>
                                        </Row>

                                        <Row className="mb-4" style={{justifyContent: "center"}}>
                                            <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                                                <Button type="submit"
                                                        onClick={() => props.onHide()}
                                                        className="btn btn-sm btn-danger font-size-sm w-100">Cerrar</Button>
                                            </Col>

                                            <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                                                <Button type="submit"
                                                        onClick={() => console.log(formik.errors, formik.values)}
                                                        className="btn btn-sm btn-info font-size-sm w-100">{props.accion === 'Agregar' ? 'Guardar' : 'Actualizar'}</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                            </>
                        )
                    }
                </Formik>
            </Modal>
        </>
    );
}

export default ModalMasterTables;