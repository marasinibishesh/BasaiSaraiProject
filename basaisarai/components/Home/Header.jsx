import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import {useUser} from '@clerk/clerk-expo'
import LocationScreen from '../../components/Home/LocationScreen'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';





export default function Header() {
  
    const {user}=useUser();
    const router=useRouter();
  return (
    <View style={{
        padding:20,
        paddingTop:40,
        backgroundColor:'#186CEB',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
    }}>
      <View
      style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',


      }}>
        <Image source={{uri:user?.imageUrl}}
        style={{
          width:50,
          height:50,
          borderRadius:99,
          borderWidth: 2, // Thickness of the border
          borderColor: 'white', // Color of the border
        }}
        />
        <View style={{
            margin:15,
        }}>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            width:250,
            marginBottom:5
          }}>
            <Text
            style={{
                fontFamily:'Montserrat-SemiBold',
                color:'white'
            }}>Welcome,</Text>
            
            <TouchableOpacity style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
            
        }}
        onPress={()=>{
            router.push(`/mapSearch/mapSearch`)
        }}
        >
        
        <FontAwesome name="map-marker" size={16} color="white" />
       
        <LocationScreen/>
        
        </TouchableOpacity>
        </View>
            <Text style={{
                fontSize:20,
                fontFamily:'Montserrat-Italic',
                color:'white'
            }}>{user?.fullName}</Text>
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})