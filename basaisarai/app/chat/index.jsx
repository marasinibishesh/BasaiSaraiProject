import { View, Text,TouchableOpacity,Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useState,useCallback, } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';
import moment from 'moment'



export default function ChatScreen() {
    const [messages, setMessages] = useState([])
    const {user}=useUser();
    const params=useLocalSearchParams();
    const[otherUser,setOtherUser]=useState([]);
    console.log(params);
    useEffect(()=>{
        GetUserDetails();
        const unsubscribe=onSnapshot(collection(db,'Chat',params?.id,'Messages'),(snapshot)=>{
            const messageData=snapshot.docs.map((doc)=>({
                _id:doc.id,
                ...doc.data(),
            })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sorting in descending order
            setMessages(messageData);
        });
        return ()=>unsubscribe();
    },[])
    const GetUserDetails=async()=>{
        const docRef=doc(db,'Chat',params?.id);
        const docSnap=await getDoc(docRef);
        const result=docSnap.data();
        console.log(result);
        const otherUser=result?.users.filter(item=>item.email!=user?.primaryEmailAddress.emailAddress)
        console.log(otherUser);
        setOtherUser(otherUser);
    }
    const onSend = async(newMessage)=>{
        setMessages((previousMessage)=>GiftedChat.append(previousMessage,newMessage));
        newMessage[0].createdAt=moment().format('MM-DD-YYYY HH:mm:ss');
        await addDoc(collection(db,'Chat',params.id,'Messages'),newMessage[0])

    }
  return (
    <View style={{
        flex:1,
        backgroundColor:"#ffffff"
    }}>
      {/* Header of Chat Area */}
        <View style={{
            backgroundColor:"#186CEB",
            height:80,
            //flex:1,
            flexDirection:"row",
            justifyContent:'space-between',
            alignItems:"center"
        }}>
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                width:"70%",
                paddingLeft:10,
                paddingRight:10,
            }}>
            <TouchableOpacity onPress={()=>router.back()}
                style={{
                    paddingTop:10,
                    margin:10,
                    marginTop:20,
                }}>
            <Ionicons name="arrow-back" size={40} color="#ffffff" />
            </TouchableOpacity>
            <Image
            source={{
                uri:otherUser[0]?.image
            }}
            style={{
                width:50,
                height:50,
                borderRadius:50,
                marginTop:20,
            }}
            />
            <Text 
            style={{
                color:"white",
                fontSize:30,
                marginTop:20,
                fontFamily:'Montserrat-Regular',
                textAlign:'center',
                marginLeft:10,
                
            }}>{otherUser[0]?.name}</Text>
            </View>
            
            </View>
            <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id:user?.primaryEmailAddress.emailAddress,
        name:user?.fullName,
        avatar:user?.imageUrl
      }}
    />
    </View>
  );
}
