import React, { useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import ClearIcon from '@material-ui/icons/Clear';

export const SearchTable = ({handleOnchange}) => {

    const [filterText, setFilterText] = useState([]);

    useEffect(()=>{
        handleOnchange(filterText);
    },[filterText]);

    return (

        <Row className="justify-content-end">
            <Col className="mb-2 " xs="12" sm="6" md="4" lg="4" xl="4" xxl="4" >
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Buscar . . ."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <InputGroup.Append style={{height: "38px"}}>
                        {
                            filterText != "" ?
                                <Button variant="outline-secondary" onClick={()=>setFilterText("")}>
                                    <ClearIcon />
                                </Button>
                            :   <Button variant="outline-secondary">
                                    <SearchIcon />
                                </Button>
                        }
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        </Row>
    )
}