import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


export default function UserItem({userInfo}) {
  return (
    <Link href={'/chat?id='+userInfo.docId}
    style={{
        width:'100%',
        backgroundColor: '#ffffff',
        flex:1,
        borderBottomWidth: 1,
        borderColor:'#000000',
    }}>
    <View style={{
        padding: 10,
        width:'100%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0,
        borderBottomColor: '#e0e0e0',
    }}>
        <Image
        source={{
            uri: userInfo?.image
        }}
        style={{
            width:50,
            height:50,
            borderRadius:50,
            marginTop:20,
        }}
        />
    <Text style={{
        color: '#000000',
        fontSize: 30,
        marginTop: 20,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 10,
    }}>{userInfo.name || "No Name Available"}</Text>
  </View>
  </Link>
  )
}