import React, { useEffect, useState} from 'react';
import { clientAxios, requestConfig } from '../../config/configAxios';
import PnaContext from './pnaContext';
import Swal from "sweetalert2";

export const PnaState = ({ children }) => {

    const [pna, setPna] = useState([]);
    const [registroSeleccionado, setRegistroSeleccionado] = useState({});
    const [formDataPna, setFormDataPna] = useState({});

    useEffect(() => {
        getPna();
    },[]);

    const getPna = async () => {

        try {
            const respuesta = await clientAxios.get('/pna_certificado/', clientAxios);
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "users_id": arreglo[i].attributes.users_id,
                        "cumple_obligacion": arreglo[i].attributes.cumple_obligacion,
                        "cumple": arreglo[i].attributes.cumple_obligacion === true ? 'Cumple' : 'No cumple',
                        "numero_certificado": arreglo[i].attributes.numero_certificado,
                        "uid": arreglo[i].attributes['user.uid'],
                        "name": arreglo[i].attributes['user.name']
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setPna(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const obtenerValores = (valores) => {
        setRegistroSeleccionado(valores);
    }

    const limpiarSeleccionado = () => {
        setRegistroSeleccionado({});
    }

    const deletePna = async (valores) => {

        const dataType = "savePnaCertificado";

        try {
            Swal.fire({
                title: 'PNA Certificado',
                text: 'Esta seguro de eliminar el registro?',
                icon: 'info',
                showDenyButton: true,
                denyButtonText: `Cancelar`,
                confirmButtonText: 'Eliminar',
            }).then((result) => {

                if (result.isConfirmed) {
                    const urlTabla = `/pna_certificado/${valores.id}`;

                    const respuesta = clientAxios.delete(urlTabla, requestConfig);

                    Swal.fire({
                        title: 'PNA Certificado',
                        text: "Registro elimnado con éxito!",
                        icon: "success",
                        button: "Ok",
                        timer: 1500
                    }).then((value) => {
                        getPna();
                    });
                }
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'PNA Certificado',
                text: "Error al intentar eliminar registro!",
                icon: "error",
                button: "Ok",
            });
        }
    }

    const validarNroTrabajadores = async (formik, props) => {

        let rif = formik.values.tipo + formik.values.rif;

        requestConfig.data.id = rif;
        requestConfig.data.type = "userCompany";

        try {
            //const respuesta = await clientAxios.get(`/user_company/${rif}/`, requestConfig);
            const respuesta = await clientAxios.get(`/users/${rif}`, requestConfig);

            console.log('respuesta ', respuesta);

            if (respuesta.data.data != null) {
                if(respuesta.data.data.numero_de_trabajadores < 15) {
                    Swal.fire({
                        title: 'PNA Certificado',
                        text: `Contribuyente no posee 15 trabajadores`,
                        icon: "warning",
                        button: "Ok",
                        timer: 2000
                    });
                }
            }

            if (respuesta.data.data === null) {
                Swal.fire({
                    title: 'PNA Certificado',
                    text: `Contribuyente no esta registrado en RNCP`,
                    icon: "error",
                    button: "Ok",
                    timer: 2000
                });
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'PNA Certificado',
                text: `Error al validar número de rif del contribuyente !`,
                icon: "error",
                button: "Ok",
                timer: 2000
            });
        }
    }

    const submitPna = async (valores, props) => {

        const dataType = "savePnaCertificado";
        const urlTabla = "/pna_certificado/";

        try {

            requestConfig.data.type = dataType;
            requestConfig.data.attributes = valores;
            requestConfig.data.id = (props.accion !== 'Agregar') ? valores.id : valores.tipo.trim() + valores.rif.trim();

            if(props.accion === 'Agregar') {
                const respuesta = await clientAxios.post(urlTabla, requestConfig);
            } else {
                const respuesta = await clientAxios.put(urlTabla, requestConfig);
            }

            props.onHide();
            Swal.fire({
                title: 'PNA Certificado',
                text: `Datos ${ props.accion === 'Agregar'? 'guadados' : 'actualizados' } con éxito!`,
                icon: "success",
                button: "Ok",
                timer: 1500
            }).then((value) => {
                getPna();
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'PNA Certificado',
                text: `Error al intentar ${ props.accion === 'Agregar' ? 'guardar' : 'actualizar' } registro!`,
                icon: "error",
                button: "Ok",
                timer: 2000
            });
        }
    }

    const valuesContext = {
        pna,
        submitPna,
        setFormDataPna,
        deletePna,
        registroSeleccionado,
        obtenerValores,
        limpiarSeleccionado,
        validarNroTrabajadores
    }

    return (
        <PnaContext.Provider value={valuesContext}>
            {children}
        </PnaContext.Provider>
    )
}