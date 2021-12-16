import React, { useContext } from 'react';
import { RouterPrivate, RouterPublic } from '.';
import AuthContext from '../store/auth-context';
import { Layout } from "../../_metronic/layout";

export const Routes = () => {

  const authCtx = useContext(AuthContext);
  let isAuthorized = authCtx.isLoggedIn;
  const PathList = authCtx.accesRouters;
  const urlDash = authCtx.urlDash;
    return (
      <>
        {isAuthorized
          ? <Layout> <RouterPrivate isAuth={isAuthorized} pathList={PathList} urlDash={urlDash} /> </Layout>
          : <RouterPublic isAuth={isAuthorized} pathList={PathList} urlDash={urlDash} />
        }
      </>
    )
}

export default Routes;