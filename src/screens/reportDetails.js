import React from 'react';
import {
    View,
    TextInput,
    ImageBackground,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker,Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

//import 'firebase/firestore'
//import * as firebase from 'firebase/app'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//import storage from '@react-native-firebase/storage';
//import firestore from '@react-native-firebase/app';

import GetLocation from 'react-native-get-location'
//import RNFetchBlob from 'react-native-fetch-blob';
//import ImagePicker from "react-native-image-picker";
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';
import {decode, encode} from 'base-64'
// var fs
// const Blob = RNFetchBlob.polyfill.Blob;
// fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
       
        this.state = {
            age: "",
            name : "",
            address: "",
            gender : "",
            specialReq : "",
            otherInfo : "",
            critical : "",
            case : "",
            contact : "",
            //location : firebase.firestore.GeoPoint(0,0),
            area: '',
            country: '',
            
            condition : "",
            hospital : "",
            hospitalAddress : "",
            doctor : "",
            otherDetailsOfCase : "",
            images : [],
            imageCount : 0,
            imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE88QZWx1eLEsnCSjvXBQHjxiXJ1nY0PlNkf7H6twi9ru_NBU3g',
            firebaseImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE88QZWx1eLEsnCSjvXBQHjxiXJ1nY0PlNkf7H6twi9ru_NBU3g',
            imgName: '',
            
            longitude : 0,
            latitude : 0,
            locationNew : [],
            textVisible: false,
            //db: firebase.firestore(),
            visible: false,
            check: false,
            loading : false,
            user : ""
            
        }
        
    }
    componentDidMount(){
        var location1 = []
        var lat , long
       GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            long = location['longitude']
            lat = location['latitude']
            location1.push(location['longitude'])
            location1.push(location['latitude'])
            console.log("Longitude:"+long)
            console.log("Latitude:"+lat)
            this.setState({
                longitude : long,
                latitude : lat,
                locationNew : location1
            })
            console.log("long"+this.state.longitude)
            console.log(this.state.locationNew)
            
            
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })

    }
    getLocation = async () => {

        var location1 = []
        var lat , long
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            long = location['longitude']
            lat = location['latitude']
            long = long.toString()
            lat  = lat.toString()
            // location1.push(location['longitude'])
            // location1.push(location['latitude'])
            console.log("Longitude:"+long)
            console.log("Latitude:"+lat)
            this.setState({
                longitude : long
            })
            
            
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    
    }
    // getImage() {
    //         let options = {
    //         title: 'Select Avatar',
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images'
    //         }
    //     };

    //     // First argument = let it be null
    //     // Second argument = response is the callback which sends object: response
    //     ImagePicker.showImagePicker(options, (response) => {
    //        // console.warn('Response = ', response);

    //         if (response.didCancel) {
    //             console.warn('User cancelled image picker');
    //         }
    //         else if (response.error) {
    //             console.warn('ImagePicker Error: ', response.error);
    //         }
    //         else {
    //             // let source = { uri: response.uri };

    //             // You can also display the image using data:
    //             let source = {uri: 'data:image/jpeg;base64,' + response.data, image: "file.png"};
    //            // console.log(source)
    //             // this.setState({
    //             //     imageUri: response.uri,
    //             //     imgName: response.fileName,
    //             // }).then(console.log("success this is the uri:" + this.state.fileName));
    //             var data = []
    //             this.uploadImage(response.uri);
    //             data.push(response.fileName)
    //             this.setState(
    //                 {
    //                     imageUri : response.uri,
    //                     images : data,
    //                     imageCount : this.state.imageCount + 1
    //                 }
    //             )
    //             console.log(response.uri)
    //         }
    //     });
    // }

    // uploadImage = (uri, mime = 'application/octet-stream') => {
    //    // return new Promise((resolve, reject) => {
    //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    //     let uploadBlob = null;
    //     const sessionId = new Date().getTime();
    //     const imageRef = storage().ref('/images/').child(this.props.navigation.getParam('name','Unnamed')+"_"+sessionId);
    //     console.log("This is in uploadImage")
    //     fs.readFile(uploadUri, 'base64')
    //         .then((data) => {
    //             console.log("Check 1")
    //             return Blob.build(data, {type: `${mime};Base64`})
                
    //         })
    //         .then((blob) => {
    //             uploadBlob = blob;
    //             console.log("Check 2")
    //             return imageRef.put(blob, {contentType: mime})
    //         })
    //         .then((url) => {
    //             console.log("Check 3")
    //             uploadBlob.close();
    //             return imageRef.getDownloadURL();

    //         })
    //         .then((url) => {
    //             console.log("Check 4")
    //             this.storeReference(url, sessionId);
    //             //console.warn(url);
    //             console.log("Check 5")
    //         }).then(Alert.alert(
    //         "Prescription Uploaded!",
    //     //    [
    //     //         {text: "Add more",onPress: ()=> console.log("da")},
    //     //         {
    //     //             text : "Done" , onPress : ()=> this.navigation.navigate("home")
    //     //         }
           
    //     //    ]
    //         ))
    //         .catch((err) => {
    //             console.error(err);
    //         })
    // }
    // storeReference = (url) => {
    //     this.setState({firebaseImageUrl: url});
    //     //console.log(this.state.firebaseImageUrl)
    // }


    age = age => {
        this.setState({ age: age })
    }
    name = name1 => {
        this.setState({ name: name1 })
    }
    address = address => {
        this.setState({ address: address })
    }
    gender = gender => {
        this.setState({ gender: gender })
    }
    spReq = specialReq => {
        this.setState({ specialReq : specialReq  })
    } 
    otherInfo = otherInfo => {
        this.setState({ otherInfo:otherInfo})
    }
    critical = critical => {
        this.setState({ critical : critical })
    }
    case1 = case1 => {
        this.setState ({case : case1})
    }
    contact = contact => {
        this.setState({contact : contact})
    }

    condition = condition => {
        this.setState({ condition: condition })
    }
    hospital = hospital => {
        this.setState({ hospital: hospital })
    }
    hospitalAddress = hospitalAddress => {
        this.setState({ hospitalAddress: hospitalAddress })
    }
    doctor = doctor => {
        this.setState({ doctor: doctor })
    }
    otherDetailsOfCase = otherDetailsOfCase => {
        this.setState({ otherDetailsOfCase : otherDetailsOfCase  })
    } 
    area = a => {
        this.setState({ area : a  })
    } 

    country = c => {
        this.setState({ country : c  })
    } 

    
    upDate = async ()=>{
        

        this.setState({
            loading : true,
           
        })

        const user1 = await auth().currentUser.uid

        this.setState({
            user : user1
        })
        
          
           
          firestore().collection("Reports").doc().set({
            name: this.state.name,
            address: this.state.address,
            contact : this.state.contact,
            condition : this.state.critical,
            case : this.state.case,
            gender : this.state.gender,
            age : this.state.age,
            description : this.state.otherInfo,
            specialReq : this.state.specialReq,
            condition : this.state.condition,
            hospital : this.state.hospital,
            hospitalAddress : this.state.hospitalAddress,
            doctor : this.state.doctor,
            otherDetailsOfCase : this.state.otherDetailsOfCase,
            //longitude : this.state.longitude,
            //latitude : this.state.latitude,
            imageUri : this.state.imageUri,
            location : this.state.locationNew,
            //location : firebase.firestore.GeoPoint(this.state.latitude,this.state.longitude),
            uId : ''
            
        }).then(Alert.alert("Details Uploaded to the Authorities")).then(this.props.navigation.navigate("home"))
        .catch((e) => console.log(e))
    }

    
    check = () => {
        
        console.log('checking')
        console.log(this.state.name)
        console.log(this.state.address)
        console.log(this.state.critical)
        console.log(this.state.case)
        console.log(this.state.gender)
        console.log(this.state.age)
        console.log(this.state.contact)
        console.log(this.state.otherInfo)
        console.log(this.state.specialReq)
        
        if (this.state.condition != '')
            this.setState({ check: true })
        else if (this.state.hospital != '')
            this.setState({ check: true })
        else if (this.state.doctor != '')
            this.setState({ check: true })
        else if (this.state.otherDetailsOfCase != '')
            this.setState({ check: true })
       
        else if (this.state.name != '')
            this.setState({ check: true })
        else if (this.state.address != '')
            this.setState({ check: true })
        else if (this.state.critical != '')
            this.setState({ check: true })
        else if (this.state.case != '')
            this.setState({ check: true })
        else if (this.state.gender != '')
            this.setState({ check: true })
        else if (this.state.age != '')
            this.setState({ check: true })
        else if (this.state.otherInfo != '')
            this.setState({ check: true })
        else if (this.state.specialReq != '')
            this.setState({ check: true })
        else if (this.state.contact != '')
            this.setState({ check: true })
        else
            this.setState({ check: false })

    }
   
    
    render() {
        return (
            <View style = {{backgroundColor : '#930b0d',flex : 1}}>                
            
                <ScrollView style={{ padding: 10, marginTop: 20 }}>
                    <View style={style.container}>
                        
                        
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            {/* <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
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
                                placeholder='Address'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.address}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
                            <TextInput
                                placeholder='Area'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.area}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
                            <TextInput
                                placeholder='Country'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.country}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
                            <TextInput
                                placeholder='Contact'
                                keyboardType ='phone-pad'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.contact}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 0, marginBottom: 10, paddingLeft: 10 }}>
                            {/* <Icon name="mortar-board" size={23} color="black" style={{ paddingTop: 10, paddingLeft: 7, }} /> */}
                            <Picker
                                selectedValue={this.state.critical}
                                style={{ height: 50, width: 300 }}
                                onValueChange={(itemValue, itemIndex) =>

                                    this.setState({ critical: itemValue })
                                    //console.log('branch issss ',this.state.branch)
                                }>
                                <Picker.Item label="Case Intensity" value="" />
                                <Picker.Item label=" Reporting situation" value="Reporting situation" />
                                <Picker.Item label="May need ambulance" value="May need ambulance" />
                                <Picker.Item label="Need Dr consultanting" value="Need Dr consultanting"/>
                                
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', padding: 0, marginBottom: 10, paddingLeft: 10, marginRight: 40 }}>
                                {/* <Icon name="calendar" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 7, }} /> */}
                                <Picker
                                    selectedValue={this.state.case}
                                    style={{ height: 50, width: 300, borderBottomWidth: 1, borderBottomColor: 'black' }}
                                    onValueChange={(itemValue, itemIndex) =>

                                        this.setState({ case: itemValue })
                                        //console.log('gender issss ',this.state.gender)
                                    }>
                                    <Picker.Item label="Case" value="" />
                                    <Picker.Item label="Pregnency" value="Pregnency" />
                                    <Picker.Item label="Terminal Illness" value="Terminal Illness" />
                                    <Picker.Item label="Post Operation" value="Post Operation" />
                                    <Picker.Item label="Accident Recovery" value="Accident Recovery" />
                                    <Picker.Item label="Child" value="Child" />
                                    <Picker.Item label="Others" value="Other" />
                                </Picker>
                            </View>
                            
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                                {/* <Icon name="male" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 7, }} /> */}
                                <Picker
                                    selectedValue={this.state.gender}
                                    style={{ height: 50, width: 300 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ gender: itemValue })
                                    }>
                                    <Picker.Item label="Gender" value="" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                    <Picker.Item label="Others" value="Others" />
                                </Picker>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
                            <TextInput
                                placeholder='Age'
                                keyboardType ='phone-pad'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.age}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
                            <TextInput
                                placeholder='Other info'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.otherInfo}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            {/* <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 9, }} /> */}
                            <TextInput
                                placeholder='Any Kind of special requirement'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.spReq}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

    {/* <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
    <TextInput
    placeholder='Condition'
    placeholderTextColor='black'
    style={style.textInput}
    onChangeText={this.condition}>
</TextInput>
</View>
<View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

{/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
<TextInput
    placeholder='Hospital Name'
    placeholderTextColor='black'
    style={style.textInput}
    onChangeText={this.hospital}>
</TextInput>
</View>
<View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

{/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
<TextInput
    placeholder='Hospital Address'
    
    placeholderTextColor='black'
    style={style.textInput}
    onChangeText={this.hospitalAddress}>
</TextInput>
</View>
<View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
                            <TextInput
                                placeholder='Doctor Name'
                                keyboardType ='phone-pad'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.age}>
                            </TextInput>
                        </View>
<View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

{/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
<TextInput
    placeholder='Doctor Contact'
    keyboardType ='phone-pad'
    placeholderTextColor='black'
    style={style.textInput}
    onChangeText={this.doctor}>
</TextInput>
</View>
<View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

{/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
<TextInput
    placeholder='Other details of Case'
    
    placeholderTextColor='black'
    style={style.textInput}
    onChangeText={this.otherDetailsOfCase}>
</TextInput>
</View>
{/* <TouchableOpacity onPress={this.getImage.bind(this)} >
<View style={[style.button1,{width :300,alignSelf : "center"}]}>
    <Text style={style.textbutton}>Upload Prescription</Text>
</View>

</TouchableOpacity>
<Text style = {{marginBottom : 10,alignSelf: "center"}}>
Number of images uploaded : {this.state.imageCount}
</Text> */}
<TouchableOpacity onPress={this.upDate} >
<View style={[style.button1,{width :300,alignSelf : "center"}]}>
    <Text style={style.textbutton}>Update Authorities</Text>
</View>

</TouchableOpacity>



                        <View style={{flexDirection:'row' ,alignSelf:"center", marginTop:10,marginBottom:10}}>
                        
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