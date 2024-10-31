import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

export default function RentListCard({rent}) {
  const router=useRouter();
  return (
    <TouchableOpacity
    style={{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:2,
        borderColor:"#186CEB",
        margin:10,
        flexDirection:'row',


    }}
    onPress={()=>{router.push(`/rentdetail/${rent.id}`)}}
    >
      <Image
      source={{uri:rent.imageUrl}}
        style={{
            width:120,
            height:120,
            borderRadius:10,
            
        }}
      />
      <View 
      style={{
        flex:1,
        marginLeft:10,
      }}
      >
      <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
              
            }}
            >{rent.name}</Text>
            <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
              

            }}>
            <FontAwesome name="map-marker" size={12} color="#EA4335" />
            {" "}{rent.address}</Text>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginBottom:"5",
                
              }}><Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
              marginRight:0,

            }}>
            <MaterialCommunityIcons name="currency-rupee" size={16} color="#157811" />
            {" "}{rent.price}</Text>
            <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color:"white",
              fontSize: 14,
              marginTop: 0,
              marginLeft: 5,
              backgroundColor:"#186CEB",
              borderRadius:5,
              padding:2,
              marginRight:5,
            }}>
            
            {" "}{rent.category}{" "}</Text>
            </View>
            
            </View>
    </TouchableOpacity>
  )
}