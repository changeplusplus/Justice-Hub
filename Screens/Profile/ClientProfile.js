import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';
import * as firebase from "firebase";
import { SecureStore } from "expo";
import DataStorage from "../../DataStorage";

class ClientProfile extends Component {
  render() {
    return (
      <View>
        <Text>{DataStorage.FULL_NAME}'s Profile</Text>
        <Button onPress={this._logout} title='Log Out' />
      </View>
    )
  }

  _logout = () => {
    firebase.auth().signOut();

    // Delete SecureStore user and pass and replace with - as placeholder
    SecureStore.setItemAsync('lastUser', '-')
      .then(() => {
        SecureStore.setItemAsync('password', '-')
          .then(() => {
            DataStorage.clearData();

            const {navigate} = this.props.navigation;

            navigate('Login');
          })
      })
  }
}

export default ClientProfile;