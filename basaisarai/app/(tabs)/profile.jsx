import { View, Text,Image,TouchableOpacity, Share } from 'react-native'
import React from 'react'
import {useAuth, useUser} from '@clerk/clerk-expo'
import AntDesign from '@expo/vector-icons/AntDesign';//<AntDesign name="upload" size={24} color="black" />
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';//<FontAwesome5 name="list-alt" size={24} color="black" />
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
//<AntDesign name="sharealt" size={24} color="black" />
//<AntDesign name="logout" size={24} color="black" />

export default function () {
  const {signOut}=useAuth();
  const router=useRouter();
  const {user}=useUser();
  return (
    <View
    style={{
      flex:1,
      backgroundColor:'#186CEB',
    }}>
      <View
      style={{
        marginTop:100,
        backgroundColor:'#E9F2FF',
        flex:1,
        borderTopLeftRadius:70,
        borderTopRightRadius:70,
      }}
      >
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          marginTop:20
        }}>
          <View
          style={{
            width:83,
            height:5,
            backgroundColor:'#D9D9D9',
            borderRadius:50,
            marginBottom:10
          }}>

          </View>
        <Image source={{uri:user?.imageUrl}}
        style={{
          width:150,
          height:150,
          borderRadius:99,
          borderWidth: 2, // Thickness of the border
          borderColor: '#88B8FF', // Color of the border
        }}
        />
        <Text style={{
                margin:10,
                fontSize:20,
                fontFamily:'Montserrat-Bold',
                color:'#000000'
            }}>{user?.fullName}</Text>
            <Text
            style={{
                                    fontFamily:"Montserrat-Regular",
                                    fontSize:14,
                                    marginLeft:10,
                                    color:"#186CEB"
           }}
          >{user?.primaryEmailAddress.emailAddress}</Text>
        </View>
        <View
        style={{
          flexDirection:'row',
          justifyContent:'center',
          margin:20,
          width:"90%",
          color:'white',
          backgroundColor:'white',
          height:200,
          borderRadius:20,
          overflow: 'hidden',
          flexWrap: 'wrap',
        }}>
          <TouchableOpacity
          onPress={()=>router.navigate('./add')}
          style={{
            margin:10,
            width:'40%',
            height:70,
            borderWidth:3,
            borderColor:'#E6F0FF',
            borderRadius:20,
            justifyContent:'center',
            alignItems:'center',
          }}>
          <AntDesign name="upload" size={24} color="#186CEB"/>
          <Text
          style={{
            fontFamily:'Montserrat-Bold',
            color:'#000000'
          }}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
            router.push(`/myrent/myrent`)
        }}
          style={{
            margin:10,
            width:'40%',
            height:70,
            borderWidth:3,
            borderColor:'#E6F0FF',
            borderRadius:20,
            justifyContent:'center',
            alignItems:'center',
          }}>
          <FontAwesome5 name="list-alt" size={24} color="#186CEB" />
          <Text
          style={{
            fontFamily:'Montserrat-Bold',
            color:'#000000'
          }}>My Listing</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{
            margin:10,
            width:'40%',
            height:70,
            borderWidth:3,
            borderColor:'#E6F0FF',
            borderRadius:20,
            justifyContent:'center',
            alignItems:'center',
          }}
          onPress={()=>{router.push(`/mapSearch/mapSearch`)}}>
          <FontAwesome6 name="map-location-dot" size={24} color="#186CEB" />
          <Text
          style={{
            fontFamily:'Montserrat-Bold',
            color:'#000000'
          }}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{
            margin:10,
            width:'40%',
            height:70,
            borderWidth:3,
            borderColor:'#E6F0FF',
            borderRadius:20,
            justifyContent:'center',
            alignItems:'center',
          }}
          onPress={()=>signOut()}>
          <AntDesign name="logout" size={24} color="#186CEB" />
          <Text
          style={{
            fontFamily:'Montserrat-Bold',
            color:'#000000'
          }}>Log Out</Text>
          </TouchableOpacity>
 

        </View>
      </View>
    </View>
  )
}