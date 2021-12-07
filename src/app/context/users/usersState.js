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

    const getUsers = async () => {
        
        try {
            setLoadingTable(true);
            const respuesta = await clientAxios.get('/access_control/');
            //setUserGroupsList(respuesta.data.data);
            setUsersList([
                {
                    id: 1,
                    nombre: 'Eduard',
                    apellido: 'Correa',
                    correo: 'correaeduard39@gmail.com',
                    usuario: 'ecorrea',
                    grupo: '06',
                    status: "1",
                    unid_estatal_tributo: "03",
                    fecha_creacion: '01/01/2021'
                }
            ]);
            setLoadingTable(false);
        } catch (error) {
            setLoadingTable(false);
            console.log(error)
        }
    }

    const getGroups = async () => {
        try {

            // const respuesta = await clientAxios.get('/access_control/');
            // setGroupsList(respuesta.data.data);
            setGroupsList([
                {
                    id: 1,
                    name: 'Administradores',
                    fecha_creacion: '01/01/2021',
                    cant_usuarios: '06',
                    status: "1",
                },
                {
                    id: 2,
                    name: 'Usurios',
                    fecha_creacion: '01/01/2021',
                    cant_usuarios: '06',
                    status: "1",
                }
            ]);
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
            requestConfig.data.type = "saveAccessControl";
            requestConfig.data.attributes = formData;
            // await clientAxios.post('/access_control/',requestConfig);
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