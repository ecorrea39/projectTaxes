import React from 'react';
import { UsersState } from '../../../context/users/usersState';
import { UsersModule } from '../../../modules/AdminModules/Users';

const UsersPage = () => {
  return (
    <UsersState>
      <UsersModule />
    </UsersState>
  )
}

export default UsersPage;