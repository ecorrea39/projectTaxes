import React, {useContext, useMemo} from "react";
import {AsideMenuListFunc} from "./AsideMenuListFunc";
import {useHtmlClassService} from "../../../_core/MetronicLayout";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_helpers";
import { AsideMenuListCont } from "./AsideMenuListCont";
import AuthContext from "../../../../../app/store/auth-context";
import { navContribuyentes } from "../../../../../app/router/helperRoute";

export function AsideMenu({disableScroll}) {

  const authCtx = useContext(AuthContext);
  const userGroup = authCtx.userGroup;
  const userType = authCtx.userType;
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes("aside_menu"),
      ulClasses: uiService.getClasses("aside_menu_nav", true),
      asideClassesFromConfig: uiService.getClasses("aside_menu", true)
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Menu Container */}
      <div
        id="kt_aside_menu"
        data-menu-vertical="1"
        className={`aside-menu my-4 ${layoutProps.asideClassesFromConfig}`}
        {...layoutProps.asideMenuAttr}
      >

        {/* begin::Menu Nav */}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>

          {/*begin::1 Level*/}
          <li className={`menu-item`} aria-haspopup="true">
            <NavLink className="menu-link" to="/dashboard">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
              </span>
              <span className="menu-text">Inicio</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}
          {
            userType == "funcional" ? 
              <AsideMenuListFunc userGroup={userGroup} />
            : <AsideMenuListCont links={navContribuyentes} userGroup={userGroup} />
          }
        
          {/*begin::1 Level*/}
          <li
            className={`menu-item`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/logout">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Navigation/Arrow-to-right.svg"
                  )}
                />
              </span>
              <span className="menu-text">Salir</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

        </ul>
        {/* end::Menu Nav */}
      </div>
      {/* end::Menu Container */}
    </>
  );
}
