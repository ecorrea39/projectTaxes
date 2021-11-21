import React from 'react';
import { GroupsState } from '../../../context/groups/groupsState';
import { GroupsModule } from '../../../modules/AdminModules/Groups';

const GroupsPageCreate = () => {
  return (
    <GroupsState>
      <GroupsModule />
    </GroupsState>
  )
}

export default GroupsPageCreate;