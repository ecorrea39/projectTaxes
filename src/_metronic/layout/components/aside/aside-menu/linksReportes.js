import React from "react";
import { NavLink } from "react-router-dom";

export function LinksRepotes({getMenuItemActive}) {
    
    
    return (
    <>
        <li className="menu-section ">
          <h4 className="menu-text">Reportes</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        
        <li
          className={`menu-item ${getMenuItemActive("")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="">
            <i className="menu-bullet menu-bullet-dot">
              <span />
            </i>
            <span className="menu-text">Comprobante de inscripción</span>
          </NavLink>
        </li>
        
        <li
          className={`menu-item ${getMenuItemActive("/reportes/certificado-solvencia")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to={`/reportes/certificado-solvencia`}>
            <i className="menu-bullet menu-bullet-dot">
              <span />
            </i>
            <span className="menu-text">Certificado de solvencia</span>
          </NavLink>
        </li>     
    </>
  );
}