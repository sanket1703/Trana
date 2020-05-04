import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
//import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
class home extends Component {
  componentDidMount() {
    this.getId();
  }
  getId = async () => {
    let ID = (await AsyncStorage.getItem('Id')).toString();
    console.log(ID);
  };
  signout = () => {
    auth().signOut();
    this.props.navigation.navigate('login');
  };
  goToReport = () => {
    this.props.navigation.navigate('reportDetails');
  };
  medicine = () => {
    this.props.navigation.navigate('medicines');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goToReport}>
          <View
            style={[
              styles.button1,
              {marginTop: 200, width: 300, alignSelf: 'center'},
            ]}>
            <Text style={styles.textbutton}>Report Condition</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.medicine}>
          <View style={[styles.button1, {width: 300, alignSelf: 'center'}]}>
            <Text style={styles.textbutton}>Medicines</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.signout}>
          <View
            style={[
              styles.button1,
              {marginTop: 200, width: 150, alignSelf: 'center'},
            ]}>
            <Text style={styles.textbutton}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: '#930b0d',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    width: 150,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  textbutton: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
});
