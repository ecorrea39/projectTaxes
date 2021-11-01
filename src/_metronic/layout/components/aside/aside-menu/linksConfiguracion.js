import React from "react";
import {NavLink} from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../_helpers";

export function LinksConfiguracion({getMenuItemActive}) {

  return (
    <>
      <li className="menu-section ">
        <h4 className="menu-text">Configuracion</h4>
        <i className="menu-icon flaticon-more-v2"></i>
      </li>

      <li className={`menu-item menu-item-submenu ${getMenuItemActive("/e-commerce", true)}`} aria-haspopup="true"
          data-menu-toggle="hover">

        <NavLink className="menu-link menu-toggle" to="">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}/>
            </span>
          <span className="menu-text">Tablas Maestras</span>
        </NavLink>

        <div className="menu-submenu">
          <i className="menu-arrow"/>
          <ul className="menu-subnav">

            <li className={`menu-item ${getMenuItemActive("/tablas/trimestre")}`} aria-haspopup="true">
              <NavLink className="menu-link" to="/tablas/trimestre">
                <i className="menu-bullet menu-bullet-dot">
                  <span/>
                </i>
                <span className="menu-text">Trimestres</span>
              </NavLink>
            </li>

            <li className={`menu-item ${getMenuItemActive("/tablas/forma-pago")}`} aria-haspopup="true">
              <NavLink className="menu-link" to="/tablas/forma-pago">
                <i className="menu-bullet menu-bullet-dot">
                  <span/>
                </i>
                <span className="menu-text">Formas de pago</span>
              </NavLink>
            </li>

            <li className={`menu-item ${getMenuItemActive("/tablas/bancos-recaudadores")}`} aria-haspopup="true">
              <NavLink className="menu-link" to="/tablas/bancos-recaudadores">
                <i className="menu-bullet menu-bullet-dot">
                  <span/>
                </i>
                <span className="menu-text">Bancos recaudadores</span>
              </NavLink>
            </li>

            <li className={`menu-item ${getMenuItemActive("/tablas/cuentas-recaudadoras")}`} aria-haspopup="true">
              <NavLink className="menu-link" to="/tablas/cuentas-recaudadoras">
                <i className="menu-bullet menu-bullet-dot">
                  <span/>
                </i>
                <span className="menu-text">Cuentas Recaudadoras</span>
              </NavLink>
            </li>

            <li className={`menu-item ${getMenuItemActive("/tablas/estatus-entidad-trabajo")}`} aria-haspopup="true">
              <NavLink className="menu-link" to="/tablas/estatus-entidad-trabajo">
                <i className="menu-bullet menu-bullet-dot">
                  <span/>
                </i>
                <span className="menu-text">Estatus entidad de trabajo</span>
              </NavLink>
            </li>

            <li className={`menu-item ${getMenuItemActive("/tablas/clase-empresa")}`} aria-haspopup="true">
              <NavLink className="menu-link" to="/tablas/clase-empresa">
                <i className="menu-bullet menu-bullet-dot">
                  <span/>
                </i>
                <span className="menu-text">Clase de entidad de trabajo</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </li>

      <li className={`menu-item menu-item-submenu ${getMenuItemActive("/e-commerce", true)}`} aria-haspopup="true"
          data-menu-toggle="hover">

        <NavLink className="menu-link menu-toggle" to="">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}/>
            </span>
          <span className="menu-text">Reportes</span>
        </NavLink>

        <div className="menu-submenu">
          <i className="menu-arrow"/>
          <ul className="menu-subnav">

            <li className={`menu-item ${getMenuItemActive("/mapa")}`} aria-haspopup="true">
              <NavLink className="menu-link" to="/mapa">
                <i className="menu-bullet menu-bullet-dot">
                  <span/>
                </i>
                <span className="menu-text">Mapa</span>
              </NavLink>
            </li>

          </ul>
        </div>
      </li>
    </>
  );
}