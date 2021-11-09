import React, { lazy } from "react";
import {  Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage, Logout } from "../modules/Auth";
import { DashboardPage } from "../pages/DashboardPage";
import TaxesPage from "../pages/taxes";
import AccountStatusPage from "../pages/accountStatus";
import MasterTablesPage from "../pages/masterTables";
import ReportsPage from "../pages/reports";
import { BuilderPage } from "../pages/BuilderPage";
import { MyPage } from "../pages/MyPage";
import { PrivateRoute, PublicRoute } from "./helperRoute";
import ErrorsPage from "../modules/ErrorsExamples/ErrorsPage";
import { ErrorPage1 } from "../modules/ErrorsExamples/ErrorPage1";

const GoogleMaterialPage = lazy(() =>
  import("../modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("../modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("../modules/ECommerce/pages/eCommercePage")
);
const UserProfilePage = lazy(() =>
  import("../modules/UserProfile/UserProfilePage")
);
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

export const RouterPublic = ({isAuth}) => {
    return (
        <>
        {
          <Switch>

            <PublicRoute exact path="/auth/login" component={AuthPage} isAuth={isAuth} />
            <Route exact path="/auth" render={() =>{
              return <Redirect to="/auth/login" />
            }} />
            <PublicRoute exact path="/error/pagina-no-encontrada" component={ErrorPage1} isAuth={isAuth} />
            <Route path="/**" render={() =>{
              return <Redirect to="/error/pagina-no-encontrada" />
            }} />

          </Switch>
        }
        </>
      )
};

export const RouterPrivate = ({isAuth}) => {
    return (
        <>
        {
          <Switch>
              <PrivateRoute path="/dashboard" component={DashboardPage} isAuth={isAuth} />
              <PrivateRoute exact path="/tributos" component={TaxesPage}  />
              <PrivateRoute exact path="/estado-cuentas" component={AccountStatusPage} isAuth={isAuth} />
              <PrivateRoute exact path="/tablas/:tabla" component={MasterTablesPage} isAuth={isAuth} />
              <PrivateRoute exact path="/reportes/:reporte" component={ReportsPage} isAuth={isAuth} />
              <PrivateRoute path="/builder" component={BuilderPage} isAuth={isAuth} />
              <PrivateRoute path="/my-page" component={MyPage} isAuth={isAuth} />
              <PrivateRoute exact path="/google-material" component={GoogleMaterialPage} isAuth={isAuth} />
              <PrivateRoute exact path="/react-bootstrap" component={ReactBootstrapPage} isAuth={isAuth} />
              <PrivateRoute exact path="/e-commerce" component={ECommercePage} isAuth={isAuth} />
              <PrivateRoute exact path="/user-profile" component={UserProfilePage} isAuth={isAuth} />
              <PrivateRoute exact path="/user-datos" component={UserDatosPage} isAuth={isAuth} />
              <PrivateRoute exact path="/mapa" component={MapaPage} isAuth={isAuth} />
              <PrivateRoute exact path="/fondosdecomercio" component={FondosDeComercioPage} isAuth={isAuth} />
              <PrivateRoute exact path="/comprobantedeinscripcion" component={ReporteComprobanteDeInscripcionPage} isAuth={isAuth} />
              <PrivateRoute exact path="/crearfondocomercio" component={CrearFondosDeComercioPage} isAuth={isAuth} />
              <Route path="/auth" render={() =>{
                return <Redirect from="/auth" to="/dashboard" />
              }} />
              <PrivateRoute exact path="/logout" component={Logout} isAuth={isAuth} />
              <PrivateRoute exact path="/error/pagina-no-encontrada" component={ErrorPage1} isAuth={isAuth} />
              <Route path="/**" render={() =>{
                return <Redirect to="/error/pagina-no-encontrada" />
              }} />
          </Switch>
        }
        </>
    )
}