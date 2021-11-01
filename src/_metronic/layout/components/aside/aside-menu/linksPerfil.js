import React from "react";
import { NavLink } from "react-router-dom";

export function LinksPerfil({getMenuItemActive}) {
    
    
    return (
    <>
        <li className="menu-section ">
          <h4 className="menu-text">Perfil del contribuyente</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        
        <li className={`menu-item ${getMenuItemActive("/user-datos")}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/user-datos">
            <i className="menu-bullet menu-bullet-dot">
              <span />
            </i>
            <span className="menu-text">Modificar perfil</span>
          </NavLink>
        </li>

        <li className={`menu-item ${getMenuItemActive("/e-commerce/products")}`} aria-haspopup="true">
          <NavLink className="menu-link" to="#">
            <i className="menu-bullet menu-bullet-dot">
              <span />
            </i>
            <span className="menu-text">Cambiar clave</span>
          </NavLink>
        </li>
    </>
  );
}