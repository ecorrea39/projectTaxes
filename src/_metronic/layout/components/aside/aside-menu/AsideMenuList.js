/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import odb from "../../../../../app/helpers/odb";
import { LinksTributos } from "./linksTributos";
import { LinksPerfil } from "./linksPerfil";
import { LinksRepotes } from "./linksReportes";
import { LinksConfiguracion } from "./linksConfiguracion";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open menu-item-not-hightlighted` : "";
  };

  const userGroup = odb.get('groups');

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive("/dashboard", false)}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Inicio</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Tributos */}
          { userGroup == "contribuyentes" && <LinksTributos getMenuItemActive={getMenuItemActive} />}
        {/* End Tributos */}

        {/* Reportes */}
          { userGroup == "contribuyentes" && <LinksRepotes getMenuItemActive={getMenuItemActive} />}
        {/*end Reportes*/}

        {/* Prefil de usuario */}
          { (userGroup == "contribuyentes" || userGroup == "parciales") && <LinksPerfil getMenuItemActive={getMenuItemActive} />}
        {/*end  Prefil de usuario*/}

        {/* Configuracion */}
          { (userGroup == "administradores" || userGroup == "superAdmin") && <LinksConfiguracion getMenuItemActive={getMenuItemActive} />}
        {/*end Configuracion */}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/logout", false)}`}
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
    </>
  );
}
