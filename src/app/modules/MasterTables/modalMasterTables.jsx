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
import { initialValuesTablesCol1, initialValuesTablesCol2, initialValuesTablesCol3, initialValuesTablesCol4, initialValuesTablesCol5, initialValuesTablesCol6 } from "./initialValues";
import { SchemaTablesCol1, SchemaTablesCol2, SchemaTablesCol3, SchemaTablesCol4, SchemaTablesCol5, SchemaTablesCol6  } from "./validateSchemas";
import { BaseFormik } from "./baseFormik";
import { BaseFormikBancosRecaudadores } from "./baseFormikBancosRecaudadores";
import { BaseFormikClaseEmpresas } from "./baseFormikClaseEmpresas";
import { BaseFormikCuentasRecaudadoras } from "./baseFormikCuentasRecaudadoras";
import { BaseFormikActividadEconomica } from "./baseFormikActividadEconomica";
import { BaseFormikConceptos } from "./baseFormikConceptos";

function ModalMasterTables(props) {

    const { bancos, motores, submitMasterTables, setFormDataTables, registroSeleccionado } = useContext(MasterTablesContext);

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

        case "estatus-entidad-trabajo":
            initialValuesTables = initialValuesTablesCol1;
            schemaTables = SchemaTablesCol1;
            break;

        case "clase-empresa":
            initialValuesTables = initialValuesTablesCol4;
            schemaTables = SchemaTablesCol4;
            break;

        case "bancos-recaudadores":
            initialValuesTables = initialValuesTablesCol3;
            schemaTables = SchemaTablesCol3;
            break;

        case "cuentas-recaudadoras":
            initialValuesTables = initialValuesTablesCol2;
            schemaTables = SchemaTablesCol2;
            break;

        case "motores-productivos":
            initialValuesTables = initialValuesTablesCol1;
            schemaTables = SchemaTablesCol1;
            break;

        case "actividad-economica":
            initialValuesTables = initialValuesTablesCol5;
            schemaTables = SchemaTablesCol5;
            break;

        case "conceptos":
            initialValuesTables = initialValuesTablesCol6;
            schemaTables = SchemaTablesCol6;
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
                                <Modal.Body className="overlay overlay-block cursor-default p-10">
                                    <h5 className="align-items-start flex-column pb-3">
                                        <span className="card-label font-weight-bolder text-dark mb-4">{props.accion} {props.titulo}</span>
                                    </h5>

                                    <Form className="form form-label-right">

                                        { props.columnas === 'col-1' &&
                                            <BaseFormik
                                                formik={formik}
                                                props={props}
                                            />
                                        }
                                        {
                                            props.columnas === 'col-2' &&
                                                <BaseFormikCuentasRecaudadoras
                                                    formik={formik}
                                                    props={props}
                                                    bancos={bancos}
                                                />
                                        }
                                        {
                                            props.columnas === 'col-3' &&
                                            <BaseFormikBancosRecaudadores
                                                formik={formik}
                                                props={props}
                                            />
                                        }
                                        {
                                            props.columnas === 'col-4' &&
                                            <BaseFormikClaseEmpresas
                                                formik={formik}
                                                props={props}
                                            />
                                        }
                                        {
                                            props.columnas === 'col-5' &&
                                            <BaseFormikActividadEconomica
                                                formik={formik}
                                                props={props}
                                                motores={motores}
                                            />
                                        }
                                        {
                                            props.columnas === 'col-6' &&
                                            <BaseFormikConceptos
                                                formik={formik}
                                                props={props}
                                            />
                                        }
                                        <Row className="mb-2" style={{justifyContent: "center"}}>
                                            <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                                                <Button onClick={() => props.onHide()}
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