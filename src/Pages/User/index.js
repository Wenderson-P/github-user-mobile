import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {View} from 'react-native';
import api from '../../services/api';
import {Container, Header, Avatar, Name, Bio} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    stars: [],
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`users/${user.login}/starred`);

    this.state({stars: response.data});
  }

  render() {
    const {navigation} = this.props;
    const {stars} = this.props;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
      </Container>
    );
  }
}

User.propTypes = {
  navigation: Proptypes.shape({
    getParam: Proptypes.func,
  }).isRequired,
};
