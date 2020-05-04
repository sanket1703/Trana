import React from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Picker,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';
//import storage from '@react-native-firebase/storage';
//import firestore from '@react-native-firebase/app';

//import 'firebase/firestore'
//import * as firebase from 'firebase/app'

import GetLocation from 'react-native-get-location';
//import RNFetchBlob from 'react-native-fetch-blob';
//import ImagePicker from "react-native-image-picker";
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogButton,
  DialogFooter,
  DialogTitle,
} from 'react-native-popup-dialog';
import {decode, encode} from 'base-64';

// fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;
//
// const Blob = RNFetchBlob.polyfill.Blob;
// fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default class SignUpScreen extends React.Component {
  componentDidMount() {
    this.getId();

    var location1 = [];
    var lat, long;
    // firebase.firestore.setLogLevel('debug')
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        long = location['longitude'];
        lat = location['latitude'];
        location1.push(location['longitude']);
        location1.push(location['latitude']);
        console.log('Longitude:' + long);
        console.log('Latitude:' + lat);
        this.setState({
          longitude: long,
          latitude: lat,
          locationNew: location1,
        });
        console.log('long' + this.state.longitude);
        console.log(this.state.locationNew);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }
  getId = async () => {
    var ID = (await AsyncStorage.getItem('Id')).toString();
    this.setState({ID});
    console.log(ID);
  };
  constructor(props) {
    super(props);

    this.state = {
      ID: '',
      age: '',
      name: '',
      address: '',
      gender: '',
      medicines: '',
      otherInfo: '',
      critical: '',
      case: '',
      contact: '',

      condition: '',
      hospital: '',
      hospitalAddress: '',
      doctor: '',
      otherDetailsOfCase: '',
      images: [],
      imageCount: 0,
      imageUri:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE88QZWx1eLEsnCSjvXBQHjxiXJ1nY0PlNkf7H6twi9ru_NBU3g',
      firebaseImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE88QZWx1eLEsnCSjvXBQHjxiXJ1nY0PlNkf7H6twi9ru_NBU3g',
      imgName: '',
      location: [],
      longitude: 0,
      latitude: 0,

      textVisible: false,
      //db: firebase.firestore(),
      visible: false,
      check: false,
      loading: false,
      user: '',
      size: 0,
      area: '',
      country: '',
      uId: '',
      imageSource: require('../interface.png'),
      upload: false,
      Id: AsyncStorage.getItem('Id'),
    };
  }

  changeImage = () => {
    const options = {
      quality: 0.7,
      allowsEditing: true,
      mediaType: 'photo',
      nodata: true,
      storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        path: 'images',
        cameraRoll: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log(error);
      } else if (!response.didCancel) {
        this.setState(
          {
            upload: true,
            imageSource: {uri: response.uri},
          },
          this.uploadFile,
        );
      }
    });
  };
  // updateUserImage = imageUrl => {
  //   //User.image = imageUrl;
  //   this.updateUser();
  //   this.setState({upload: false, imageSource: {uri: imageUrl}});

  //   User.image = this.state.imageSource;
  //   AsyncStorage.setItem(
  //     'userImage',
  //     JSON.stringify(this.state.imageSource),
  //     err => {
  //       if (err) {
  //         console.log('an error');
  //         throw err;
  //       }
  //       console.log('success');
  //     },
  //   ).catch(err => {
  //     console.log('error is: ' + err);
  //   });
  //   console.log(User.image);
  // };
  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.imageSource.uri);

    storage()
      .ref(`prescription/${this.state.ID}.png`)
      .put(file)
      //.then((snapshot) => snapshot.ref.getDownloadURL())
      .then(this.setState({upload: false}))
      //.then(url => this.updateUserImage(url))
      .catch((error) => {
        this.setState({
          upload: false,
          imageSource: require('../interface.png'),
        });
        Alert.alert('Error', 'Error in uploading image!');
        console.log(error);
      });
  };
  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('Error while uploading Image!'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

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
  //  uploadImage = (uri, mime = 'application/octet-stream') => {
  //     return new Promise((resolve, reject) => {
  //       const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
  //         const sessionId = new Date().getTime()
  //         let uploadBlob = null
  //         const imageRef = storage.ref('images').child(`${sessionId}`)

  //         fs.readFile(uploadUri, 'base64')
  //         .then((data) => {
  //             console.log("Check 1")
  //           return Blob.build(data, { type: `${mime};BASE64` })
  //         })
  //         .then((blob) => {
  //             console.log("Check 2" )
  //             console.log("This is a problem" + blob)
  //           uploadBlob = blob
  //           return imageRef.put(blob, { contentType: mime })
  //         })
  //         .then(() => {
  //             console.log("Check 3")
  //           uploadBlob.close()
  //           return imageRef.getDownloadURL()
  //         })
  //         .then((url) => {
  //             console.log("Check 4")
  //           resolve(url)
  //         }).then(Alert.alert(
  //           " Prescription Uploaded!"       ))
  //         .catch((error) => {
  //             console.log("Check 5")
  //           reject(error)
  //         })
  //     })
  //   }
  // uploadImage = (uri, mime = 'application/octet-stream') => {

  //     // return new Promise((resolve, reject) => {
  //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //     let uploadBlob = null;
  //     const sessionId = new Date().getTime();
  //     const imageRef = storage().ref('/images/').child("Sanket:"+"_"+sessionId);
  //     //this.props.navigation.getParam('name','Unnamed')+"
  //     console.log("This is in uploadImage")
  //     fs.readFile(uploadUri, 'base64')
  //         .then((data) => {
  //             console.log("Check 1"+ data)
  //             return Blob.build(data, {type: `${mime};Base64`})

  //         })
  //         .then((blob) => {
  //             uploadBlob = blob;
  //             console.log("Check 2",blob)
  //             return imageRef.put(blob, {contentType: mime})
  //         })
  //         .then(() => {
  //             console.log("Check 3")
  //             uploadBlob.close();
  //             return imageRef.getDownloadURL();

  //         })
  //         .then((url) => {
  //             console.log("Check 4")
  //             this.storeReference(url);
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

  age = (age) => {
    this.setState({age: age});
  };
  name = (name1) => {
    this.setState({name: name1});
  };
  address = (address) => {
    this.setState({address: address});
  };
  gender = (gender) => {
    this.setState({gender: gender});
  };
  medicines = (specialReq) => {
    this.setState({medicines: specialReq});
  };
  otherInfo = (otherInfo) => {
    this.setState({otherInfo: otherInfo});
  };
  critical = (critical) => {
    this.setState({critical: critical});
  };
  case1 = (case1) => {
    this.setState({case: case1});
  };
  contact = (contact) => {
    this.setState({contact: contact});
  };

  condition = (condition) => {
    this.setState({condition: condition});
  };
  hospital = (hospital) => {
    this.setState({hospital: hospital});
  };
  hospitalAddress = (hospitalAddress) => {
    this.setState({hospitalAddress: hospitalAddress});
  };
  doctor = (doctor) => {
    this.setState({doctor: doctor});
  };
  otherDetailsOfCase = (otherDetailsOfCase) => {
    this.setState({otherDetailsOfCase: otherDetailsOfCase});
  };
  area = (a) => {
    this.setState({area: a});
  };

  country = (c) => {
    this.setState({country: c});
  };

  upDate = async () => {
    //this.check()
    this.setState({
      loading: true,
    });

    const user1 = await auth().currentUser.uid;

    this.setState({
      user: user1,
    });

    firestore()
      .collection('Medicines')
      .doc()
      .set({
        name: this.state.name,
        address: this.state.address,
        contact: this.state.contact,
        condition: this.state.critical,
        area: this.state.area,
        country: this.state.country,
        case: this.state.case,
        gender: this.state.gender,
        age: this.state.age,
        description: this.state.otherInfo,
        medicines: this.state.medicines,
        //condition : this.state.condition,
        hospital: this.state.hospital,
        hospitalAddress: this.state.hospitalAddress,
        doctor: this.state.doctor,
        otherDetailsOfCase: this.state.otherDetailsOfCase,

        //longitude : this.state.longitude,
        //latitude : this.state.latitude,

        imageUri: this.state.imageUri,
        uId: this.state.user,

        location: this.state.locationNew,
      })
      .catch((e) => console.log(e))
      .then(Alert.alert('Details Uploaded to the Authorities'))
      .then(this.props.navigation.navigate('home'));
  };

  check = () => {
    console.log('checking');
    console.log(this.state.name);
    console.log(this.state.address);
    console.log(this.state.critical);
    console.log(this.state.case);
    console.log(this.state.gender);
    console.log(this.state.age);
    console.log(this.state.contact);
    console.log(this.state.otherInfo);
    //console.log(this.state.specialReq)

    if (this.state.condition != '') this.setState({check: true});
    else if (this.state.hospital != '') this.setState({check: true});
    else if (this.state.doctor != '') this.setState({check: true});
    else if (this.state.otherDetailsOfCase != '') this.setState({check: true});
    else if (this.state.name != '') this.setState({check: true});
    else if (this.state.address != '') this.setState({check: true});
    else if (this.state.critical != '') this.setState({check: true});
    else if (this.state.case != '') this.setState({check: true});
    else if (this.state.gender != '') this.setState({check: true});
    else if (this.state.age != '') this.setState({check: true});
    else if (this.state.otherInfo != '') this.setState({check: true});
    else if (this.state.medicines != '') this.setState({check: true});
    else if (this.state.contact != '') this.setState({check: true});
    else this.setState({check: false});
  };

  render() {
    return (
      <View style={{backgroundColor: '#930b0d', flex: 1}}>
        <ScrollView style={{padding: 10, marginTop: 20}}>
          <View style={style.container}>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
              <TextInput
                placeholder="Name"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.name}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
              <TextInput
                placeholder="Address"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.address}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
              <TextInput
                placeholder="Area"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.area}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
              <TextInput
                placeholder="Country"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.country}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
              <TextInput
                placeholder="Contact"
                keyboardType="phone-pad"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.contact}></TextInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 0,
                marginBottom: 10,
                paddingLeft: 10,
              }}>
              {/* <Icon name="mortar-board" size={23} color="black" style={{ paddingTop: 10, paddingLeft: 7, }} /> */}
              <Picker
                selectedValue={this.state.critical}
                style={{height: 50, width: 300}}
                onValueChange={
                  (itemValue, itemIndex) => this.setState({critical: itemValue})
                  //console.log('branch issss ',this.state.branch)
                }>
                <Picker.Item label="Case Intensity" value="" />
                <Picker.Item
                  label="Reporting situation"
                  value="CrReporting situationitical"
                />
                <Picker.Item
                  label="May need ambulance"
                  value="May need ambulance"
                />
                <Picker.Item
                  label="Need dr consultanting"
                  value="Need dr consultanting"
                />
              </Picker>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 0,
                  marginBottom: 10,
                  paddingLeft: 10,
                  marginRight: 40,
                }}>
                {/* <Icon name="calendar" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 7, }} /> */}
                <Picker
                  selectedValue={this.state.case}
                  style={{
                    height: 50,
                    width: 300,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                  }}
                  onValueChange={
                    (itemValue, itemIndex) => this.setState({case: itemValue})
                    //console.log('gender issss ',this.state.gender)
                  }>
                  <Picker.Item label="Case" value="" />
                  <Picker.Item label="Pregnency" value="Pregnency" />
                  <Picker.Item
                    label="Terminal Illness"
                    value="Terminal Illness"
                  />
                  <Picker.Item label="Post Operation" value="Post Operation" />
                  <Picker.Item
                    label="Accident Recovery"
                    value="Accident Recovery"
                  />
                  <Picker.Item label="Child" value="Child" />
                  <Picker.Item label="Others" value="Other" />
                </Picker>
              </View>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              <View
                style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
                {/* <Icon name="male" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 7, }} /> */}
                <Picker
                  selectedValue={this.state.gender}
                  style={{height: 50, width: 300}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({gender: itemValue})
                  }>
                  <Picker.Item label="Gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Others" value="Others" />
                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
              <TextInput
                placeholder="Age"
                keyboardType="phone-pad"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.age}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
              <TextInput
                placeholder="Other info"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.otherInfo}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 9, }} /> */}
              <TextInput
                placeholder="Medicines"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.medicines}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              <TextInput
                placeholder="Condition"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.condition}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              <TextInput
                placeholder="Hospital Name"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.hospital}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              <TextInput
                placeholder="Hospital Address"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.hospitalAddress}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              <TextInput
                placeholder="Doctor Name"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.doctor}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} /> */}
              <TextInput
                placeholder="Doctor Contact"
                keyboardType="phone-pad"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.doctor}></TextInput>
            </View>
            <View style={{flexDirection: 'row', padding: 5, marginBottom: 10}}>
              <TextInput
                placeholder="Other details of Case"
                placeholderTextColor="black"
                style={style.textInput}
                onChangeText={this.otherDetailsOfCase}></TextInput>
            </View>
            <View>
              <Text style={{margin: 5}}>Add Prescription</Text>
              <TouchableOpacity onPress={() => this.changeImage()}>
                {this.state.upload ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <Image
                    style={{
                      borderRadius: 100,
                      width: 100,
                      height: 100,
                      resizeMode: 'cover',
                      marginBottom: 10,
                    }}
                    source={this.state.imageSource}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={this.getImage.bind(this)} >
<View style={[style.button1,{width :300,alignSelf : "center"}]}>
    <Text style={style.textbutton}>Upload Prescription</Text>
</View>

</TouchableOpacity> */}
            {/* <Text style = {{marginBottom : 10,alignSelf: "center"}}>
Number of images uploaded : {this.state.imageCount}
</Text> */}
            <TouchableOpacity onPress={this.upDate}>
              <View style={[style.button1, {width: 300, alignSelf: 'center'}]}>
                <Text style={style.textbutton}>Update Authorities</Text>
              </View>
            </TouchableOpacity>

            {this.state.textVisible ? (
              <Text style={{alignSelf: 'center', color: 'red'}}>
                Password did not match
              </Text>
            ) : null}
            <Dialog
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
                  Please fill up all the fields!
                </Text>
              </DialogContent>
            </Dialog>

            {this.state.textVisible ? (
              <Text style={{alignSelf: 'center', color: 'red'}}>
                Password did not match
              </Text>
            ) : null}
            <Dialog
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
                  Please fill up all the fields!
                </Text>
              </DialogContent>
            </Dialog>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // backgroundColor : '#e7e1fb'
  },
  header: {
    paddingTop: 30,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10,
    paddingBottom: 40,
  },
  textbutton: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
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
    width: 150,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  button2: {
    backgroundColor: '#930b0d',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 40,
    width: 170,
  },
  textInput1: {
    height: 50,
    width: 74,
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
