import React, { lazy } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { DashboardPage } from "../pages/DashboardPage";

const UserDatosPage = lazy(() =>
  import("../modules/User/UserDatos")
);
const MapaPage = lazy(() =>
  import("../modules/Mapa/Mapa")
);
const FondosDeComercioPage = lazy(() =>
  import("../modules/FondoDeComercio/FondoDeComercio")
);
const ReporteComprobanteDeInscripcionPage = lazy(() =>
  import("../modules/Reports/ComprobanteDeInscripcion")
);
const CrearFondosDeComercioPage = lazy(() =>
  import("../modules/FondoDeComercio/FondoDeComercioCrear")
);
const ActasDeAsambleaPage = lazy(() =>
  import("../modules/ActaDeAsamblea/ActaDeAsamblea")
);
const UserProfilePage = lazy(() =>
  import("../modules/UserProfile/UserProfilePage")
);
const MasterTablesPage = lazy(() =>
  import("../pages/masterTables")
);
const ReportsPage = lazy(() =>
  import ("../pages/reports")
);
const TaxesPage = lazy(() =>
  import ("../pages/taxes")
);
const AccountStatusPage = lazy(() =>
  import ("../pages/accountStatus")
);


/**
 * En este objeto se definen la estrutura de las rutas que se crearan segun el grupo del usuario que se logea en la app.
 * @path Ruta path del router
 * @groups Grupos que tendran permisos de ver esa ruta.
 * @name: Nombre de la ruta.
 * @component E componente que llamara esa ruta.
 */
export const PathListContribuyente = [
  {
    path: "/dashboard",
    groups: ["contribuyentes","parciales","administradores"],
    name: "Inicio",
    component: DashboardPage
  },
  {
    path: "/tributos",
    groups: ["contribuyentes"],
    name: "Declaración y Reporte de pago",
    component: TaxesPage
  },
  {
    path: "/estado-cuentas",
    groups: ["contribuyentes"],
    name: "Estado de cuenta",
    component: AccountStatusPage
  },
  {
    path: "/fondos-de-comercio",
    groups: ["contribuyentes"],
    name: "Fondos de Comercio",
    component: FondosDeComercioPage
  },
  {
    path: "/crear-fondocomercio",
    groups: ["contribuyentes"],
    name: "Crear Fondos de Comercio",
    component: CrearFondosDeComercioPage
  },
  {
    path: "/actas-de-asamblea",
    groups: ["contribuyentes"],
    name: "Crear Fondos de Comercio",
    component: ActasDeAsambleaPage
  },
  {
    path: "/user-datos",
    groups: ["contribuyentes"],
    name: "Entidad de trabajo",
    component: UserDatosPage
  },
  {
    path: "/comprobante-de-inscripcion",
    groups: ["contribuyentes"],
    name: "Comprobante de inscripción",
    component: ReporteComprobanteDeInscripcionPage
  },
  {
    path: "/reportes/certificado-solvencia",
    groups: ["contribuyentes"],
    name: "Certificado de solvencia",
    component: ReportsPage
  },
  {
    path: "/user-datos",
    groups: ["contribuyentes", "parciales"],
    name: "Modificar perfil",
    component: UserDatosPage
  },
  {
    path: "/user-profile",
    groups: ["contribuyentes", "parciales"],
    name: "user-profile",
    component: UserProfilePage
  },
  {
    path: "/user-datos",
    groups: ["contribuyentes", "parciales"],
    name: "Cambiar clave",
    component: UserDatosPage
  }
];

export const PathListFuncional = [
  {
    path: "/tablas/:tabla",
    groups: ["administradores"],
    name: "Trimestres",
    component: MasterTablesPage
  },
  {
    path: "/mapa",
    groups: ["administradores"],
    name: "Mapa",
    component: MapaPage
  }
];

/**
 * Este objeto se define la estructura del menu sidebar.
 * @title Es el titulo principal del menu.
 * @groups Los grupos para los cuales las rutas seran visibles o permitidas.
 * @childrens Las rutas que estaran bajo el titulo principal en el menu.
 * @url La ruta que se llamara al darle clik.
 */
export const navFuncional = [
  {
    title: "Tablas Maestras",
    groups: ["administradores"],
    icon: "",
    childrens: [
      {
        title: "Trimestres",
        url: "/tablas/trimestre",
        icon: "",
        slug: "tablas-trimestre",
      },
      {
        title: "Formas de pago",
        url: "/tablas/forma-pago",
        icon: "",
        slug: "tablas-forma-pago",
      },
      {
        title: "Bancos recaudadores",
        url: "/tablas/bancos-recaudadores",
        icon: "",
        slug: "tablas-bancos-recaudadores",
      },
      {
        title: "Cuentas Recaudadoras",
        url: "/tablas/cuentas-recaudadoras",
        icon: "",
        slug: "tablas-cuentas-recaudadoras",
      },
      {
        title: "Estatus entidad de trabajo",
        url: "/tablas/estatus-entidad-trabajo",
        icon: "",
        slug: "tablas-estatus-entidad-trabajo",
      },
      {
        title: "Clase de entidad de trabajo",
        url: "/tablas/clase-empresa",
        icon: "",
        slug: "tablas-clase-empresa",
      }
    ]
  },
  {
    title: "Reportes",
    groups: ["administradores"],
    icon: "",
    childrens: [
      {
        title: "Trimestres",
        url: "/mapa",
        icon: "",
        slug: "mapa",
      }
    ]
  }
];

export const navContribuyentes = [
  {
    title: "Tributos",
    groups: ["contribuyentes"],
    icon: "",
    childrens: [
      {
        title: "Declaración y Reporte de pago",
        url: "/tributos",
        icon: "",
        slug: "tributos",
      },
      {
        title: "Entidad de trabajo",
        url: "/user-datos",
        icon: "",
        slug: "entidad-de-trabajo",
      },
      {
        title: "Estado de cuenta",
        url: "/estado-cuentas",
        icon: "",
        slug: "estado-cuentas",
      },
      {
        title: "Fondos de Comercio",
        url: "/fondo-de-comercio",
        icon: "",
        slug: "fondos-de-Comercio",
      },
      {
        title: "Actas de asamblea",
        url: "/actas-de-asamblea",
        icon: "",
        slug: "actas-de-asamblea",
      }
    ]
  },
  {
    title: "Reportes",
    groups: ["contribuyentes"],
    childrens: [
      {
        title: "Comprobante de inscripción",
        url: "/comprobante-de-inscripcion",
        icon: "",
        slug: "comprobante-de-inscripción",
      },
      {
        title: "Certificado de solvencia",
        url: "/reportes/certificado-solvencia",
        icon: "",
        slug: "certificado-de-solvencia",
      },
    ]
  },
  {
    title: "Perfil del contribuyente",
    groups: ["contribuyentes", "parciales"],
    childrens: [
      {
        title: "Modificar perfil",
        url: "/user-datos",
        icon: "",
        slug: "modificar-perfil",
      },
      {
        title: "user-profile",
        url: "/user-profile",
        icon: "",
        slug: "user-profile",
      },
      {
        title: "Cambiar clave",
        url: "/user-datos",
        icon: "",
        slug: "cambiar-clave",
      },
    ]
  },
  {
    title: "Tributos",
    groups: ["contribuyentes"],
    childrens: []
  }
];

export const PublicRoute = ({component, isAuth, ...options}) => {
  if (!isAuth) return <Route {...options} component={component} />
  return <Redirect to="/dashboard" />
}

export const PrivateRoute = ({component,isAuth, ...options}) => {
  if (isAuth) return <Route {...options} component={component} />
  return <Redirect to="/auth/login" />
}