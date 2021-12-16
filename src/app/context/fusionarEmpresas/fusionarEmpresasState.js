import React, { useEffect, useState } from 'react';
import { clientAxios, requestConfig } from '../../config/configAxios';
import FusionarEmpresasContext from './fusionarEmpresasContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const FusionarEmpresasState = ({ children }) => {

    useEffect(() => {
    },[]);

    const submitFusionarEmpresas = async (valor) => {
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

            const dataType = "saveFuisonarEntidades";
            const url = "/fusionar_entidades/";
            const valores = {
                uidfusionada: valor.tipo_fusionar + valor.rif_fusionar,
                uidadsorbe: valor.tipo_absorbe + valor.rif_absorbe
            }

            requestConfig.data.type = dataType;
            requestConfig.data.attributes = valores;

            console.log('valores ', valores)

            const respuesta = await clientAxios.post(url, requestConfig);

            Swal.fire({
                title: 'Fusionar Entidades de Trabajo',
                text: 'Datos guadados con éxito!',
                icon: "success",
                button: "Ok",
                timer: 1500
            }).then((value) => {
                //actualizarTablas(props.tabla);
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

    const valuesContext = {
        submitFusionarEmpresas
    }

    return (
        <FusionarEmpresasContext.Provider value={valuesContext}>
            {children}
        </FusionarEmpresasContext.Provider>
    )
}