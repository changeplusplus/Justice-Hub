import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';
import { SecureStore } from 'expo';
import DataStorage from '../DataStorage';

class LoadApp extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    // Try to auto login user based on what's stored async
    this._autoLogin();
  }

  async _autoLogin() {
    let email = await SecureStore.getItemAsync('lastUser');
    const { navigate } = this.props.navigation;

    if (email !== '-' && email) {
      email = email.substring(0, email.indexOf('-at_')) + '@' + email.substring(email.indexOf('-at_') + 4, email.length);

      console.log('Email:', email);

      let password = await SecureStore.getItemAsync('password');
      console.log('Pass:', password);

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          const uid = firebase.auth().currentUser.uid;
          console.log('Signed in', uid);

          // Load basic profile data
          firebase.database().ref('users/' + uid).once('value')
            .then((snap) => {
              DataStorage.EMAIL = snap.val().email;
              DataStorage.IS_LAWYER = snap.val().isLawyer;
              DataStorage.FULL_NAME = snap.val().fullName;
              DataStorage.PHONE_NUM = snap.val().phoneNumber;

              // Once that's complete, load more advanced data
              if (DataStorage.IS_LAWYER) {
                firebase.database().ref('Profiles/Lawyers/' + uid).once('value')
                  .then((snap) => {
                    DataStorage.EXP = snap.val().experience;
                    DataStorage.DEGREE = snap.val().degree;
                    DataStorage.SPECIALTY = snap.val().specialty;

                    // Navigate to lawyer side of app
                    navigate('LawyerTabNav');
                  })
                  .catch((error) => {
                    alert('Cannot get lawyer data ' + error.message);
                  })
              } else {
                // Load client data
                firebase.database().ref('Profiles/Clients/' + uid).once('value')
                  .then((snap) => {
                    DataStorage.LOCATION = snap.val().location;

                    // Navigate to client side of app
                    navigate('ClientTabNav');
                  })
                  .catch((error) => {
                    alert('Cannot get lawyer data ' + error.message);
                  })
              }
            })
            .catch((error) => {
              alert('ERROR loading user data: ' + error.message);
            })
        })
        .catch((error) => {
          alert('SignIn Error: ' + error.message);
          navigate('Login');
        })
    } else {
      navigate('Login');
    }
  }

  render() {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    )
  }
}

export default LoadApp;