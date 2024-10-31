import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserItem from './../../components/inbox/UserItem'

export default function chat() {
  const [userList,setUserList]=useState([])
  const {user}=useUser()
  const [loader,setLoader]=useState(false)
  useEffect(()=>{
    user&&GetUserList();
  },[user])
  //Get UserList Depends on Current User Emails
  const GetUserList=async()=>{
    setLoader(true)
    setUserList([])
    const q=query(collection(db,'Chat'),where('userId','array-contains',user?.primaryEmailAddress.emailAddress));
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach(doc=>{
      console.log(doc.data());
      setUserList((previousUserList)=>[...previousUserList,doc.data()]);
    })
    setLoader(false)
  }
  //Filter the List of Other User in One State
const MapOtherUserList=()=>{
  const list=[];
  userList.forEach((record)=>{
    const otherUser=record.users?.filter(users=>users?.email!=user?.primaryEmailAddress.emailAddress)
    const result={
      docId:record.id,
      ...otherUser[0]
    }
    list.push(result);
  })
  return list;
}
  return (
    <View style={{
      flex:1,
      backgroundColor:"#ffffff",
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#186CEB',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        justifyContent:'center',
      }}>
      <Text style={{
        fontSize:30,
        fontFamily:'Montserrat-Bold',
        textAlign:'center',
        color:'#ffffff',
        marginTop:40,
      }}>Chat</Text></View>
      <FlatList
      data={MapOtherUserList()}
      refreshing={loader}
      onRefresh={GetUserList}
      style={{
        marginTop:10,
      }}
      renderItem={({item,index})=>(
        <UserItem userInfo={item} key={index}/>
      )}
      />
    </View>
  )
}