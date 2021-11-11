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
  const ActasDeAsambleaPage = lazy(() =>
    import("./modules/ActaDeAsamblea/ActaDeAsamblea")
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
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <Route exact path="/tributos" component={TaxesPage}  />
        <Route exact path="/estado-cuentas" component={AccountStatusPage} />
        <Route exact path="/tablas/:tabla" component={MasterTablesPage} />
        <Route exact path="/reportes/:reporte" component={ReportsPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilePage} />
        <Route path="/user-datos" component={UserDatosPage} />
        <Route path="/mapa" component={MapaPage} />
        <Route path="/fondosdecomercio" component={FondosDeComercioPage} />
        <Route path="/comprobantedeinscripcion" component={ReporteComprobanteDeInscripcionPage} />
        <Route path="/crearfondocomercio" component={CrearFondosDeComercioPage} />
        <Route path="/actasdeasamblea" component={ActasDeAsambleaPage} />

    </Switch>
  </Suspense>
  );
}
