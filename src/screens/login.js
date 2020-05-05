//import firebase from 'firebase'
import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogButton,
  DialogFooter,
  DialogTitle,
} from 'react-native-popup-dialog';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: '',
      pass: '',
      userId: '',
      date: '',
      visible: false,
      context: '',
      check: true,
    };
  }
  componentDidMount = async () => {
    //OneSignal.addEventListener('ids', this.onIds);
    var d = Date(Date.now());
    this.setState({date: d.toString()});
  };
  //onIds is a one-signal function which takes required info of the device
  onIds = (devices) => {
    console.log('Device info = ', devices);
    this.setState({
      userId: devices.userId,
    });
  };
  check = () => {
    if (this.state.Id === '' || this.state.pass === '')
      this.setState({check: false});
    // else if (this.state.pass != '') this.setState({check: false});
    else this.setState({check: true});
  };

  LoginId = (Id) => {
    this.setState({Id: Id});
  };
  Password = (pass) => {
    this.setState({pass: pass});
  };
  // navsidnout = () => {
  //   this.props.navigation.navigate('home');
  // };
  login = async () => {
    //this.check();
    if (this.state.Id !== '' && this.state.pass !== '') {
      //console.log(this.state.Id);

      await AsyncStorage.setItem('Id', this.state.Id);
      try {
        auth()
          .signInWithEmailAndPassword(this.state.Id, this.state.pass)
          .then(() =>
            this.props.navigation.navigate('home', {Id: this.state.Id}),
          )
          .catch((e) => Alert.alert(e));
      } catch (e) {
        Alert.alert(e);
      }
    } else {
      Alert.alert('Caution! Enter credentials!');
    }
  };

  signUp = () => {
    this.props.navigation.navigate('signUp');
  };
  render() {
    return (
      <View style={{backgroundColor: '#930b0d', flex: 1}}>
        <KeyboardAvoidingView enabled behavior="position">
          <View style={style.container}>
            <Text style={style.header}>TRANA</Text>
            <View style={{flexDirection: 'row', padding: 5}}>
              {/* <Icon name="user" size={25} color="black" style={{ paddingTop: 10 }} /> */}
              <TextInput
                placeholder="Login ID"
                placeholderTextColor="black"
                onChangeText={this.LoginId}
                keyboardType="email-address"
                textContentType="emailAddress"
                maxFontSizeMultiplier={100}
                autoCapitalize="none"
                style={style.textInput}
              />
            </View>
            {/* <Dialog
            visible={this.state.visible}
            dialogTitle={<DialogTitle title="CAUTION" />}
            footer={
              <DialogFooter>
                <DialogButton
                  text="OK"
                  onPress={() => this.setState({visible: false})}
                />
              </DialogFooter>
            }
            dialogAnimation={
              new SlideAnimation({
                slideFrom: 'bottom',
              })
            }>
            <DialogContent>
              <Text style={{padding: 20, paddingBottom: 0, fontSize: 18}}>
                {this.state.context.toString()}
              </Text>
            </DialogContent>
          </Dialog> */}
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 20}}>
              {/* <Icon name="lock" size={30} color="black" style={{ paddingTop: 9 }} /> */}
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="black"
                value={this.state.pass}
                onChangeText={this.Password}
                style={style.textInput}
              />
            </View>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => {
                this.props.navigation.navigate('forgotpassword');
              }}>
              <Text style={{}}>Forgot Password</Text>
            </TouchableOpacity>
            <Text></Text>

            <View style={{alignSelf: 'center', paddingLeft: 0}}>
              <TouchableOpacity onPress={this.login}>
                <View style={style.button1}>
                  <Text style={style.textbutton}>Log In</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={this.signUp}>
                <View style={style.button2}>
                  <Text style={style.textbutton}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    margin: 10,
    marginTop: 200,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 30,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10,
    paddingBottom: 40,
    color: 'black',
    fontStyle: 'italic',
  },
  textbutton: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  button1: {
    backgroundColor: '#930b0d',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 30,
    marginRight: 20,
    width: 150,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 20,
  },
  button2: {
    backgroundColor: '#930b0d',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 40,
    width: 150,
  },
});
