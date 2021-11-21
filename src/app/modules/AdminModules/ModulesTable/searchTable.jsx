import React, { useContext, useEffect, useState } from "react";
import Search from '@material-ui/icons/Search';

export const SearchTable = ({handlesOnchange}) => {

    return (

        <div>
            <input
                type="text"
                placeholder="Buscar"
                
                name="busqueda"
                onChange={handlesOnchange}
            />
            <button type="button">
                <Search />
            </button>
        </div>
    )
}