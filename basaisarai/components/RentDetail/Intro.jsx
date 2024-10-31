import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Route } from 'expo-router/build/Route';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useUser } from '@clerk/clerk-expo';



export default function Intro({rent}) {
  const {user}=useUser();
  return (
    <View
    style={{
    }}
    >
     <View style={{
        position:"absolute",
        zIndex:10,
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        width:"100%",
        paddingTop:20 ,
        paddingLeft:10,
        paddingRight:10,
     }}>
    <TouchableOpacity onPress={()=>router.back()}>
     <Ionicons name="arrow-back" size={40} color="#186CEB" />
     </TouchableOpacity>
     <AntDesign name="hearto" size={30} color="white" />
     </View>
      <Image source={{
        uri:rent.imageUrl
      }}
      style={{
        width: '100%',
        height: 340
      }}
      />
      <View
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        marginTop:-30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom:0,
        padding:10,
        zIndex:10,
        
      }}
      >
        <View
        style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            
            marginBottom:"5", 
          }}>
        <View style={{
          width:'80%',

        }}>
        <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: 20,
          marginTop: 10,
          marginLeft: 10
        }}
        >{rent.name}</Text>
        </View>
        <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color:"white",
              fontSize: 14,
              marginTop: 10,
              marginLeft: 5,
              backgroundColor:"#186CEB",
              borderRadius:5,
              padding:2,
              marginRight:5,
            }}>
            
            {" "}{rent.category}{" "}</Text>
        </View>
        <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 14,
          marginTop: 10,
          marginLeft: 10
        }}
        >
        <FontAwesome name="map-marker" size={12} color="#EA4335" />
        {" "}{rent.address}</Text>
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          marginTop:10,
          marginBottom:10,
        }}>
        <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 14,
          marginTop: 10,
          marginLeft: 10
        }}
        >
        <MaterialCommunityIcons name="currency-rupee" size={16} color="#157811" />
        {" "}{rent.price}</Text>
        </View>
      </View>
    </View>
  )
}