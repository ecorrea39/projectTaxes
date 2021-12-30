import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Col, Row } from "react-bootstrap";

export const MyDataTable = ({columns,data,loadingTable}) => {

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

    const customStyles = {
        rows: {
            style: {
                minHeight: '40px',
            }
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
    };

    return (
        <>
            <Row>
                <Col className="mb-2" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" >
                    <div className="table-responsive">
                        <DataTable
                            columns={columns}
                            data={data}
                            fixedHeader
                            fixedHeaderScrollHeight="500px"
                            customStyles={customStyles}
                            responsive={true}
                            sortIcon={<ArrowDownward />}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5, 10, 25, 50]}
                            noDataComponent="No existen datos para mostrar"
                            progressPending={loadingTable}
                            progressComponent={<CircularProgress color="secondary" />}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}