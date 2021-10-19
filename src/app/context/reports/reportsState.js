import React, { useEffect, useState} from 'react';
import {clientAxios} from '../../config/configAxios';
import ReportsContext from './reportsContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const ReportsState = ({ children }) => {

    const [formatoFechaFutura, setFormatoFechaFutura] = useState();
    const [formatoReporte, setFormatoReporte] = useState([]);
    const [formDataReports, setFormDataReports] = useState({});
    const [contrib, setContrib ] = useState([]);

    useEffect(() => {
        getFechaFutura();
        getFormatoReporte();
        getContribuyente();
    },[]);

    const getFechaFutura = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        let month = fecha.getMonth() + 1;
        let day = fecha.getDate();
        if (month < 10) month = '0' + month.toString();
        if (day < 10) day = '0' + day.toString();
        setFormatoFechaFutura(year + '-' + month + '-' + day);
    }

    const getFormatoReporte = async () => {

        try {/*
            const respuesta = await clientAxios.get('/trimestres/', clientAxios);
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));*/
            const lista = ['PDF'];
            setFormatoReporte(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const getContribuyente = async () => {

        try {/*
            const respuesta = await clientAxios.get('/trimestres/', clientAxios);
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes.name,
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));*/

            let rif = odb.get('rif');
            let name = odb.get('name');

            const lista = [{
                "rif": rif,
                "nombre": name
            }];
            await setContrib(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const submitReportsCertificateSolvency = async (valores) => {

        try {
            /*
            requestConfig.data.type = "saveTributeDeclaration";
            requestConfig.data.attributes = valores.declaraciones;
            requestConfig.data.id = (!declaracionSustitutiva) ? nrif : valores.declaraciones[0].id;

            if(!declaracionSustitutiva) {
                const respuesta = await clientAxios.post('/tribute_declaration/', requestConfig);
            } else {
                const respuesta = await clientAxios.put('/tribute_declaration/', requestConfig);
            }
            */
            Swal.fire({
                title: "Reportes del Contribuyente",
                text: "Certificado de solvencia ejecutado con éxito!",
                icon: "success",
                button: "Ok",
                timer: 1500
            }).then((value) => {
                /*
                if (total > 0) {
                    setStepTaxes(stepTaxes+1)
                }*/
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Reportes del Contribuyente",
                text: "Error al generar reporte de certificado de solvencia !",
                icon: "error",
                button: "Ok",
            }).then((value) => {
                /*setStepTaxes(stepTaxes)*/
            });

        }
    }

    const valuesContext = {
        formatoFechaFutura,
        formatoReporte,
        submitReportsCertificateSolvency,
        setFormDataReports,
        contrib
    }

    return (
        <ReportsContext.Provider value={valuesContext}>
            {children}
        </ReportsContext.Provider>
    )
}