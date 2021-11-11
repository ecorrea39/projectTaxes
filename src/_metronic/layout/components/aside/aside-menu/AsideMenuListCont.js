import React from "react";
import { NavLink } from "react-router-dom";

export function AsideMenuListCont({ userGroup, links }) {

    const CreateLink = ({link}) => {

        return (
        <>
            { link.groups.indexOf(userGroup) > -1 &&
            <>
                <li className="menu-section">
                    <h4 className="menu-text">{link.title}</h4>
                    <i className="menu-icon flaticon-more-v2"></i>
                </li>
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
