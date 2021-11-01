import React from "react";
import {NavLink} from "react-router-dom";

export function LinksTributos({getMenuItemActive}) {


  return (
    <>
      <li className="menu-section">
        <h4 className="menu-text">Tributos</h4>
        <i className="menu-icon flaticon-more-v2"></i>
      </li>

      <li className={`menu-item ${getMenuItemActive("/user-datos")}`} aria-haspopup="true">
        <NavLink className="menu-link" to="/user-datos">
          <i className="menu-bullet menu-bullet-dot">
            <span/>
          </i>
          <span className="menu-text">Entidad de trabajo</span>
        </NavLink>
      </li>

      <li
        className={`menu-item ${getMenuItemActive(
          "/e-commerce/products"
        )}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/estado-cuentas">
          <i className="menu-bullet menu-bullet-dot">
            <span/>
          </i>
          <span className="menu-text">Estado de cuenta</span>
        </NavLink>
      </li>

      <li
        className={`menu-item ${getMenuItemActive(
          "/e-commerce/products"
        )}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/tributos">
          <i className="menu-bullet menu-bullet-dot">
            <span/>
          </i>
          <span className="menu-text">Declaración y Reporte de pago</span>
        </NavLink>
      </li>

      <li
        className={`menu-item ${getMenuItemActive(
          "/e-commerce/products"
        )}`}
        aria-haspopup="true"
      >
        <NavLink className="menu-link" to="/fondosdecomercio">
          <i className="menu-bullet menu-bullet-dot">
            <span/>
          </i>
          <span className="menu-text">Fondos de Comercio</span>
        </NavLink>
      </li>
    </>
  );
}