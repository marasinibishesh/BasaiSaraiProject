import { View, Text,Image,TouchableOpacity,TextInput,ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import { Formik } from 'formik';
import React,{ useState,useContext,useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { UserLocationContext } from '../Context/UserLocationContext';
import * as Location from 'expo-location';
import { collection, getDocs, query, orderBy,setDoc,doc } from 'firebase/firestore';
import { db, storage } from '../../configs/FirebaseConfig';
import RNPickerSelect from 'react-native-picker-select';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {useUser} from '@clerk/clerk-expo'



export default function add() {
  const [image, setImage] = useState(null);
  const onImagePic=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);

    console.log(result);
  }
  const { location, setLocation } = useContext(UserLocationContext);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');
  const [loading,setLoading]=useState(false);
  const[price,setPrice]=useState('');

  useEffect(() => {
    (async () => {
      if (location && location.coords) {
        let address = await Location.reverseGeocodeAsync(location.coords);
        setAddress(address[0].formattedAddress);
        console.log(address);
      }
    })();
    
  }, [location]);

  const [categoryList,setCategoryList]=useState([]);
  const GetCategoryList=async()=>{
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc)=>{
      console.log(doc.data());
      setCategoryList(prev=>[...prev,{
        label:(doc.data()).name,
        value:(doc.data()).name
      }]);
    })
  }
  useEffect(() => {
    GetCategoryList();
    
  }, [])

  const onAddNewRoom=async()=>{
    setLoading(true);
    const fileName=Date.now().toString()+'.jpg';
    const resp=await fetch(image);
    const blob=await resp.blob();
    const imageRef=ref(storage,'BasaiSarai/'+fileName);
    uploadBytes(imageRef,blob).then((snapShot)=>{
      console.log('Uploaded');
    }).then(resp=>{
      getDownloadURL(imageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        saveRentDetail(downloadUrl)
      })
    })
    setLoading(false);
  }
  const {user}=useUser();
  
  const saveRentDetail = async (imageUrl) => {
    const rentDocId = Date.now().toString(); // This generates the document ID
    const rentDocRef = doc(db, 'RentList', rentDocId); // Correct reference to the document
  
    await setDoc(rentDocRef, {
      name: name,
      address: address,
      price:Number(price),
      contact: contact,
      category: category,
      about: about,
      imageUrl: imageUrl,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl
    });
  
    setLoading(false);
    ToastAndroid.show('New Room Added...', ToastAndroid.LONG);
    setName('')
    setPrice('')
    setContact('')
    setCategory(" ")
    setAbout(null)
    setImage(null)


  };
  
  return (
    <ScrollView
    style={{
      backgroundColor:'#186CEB',
    }}>
      <View
      style={{
        marginTop:50,
        backgroundColor:'#E9F2FF',
        borderTopLeftRadius:70,
        borderTopRightRadius:70,
      }}
      >
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:20,
        }}>
          <View
          style={{
            width:83,
            height:5,
            backgroundColor:'#D9D9D9',
            borderRadius:50,
            marginBottom:10,
            flex:1,
          }}/>
          <Text style={{
            fontFamily:'Montserrat-SemiBold',
            fontSize:24,
            color:'#186CEB',
            marginBottom:20
          }}>
            Add New Room
          </Text>
          <TouchableOpacity onPress={
            ()=>onImagePic()
          }>
          {!image?<Image
          source={require('./../../assets/images/imagepicker.png')}
          style={{
            width:200,
            height:200,
            borderRadius:10,
            borderWidth: 2, // Thickness of the border
            borderColor: 'white', // Color of the border
          }}
          />
          :<Image
          source={{uri:image}}
          style={{
            width:200,
            height:200,
            borderRadius:10,
            borderWidth: 2, // Thickness of the border
            borderColor: 'white', // Color of the border
          }}
          />}
          </TouchableOpacity>
          <View style={{
            flex:1,
            justifyContent:'flex-start',
            width:'100%',
            marginLeft:20,
          }}>
          <Text style={{
            fontFamily:'Montserrat-SemiBold',
            fontSize:24,
            color:'#186CEB',
            marginTop:20,
            textAlignVertical:'top'
          }}>Title</Text>
          <TextInput
          style={{
            width:'90%',
            height:50,
            backgroundColor:'#E9F2FF',
            borderRadius:10,
            borderWidth: 2, // Thickness of the border
            borderColor: '#186CEB', // Color of the border
            marginTop:0,
            paddingLeft:10
          }}
          placeholder='Name'
          onChangeText={(v)=>setName(v)}
          />
          </View>
          <View style={{
            flex:1,
            justifyContent:'flex-start',
            width:'100%',
            marginLeft:20,
          }}>
          <View style={{
            justifyContent:'center',
          }}>
          <Text style={{
            fontFamily:'Montserrat-SemiBold',
            fontSize:24,
            color:'#186CEB',
            marginTop:20,
          }}>Address</Text>
          <Text style={{
            fontFamily:'Montserrat-Regular',
            fontSize:12,
            color:'#186CEB',
            marginTop:5,
          }}>
            Your Current location is shown 
          </Text>
          </View>
          <TextInput
          style={{
            width:'90%',
            height:50,
            backgroundColor:'#E9F2FF',
            borderRadius:10,
            borderWidth: 2, // Thickness of the border
            borderColor: '#186CEB', // Color of the border
            marginTop:0,
            paddingLeft:10
          }}
          value={address}
          onChangeText={(v)=>setAddress(v)}
          />
          </View>
          <View style={{
            flex:1,
            justifyContent:'flex-start',
            width:'100%',
            marginLeft:20,
          }}>
          <Text style={{
            fontFamily:'Montserrat-SemiBold',
            fontSize:24,
            color:'#186CEB',
            marginTop:20,
          }}>Price</Text>
          <TextInput
          style={{
            width:'90%',
            height:50,
            backgroundColor:'#E9F2FF',
            borderRadius:10,
            borderWidth: 2, // Thickness of the border
            borderColor: '#186CEB', // Color of the border
            marginTop:0,
            paddingLeft:10
          }}
          placeholder='Price'
          onChangeText={(v)=>setPrice(v)}
          keyboardType="numeric"
          />
          </View>
          <View style={{
            flex:1,
            justifyContent:'flex-start',
            width:'100%',
            marginLeft:20,
          }}>
          <Text style={{
            fontFamily:'Montserrat-SemiBold',
            fontSize:24,
            color:'#186CEB',
            marginTop:20,
          }}>Contact</Text>
          <TextInput
          style={{
            width:'90%',
            height:50,
            backgroundColor:'#E9F2FF',
            borderRadius:10,
            borderWidth: 2, // Thickness of the border
            borderColor: '#186CEB', // Color of the border
            marginTop:0,
            paddingLeft:10
          }}
          placeholder='Contact'
          onChangeText={(v)=>setContact(v)}
          keyboardType="numeric"
          />
          </View>
          <View style={{
            flex:1,
            justifyContent:'flex-start',
            width:'100%',
            marginLeft:20,
          }}>
          <Text style={{
            fontFamily:'Montserrat-SemiBold',
            fontSize:24,
            color:'#186CEB',
            marginTop:20,
          }}>Category</Text>
          <View style={{
            width:'90%',
            height:50,
            backgroundColor:'#E9F2FF',
            borderRadius:10,
            borderWidth: 2, // Thickness of the border
            borderColor: '#186CEB', // Color of the border
            marginTop:0,
            padding:10,
            justifyContent:'center',
            alignItems:'center',
          }}>
          <RNPickerSelect
      onValueChange={(value) => setCategory(value)}
      items={categoryList}
    />
    </View>
    </View>
    <View style={{
            flex:1,
            justifyContent:'flex-start',
            width:'100%',
            marginLeft:20,
          }}>
          <Text style={{
            fontFamily:'Montserrat-SemiBold',
            fontSize:24,
            color:'#186CEB',
            marginTop:20,
          }}>Description</Text>
          <TextInput
          style={{
            width:'90%',
            height:150,
            backgroundColor:'#E9F2FF',
            borderRadius:10,
            borderWidth: 2, // Thickness of the border
            borderColor: '#186CEB', // Color of the border
            marginTop:0,
            paddingLeft:10,
            textAlignVertical:'top',
            padding:10,
          }}
          placeholder='Description'
          numberOfLines={5}
          onChangeText={(v)=>setAbout(v)}
          />
          </View>
        </View>
        <TouchableOpacity style={{
            backgroundColor: '#186CEB',
            width: '90%',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20
          }
          
        }
        disabled={loading}
        onPress={()=>onAddNewRoom()}
        >{loading?
          (<ActivityIndicator size={24} color={'#ffffff'}/>):
          (<Text style={{
            fontFamily: 'Montserrat-SemiBold',
             fontSize: 18,
              color: 'white' 
          }}>
            Add New Room
          </Text>)}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
