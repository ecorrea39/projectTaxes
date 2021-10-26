import React from 'react'
import ReportsModule from '../../modules/Reports/reportsModules';
import { ReportsState } from "../../context/reports/reportsState";

const ReportsPage = () => {
    return (
        <ReportsState>
            <ReportsModule />
        </ReportsState>
    )
}

export default ReportsPage;