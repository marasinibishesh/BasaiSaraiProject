import { View, Text, TextInput,TouchableOpacity, ToastAndroid, Alert  } from 'react-native'
import React,{useState,useEffect} from 'react'
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import {useUser} from '@clerk/clerk-expo';
import { router } from 'expo-router';



export default function Messages({rent}) {
    const [placeholderText, setPlaceholderText] = useState('');
    const [message, setMessage] = useState('');
    const {user}=useUser();
    const OnDelete=async()=>{
      Alert.alert('Do you want to Delete?',`Do you really want to Delete this ${rent.category}`,[
        {
          text:'Cancel',
          onPress:()=>console.log('Cancel Pressed'),
          style:'cancel'
        },
        {
          text:'Delete',
          style:'destructive',
          onPress:()=>deleteRent()
        }
      ])
    }
    const deleteRent=async()=>{
      console.log(`${rent.category} is deleted`)
      await deleteDoc(doc(db,'RentList',rent?.id))
      router.back();
      ToastAndroid.show(`${rent.category} is Deleted`,ToastAndroid.LONG)
    }

    const onSubmit=async()=>{
        const docRef=doc(db,'RentList',rent?.id)
        await updateDoc(docRef,{
            messages:arrayUnion({
                message:message,
                userName:user?.fullName,
                userImage:user?.imageUrl,
                userEmail:user?.primaryEmailAddress?.emailAddress,
            })
        })
        ToastAndroid.show('Your feedback is Added',ToastAndroid.BOTTOM);
        setMessage('');
    }
    useEffect(() => {
        const data = [
          {
            id: 1,
            name: "Your review on this " + rent?.category,
          }
        ];
    
        // Assuming you want to use the first object's name property as the placeholder
        setPlaceholderText(data[0].name);
      }, [rent]);
  return (
    <View
    style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        flex:1,
        
    }}>
      {(user?.primaryEmailAddress.emailAddress!=rent?.userEmail)?(<View><Text
      style={{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20
      }}
      >Feedback</Text>
      <TextInput
      placeholder={placeholderText}
      numberOfLines={3}
      multiline={true}
      onChangeText={(value)=>setMessage(value)}
      style={{
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        marginTop: 10,
        marginLeft: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#186CEB',
        borderRadius: 5,
        width: '90%',
        textAlignVertical:'top'
      }}
      />
      <TouchableOpacity
      disabled={!message}
      onPress={()=>{
        console.log(message)
        onSubmit()}}
      style={{
            backgroundColor: '#186CEB',
            width: '90%',
            padding: 10,
            borderRadius: 5,
            marginLeft: 20,
            marginTop: 10,
      }}
      >
        <Text
        style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            color: '#FFFFFF',
            textAlign: 'center',
        }}>
            Comment
        </Text>
      </TouchableOpacity>
      <View
      style={{
            height: 20
      }}>

      </View></View>):(
        <View>
          <TouchableOpacity
      onPress={()=>OnDelete()}
      style={{
            backgroundColor: '#FF474C',
            width: '90%',
            padding: 10,
            borderRadius: 5,
            marginLeft: 20,
            marginTop: 10,
      }}
      >
        <Text
        style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            color: '#FFFFFF',
            textAlign: 'center',
        }}>
            Delete {rent.category}
        </Text>
      </TouchableOpacity>
      <View style={{
        height: 200
      }}>
      </View>
        </View>
      )}
    </View>
  )
}