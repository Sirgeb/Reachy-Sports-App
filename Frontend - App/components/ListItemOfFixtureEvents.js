import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import styles from '../styles';
import constants from '../constants';

const yellowcard = require('../assets/competition/yellowcard.png');
const redcard = require('../assets/competition/redcard.png');
const Goal = require('../assets/competition/football.png');
const subst = require('../assets/competition/substitution.png');

class ListItemOfFixtureEvents extends PureComponent {
  render() {
    const { player, type, detail, elapsed } = this.props.item;

    const Icons = {
      'Yellow Card': yellowcard,
      'Red Card': redcard,
      Goal,
      subst
    }

    const getIcon = (type, detail) => {
      if (type !== 'Card') return Icons[type]
      return Icons[detail]
    }

    return (
      <Row>
        <Icon source={getIcon(type, detail)} />
        <PlayerName>{player}</PlayerName>
        <Elapsed>{elapsed + "'"}</Elapsed>
      </Row>
    )
  }
}
const Row = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: ${`${constants.width}px`};
  border-bottom-width: 0.3px;
  border-bottom-color: ${styles.grey};
`;
const Icon = styled.Image`
  height: 20px;
  width: 20px;
`;
const PlayerName = styled.Text`
  padding: 0 10px;
`;
const Elapsed = styled.Text``;

export default ListItemOfFixtureEvents;
