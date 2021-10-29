import { Field } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import TaxesContext from "../../context/taxes/taxesContext";
import odb from "../../helpers/odb";
import BaseInput from "../Forms/BaseInputs";

export default function ReceiptPayment() {

    const { formDataPayment, bancos, getUserData, userData, conceptos, modalidadesPagos, formDataDeclaration, linkRecibo } = useContext(TaxesContext);

    const [dataBanco, setDataBanco] = useState({nomBanco: "",numCuenta:""});
    const [listConceptos, setListConceptos] = useState([]);

    const createListConcepts = () => {

        let conceptos = [];

        if(formDataDeclaration.declaraciones) {
            let taxes = formDataDeclaration.declaraciones;
            taxes.map((element) =>{
                let slcConcept =  selectConcepto(element.concepto_pago);
                let jsonData = {
                    clave: slcConcept.clave,
                    concepto: slcConcept.name,
                    anio: element.ano_declaracion,
                    trimestre: element.trimestre,
                    referencia: formDataPayment.nro_referencia,
                    monto: element.monto_tributo
                }
                conceptos.push(jsonData)
            });
        }

        formDataPayment.detallesConceptos.map((element) => {
            let slcConcept =  selectConcepto(element.idConcepto);
            let jsonData = {
                clave: slcConcept.clave,
                concepto: slcConcept.name,
                anio: "N/A",
                trimestre: "N/A",
                referencia: formDataPayment.nro_referencia,
                monto: element.detalle.monto
            }
            conceptos.push(jsonData)                                 
        })
        setListConceptos(conceptos);  
    }

    const selectBanco = (b) => {
        let banco = bancos.find(element => element.id == b );
        let nombreBanco = banco.attributes["id_banco_banco.nom_banco"];
        let trunBanco = nombreBanco.length > 30 ? nombreBanco.slice(0,30) + "..." : nombreBanco;
        let numCuenta = banco.attributes.cuenta_nro;
        setDataBanco({nomBanco: trunBanco,numCuenta:numCuenta});
    }

    const selectConcepto = (c) => {
        let concepto = conceptos.find(element => element.id == c );
        let nombreConcepto = concepto.name;
        let trunConcepto = nombreConcepto.length > 30 ? nombreConcepto.slice(0,30) + "..." : nombreConcepto;
        return {name:trunConcepto, clave: concepto.clave};
    }

    const selectTipoTransaccion = (tt) => {
        let tipoTransaccion = modalidadesPagos.find(element => element.id == tt);
        return tipoTransaccion.attributes.name;
    }

    const handlePrint = () => {

        window.open(linkRecibo);

    }

    const rif = odb.get("rif");
    const razonSocial = odb.get("name");
    const phone = odb.get("phone_number_mobile");

    useEffect(() => {
        createListConcepts();
        getUserData(rif);
        selectBanco(formDataPayment.banco)
    },[]);

    return (
        <>
            <Row>
                <Col xs="12">
                    <h5>Datos del Contribuyente</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        RIF
                    </label>
                    <div className="form-control">
                        <span>
                           {rif}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Nro. Registro
                    </label>
                    <div className="form-control">
                        <span>
                            XXXX
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Unidad Estadal de Tributos
                    </label>
                    <div className="form-control">
                        <span>
                            XXXXXX XXXX XXXX
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="8" md="8" lg="8" xl="8" xxl="8" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Razon social
                    </label>
                    <div className="form-control">
                        <span>
                            {razonSocial}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Telefono
                    </label>
                    <div className="form-control">
                        <span>
                            {phone}
                        </span>
                    </div>
                </Col>
            </Row>

            <Row className="mt-6">
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
                            { dataBanco.nomBanco }
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Nro. referencia
                    </label>
                    <div className="form-control">
                        <span>
                            {formDataPayment.nro_referencia}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Fecha
                    </label>
                    <div className="form-control">
                        <span>
                            {formDataPayment.fecha}
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Cuenta
                    </label>
                    <div className="form-control">
                        <span>
                            { dataBanco.numCuenta }
                        </span>
                    </div>
                </Col>
                <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mt-2 mb-4">
                    <label className="font-weight-bold">
                        Tipo de Transaccion
                    </label>
                    <div className="form-control">
                        <span>
                            { selectTipoTransaccion(formDataPayment.tipo_transaccion) }
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
            
            <Row className="mt-6">
                <Col xs="12" className="mt-2 mb-2">
                    <h5>Conceptos de Pagos</h5>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Clave</th>
                                <th>Concepto</th>
                                <th>Referencia</th>
                                <th>Año</th>
                                <th>Trimestre</th>
                                <th>Monto (Bs)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            listConceptos.map((element,index) => (
                                <tr key={index}>
                                    <td>{element.clave}</td>
                                    <td>{element.concepto}</td>
                                    <td>{element.referencia}</td>
                                    <td>{element.anio}</td>
                                    <td>{element.trimestre}</td>
                                    <td>{element.monto}</td>
                                </tr>                                    
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div id="emailHelp" className="form-text">Nota: No es necesario imprimir este recibo de pago</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        className="w-100"
                        onClick={()=>handlePrint()}
                    >Imprimir Recibo</Button>
                </Col>
            </Row>
        </>
    )

}