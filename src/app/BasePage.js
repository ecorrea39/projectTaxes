import React, { Suspense, lazy, useContext, useState, useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { DashboardPage } from "./pages/DashboardPage";
import TaxesPage from "./pages/taxes";
import AccountStatusPage from "./pages/accountStatus";
import MasterTablesPage from "./pages/masterTables";
import ReportsPage from './pages/reports';
import { UserDatos } from "./modules/User/UserDatos";
import { AuthPage, Logout } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import { PrivateRoute } from "./router/helperRoute";
import AuthContext from "./store/auth-context";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilePage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);
const UserDatosPage = lazy(() =>
  import("./modules/User/UserDatos")
);
const MapaPage = lazy(() =>
  import("./modules/Mapa/Mapa")
);
const FondosDeComercioPage = lazy(() =>
  import("./modules/FondoDeComercio/FondoDeComercio")
);
const ReporteComprobanteDeInscripcionPage = lazy(() =>
  import("./modules/Reports/ComprobanteDeInscripcion")
);
const CrearFondosDeComercioPage = lazy(() =>
  import("./modules/FondoDeComercio/FondoDeComercioCrear")
);

export default function BasePage() {


  const authCtx = useContext(AuthContext);
  const [isAuthorized, setAuthorized] = useState(authCtx.isLoggedIn);

  console.log(isAuthorized);

  useEffect(()=>{
    setAuthorized(authCtx.isLoggedIn)
  },[authCtx.isLoggedIn])

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
    <Switch>
      <PrivateRoute exact path="/dashboard" component={DashboardPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/tributos" component={TaxesPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/estado-cuentas" component={AccountStatusPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/tablas/:tabla" component={MasterTablesPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/reportes/:reporte" component={ReportsPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/user-profile" component={UserProfilePage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/user-datos" component={UserDatosPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/mapa" component={MapaPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/fondosdecomercio" component={FondosDeComercioPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/comprobantedeinscripcion" component={ReporteComprobanteDeInscripcionPage} isAuth={isAuthorized} />
      <PrivateRoute exact path="/crearfondocomercio" component={CrearFondosDeComercioPage} isAuth={isAuthorized} />
      <Route exact path="/" render={() =>{
        return <Redirect to={isAuthorized ? "/dashboard" : "/auth/login"} />
      }} />

    </Switch>
  </Suspense>
  );
}
