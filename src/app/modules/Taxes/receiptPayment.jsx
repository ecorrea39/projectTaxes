import { Field } from "formik";
import React, { useContext, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import TaxesContext from "../../context/taxes/taxesContext";
import odb from "../../helpers/odb";
import BaseInput from "../Forms/BaseInputs";

export default function ReceiptPayment() {

    const { formDataPayment, bancos, getUserData, userData } = useContext(TaxesContext);

    const selectBanco = (b) => {
        let banco = bancos.find(element => element.id == b );
        let nombreBanco = banco.attributes.nom_banco;
        let trunBanco = nombreBanco.length > 30 ? nombreBanco.slice(0,30) + "..." : nombreBanco;
        return trunBanco;
    }

    const rif = odb.get("rif");

    useEffect(() => {
        getUserData(rif);
    },[]);

    return (
        <>
            <Row>
                <Col xs="12">
                    <h5>Datos del Contribuyente</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        RIF
                    </label>
                    <div className="form-control">
                        <span>
                           {rif}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Nro. Registro
                    </label>
                    <div className="form-control">
                        <span>
                            XXXX
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Razon social
                    </label>
                    <div className="form-control">
                        <span>
                            Test C.A
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Telefono
                    </label>
                    <div className="form-control">
                        <span>
                            04241235467
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6" xxl="6" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Unidad Administracion Tributaria
                    </label>
                    <div className="form-control">
                        <span>
                            XXXXXX XXXX XXXX
                        </span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h5>Datos del Pago</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Banco
                    </label>
                    <div className="form-control">
                        <span>
                            { selectBanco(formDataPayment.banco) }
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Nro. referencia
                    </label>
                    <div className="form-control">
                        <span>
                            {formDataPayment.nroReferencia}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Fecha
                    </label>
                    <div className="form-control">
                        <span>
                            {formDataPayment.fechaPago}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Cuenta
                    </label>
                    <div className="form-control">
                        <span>
                            {formDataPayment.nreferencia}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Tipo de Transaccion
                    </label>
                    <div className="form-control">
                        <span>
                            {formDataPayment.tipoTransaccion}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Monto (Bs)
                    </label>
                    <div className="form-control">
                        <span>
                            {formDataPayment.monto}
                        </span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs="12" className="mt-2 mb-2">
                    <h5>Conceptos de Pagos</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Clave</th>
                                <th>Concepto</th>
                                <th>Referencia</th>
                                <th>Año</th>
                                <th>Trimestre</th>
                                <th>Monto (Bs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )

}