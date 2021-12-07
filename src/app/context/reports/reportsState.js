import React, { useEffect, useState} from 'react';
import {clientAxios} from '../../config/configAxios';
import ReportsContext from './reportsContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const ReportsState = ({ children }) => {

    const [formatoFechaFutura, setFormatoFechaFutura] = useState();
    const [formatoReporte, setFormatoReporte] = useState([]);
    const [anos, setAnos] = useState([]);
    const [trimestres, setTrimestres] = useState([]);
    const [contrib, setContrib ] = useState([]);

    useEffect(() => {
        getFechaFutura();
        getFormatoReporte();
        getContribuyente();
        getAnos();
        getTrimestres();
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

    const getAnos = async () => {

        try {
            let fecha = new Date();
            let ano = Number(fecha.getFullYear());
            let res = [];
            for (let i = 0; i < 10; i++) {
                res.push(ano);
                ano--;
            }
            setAnos(res);
        } catch (error) {
            console.log(error)
        }

    }

    const getTrimestres = async () => {

        try {
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
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setTrimestres(lista)

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

            let fecha = valores.fecha.replace(/-/g, ".");
            const respuesta = await clientAxios.get(`/reports/certificado_solvencia/${valores.nrif}/${fecha}/`);

            Swal.fire({
                title: "Reportes del Contribuyente",
                text: "Reporte ejecutado con éxito!",
                icon: "success",
                button: "Ok"
            }).then((value) => {
                window.open(process.env.REACT_APP_API_URL+"reports/certificado_solvencia/"+`${valores.nrif}/${fecha}`);
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Reportes del Contribuyente",
                text: "Error al generar solvencia !",
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
        anos,
        trimestres,
        submitReportsCertificateSolvency,
        contrib
    }

    return (
        <ReportsContext.Provider value={valuesContext}>
            {children}
        </ReportsContext.Provider>
    )
}