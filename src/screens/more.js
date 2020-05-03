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
// import 'firebase/firestore'
// import * as firebase from 'firebase/app'
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';
import {decode, encode} from 'base-64'
import GetLocation from 'react-native-get-location'
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from "react-native-image-picker";
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }
var fs
const Blob = RNFetchBlob.polyfill.Blob;
fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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

            textVisible: false,
            db: firebase.firestore(),
            visible: false,
            check: false
            
        }
    }
    componentDidMount(){
        console.log("The params got"+this.props.navigation.getParam('name','were not recvd'))

    }
    getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    
    }
    getImage() {
            let options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        // First argument = let it be null
        // Second argument = response is the callback which sends object: response
        ImagePicker.showImagePicker(options, (response) => {
           // console.warn('Response = ', response);

            if (response.didCancel) {
                console.warn('User cancelled image picker');
            }
            else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                let source = {uri: 'data:image/jpeg;base64,' + response.data, image: "file.png"};

                // this.setState({
                //     imageUri: response.uri,
                //     imgName: response.fileName,
                // }).then(console.log("success this is the uri:" + this.state.fileName));
                var data = []
                this.uploadImage(response.uri);
                data.push(response.fileName)
                this.setState(
                    {
                        images : data,
                        imageCount : this.state.imageCount + 1
                    }
                )
                console.log(response.uri)
            }
        });
    }

    uploadImage = (uri, mime = 'application/octet-stream') => {
        // return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let uploadBlob = null;
        const sessionId = new Date().getTime();
        const imageRef = firebase.storage().ref('/images/').child(this.props.navigation.getParam('name','Unnamed')+"_"+sessionId);
        console.log("This is in uploadImage")
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                console.log("Check 1")
                return Blob.build(data, {type: `${mime};Base64`})
                
            })
            .then((blob) => {
                uploadBlob = blob;
                console.log("Check 2")
                return imageRef.put(blob, {contentType: mime})
            })
            .then((url) => {
                console.log("Check 3")
                uploadBlob.close();
                return imageRef.getDownloadURL();

            })
            .then((url) => {
                console.log("Check 4")
                this.storeReference(url, sessionId);
                //console.warn(url);
                console.log("Check 5")
            }).then(Alert.alert(
            "Prescription Uploaded!",
        //    [
        //         {text: "Add more",onPress: ()=> console.log("da")},
        //         {
        //             text : "Done" , onPress : ()=> this.navigation.navigate("home")
        //         }
           
        //    ]
            ))
            .catch((err) => {
                console.error(err);
            })
    }
    storeReference = (url) => {
        this.setState({firebaseImageUrl: url});
        //console.log(this.state.firebaseImageUrl)
    }
    //##############################################
    getImageAsBlob = () => {
        return new Promise((resolve, reject) => {
          ImagePicker.showImagePicker({}, response => {
            fetch(response.uri)
              .then(response2 => {
                return response2.blob();
              })
              .then(
                blob => {
                  return resolve(blob);
                },
                error => {
                  return resolve(error);
                }
              );
          });
        });
      };

    _uploadFile = async () => {
        try {
          const blob = await this.getImageAsBlob();
          console.log("got blob", blob);
          const uploadResults = await firebase.uploadImage(blob);
          console.log("uploaded blob", uploadResults);
          return firebase.addObjectToCollection({
            collection: "assets",
            objectData: uploadResults
          });
        } catch (e) {
          alert("_uploadFile", JSON.stringify(e));
        }
      };
    

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
   
    upDate =()=>{
            if(this.state.imageCount == 0)
            {
                Alert.alert(
                    "Please upload Prescription",
                    "We cannot procede further without prescription"
                )
            }
            else{
            this.check()
            this.state.db.collection("Users").doc(this.props.navigation.getParam('name','Unnamed')).set({
            condition : this.state.condition,
            hospital : this.state.hospital,
            hospitalAddress : this.state.hospitalAddress,
            doctor : this.state.doctor,
            otherDetailsOfCase : this.state.otherDetailsOfCase
            }).then(console.log("Done")).then(()=>this.props.navigation.navigate('home'))
            .catch((e) => console.log(e))}
    }
    
    check = () => {
        
        console.log('checking')
        
        
        if (this.state.consition != '')
            this.setState({ check: true })
        else if (this.state.hospital != '')
            this.setState({ check: true })
        else if (this.state.doctor != '')
            this.setState({ check: true })
        else if (this.state.otherDetailsOfCase != '')
            this.setState({ check: true })
        else
            this.setState({ check: false })

    }
   
    
    render() {
        return (
            <ImageBackground source={require('/Users/apple/trana2/src/assets/backgroundimage.jpg')} style={{ height: '100%', width: '100%' }} >
                <ScrollView style={{ padding: 10, marginTop: 20 }}>
                    <View style={style.container}>
                        
                        
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Condition'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.condition}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Hospital Name'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.hospital}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Hospital Address'
                                keyboardType ='phone-pad'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.hospitalAddress}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Doctor Name'
                                
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.doctor}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Other details of Case'
                                
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.otherDetailsOfCase}>
                            </TextInput>
                        </View>
                        <TouchableOpacity onPress={this.getImage.bind(this)} >
                            <View style={[style.button1,{width :300,alignSelf : "center"}]}>
                                <Text style={style.textbutton}>Upload Prescription</Text>
                            </View>

                        </TouchableOpacity>
                        <Text style = {{marginBottom : 10,alignSelf: "center"}}>
                            Number of images uploaded : {this.state.imageCount}
                        </Text>
                        <TouchableOpacity onPress={this.upDate} >
                            <View style={[style.button1,{width :300,alignSelf : "center"}]}>
                                <Text style={style.textbutton}>Update Authorities</Text>
                            </View>

                        </TouchableOpacity>
                        
                        
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
                        
                    </View>
                </ScrollView>
            </ImageBackground>
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
        backgroundColor: '#341f97',
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
        backgroundColor: '#341f97',
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