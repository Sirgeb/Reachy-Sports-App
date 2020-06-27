import React from 'react';
import { withNavigation } from 'react-navigation';
import GroupChat from '../../../components/GroupChat';

const Basketball = ({ navigation }) => {
  const groupId = navigation.getParam("groupId");

  return (
    <GroupChat groupId={groupId} />
  )
}

export default withNavigation(Basketball);
