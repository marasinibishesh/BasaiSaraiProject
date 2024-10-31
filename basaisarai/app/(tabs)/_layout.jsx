import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import {Tabs} from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { UserLocationContext } from '../Context/UserLocationContext';

export default function TabLayout() {
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      console.log(location);
      console.log(address[0].city);
      setLocation(location);
    })();
  }, []);
  return (
    <UserLocationContext.Provider value={{location,setLocation}}>
    <Tabs screenOptions={{
        headerShown:false
    }}>
    <Tabs.Screen name='home'
    options={{
        tabBarLabel:'Home',
        tabBarIcon:({color,size})=>(
            <AntDesign name='home' color={color} size={size}/>)
    }}/>
    <Tabs.Screen name='explore'
    options={{
        tabBarLabel:'Explore',
        tabBarIcon:({color,size})=>(
            <Entypo name="compass" size={size} color={color} />)
    }}/>
    <Tabs.Screen name='add'
    options={{
        tabBarLabel:'Add',
        tabBarIcon:({color,size})=>(
            <FontAwesome name="plus-square-o" size={40} color={color} />)
    }}/>
    <Tabs.Screen name='chat'
    options={{
        tabBarLabel:'Chat',
        tabBarIcon:({color,size})=>(
            <AntDesign name="message1" size={24} color={color}/>)
    }}/>
    <Tabs.Screen name='profile'
    options={{
        tabBarLabel:'Profile',
        tabBarIcon:({color,size})=>(
            <MaterialCommunityIcons name="account" size={size} color={color} />)
    }}/>
   </Tabs>
   </UserLocationContext.Provider>
  )
}