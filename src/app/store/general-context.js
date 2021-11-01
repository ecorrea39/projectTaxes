import React, {useState} from "react";

const GeneralContext = React.createContext({
  theIdUserInformacion: '',
  theIdUserInformacionProfile: '',
  theRazonSocialProfile:'',
  theTipoDeEmpresa: '',
  theRazonSocial:'',
  iniIdUserInformacion: (idUserInformacion) => {
  },
  iniIdUserInformacionProfile: (idUserInformacion) => {
  },
  iniRazonSocialProfile: (razonSocial) => {
  },
  iniTipoDeEmpresa: (tipoDeEmpresa) => {
  },
  iniRazonSocial: (razonSocial) => {
  },
});

export const GeneralContextProvider = (props) => {

  const [idUserInformacion, setIdUserInformacion] = useState(null);

  const [idUserInformacionProfile, setIdUserInformacionProfile] = useState(null);

  const [razonSocialProfile, setRazonSocialProfile] = useState(null);

  const [tipoDeEmpresa, setTipoDeEmpresa] = useState(null);

  const [razonSocial, setRazonSocial] = useState(null);

  const idUserInformacionHandler = (idUserInformacion) => {
    setIdUserInformacion(idUserInformacion);
  };

  const idUserInformacionProfileHandler = (idUserInformacion) => {
    setIdUserInformacionProfile(idUserInformacion);
  };

  const razonSocialProfileHandler = (razonSocial) => {
    setRazonSocialProfile(razonSocial);
  };

  const tipoDeEmpresaHandler = (tipoDeEmpresa) => {
    setTipoDeEmpresa(tipoDeEmpresa);
  };

  const razonSocialHandler = (razonSocial) => {
    setRazonSocial(razonSocial);
  };

  const contextValue = {

    theIdUserInformacion: idUserInformacion,
    theIdUserInformacionProfile: idUserInformacionProfile,
    theRazonSocialProfile: razonSocialProfile,
    theTipoDeEmpresa: tipoDeEmpresa,
    theRazonSocial: razonSocial,
    iniIdUserInformacion: idUserInformacionHandler,
    iniIdUserInformacionProfile: idUserInformacionProfileHandler,
    iniRazonSocialProfile: razonSocialProfileHandler,
    iniTipoDeEmpresa: tipoDeEmpresaHandler,
    iniRazonSocial: razonSocialHandler
  }

  return (
    <GeneralContext.Provider value={contextValue}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default  GeneralContext;