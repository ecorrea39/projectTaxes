import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { initialValuesSummary } from "./initialValues";
import { SchemaSummary } from "./validateSchemas";
import TaxesContext from "../../context/taxes/taxesContext";
import Swal from "sweetalert2";
import { BaseFormikSummary } from "./baseFormikSummary";
import { formatearMontosII, formatearMontosIII } from "../../helpers";

function FormSummary() {

    const {
            setFormSummary, setStepTaxes, conceptos, declaracionesRealizadas, creditoFiscal,
            actaReparo, reAdmin, reCul, debForm, debMat, conv, cheq, multa, intereses
        } = useContext(TaxesContext);
    const [continueForm, setContinueForm] = useState(false);
    const [ totales, setTotales ] = useState({
        intereses: 0,
        multa: 0,
        tributos: 0,
        montoPagar: 0,
        conceptos: 0,
        totalPagar: 0,
    });

    const [filterConcepts, setFilterConcepts] = useState([]);
    const [detallesDeclaraciones, setDetDeclaraciones] = useState([]);

    // Asignacion inicial de los montos
    const asignarMontos = () => {
        let montoIntereses = detallesDeclaraciones.totales.intereses;
        let montoTributo = detallesDeclaraciones.totales.tributos;
        let montoConceptos = detallesDeclaraciones.totales.conceptos;
        let montoAPagar = 0 + detallesDeclaraciones.totales.montoPagar + montoConceptos;
        
        setTotales({
            intereses: montoIntereses,
            tributos: montoTributo,
            montoPagar: montoAPagar,
            conceptos: montoConceptos,
            multa: 0,
            totalPagar: montoAPagar
        });
        return;
    }

    const calcularMontoConceptos = (values) => {
        let detallesConceptos = [];
        let montoTotal = totales.totalPagar;
        let montoTotalConceptos = 0;
        let montoPagar = formatearMontosII(values.montoPagar);
        // ESTO SE DEBE OPTIMIZAR CON URGENCIA
        values.conceptos.map((element,index)=>{
            let concepto = {
                idConcepto: "",
                detalle: {
                    monto: "", // Monto del concepto
                    monto_multa: "", // Monto de la multa del concepto
                    monto_intereses: "", // Monto de intereses del concepto
                    nro_doc: "", // Numero de documento/acta/resolucion/cheque de conceptops
                    fecha_concp: "", // Fecha del documento/acta/resolucion/cheque
                    fecha_vcto_giro: "", // Fecha Vencimiento de Giro Convenio de pago
                    fecha_nota_debito: "", // Fecha nota deito del cheque
                    nota_debito: "",
                    nro_giro: ""
                }
            };
            console.log(element)
            concepto.idConcepto = element;

            if (element == 3) {
                concepto.detalle.monto = actaReparo.montoActa;
                concepto.detalle.fecha_concp = actaReparo.fechaActa;
                concepto.detalle.nro_doc = actaReparo.numActa;
                let monto = actaReparo.montoActa != "" ? formatearMontosII(actaReparo.montoActa) : 0; // Reemplazo la "," por "."
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto ); // convierto a float y sumo al total
            }
            if (element == 9) {
                concepto.detalle.nro_doc = reAdmin.numResolucionAdmin;
                concepto.detalle.fecha_concp = reAdmin.fechaResolucionAdmin;
               
                concepto.detalle.monto_intereses = reAdmin.montoInteresesResolucionAdmin;

                concepto.detalle.monto = reAdmin.montoMultaResolucionAdmin;
                let monto = formatearMontosII(reAdmin.montoMultaResolucionAdmin);
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto );
            }
            if (element == 4) {
                concepto.detalle.nro_doc = reCul.numResolucionCul;
                concepto.detalle.fecha_concp = reCul.fechaResolucionCul;
                concepto.detalle.monto = reCul.montoMultaResolucionCul;
                let monto = formatearMontosII(reCul.montoMultaResolucionCul) ;
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto );
            }
            if (element == 10) {
                concepto.detalle.nro_doc = debForm.numResolucionForm;
                concepto.detalle.fecha_concp = debForm.fechaResolucionForm;
                concepto.detalle.monto = debForm.montoMultaResolucionForm;
                let monto = formatearMontosII(debForm.montoMultaResolucionForm);
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto );
            }
            if (element == 11) {
                concepto.detalle.nro_doc = debMat.numResolucionMat;
                concepto.detalle.fecha_concp = debMat.fechaResolucionMat;
                concepto.detalle.monto = debMat.montoMultaResolucionMat;
                let monto = formatearMontosII(debMat.montoMultaResolucionMat);
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto );
            }
            if (element == 5) {
                concepto.detalle.nro_doc = conv.numConvPago;
                concepto.detalle.fecha_concp = conv.fechaConvenio;
                concepto.detalle.nro_giro = conv.numGiroConvenioPago;
                concepto.detalle.fecha_vcto_giro = conv.fechaVencConvenio;
               
                concepto.detalle.monto_intereses = conv.montoInteresesConvenio;

                concepto.detalle.monto = conv.montoConvenio;
                let monto = formatearMontosII(conv.montoInteresesConvenio) ;
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto );
            }
            if (element == 6) {
                concepto.detalle.nro_doc = cheq.numCheque;
                concepto.detalle.fecha_concp = cheq.fechaCheque;
                concepto.detalle.nota_debito = cheq.notaDebito;
                concepto.detalle.fecha_nota_debito = cheq.fechaNotaDebito;
                concepto.detalle.monto = cheq.montoCheque;
                let monto = formatearMontosII(cheq.montoCheque) ;
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto );
            }
            if (element == 7) {
                concepto.detalle.monto = multa.montoMulta;
                let monto = formatearMontosII(multa.montoMulta) ;
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto );
            }
            if (element == 8) {
                concepto.detalle.monto = intereses.montoInteresesMoratorios;
                let monto = formatearMontosII(intereses.montoInteresesMoratorios) ;
                montoTotalConceptos += parseFloat( monto );
                montoTotal += parseFloat( monto );
            }
            if ( element == 12) {
               concepto.detalle.monto = creditoFiscal.montoCredito;
            }
            detallesConceptos.push(concepto);
        });
        
        values.detallesConceptos = detallesConceptos;
        let credito = 0;
        let motoMayor;
        let montoMenor;
        
        if(montoPagar > 0) {
            if( montoPagar >= montoTotal ) {
                motoMayor = montoPagar;
                montoMenor = montoTotal;
            } else {
                motoMayor = montoTotal;
                montoMenor = montoPagar;
            }
            let montoCredito = motoMayor - montoMenor - montoTotalConceptos;
            credito = montoCredito > 0 ? montoCredito : 0;
        }

        let total = montoTotal + credito;
        let newTotales = {...totales};
        let newDetailsTaxes = {...detallesDeclaraciones};
        newDetailsTaxes.totales = newTotales;
        newTotales.montoPagar = parseFloat(total);
        newTotales.conceptos = montoTotalConceptos;
        values.montoPagar = formatearMontosIII( total );
        //setTotales(newTotales);
        setDetDeclaraciones(newDetailsTaxes);
        setContinueForm(total > 0);
        console.log(values)

        //console.log(parseFloat( formatearMontosII(values.montoPagar.toLocaleString('es')) ) )
        //console.log(values.montoPagar.toLocaleString('es'))
        //console.log( parseFloat( formatearMontosII(values.montoPagar) ) )
        //console.log(values.montoPagar)
        //console.log("total ", total, "monto ", parseFloat( formatearMontosII(values.montoPagar) ))
        //return {continue: total <= parseFloat( formatearMontosII(values.montoPagar) ), newValues: values};
        //return {continue: total > 0};
        return newTotales;
    }

    const handleSubmit = async (values) => {
        if(continueForm) {
            //await asignarMontos();
            //console.log(totales)
            //console.log(detallesDeclaraciones)
            //console.log(values)
            setFormSummary({
                conceptos: values.conceptos,
                detallesConceptos: values.detallesConceptos,
                tributos: values.tributos,
                totales: detallesDeclaraciones.totales,
                declaraciones: detallesDeclaraciones.declaraciones
            });
            setStepTaxes(3);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error en el total',
                text: "Por favor verifique que el total a pagar sea mayor a Bs. 0,00",
                confirmButtonText: 'Ok'
            });
        }
    }

    // Crear lista para mostrar acordeon de declaraciones
    const createListDetails = async () => {
        let array = {
            declaraciones:[],
            totales: {
                intereses: 0,
                tributos: 0,
                conceptos: 0,
                multas: 0,
                montoPagar: 0,
                totalPagar: 0
            }
        };
        let result = await declaracionesRealizadas.map( async (element,index) => {
            let totalesDec = await calcularIntereses(element);
            
            let detalles = {
                ano_declaracion: element.attributes.data.ano_declaracion,
                conceptoId: element.attributes.data.concepto_pago,
                fecha_declaracion: element.attributes.data.fecha_declaracion,
                intereses: parseFloat( totalesDec.intereses ),
                multa: element.attributes.data.monto_multa,
                monto: parseFloat( element.attributes.data.monto_tributo ),
                totalTributo: parseFloat( totalesDec.totalTributo ) + parseFloat( totalesDec.intereses ),
                trimestre: element.attributes.data.trimestre,
                name: "",
                idTributo: element.attributes.data.id,
                id: index+1,
                checked: true
            }
            array.declaraciones.push(detalles);
            array.totales.intereses += detalles.intereses;
            array.totales.tributos += parseFloat( detalles.monto );
            array.totales.montoPagar += parseFloat( detalles.monto ) + detalles.intereses;
        });
        setDetDeclaraciones(array);
        return result;
    }

    const restaFechas = (f1,f2) => {
        let dif = f2 - f1;
        let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        return dias;
    }

    const calcularDias = (declaracion) => {
        /**
         * Saber e que trimeste vamos
         * saber los dias habiles
         * Saber la fecha actual (DD/MM/YYYY)
         */
        let anioDeclaracion = declaracion.attributes.data.ano_declaracion;
        let trimestre = declaracion.attributes.data.trimestre;
        let anioActual = "2021";
        let mesActual = "12";
        let diaActual = "15";
        let primerDiaHabil = "7";
        let diasDeMora = 0;
        let fActual = new Date(anioActual, mesActual, diaActual);

        if(trimestre == 1) {
            let fechaDeclaracion = new Date(anioDeclaracion, "4", primerDiaHabil); 
            diasDeMora = restaFechas(fechaDeclaracion,fActual);
        }
        if(trimestre == 2) {
            let fechaDeclaracion = new Date(anioDeclaracion, "7", primerDiaHabil); 
            diasDeMora = restaFechas(fechaDeclaracion,fActual);
        }
        if(trimestre == 3) {
            let fechaDeclaracion = new Date(anioDeclaracion, "10", primerDiaHabil); 
            diasDeMora = restaFechas(fechaDeclaracion,fActual);
        }
        if(trimestre == 4) {
            let fechaDeclaracion = new Date(anioDeclaracion, "01", primerDiaHabil); 
            diasDeMora = restaFechas(fechaDeclaracion,fActual);
        }

        return diasDeMora;
    }

    const calcularTasa = () => {

        let tasa1 = "13,05";
        let tasa2 = "15,00";
        let tasa3 = "17.01";
        let tasaPromedio = ( parseFloat(tasa1)+parseFloat(tasa2)+parseFloat(tasa3) ) / 3
        return tasaPromedio;
    }

    const calcularMontoIntereses = (tiempo,tasa,capital) => {
        /**
         * Formula para el calculo
         * CAPITAL X TASA X TIEMPO
         * CAPITAL = AL MONTO DEL TRIBUTO
         * TASA = PROMEDIO DE LAS TASAS MENSUALES / 365
         * TIEMPO = DIAS DE MORA
         */

        let tasaDiaria = tasa / 365;
        let intereses = capital * tasaDiaria * tiempo;
        return intereses;

    }

    const calcularIntereses = (declaracion) => {

        // Fórmula utilizada para el cálculo de los Intereses de manera mensual.
        /*
            (Se toman en cuenta todos los meses y las tasas que se muestran  en la sección Resumen
            de Intereses calculados)
            0. Promediar las tasas mensuales.
            1. Tasa Promedio del Mes = (Tasa del Mes / 365) * (Dias del Mes)
            2. Deuda Total = Sumatoria de la Tasas Promedio * Monto
        */
        let diasDeMora = calcularDias( declaracion );
        let tasaDeIntereses = calcularTasa();
        let montoDeIntereses = calcularMontoIntereses(diasDeMora,tasaDeIntereses,declaracion.attributes.data.monto_tributo);
       
        return { 
                intereses: parseFloat(montoDeIntereses).toFixed(2),
                totalTributo: parseFloat(declaracion.attributes.data.monto_tributo).toFixed(2)
            }        
    }

    useEffect(()=>{
        setFilterConcepts(conceptos.filter(x => x.id > 2 && x.id != 12 ));
        createListDetails();
    },[]);

    return (
        <>
            <Formik
                initialValues={initialValuesSummary}
                validationSchema={SchemaSummary}
                onSubmit={handleSubmit}
                formnovalidate
            >
                {
                    formik => (
                        <Form>
                            <BaseFormikSummary
                                formik={formik}
                                conceptos={filterConcepts}
                                listDeclaraciones={detallesDeclaraciones}
                                totales={totales}
                                setTotales={setTotales}
                                asignarMontos={asignarMontos}
                                calcularMontoConceptos={calcularMontoConceptos} />
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default FormSummary;