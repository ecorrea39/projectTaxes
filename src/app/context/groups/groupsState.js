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
    const [loadingTable, setLoadingTable] = useState(false);
    const [statusList, setStatusList] = useState([
        {
            status: "1",
            name: "Activo"
        },
        {
            status: "0",
            name: "Desactivado"
        },
        {
            status: "2",
            name: "Deshabilitado"
        }
    ]);
    // Lista de permisos para los modulos
    const [permisos, setPermisos] = useState([
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
    ]);
    // Este es el state que se modificara y se enviara al api.
    const [formPermisos, setFormPermisos] = useState([]);
    // Este es el state que tiene los permisos que estan registrados en la base de datos.
    const [permissions, setPermissions] = useState([]);

    useEffect(()=>{
        getUserGroups();
        getModulos();
    },[]);


    // Metodo para crear los permisos en el formulario
    const getFormPermisos = (data) => {
        let arrayPermission = [];
        data.forEach(element => {
            let objectPermisson = {
                modulo_id: element.id,
                modulo: element.attributes.name,
                status: element.attributes.status,
                leer: false,
                escribir: false,
                eliminar: false,
                ejecutar: false,
                importar: false,
                exportar: false,
            }
            arrayPermission.push(objectPermisson) ;
        });
        setFormPermisos(arrayPermission);
    }

    // Metodo para asignar permisos a los modulos
    const getModulosPermisos = (data) => {
        let array = [];
        data.forEach(element => {
            let objectPermisson = {
                modulo: element.attributes.name,
                modulo_id: element.id,
                status: element.attributes.status,
                permisos: permisos
            }
            array.push(objectPermisson);
        });
        setPermissions(array);
    }

    const getGrupoInfo = async (grupoId) => {
        try {
            const respuesta = await clientAxios.get(`/access_control/${grupoId}`);
            setGroupSlct(respuesta.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    // Metodo para consultar los modulos
    const getModulos = async () => {
        try {
            const respuesta = await clientAxios.get('/modulos/');
            getFormPermisos(respuesta.data.data);
        } catch (error) {
            setLoadingTable(false);
            console.log(error)
        }
    }

    const getDataPermisos = (data) => {
        let arrayPermission = [];
        data.forEach(element => {
            let objectGrupo = {
                id: element.id,
                attributes: {
                    cant_usuarios: element.attributes.cant_usuarios,
                    fecha: element.attributes.fecha,
                    name: element.attributes.name,
                    status: element.attributes.status,
                    permisos: []
                }
            }

            let permisos = element.attributes.permisos;

            permisos.forEach(per => {
                let objectPermisos = {
                    modulo_id: per.modulo_id,
                    modulo: per.modulo,
                    permiso_id: per.permiso_id
                }

                per.permisos.forEach(permiso => {
                    objectPermisos[ permiso.name ] = permiso.active;
                });
                objectGrupo.attributes.permisos.push(objectPermisos);
            });

            arrayPermission.push(objectGrupo);

        });
        setUserGroupsList(arrayPermission);
    }

    const getUserGroups = async () => {

        try {
            setLoadingTable(true);
            const respuesta = await clientAxios.get('/access_control/');
            getDataPermisos(respuesta.data.data);
            // setUserGroupsList(respuesta.data.data);
            setLoadingTable(false);
        } catch (error) {
            setLoadingTable(false);
            console.log(error)
        }
    }

    const addNewGroup = async (formData) => {
        try {
            requestConfig.data.type = "saveAccessControl";
            requestConfig.data.attributes = formData;
            await clientAxios.post('/access_control/',requestConfig);
            getUserGroups();
            return;

        } catch (error) {
            console.log(error)
        }
    }

    const updateGroup = async (formData) => {
        try {
            requestConfig.data.type = "saveAccessControl";
            requestConfig.data.attributes = formData;
            let uid = requestConfig.data.id;
            // requestConfig.data.id = formData.permisos.id;
            requestConfig.data.id = formData.id;
            const respuesta = await clientAxios.put('/access_control/',requestConfig);
            requestConfig.data.id = uid;
            getUserGroups();
        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus = async (formData) => {
        try {
            requestConfig.data.type = "updateStatusGroup";
            requestConfig.data.attributes = formData;
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
        loadingTable,   
        setRedired,
        setFormPermisos,
        setPermissions,
        addNewGroup,
        updateGroup,
        updateStatus,
        setGroupSlct,
        getGrupoInfo
    }

    return (
        <GroupsContext.Provider value={valuesContext}>
            {children}
        </GroupsContext.Provider>
    )

}