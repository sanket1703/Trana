//import * as firebase from 'firebase/app'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import React from 'react';
import {
    View,
    TextInput,
    ImageBackground,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
//import 'firebase/firestore'
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : "",
            phone : "",
            Id: '',
            pass: '',
            pass2: '',
            
            
            
            
            textVisible: false,
            visible: false,
            check: false,
           
            
           
            
           
          
        }
    }
    phone = phone => {
        this.setState({ phone: phone })
    }
    name = name => {
        this.setState({ name: name })
    }
    address = address => {
        this.setState({ address: address })
    }
   
    LoginId = Id => {
        this.setState({ Id: Id })
    }
    Password = pass => {
        this.setState({ pass: pass })
    }
    RePassword = pass2 => {
        this.setState({ pass2: pass2 })
    }

    check = () => {
        
        if (this.state.name != '')
            this.setState({ check: true })
        else if (this.state.Id != '')
            this.setState({ check: true })
        else if (this.state.phone != '')
            this.setState({ check: true })
        else if (this.state.pass != '')
            this.setState({ check: true })
        else if (this.state.pass2 != '')
            this.setState({ check: true })
        else
            this.setState({ check: false })



    }
    signUp = () => {
        console.log(this.state.Id)
        this.check()
        /*if (this.state.pass == this.state.pass2) {
            firebase.auth().createUserWithEmailAndPassword(this.state.Id, this.state.pass)
                .then(() => this.addusertodb());
        }
        else {
            this.setState({ textVisible: true })
        }*/
        if (this.state.check) {
            console.log('happening')
            this.setState({ visible: false })
            if (this.state.pass == this.state.pass2) {
                auth().createUserWithEmailAndPassword(this.state.Id, this.state.pass)
                    .then(() => this.addusertodb());
            }
            else {

                this.setState({ textVisible: true })
            }
        }
        else {
            this.setState({ visible: true })
            console.log('not happening')
        }

    }
    login = () => {
        this.props.navigation.navigate('login')
    }
    
   
    addusertodb = () => {
      
        firestore.collection("Users").doc(this.state.name).set({
            name: this.state.name,
            email: this.state.Id.toLowerCase(),
            phone : this.state.phone

        })
            .then(() => this.props.navigation.navigate('LoginScreen'))
            .catch((e) => console.log(e))
    }
    render() {
        return (
            <View style = {{backgroundColor : "#930b0d",flex : 1}} >
                <ScrollView style={{ padding: 10, marginTop: 20 }}>
                    <View style={style.container}>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            {/* <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 9, }} /> */}
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.name}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.LoginId}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            {/* <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
                            <TextInput
                                placeholder='Phone'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.phone}>
                            </TextInput>
                        </View>
                        
                       
                    
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            {/* <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12, }} /> */}
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Enter Password'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.Password}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            {/* <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12, }} /> */}
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Re Enter your Password'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.RePassword}>
                            </TextInput>
                        </View>
                        {
                            this.state.textVisible ? <Text style={{ alignSelf: 'center', color: 'red' }}>Password did not match</Text> : null
                        }
                        <Dialog
                            visible={this.state.visible}
                            dialogTitle={<DialogTitle title="CAUTION" />}
                            footer={
                                <DialogFooter>

                                    <DialogButton
                                        text="OK"
                                        onPress={() => this.setState({ visible: false })}
                                    />
                                </DialogFooter>
                            }
                            dialogAnimation={new SlideAnimation({
                                slideFrom: 'bottom',
                            })}
                        >
                            <DialogContent>
                                <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>Please fill up all the fields!</Text>
                            </DialogContent>
                        </Dialog>
                        <View style={{ alignSelf :"center", marginTop:10,marginBottom:10}}>
                        <TouchableOpacity onPress={this.signUp} >
                            <View style={[style.button1,{alignSelf:"center"}]}>
                                <Text style={style.textbutton}>Sign Up</Text>
                            </View>

                        </TouchableOpacity>
                        <Text style = {{marginBottom : 10,textAlign : "center",opacity : 0.7}}>Already registered?</Text>
                        <TouchableOpacity onPress={this.login} >
                            <View style={[style.button1,{alignSelf : "center"}]}>
                                <Text style={style.textbutton}>Login</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
    header: {
        paddingTop: 30,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: "center",
        padding: 10,
        paddingBottom: 40
    },
    textbutton: {
        fontSize: 20,
        alignSelf: "center",
        color: 'white'
    },
    textInput: {
        height: 50,
        width: '90%',
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    button1: {
        backgroundColor: '#930b0d',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        width:150,
        marginBottom: 10,
        marginRight:20,
        marginLeft:20
    },
    button2: {
        backgroundColor: '#930b0d',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 40,
        width:170
    },
    textInput1: {
        height: 50,
        width: 74,
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
})