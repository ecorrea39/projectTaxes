import React from "react";
import { useLocation } from "react-router";
import { checkIsActive } from "../../../../_helpers";
import { LinksConfiguracion } from "./linksConfiguracion";

export function AsideMenuListFunc({ userGroup }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open menu-item-not-hightlighted` : "";
  };

  return (
    <>
    {/* Configuracion */}
      { (userGroup == "administradores" || userGroup == "superAdmin") && <LinksConfiguracion getMenuItemActive={getMenuItemActive} />}
    {/*end Configuracion */} 
    </>
  );
}
