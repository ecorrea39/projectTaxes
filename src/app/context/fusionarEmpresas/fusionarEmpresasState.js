import React, { useEffect, useState } from 'react';
import { clientAxios, requestConfig } from '../../config/configAxios';
import FusionarEmpresasContext from './fusionarEmpresasContext';
import Swal from "sweetalert2";

export const FusionarEmpresasState = ({ children }) => {

    const [fusionarEmpresas, setFusionarEmpresas] = useState([]);        

    let dataAux = [];

    useEffect(() => {
        getFusionarEmpresas();
    },[]);

    const getFusionarEmpresas = async () => {

        try {
            const respuesta = await clientAxios.get('/fusionar_entidades/', clientAxios);
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "nrifabsorbe": arreglo[i].attributes['uidadsorbe_user.uid'],
                        "nameabsorbe": arreglo[i].attributes['uidadsorbe_user.name'],
                        "nriffusionada": arreglo[i].attributes['uidfusionada_user.uid'],
                        "namefusionada": arreglo[i].attributes['uidfusionada_user.name']
                    }
                )
            });
            //lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setFusionarEmpresas(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const submitFusionarEmpresas = async (valor, props) => {
            // 1) cambiar estatus a empresa fusionada
            //    user_information --> estatus === 4

            // 2) actualizar tabla: deudas.
            //    where users_id === id entidad a fusionar
            //    deudas --> users_id === id de entidad que absorbe (id en tabla: users)

            // 3) actualizar tabla: declaracion_tributos.
            //    where users_id === id entidad a fusionar
            //    declaracion_tributos --> users_id === id de entidad que absorbe (id en tabla: users)

            // 4) actualizar tabla: declaracion_pagos.
            //    where users_id === id entidad a fusionar
            //    declaracion_pagos --> users_id === id de entidad que absorbe (id en tabla: users)

            // 5) actualizar tabla: declaracion_pivot.
            //    where users_id === id entidad a fusionar
            //    declaracion_pivot --> users_id === id de entidad que absorbe (id en tabla: users)

        try {

            Swal.fire({
                title: 'Fusionar Entidades de Trabajo',
                text: 'Esta seguro de realizar este proceso, ya que el mismo es irreversible?',
                icon: 'info',
                showDenyButton: true,
                denyButtonText: `Cancelar`,
                confirmButtonText: 'Fusionar',
            }).then((result) => {

                if (result.isConfirmed) {
                    const dataType = "saveFuisonarEntidades";
                    const url = "/fusionar_entidades/";
                    const valores = {
                        uidfusionada: valor.tipo_fusionar + valor.rif_fusionar,
                        uidadsorbe: valor.tipo_absorbe + valor.rif_absorbe
                    }

                    requestConfig.data.type = dataType;
                    requestConfig.data.attributes = valores;

                    const respuesta = clientAxios.post(url, requestConfig);

                    props.onHide();

                    Swal.fire({
                        title: 'Fusionar Entidades de Trabajo',
                        text: 'Datos guadados con éxito!',
                        icon: "success",
                        button: "Ok",
                        timer: 1500
                    }).then((value) => {
                        getFusionarEmpresas();
                    });
                }
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Fusionar Entidades de Trabajo',
                text: 'Error al intentar guardar registro!',
                icon: "error",
                button: "Ok",
                timer: 2000
            });
        }
    }

    const filtrarElementos = async (palabra) => {

        await getListaOriginal();

        let search = ""

        search = dataAux.filter(item =>
            /*item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(palabra.toLowerCase()) || item.id.toString().includes(palabra)
            ||*/ item.uidfusionada.toString().includes(palabra)
            || item.uidadsorbe.toString().includes(palabra)
        );

        if(palabra === '') {
            getFusionarEmpresas();
        } else {
            setFusionarEmpresas(search);
        }

    }

    const getListaOriginal = () => { dataAux = fusionarEmpresas; }

    const valuesContext = {
        submitFusionarEmpresas,
        fusionarEmpresas,
        filtrarElementos
    }

    return (
        <FusionarEmpresasContext.Provider value={valuesContext}>
            {children}
        </FusionarEmpresasContext.Provider>
    )
}