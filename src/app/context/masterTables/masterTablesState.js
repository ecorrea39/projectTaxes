import React, { useEffect, useState} from 'react';
import {clientAxios} from '../../config/configAxios';
import MasterTablesContext from './masterTablesContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const MasterTablesState = ({ children }) => {

    const [trimestres, setTrimestres] = useState([]);

    useEffect(() => {
        getTrimestres();
    },[]);

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
                        "is_active": arreglo[i].attributes.is_active
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setTrimestres(lista)
            console.log('lista', lista)

        } catch (error) {
            console.log(error)
        }

    }

    const deleteMasterTables = async () => {
        try {
            /*
            const respuesta = await clientAxios.get('/banks/');
            setBancos(respuesta.data.data)*/
            Swal.fire({
                title: 'Tabla de ',
                text: 'Esta seguro de eliminar el registro?',
                icon: 'info',
                showDenyButton: true,
                denyButtonText: `Cancelar`,
                confirmButtonText: 'Eliminar',
            }).then((result) => {
                if (result.isConfirmed) {
                    /*
                    setDeclaracionSustitutiva(true);
                    setDeclaracionSeleccionada(seleccion)
                    props.onHide();*/
                } else if (result.isDenied) {
                    /*
                    setDeclaracionSustitutiva(false);
                    setDeclaracionSeleccionada([]);
                    setHistorico(historicoOriginal);*/
                }
            });

        } catch (error) {
            console.log(error)
        }
    }

    const valuesContext = {
        deleteMasterTables,
        trimestres
    }

    return (
        <MasterTablesContext.Provider value={valuesContext}>
            {children}
        </MasterTablesContext.Provider>
    )
}