import * as firebase from 'firebase';
import { SecureStore } from 'expo';

class DataStorage {
  static EMAIL;
  static FULL_NAME;
  static PHONE_NUM;
  static IS_LAWYER;

  // Laywer specific information
  static EXP;
  static DEGREE;
  static SPECIALTY;

  // Client specific information
  static LOCATION;

  static async saveLogin(email, password) {
    console.log('Trying to save login....');
    let savableEmail = email.substring(0, email.indexOf('@')) + '-at_' + email.substring(email.indexOf('@') + 1, email.length);
    // Save email for login
    SecureStore.setItemAsync('lastUser', savableEmail)
      .then(() => {

        // Save password
        SecureStore.setItemAsync('password', password)
          .then(() => {

            console.log('Successfully saved email and pass');
          })
          .catch((error) => {
            alert('Expo Error: ' + error.message);
          })
      })
      .catch((error) => {
        alert('Expo Error: ' + error.message);
      })
  }

  static loadProfileData() {
    const uid = firebase.auth().currentUser.uid;

    // Load lawyer data
    if (this.IS_LAWYER) {

    } else {

    }
  }

  static clearData() {
    this.EMAIL = '';
    this.FULL_NAME = '';
    this.PHONE_NUM = '';
    this.IS_LAWYER = '';

    this.EXP = '';
    this.DEGREE = '';
    this.SPECIALTY = '';

    this.LOCATION = '';
  }
}

export default DataStorage;