import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive, toAbsoluteUrl } from "../../../../_helpers";
import { LinksConfiguracion } from "./linksConfiguracion";
import SVG from "react-inlinesvg";

export function AsideMenuListFunc({ userGroup, links }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open menu-item-not-hightlighted` : "";
  };

  const CreateLink = ({link}) => {

    return (
    <>
      {/*<li className="menu-section ">
        <h4 className="menu-text">{link.titleSection}</h4>
        <i className="menu-icon flaticon-more-v2"></i>
      </li>*/}
      { link.groups.indexOf(userGroup) > -1 &&
        <>
          <li className={`menu-item menu-item-submenu`} aria-haspopup="true" data-menu-toggle="hover">

            <NavLink className="menu-link menu-toggle" to="">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}/>
              </span>
              <span className="menu-text">{link.title}</span>
            </NavLink>

            <div className="menu-submenu">
              <i className="menu-arrow"/>
              <ul className="menu-subnav">
                {
                  link.childrens.map((child,index) => (
                    <li key={index} className={`menu-item`} aria-haspopup="true">
                        <NavLink className="menu-link" to={child.url}>
                            <i className="menu-bullet menu-bullet-dot">
                                <span/>
                            </i>
                            <span className="menu-text">{child.title}</span>
                        </NavLink>
                    </li>
                  )) 
                }
              </ul>
            </div>
          </li>
        </>
      }
    </>
    )
  }

  return (
    <>
      {
        links.map((link,p) => (
          <CreateLink key={p} link={link} />
        ))
      }
    </>
  );
}
