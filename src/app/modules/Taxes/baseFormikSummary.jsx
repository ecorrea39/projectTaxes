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

export const BaseFormikSummary = ({conceptos,formik,listDeclaraciones}) => {

    const { totalTributoDeclarado, setCreditoFiscal, creditoFiscal,
        declaracionesRealizadas } = useContext(TaxesContext);

    const [ totales, setTotates ] = useState({
        intereses: 0,
        multa: 0,
        tributos: 0,
        montoPagar: 0
    });
    
    const calcularCreditoFiscal = (montoAPagar) => {
       
        let resta = montoAPagar - totales.tributos.toFixed(2) - totales.intereses.toFixed(2) ;
        
        if ( resta > 0 )  {
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
                    formik.setFieldValue("montoCredito",  formatearMontos(resta));
                }
            });
        } else {
            // ESTO SE DEBE CAMBIAR 
            setCreditoFiscal({montoCredito: 0.00});
            formik.setFieldValue("montoCredito", "0,00");
        }
    }

    const calcularMontosTotates = (tributos,op) => {

        listDeclaraciones.declaraciones.map( (dec,index) => {

            let idTributo = dec.idTributo;
            
            if( tributos.indexOf(idTributo) > -1 ) {
                
                if(op == "resta") {
                    totales.tributos -= parseFloat( dec.totalTributo );
                    totales.intereses -= parseFloat( dec.intereses );
                } else {
                    totales.tributos += parseFloat( dec.totalTributo );
                    totales.intereses += parseFloat( dec.intereses );
                }
                
                setTotates(totales);
            }

        });
        totales.montoPagar = totales.tributos + totales.intereses;
        setTotates(totales);

        formik.setFieldValue("montoTributo", totales.tributos );
        formik.setFieldValue("montoIntereses", totales.intereses );
        // formik.setFieldValue("montoPagar", totales.montoPagar );
    }

    // Asignacion inicial de los montos
    const asignarMontos = async () => {
        
        let montoIntereses = listDeclaraciones.totales.intereses;
        let montoTributo = listDeclaraciones.totales.tributos;
        let montoAPagar = listDeclaraciones.totales.tributos + montoIntereses;

        formik.setFieldValue("montoIntereses", formatearMontos(montoIntereses) );
        formik.setFieldValue("montoTributo", formatearMontos(montoTributo) );
        formik.setFieldValue("montoPagar", formatearMontos(montoAPagar) );

        totales.intereses = montoIntereses;
        totales.tributos = montoTributo;
        totales.montoPagar = montoAPagar;

        setTotates({
            intereses: montoIntereses,
            tributos: montoTributo,
            montoPagar: montoAPagar,
            multa: 0
        })

        if(montoAPagar){
            calcularCreditoFiscal(montoAPagar);
        }
    
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
        if(montoAPagar){
            calcularCreditoFiscal( formatearMontosII(montoAPagar) );
        }
        
    },[formik.values.montoPagar]);

    useEffect(()=>{
        if(listDeclaraciones.declaraciones) {
            asignarMontos();
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
                    <Button variant="outline-primary" onClick={(e)=>handleSubmit(1)}>
                        Pago Directo Banesco
                    </Button>
                </Col>
                <Col className="mt-2 mb-2" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                    <Button variant="outline-dark" onClick={(e)=>handleSubmit(2)} >
                       Ya realice mi pago, notificar pago
                    </Button>
                </Col>
            </Row>
        </>
    )
}