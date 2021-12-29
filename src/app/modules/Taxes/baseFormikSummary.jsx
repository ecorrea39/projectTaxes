import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ShowConcept from "./showConcepts";
import { InputsTaxes } from "./inputsTaxes";
import TaxesContext from "../../context/taxes/taxesContext";
import { ListConcepts } from "./listConcepts";
import { formatearMontos, formatearMontosII, GenerarCodBanesco } from "../../helpers";
import { CreditoFiscal } from "./inputsTypeConcept";
import { ListTaxes } from "./listTaxes";
import Swal from "sweetalert2";

export const BaseFormikSummary = ({conceptos,formik,listDeclaraciones, setTotales, totales, asignarMontos,calcularMontoConceptos}) => {

    const { totalTributoDeclarado, setCreditoFiscal, creditoFiscal,
        declaracionesRealizadas } = useContext(TaxesContext);
    
    const calcularCreditoFiscal = async (typeAction) => {

        let montoAPagar = formatearMontosII(formik.values.montoPagar);
        let calcularTotales = await calcularMontoConceptos(formik.values);

        let motoMayor;
        let montoMenor;
        
        if( montoAPagar >= calcularTotales.montoPagar ) {
            motoMayor = montoAPagar;
            montoMenor = calcularTotales.montoPagar;
        } else {
            motoMayor = calcularTotales.montoPagar;
            montoMenor = montoAPagar;
        }

        let resta =  motoMayor - montoMenor - calcularTotales.conceptos;
        if ( parseFloat(resta).toFixed(2) > 0 )  {
            Swal.fire({
                icon: 'question',
                title: 'Credito Fiscal',
                text: `Usted tiene una diferencia a favor de Bs. ${formatearMontos(resta)}. ¿Desea aceptar este credito ?`,
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText: 'Aceptar credito fiscal',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    // ESTO SE DEBE CAMBIAR 
                    setCreditoFiscal({
                        montoCredito: resta
                    });
                    formik.setFieldValue("montoCredito", formatearMontos(resta));
                    formik.setFieldValue("montoPagar",formatearMontos( montoAPagar ) );
                    handleSubmit(typeAction);
                } else {
                    formik.setFieldValue("montoCredito", "0,00");
                    formik.setFieldValue("montoPagar", montoAPagar);
                }
            });
        } else {
            // ESTO SE DEBE CAMBIAR 
            setCreditoFiscal({montoCredito: 0.00});
            formik.setFieldValue("montoCredito", "0,00");
            handleSubmit(typeAction);
        }
    }
    // verifica si esta en uso
    const calcularMontosTotates = (tributos) => {

        let newTotales = {
            intereses: 0,
            multa: 0,
            tributos: 0,
            montoPagar: 0,
            conceptos: totales.conceptos,
            totalPagar: 0
        };

        listDeclaraciones.declaraciones.map( (dec,index) => {

            let idTributo = dec.idTributo;
            
            if( tributos.indexOf(idTributo) > -1 ) {
                newTotales.tributos += parseFloat( dec.totalTributo );
                newTotales.intereses += parseFloat( dec.intereses );
            }

        });

        newTotales.montoPagar = newTotales.tributos + newTotales.intereses;
        newTotales.totalPagar = newTotales.tributos + newTotales.intereses;
        setTotales(newTotales);
    }

    const handleCredito = (value,input) => {    
        setCreditoFiscal({
            ...creditoFiscal,
            [input] : parseInt(value)
        })
    }

    const handleSubmit = (type) => {
        
        if(type == 1) {
            let codigo = GenerarCodBanesco();
            console.log("codigo unico ", codigo)
            console.log("crear boton banesco");
        }
        if(type == 2) {
            formik.submitForm();
        }
    }

    useEffect(()=>{
        let montoAPagar = formik.values.montoPagar;
        if(montoAPagar == ""){
            formik.setFieldValue("montoPagar", "0,00");
        }
    },[formik.values.montoPagar]);

    useEffect(()=>{
        formik.setFieldValue("montoIntereses", totales.intereses);
        formik.setFieldValue("montoTributo", totales.tributos);
        formik.setFieldValue("montoPagar", totales.totalPagar);
    },[totales]);

    useEffect(()=>{
        let tributos = formik.values.tributos;
        if(tributos.length > 0 && listDeclaraciones.declaraciones) {
            calcularMontosTotates(tributos);
        }
    },[formik.values.tributos]);

    useEffect(()=>{
        if(listDeclaraciones.declaraciones) {
            asignarMontos();
        } else {
            setTotales({
                intereses: 0,
                multa: 0,
                tributos: 0,
                montoPagar: 0,
                conceptos: 0,
                totalPagar: 0
            });
        }
    },[listDeclaraciones]);

    useEffect(()=>{
        if(declaracionesRealizadas) {
            let array = [];
            declaracionesRealizadas.map(dec=>{
                array.push(dec.attributes.data.id)
            });
            formik.setFieldValue("tributos", array);
        }
        if (totalTributoDeclarado != null) {
            formik.setFieldValue("montoTributo", totalTributoDeclarado );
        }
    },[]);

    return (
        <>
            {
                listDeclaraciones.declaraciones &&
                <ListTaxes
                    listDeclaraciones={listDeclaraciones.declaraciones}
                    formik={formik}
                    calcularMontosTotates={calcularMontosTotates} />
            }
            
            {
                <ListConcepts
                    formik={formik}
                    conceptos={conceptos} />
            }
            
            <Row>
                <ShowConcept
                    calcularMonto={calcularMontoConceptos}
                    formik={formik}
                />
            </Row>

            <CreditoFiscal extraOnChange={handleCredito} />

            <InputsTaxes />

            <Row className="mt-4 mb-4">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <h4>Métodos de Pago</h4>
                </Col>
            </Row>

            <Row>
                <Col className="mt-2 mb-2" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <Button variant="outline-primary" onClick={(e)=>calcularCreditoFiscal(1)}>
                        Pago Directo Banesco
                    </Button>
                </Col>
                <Col className="mt-2 mb-2" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <Button variant="outline-dark" onClick={(e)=>calcularCreditoFiscal(2)} >
                       Ya realice mi pago, notificar pago
                    </Button>
                </Col>
            </Row>
        </>
    )
}