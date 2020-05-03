import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
//import firebase from 'firebase'
import auth from '@react-native-firebase/auth'

export default class SplashScreen extends React.Component{
    constructor(props){
        
        super(props)
        
    }
    componentDidMount = async() =>{
        // setTimeout(
        //     () => this.props.navigation.navigate('home'),
        //     2000
        //     )
        console.log("starting")
        // await this.FirebaseIntialize()
        auth().onAuthStateChanged((user) => {
            if (user) {
              setTimeout(
              () => this.props.navigation.navigate('home'),
              1000
              )
            }else{
                setTimeout(
                () => this.props.navigation.navigate('Login'),
                1000
                )
            }
         });
    }
    // FirebaseIntialize = async () => {
        
    //     var firebaseConfig = {
    //         apiKey: "AIzaSyBybJho0cdp9_nQzX_eT3arRl2jIHNgyU4",
    //         authDomain: "tra1-bfac8.firebaseapp.com",
    //         databaseURL: "https://tra1-bfac8.firebaseio.com",
    //         projectId: "tra1-bfac8",
    //         storageBucket: "tra1-bfac8.appspot.com",
    //         messagingSenderId: "404257539306",
    //         appId: "1:404257539306:web:5c266442fe78892bde0393",
    //         measurementId: "G-1FLRML6GY5"
    //       };
    //       // Initialize Firebase
    //       firebase.initializeApp(firebaseConfig);
          
    //     console.log('Firebase App Created')
    // }
render(){
    return(
        <View style = {{backgroundColor : '#930b0d' }}>
        <Text style={{marginTop : 300,color:'white',
        fontSize:50,marginStart : 30
        }}>
            TRANA</Text>
        <Text style={[style.text,{fontSize : 15,marginBottom : 10}]}>Help us to help you..</Text>
       </View>
    )
}
}
const style = StyleSheet.create({
    text:{
        color:'white',
        fontSize:50,
        textAlign:'center'
    }
})