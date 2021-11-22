import React, { useContext, useEffect } from "react";
import { Field } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { Form } from "formik";
import BaseInput from "../../Forms/BaseInputs";
import GroupsContext from "../../../context/groups/groupsContext";
import BaseSelect from "../../Forms/BaseSelect";
import { Permissions } from "./permissions";

export const BaseFormik = ({props,formik}) => {

    const { groupSlct, statusList, permissions, formPermisos, setFormPermisos } = useContext(GroupsContext);
    //const [formPermisos, setFormPermisos] = useState([]);
    const { action } = props;

    /**
      * @e evento onChange.
      * @modulo en el cual se estan agregando los permisos El: Finanzas
      * @Permiso el permiso que activa el evento (es un objeto) 
      * */
    const handleToggle = (e, modulo, permiso) => {
        /** Es una copia del state donde se guardan los permisos  */
        let selected = [...formPermisos];
        /** Obtengo la posicion en el array del objeto segun el modulo que se estan asignando los permisos*/
        let findModulo = selected.findIndex(item => item.modulo === modulo);
        
        /** Si findModulo es mayor a -1 es porque no existe el modulo en el array de los permisos,
         *  por lo tanto se agrega los permisos */
        if(findModulo > -1) {
            // Selecciono el objeto segun el modulo
            let UPmodulo = selected.find( m => m.modulo === modulo );
            // Obtengo los permisos del objeto modulo
            let permisos = UPmodulo.permisos;
            // Obtengo la posicion de los permisos
            let findPermiso = permisos.findIndex(item => item.name === permiso.name);
            // Si los permisos existen los eliminos del objeto
            if(findPermiso > -1) {
                selected[findModulo].permisos.splice(findPermiso,1);
                // si el modulo se queda sin permisos lo elimino del array
                if( selected[findModulo].permisos.length == 0 ) {
                    selected.splice(findModulo,1);
                }
            } else {
                // Agrego los permisos al objeto segun el modulo
                selected[findModulo].permisos.push(permiso);
            }

        } else {
            // Agrego el modulo si no existe en el array
            selected.push({modulo: modulo, permisos: [permiso]});
        }
        // actualizo el state con los nuevos permisos
        setFormPermisos(selected);
    }

    useEffect(()=>{
        if(action == "update") {
            formik.setValues(groupSlct);
        } else {
            formik.resetForm();
        }
    },[action]);

    return (
        <Form className="form form-label-right">

            <Row className="mt-4 mb-4">
                <Col xs="12" sm="12" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                    <label htmlFor="referencia" className="font-weight-bold">
                        Nombre del grupo
                    </label>
                    <Field
                        id="nombre-grupo"
                        name="name"
                        placeholder="Ej: Administradores"
                        component={BaseInput}
                        maxLength="35"
                        minLength="4"
                        disabled={ action == "update"}
                    />
                </Col>
                {
                    action == "update" && 
                    <>
                        <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                            <label htmlFor="referencia" className="font-weight-bold">
                                Fecha de creación
                            </label>
                            <Field
                                id="fecha-creacion"
                                name="fecha_creacion"
                                component={BaseInput}
                                disabled={ action == "update"}
                            />
                        </Col>
                        <Col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4" className="mb-6">
                            <label htmlFor="referencia" className="font-weight-bold">
                                Estatus del grupo
                            </label>
                            <Field
                                type="select"
                                id="status"
                                name="status"
                                component={BaseSelect}
                            >
                                <option value="" disabled>. . .</option>
                                {
                                    statusList.map(element => (
                                        <option
                                            key={element.status}
                                            value={element.name}
                                        >
                                            {element.name}
                                        </option>
                                    ))
                                }
                            </Field>
                        </Col>
                        
                    </>
                }
            </Row>

            <Permissions
                permissions={permissions}
                formik={formik}
                formPermisos={formPermisos}
                setFormPermisos={setFormPermisos} />

            <Row className="mb-2" style={{justifyContent: "center"}}>

                <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                    <Button 
                        type="submit"
                        className="btn btn-sm btn-info font-size-sm w-100">
                            {props.action === 'add' ? 'Guardar' : 'Actualizar'}
                    </Button>
                </Col>

                <Col className="mb-2" xs="6" sm="6" md="6" lg="6" xl="6" xxl="6" >
                    <Button 
                        className="btn btn-sm btn-danger font-size-sm w-100">Cerrar</Button>
                </Col>

            </Row>                 

        </Form>
    )
}