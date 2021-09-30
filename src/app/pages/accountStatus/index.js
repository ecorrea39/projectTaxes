import React from 'react'
import AccountStatusModule from '../../modules/AccountStatus/accountStatusModules';
import { AccountStatusState } from "../../context/accountStatus/accountStatusState";

const AccountStatusPage = () => {
    return (
        <AccountStatusState>
            <AccountStatusModule />
        </AccountStatusState>
    )
}

export default AccountStatusPage;