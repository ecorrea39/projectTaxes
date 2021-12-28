import React, {Fragment, useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import UserDatosHeader from "./UserDatosHeader";
import UserDatosFormStep1 from "./UserDatosFormStep1";
import UserDatosFormStep2 from "./UserDatosFormStep2";
import UserDatosFormStep3 from "./UserDatosFormStep3";
import UserDatosFormStep4 from "./UserDatosFormStep4";
import UserDatosFormStep5 from "./UserDatosFormStep5";
import axios from "axios";


const UserDatos = (props) => {

  useEffect(() => {

    const rif = localStorage.getItem('rif');
    localStorage.setItem('rifToSearch', rif);

  }, []);

  const [step, setStep] = useState(1);
  const [registrado, setRegistrado] = useState(false);
  const [actaEdicion, setActaEdicion] = useState(false);
  const [adminEdicion, setAdminEdicion] = useState(false);
  const [valoresParaFichaDeRegistro, setValoresParaFichaDeRegistro] = useState({
    tipo: "",
    razon_social: "",
    nombre_comercial: "",
    clase_de_empresa: "",
    actividad_economica: "",
    estatus: "",
    numero_patronal: "",
    numero_de_trabajadores: "",
    oficina: "",
    numero_de_documento: "",
    numero_de_tomo: "",
    numero_de_folio: "",
    numero_de_protocolo: "",
    fecha_constitucion: "",
    domicilio_fiscal: "",
    estado: "",
    municipio: "",
    parroquia: "",
    ciudad: "",
    sector:"",
    sector_texto:"",
    vialidad:"",
    vialidad_texto:"",
    edificacion:"",
    local:"",
    codigo_telefono_compania1:"",
    numero_telefono_compania1:"",
    codigo_telefono_compania2:"",
    numero_telefono_compania2:"",
    correo_empresa:"",
    cedulaLetra1:"",
    cedula_representante_legal1: "",
    nombre_representante_legal1: "",
    apellido_representante_legal1: "",
    codigo_de_area_representante_legal1: "",
    telefono_representante_legal1: "",
    correo_electronico_representante_legal1: "",
    cargo_representante_legal1: "",
    cedulaLetra2:"",
    cedula_representante_legal2: "",
    nombre_representante_legal2: "",
    apellido_representante_legal2: "",
    codigo_de_area_representante_legal2: "",
    telefono_representante_legal2: "",
    correo_electronico_representante_legal2: "",
    cargo_representante_legal2: "",
    cedulaLetra3:"",
    cedula_representante_legal3: "",
    nombre_representante_legal3: "",
    apellido_representante_legal3: "",
    codigo_de_area_representante_legal3: "",
    telefono_representante_legal3: "",
    correo_electronico_representante_legal3: "",
    cargo_representante_legal3: ""
  });

  const cambiarRegistrado = (valor) => {
    setRegistrado(valor);
  }

  const cambiarActaEdicion = (valor) => {
    setActaEdicion(valor);
  }

  const cambiarAdminEdicion = (valor) => {
    setAdminEdicion(valor);
  }

  const cambiarStep = (paso) => {
    setStep(paso);
  }

  const cambiarResumenFichaRegistro1 = (objeto) => {

    //console.log("objeto::::", objeto);

    setValoresParaFichaDeRegistro((prevState) => {
      return {
        ...prevState,
        tipo: objeto.tipo,
        razon_social: objeto.razon_social,
        nombre_comercial: objeto.nombre_comercial,
        clase_de_empresa: objeto.clase_de_empresa,
        actividad_economica: objeto.actividad_economica,
        estatus: objeto.estatus,
        numero_patronal: objeto.numero_patronal,
        numero_de_trabajadores: objeto.numero_de_trabajadores
      };
    });
  };

  const cambiarResumenFichaRegistro2 = (objeto) => {

    //console.log("objeto::::", objeto);

    setValoresParaFichaDeRegistro((prevState) => {
      return {
        ...prevState,
        oficina: objeto.oficina,
        numero_de_documento: objeto.numero_de_documento,
        numero_de_tomo: objeto.numero_de_tomo,
        numero_de_folio: objeto.numero_de_folio,
        numero_de_protocolo: objeto.numero_de_protocolo,
        fecha_constitucion: objeto.fecha_constitucion
      };
    });
  };

  const cambiarResumenFichaRegistro3 = (objeto) => {

    //console.log("objeto::::", objeto);

    setValoresParaFichaDeRegistro((prevState) => {
      return {
        ...prevState,
        domicilio_fiscal: objeto.domicilio_fiscal,
        estado: objeto.estado,
        municipio: objeto.municipio,
        parroquia: objeto.parroquia,
        ciudad: objeto.ciudad,
        sector: objeto.sector,
        sector_texto: objeto.sector_texto,
        vialidad: objeto.vialidad,
        vialidad_texto: objeto.vialidad_texto,
        edificacion: objeto.edificacion,
        local: objeto.local,
        codigo_telefono_compania1: objeto.codigo_telefono_compania1,
        numero_telefono_compania1: objeto.numero_telefono_compania1,
        codigo_telefono_compania2: objeto.codigo_telefono_compania2,
        numero_telefono_compania2: objeto.numero_telefono_compania2,
        correo_empresa: objeto.correo_empresa
      };
    });
  };

  const cambiarResumenFichaRegistro4 = (objeto) => {

    setValoresParaFichaDeRegistro((prevState) => {
      return {
        ...prevState,
        cedulaLetra1: objeto.cedulaLetra1,
        cedula_representante_legal1: objeto.cedula_representante_legal1,
        nombre_representante_legal1: objeto.nombre_representante_legal1,
        apellido_representante_legal1: objeto.apellido_representante_legal1,
        codigo_de_area_representante_legal1: objeto.codigo_de_area_representante_legal1,
        telefono_representante_legal1: objeto.telefono_representante_legal1,
        correo_electronico_representante_legal1: objeto.correo_electronico_representante_legal1,
        cargo_representante_legal1: objeto.cargo_representante_legal1,
        cedulaLetra2: objeto.cedulaLetra2,
        cedula_representante_legal2: objeto.cedula_representante_legal2,
        nombre_representante_legal2: objeto.nombre_representante_legal2,
        apellido_representante_legal2: objeto.apellido_representante_legal2,
        codigo_de_area_representante_legal2: objeto.codigo_de_area_representante_legal2,
        telefono_representante_legal2: objeto.telefono_representante_legal2,
        correo_electronico_representante_legal2: objeto.correo_electronico_representante_legal2,
        cargo_representante_legal2: objeto.cargo_representante_legal2,
        cedulaLetra3: objeto.cedulaLetra3,
        cedula_representante_legal3: objeto.cedula_representante_legal3,
        nombre_representante_legal3: objeto.nombre_representante_legal3,
        apellido_representante_legal3: objeto.apellido_representante_legal3,
        codigo_de_area_representante_legal3: objeto.codigo_de_area_representante_legal3,
        telefono_representante_legal3: objeto.telefono_representante_legal3,
        correo_electronico_representante_legal3: objeto.correo_electronico_representante_legal3,
        cargo_representante_legal3: objeto.cargo_representante_legal3
      };
    });
  };

  return (
    <Fragment>
      <UserDatosHeader formularioActual={step} cambiarFormularioActual={cambiarStep} />

      <br/>

      { step===1 && <UserDatosFormStep1
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        cambiarResumenFicha={cambiarResumenFichaRegistro1}
        cambiarRegistrado={cambiarRegistrado}
        cambiarActaEdicion={cambiarActaEdicion}
        cambiarAdminEdicion={cambiarAdminEdicion}
        registradoValor={registrado}
        actaEdicion={actaEdicion}
        adminEdicion={adminEdicion} />
      }

      { step===2 && <UserDatosFormStep2
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        cambiarResumenFicha={cambiarResumenFichaRegistro2}
        cambiarRegistrado={cambiarRegistrado}
        cambiarActaEdicion={cambiarActaEdicion}
        cambiarAdminEdicion={cambiarAdminEdicion}
        registradoValor={registrado}
        actaEdicion={actaEdicion}
        adminEdicion={adminEdicion} />
      }

      { step===3 && <UserDatosFormStep3
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        cambiarResumenFicha={cambiarResumenFichaRegistro3}
        cambiarRegistrado={cambiarRegistrado}
        cambiarActaEdicion={cambiarActaEdicion}
        cambiarAdminEdicion={cambiarAdminEdicion}
        registradoValor={registrado}
        actaEdicion={actaEdicion}
        adminEdicion={adminEdicion} />
      }

      { step===4 && <UserDatosFormStep4
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        cambiarResumenFicha={cambiarResumenFichaRegistro4}
        cambiarRegistrado={cambiarRegistrado}
        cambiarActaEdicion={cambiarActaEdicion}
        cambiarAdminEdicion={cambiarAdminEdicion}
        registradoValor={registrado}
        actaEdicion={actaEdicion}
        adminEdicion={adminEdicion} />
      }

      { step===5 && <UserDatosFormStep5
        formularioActual={step}
        cambiarFormularioActual={cambiarStep}
        resumenFichaRegistro={valoresParaFichaDeRegistro} />
      }

    </Fragment>
  );
}

export default UserDatos;