import React, { Suspense, lazy } from "react";
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

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);
const UserDatospage = lazy(() =>
  import("./modules/User/UserDatos")
);
const Mapapage = lazy(() =>
  import("./modules/Mapa/Mapa")
);
const FondosDeComerciopage = lazy(() =>
  import("./modules/FondoDeComercio/FondoDeComercio")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

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
        <Route path="/user-profile" component={UserProfilepage} />
        <Route path="/user-datos" component={UserDatospage} />
        <Route path="/mapa" component={Mapapage} />
        <Route path="/fondosdecomercio" component={FondosDeComerciopage} />

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
