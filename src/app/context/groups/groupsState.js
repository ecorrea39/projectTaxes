import React, { useEffect, useState} from 'react';
import {clientAxios, requestConfig } from '../../config/configAxios';
import GroupsContext from './groupsContext';
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export const GroupsState = ({ children }) => {

    let history = useHistory();
    const [userGroupsList, setUserGroupsList] = useState([]);
    const [groupSlct, setGroupSlct] = useState("");
    const [redired, setRedired] = useState(false);
    const [statusList, setStatusList] = useState([
        {
            status: "1",
            name: "Activo"
        },
        {
            status: "2",
            name: "Desactivar"
        },
        {
            status: "3",
            name: "Deshabilitado"
        }
    ]);

    const [formPermisos, setFormPermisos] = useState([]);
    const [permissions, setPermissions] = useState([
        {
            modulo: "Finanza",
            modulo_id: "1",
            permisos: [
                {
                    name: "leer",
                    active: false
                },
                {
                    name: "escribir",
                    active: false
                },
                {
                    name: "eliminar",
                    active: false
                },
                {
                    name: "ejecutar",
                    active: false
                },
                {
                    name: "importar",
                    active: false
                },
                {
                    name: "exportar",
                    active: false
                }               
            ]
        },
        {
            modulo: "Usuarios",
            modulo_id: "2",
            permisos: [
                {
                    name: "leer",
                    active: false
                },
                {
                    name: "escribir",
                    active: false
                },
                {
                    name: "eliminar",
                    active: false
                },
                {
                    name: "ejecutar",
                    active: false
                },
                {
                    name: "importar",
                    active: false
                },
                {
                    name: "exportar",
                    active: false
                }                      
            ]
        }
    ]);

    useEffect(()=>{
        getUserGroups();
        getFormPermisos();
    },[]);

    useEffect(()=>{
        // getFormPermisos();
    },[permissions]);

    const getFormPermisos = () => {

        let arrayPermission = [];
        permissions.forEach(element => {
            let objectPermisson = {
                modulo_id: element.modulo_id,
                modulo: element.modulo,
            }
            element.permisos.forEach(permiso => {
                objectPermisson[ permiso.name ] = permiso.active;
            });
            arrayPermission.push(objectPermisson);
        });
        setFormPermisos(arrayPermission);
    }

    const getUserGroups = async () => {

        try {

            const respuesta = await clientAxios.get('/access_control/');
            //setUserGroupsList(respuesta.data.data);
            setUserGroupsList([
                {
                    id: 1,
                    name: 'Administradores',
                    fecha_creacion: '01/01/2021',
                    cant_usuarios: '06',
                    status: "1",
                },
                {
                    id: 2,
                    name: 'Gerente de linea',
                    fecha_creacion: '02/01/2021',
                    cant_usuarios: '10',
                    status: "0",
                },
                {
                    id: 3,
                    name: 'Coordinadores',
                    fecha_creacion: '02/01/2021',
                    cant_usuarios: '2',
                    status: "2",
                }
            ]);
        } catch (error) {
            console.log(error)
        }
    }

    const addNewGroup = async (formData) => {
        try {
            requestConfig.data.type = "saveAccessControl";
            requestConfig.data.attributes = formData;
            await clientAxios.post('/access_control/',requestConfig);
            return;

        } catch (error) {
            console.log(error)
        }
    }

    const updateGroup = async (formData) => {
        console.log(formData)
        try {
            requestConfig.data.type = "updateGroup";
            requestConfig.data.attributes = formData;
            // const respuesta = await clientAxios.get('/cuentas_banco/');
        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus = async (formData) => {
        try {
            requestConfig.data.type = "updateStatusGroup";
            requestConfig.data.attributes = {status: formData.status};
            await clientAxios.patch(`/access_control/${formData.id_group}`,requestConfig);
            Swal.fire({
                title: `Operación exitosa`,
                text: `El grupo ${formData.name} fue actualizado con éxito.`,
                button: "Ok",
                icon: 'success'
            });
            getUserGroups();
        } catch (error) {
            console.log(error)
        }
    }

    const valuesContext = {
        userGroupsList,
        groupSlct, 
        statusList,
        permissions,
        formPermisos,
        redired,
        setRedired,
        setFormPermisos,
        setPermissions,
        addNewGroup,
        updateGroup,
        updateStatus,
        setGroupSlct
    }

    return (
        <GroupsContext.Provider value={valuesContext}>
            {children}
        </GroupsContext.Provider>
    )

}