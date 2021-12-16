import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ShowConcept from "./showConcepts";
import { InputsTaxes } from "./inputsTaxes";
import TaxesContext from "../../context/taxes/taxesContext";
import { ListConcepts } from "./listConcepts";
import { formatearMontos, formatearMontosII, GenerarCodBanesco } from "../../helpers";
import { CreditoFiscal } from "./inputsTypeConcept";

export const BaseFormikSummary = ({conceptos,formik,listDeclaraciones}) => {

    const { totalTributoDeclarado, setCreditoFiscal, creditoFiscal,
        declaracionesRealizadas, formDataDeclaration } = useContext(TaxesContext);
    
    const [montoAPagar, setMontoAPagar] = useState("");
    const [montoIntereses, setMontoIntereses] = useState("");
    
    const calcularCreditoFiscal = (montoAPagar,montoIntereses) => {

        // console.log( montoAPagar,montoIntereses )
       
        let resta = parseFloat( formatearMontosII(montoAPagar) ) - parseFloat(totalTributoDeclarado) - parseFloat( formatearMontosII(montoIntereses) );
        // console.log( "resta ", resta )
        if ( resta > 0 )  {
            // ESTO SE DEBE CAMBIAR 
            setCreditoFiscal({
                montoCredito: resta.toFixed(2)
            });
            formik.setFieldValue("montoCredito",  formatearMontos(resta));
        } else {
            // ESTO SE DEBE CAMBIAR 
            setCreditoFiscal({montoCredito: ""});
            formik.setFieldValue("montoCredito", "");
        }
    }

    const totalIntereses = () => {

        let montoIntereses = 0;
        listDeclaraciones.map(dec=>{
            montoIntereses += parseFloat( dec.intereses );
        });

        return montoIntereses;
    }

    const calcularMontos = async () => {

        let montoIntereses = await totalIntereses();
        let montoAPagar = totalTributoDeclarado + montoIntereses;
        console.log(totalTributoDeclarado , montoIntereses)
        formik.setFieldValue("montoIntereses", montoIntereses );
        formik.setFieldValue("montoPagar", formatearMontos(montoAPagar) );
    
        if(montoAPagar){
            setMontoAPagar(montoAPagar);
            setMontoIntereses(montoIntereses);
            calcularCreditoFiscal(formatearMontos(montoAPagar),formatearMontos(montoIntereses));
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
        /*let montoIntereses = totalIntereses();
        let montoAPagar =  parseFloat(formik.values.montoPagar);
      
        if(montoAPagar){
            setMontoAPagar(montoAPagar);
            setMontoIntereses(montoIntereses);
            calcularCreditoFiscal(formatearMontos(montoAPagar),formatearMontos(montoIntereses));
        }*/
    },[formik.values.montoPagar]);

    useEffect(()=>{
        calcularMontos();
    },[listDeclaraciones]);

    useEffect(()=>{
        if(declaracionesRealizadas) {
            let array = [];
            declaracionesRealizadas.map(dec=>{
                array.push(dec.attributes.id_tributo)
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
                formDataDeclaration.declaraciones &&
                <InputsTaxes
                    listDeclaraciones={listDeclaraciones}
                    formik={formik} />
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