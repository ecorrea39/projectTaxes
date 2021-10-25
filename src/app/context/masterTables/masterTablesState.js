import React, { useEffect, useState} from 'react';
import { clientAxios, requestConfig } from '../../config/configAxios';
import MasterTablesContext from './masterTablesContext';
import odb from './../../helpers/odb';
import Swal from "sweetalert2";

export const MasterTablesState = ({ children }) => {

    const [trimestres, setTrimestres] = useState([]);
    const [formasPago, setFormasPago] = useState([]);
    const [cuentasRecaudadoras, setCuentasRecaudadoras] = useState([]);

    useEffect(() => {
        getTrimestres();
        getFormasPago();
        getCuentasRecaudadoras();
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

        } catch (error) {
            console.log(error)
        }

    }

    const getFormasPago = async () => {

        try {
            const respuesta = await clientAxios.get('/formas_pago/', clientAxios);
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
            setFormasPago(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const getCuentasRecaudadoras = async () => {

        try {
            const respuesta = await clientAxios.get('/cuentas_banco/', clientAxios);
            let arreglo = [];
            let lista = [];
            arreglo = respuesta.data.data;
            arreglo.map((x, i) => {
                lista.push(
                    {
                        "id": arreglo[i].id,
                        "name": arreglo[i].attributes['id_banco_banco.nom_banco'],
                        "cuenta_tipo": arreglo[i].attributes.cuenta_tipo,
                        "cuenta_nro": arreglo[i].attributes.cuenta_nro,
                        "is_active": arreglo[i].attributes.is_active
                    }
                )
            });
            lista.sort((a, b) => a.name - b.name ? -1 : +(a.name > b.name));
            setCuentasRecaudadoras(lista)

        } catch (error) {
            console.log(error)
        }

    }

    const deleteMasterTables = async (tabla, titulo, obj) => {

        let respuesta;

        try {
            /*
            const respuesta = await clientAxios.get('/banks/');
            setBancos(respuesta.data.data)*/
            Swal.fire({
                title: titulo,
                text: 'Esta seguro de eliminar el registro?',
                icon: 'info',
                showDenyButton: true,
                denyButtonText: `Cancelar`,
                confirmButtonText: 'Eliminar',
            }).then((result) => {
                if (result.isConfirmed) {

                    requestConfig.data.attributes = obj;
                    requestConfig.data.id = obj.id;
                    requestConfig.data.attributes.is_active = !obj.is_active;

                    switch (tabla) {
                        case "trimestre":

                            requestConfig.data.type = "saveTrimestres";
                            respuesta = clientAxios.put('/trimestres/', requestConfig);
                            getTrimestres();
                            break;

                        case "forma-pago":
                            requestConfig.data.type = "saveFormasPago";
                            respuesta = clientAxios.put('/formas_pago/', requestConfig);
                            getFormasPago();
                            break;

                        case "cuentas-recaudadoras":
                            requestConfig.data.type = "saveCuentasBanco";
                            respuesta = clientAxios.put('/cuentas_banco/', requestConfig);
                            getCuentasRecaudadoras();
                            break;

                        default:
                            break;
                    }

                    Swal.fire({
                        title: titulo,
                        text: "Registro elimnado con éxito!",
                        icon: "success",
                        button: "Ok",
                        timer: 1500
                    });

                } else if (result.isDenied) {
                }
            });

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: titulo,
                text: "Error al intentar eliminar registro!",
                icon: "error",
                button: "Ok",
            });
        }
    }

    const submitMasterTables = async (valores, titulo) => {

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

            Swal.fire({
                title: "Declaración de tributos",
                text: "Datos guardados con éxito!",
                icon: "success",
                button: "Ok",
                timer: 1500
            }).then((value) => {
                if (total > 0) {
                    setStepTaxes(stepTaxes+1)
                }
                setDeclaracionSustitutiva(false);
                setDeclaracionSeleccionada([]);
                getHistoricoDeclaraciones();
            });*/
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: titulo,
                text: "Error al intentar guardar registro!",
                icon: "error",
                button: "Ok",
            });
        }
    }

    const valuesContext = {
        deleteMasterTables,
        trimestres,
        formasPago,
        cuentasRecaudadoras,
        submitMasterTables
    }

    return (
        <MasterTablesContext.Provider value={valuesContext}>
            {children}
        </MasterTablesContext.Provider>
    )
}