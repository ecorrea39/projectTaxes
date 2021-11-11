import React, { lazy } from "react";
import {  Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage, Logout } from "../modules/Auth";
import { DashboardPage } from "../pages/DashboardPage";
import TaxesPage from "../pages/taxes";
import AccountStatusPage from "../pages/accountStatus";
import MasterTablesPage from "../pages/masterTables";
import ReportsPage from "../pages/reports";
import { PrivateRoute, PublicRoute } from "./helperRoute";
import { ErrorPage1 } from "../modules/ErrorsExamples/ErrorPage1";

export const RouterPublic = ({isAuth}) => {
    return (
        <>
        {
          <Switch>

            <PublicRoute exact path="/" component={AuthPage} isAuth={isAuth} />
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

export const RouterPrivate = ({isAuth,pathList}) => {
    return (
        <>
        {
          <Switch>
            {
              pathList.map((element,index) => (
                <PrivateRoute exact key={index} path={element.path} component={element.component} isAuth={isAuth} />
              ))
            }
              <Route exact path="/" render={() =>{
                return <Redirect to="/dashboard" />
              }} />
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