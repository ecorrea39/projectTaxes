import React from "react";
import {  Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage, Logout } from "../modules/Auth";
import { PrivateRoute, PublicRoute } from "./helperRoute";
import { ErrorPage1 } from "../modules/ErrorsExamples/ErrorPage1";

export const RouterPublic = ({isAuth,urlDash}) => {
    return (
        <>
        {
          <Switch>
            {/*
            <PublicRoute exact path="/" component={AuthPage} isAuth={isAuth} />
            <PublicRoute exact path="/auth/login" component={AuthPage} isAuth={isAuth} />
            <PublicRoute exact path="/auth/forgot-password" component={ForgotPassword} isAuth={isAuth} />
            <PublicRoute exact path="/auth/registration" component={Registration} isAuth={isAuth} />
            <PublicRoute exact path="/auth/user-verification-request" component={UserVerificationRequest} isAuth={isAuth} />
            <PublicRoute exact path="/auth/verification-code-request" component={VerificationCodeRequest} isAuth={isAuth} />
            */}
            {/** ESTO SE DEBE CAMBIAR - PARA CAMBIAR ESTO SE DEBE DE MEJORAR LOS COMPONENES/PAGINAS DE AUTHPAGE */}
            <Route>
              <AuthPage />
            </Route>
            
            <Route exact path="/auth" render={() =>{
              return <Redirect to="/auth/login" />
            }} />
            <PublicRoute exact path="/error/pagina-no-encontrada" component={ErrorPage1} isAuth={isAuth} urlDash={urlDash} />
            <Route path="/**" render={() =>{
              return <Redirect to="/error/pagina-no-encontrada" />
            }} />

          </Switch>
        }
        </>
      )
};

export const RouterPrivate = ({isAuth,pathList,urlDash}) => {
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
                return <Redirect to={urlDash} />
              }} />
              <Route path="/auth" render={() =>{
                return <Redirect from="/auth" to={urlDash} />
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