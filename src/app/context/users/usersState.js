import React, { useEffect, useState} from 'react';
import {clientAxios, requestConfig } from '../../config/configAxios';
import UsersContext from './usersContext';

export const UsersState = ({ children }) => {

    const [usersList, setUsersList] = useState([]);
    const [userSlct, setUserSlct] = useState("");
    const [groupsList, setGroupsList] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [unidadesEstatales, setUnidadesEstatales] = useState([]);
    const [statusList, setStatusList] = useState([
        {
            status: "0",
            name: "Activo"
        },
        {
            status: "1",
            name: "Desactivado"
        },
        {
            status: "2",
            name: "Deshabilitado"
        }
    ]);

    useEffect(()=>{
        getUsers();
        getGroups();
        getUnidadEstatal();
    },[]);

    const setUserDataList = (data) => {
        
        let arrayUser = [];
        data.map((element)=> {
            let object = {
                uid: element.attributes.uid,
                id: element.id,
                nombre: element.attributes.name,
                apellido: element.attributes.surname,
                correo: element.attributes.mail,
                usuario: element.attributes.alias,
                grupo_id: '06',
                status: element.attributes.status,
                unid_estatal_tributo: "03",
                fecha_creacion: '01/01/2021',
                permisos: []
            }
            arrayUser.push(object);
            console.log(arrayUser)
        });
        setUsersList(arrayUser);
    }

    const getUsers = async () => {
        
        try {
            setLoadingTable(true);
            const respuesta = await clientAxios.get('/access_control/users/grupos/');
            //setUserDataList(respuesta.data.data);
            setUsersList(respuesta.data.data);
            setLoadingTable(false);
        } catch (error) {
            setLoadingTable(false);
            console.log(error)
        }
    }

    const formatDataGroupsList = (data) => {

        let array = [];

        data.map((grupo) => {
            let object = {
                id: grupo.id,
                name: grupo.attributes.name,
                fecha_creacion: grupo.attributes.fecha,
                cant_usuarios: grupo.attributes.cant_usuarios,
                status: grupo.attributes.status,
                permisos: grupo.attributes.permisos
            }
            array.push(object);
        });
        setGroupsList(array);
    }

    const getGroups = async () => {
        try {
            const respuesta = await clientAxios.get('/access_control/');
            formatDataGroupsList(respuesta.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getUnidadEstatal = async () => {
        try {
            const respuesta = await clientAxios.get(`/unidad_estadal/3`);
            setUnidadesEstatales([
                {
                    asignacion: "TRIBUTOS APURE",
                    cod: "03",
                    id: 1
                },
                {
                    asignacion: "TRIBUTOS AMAZONAS",
                    cod: "04",
                    id: 2
                }
            ])
        } catch (error) {
            console.log(error)
        }
    }

    const addNewUser = async (formData) => {
        try {
            let grupo = [formData.grupo];
            formData.grupo = grupo;
            requestConfig.data.type = "saveAccessControl";
            requestConfig.data.attributes = formData;
            await clientAxios.post('/access_control/',requestConfig);
            return;

        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (formData) => {
        console.log(formData)
        try {
            requestConfig.data.type = "updateuSERp";
            requestConfig.data.attributes = formData;
            // const respuesta = await clientAxios.get('/cuentas_banco/');
        } catch (error) {
            console.log(error)
        }
    }

    const updateUserStatus = async (formData) => {
        console.log(formData)
        try {
            requestConfig.data.type = "updateUser";
            requestConfig.data.attributes = formData;
            // const respuesta = await clientAxios.get('/cuentas_banco/');
        } catch (error) {
            console.log(error)
        }
    }

    const printInfoUser = (formData) => {
        console.log(formData)
        try {
            requestConfig.data.type = "updateUser";
            requestConfig.data.attributes = formData;
            // const respuesta = await clientAxios.get('/cuentas_banco/');
        } catch (error) {
            console.log(error)
        }
    }

    const valuesContext = {
        usersList,
        userSlct,
        groupsList,
        unidadesEstatales,
        statusList,
        loadingTable,
        setStatusList,
        setUnidadesEstatales,
        setGroupsList,
        setUsersList,
        setUserSlct,
        addNewUser,
        updateUser,
        updateUserStatus,
        printInfoUser
    }

    return (
        <UsersContext.Provider value={valuesContext}>
            {children}
        </UsersContext.Provider>
    )

}