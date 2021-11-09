import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { RouterPrivate, RouterPublic } from '.';
import AuthContext from '../store/auth-context';
import { Layout } from "../../_metronic/layout";

export const Routes = () => {

  const authCtx = useContext(AuthContext);
  let isAuthorized = authCtx.isLoggedIn;

    return (
      <>
        {isAuthorized
          ? <Layout> <RouterPrivate isAuth={isAuthorized} /> </Layout>
          : <RouterPublic isAuth={isAuthorized} />
        }
      </>
    )
}

export default Routes;