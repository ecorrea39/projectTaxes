import React, {useState} from "react";

const GeneralContext = React.createContext({
  theTipoDeEmpresa: '',
  theRazonSocial:'',
  iniTipoDeEmpresa: (tipoDeEmpresa) => {
  },
  iniRazonSocial: (razonSocial) => {
  },
});

export const GeneralContextProvider = (props) => {

  const [tipoDeEmpresa, setTipoDeEmpresa] = useState(null);

  const [razonSocial, setRazonSocial] = useState(null);

  const tipoDeEmpresaHandler = (tipoDeEmpresa) => {
    setTipoDeEmpresa(tipoDeEmpresa);
  };

  const razonSocialHandler = (razonSocial) => {
    setRazonSocial(razonSocial);
  };

  const contextValue = {
    theTipoDeEmpresa: tipoDeEmpresa,
    theRazonSocial: razonSocial,
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