import { View, Text, ActivityIndicator,ScrollView,Image,TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { db } from '../../configs/FirebaseConfig';
import { collection, doc, getDoc, query, where,getDocs,setDoc } from 'firebase/firestore';
import Intro from '../../components/RentDetail/Intro';
import ActionButton from '../../components/RentDetail/ActionButton';
import About from '../../components/RentDetail/About';
import Messages from '../../components/RentDetail/Messages';
import { useUser } from '@clerk/clerk-expo';



export default function RentDetail() {
    const {user}=useUser();
    const {rentid}=useLocalSearchParams();
    const [rent, setRent] =useState({});
    const[loading,setLoading]=useState(false);
    const router=useRouter();
    //useEffect
    useEffect(()=>{
        GetRentDetailById();
        console.log(rent.userEmail);
    },[])
    //Used to get RentDetail by Id
    const GetRentDetailById=async()=>{
        setLoading(true);
        const docRef=doc(db,'RentList',rentid)
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            console.log("Document Data:",docSnap.data());
            setRent({id:docSnap.id,...docSnap.data()});
            setLoading(false);
        }
        else{
            console.log("No such document")
        }

    }
    const InitiateChat = async () => {
        const docId1 = (user?.primaryEmailAddress?.emailAddress || 'unknown_email') + '_' + (rent?.userEmail || 'unknown_email');
        const docId2 = (rent?.userEmail || 'unknown_email') + '_' + (user?.primaryEmailAddress?.emailAddress || 'unknown_email');
        
        const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
    
        try {
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                    console.log(doc.data());
                    router.push({
                        pathname: '/chat',
                        params: { id: doc.id }
                    });
                });
            } else {
                await setDoc(doc(db, 'Chat', docId1), {
                    id: docId1,
                    users: [
                        {
                            email: user?.primaryEmailAddress?.emailAddress || 'unknown_email',
                            image: user?.imageUrl || 'default_image_url',
                            name: user?.fullName || 'Anonymous'
                        },
                        {
                            email: rent?.userEmail || 'unknown_email',
                            image: rent?.userImage || 'default_image_url',
                            name: rent?.username || 'Anonymous'
                        }
                    ],
                    userId:[user?.primaryEmailAddress?.emailAddress,rent?.userEmail]
                });
    
                router.push({
                    pathname: '/chat',
                    params: { id: docId1 }
                });
            }
        } catch (error) {
            console.error("Error initiating chat: ", error);
        }
    };
    
    
  return (
    <ScrollView>
        {loading?
        <ActivityIndicator
        style={{
            marginTop:"90%"
        }}
        size={30}
        color={"#186CEB"}
        />:
        <View>
            {/* Intro */}
            <Intro rent={rent}/>
            {/* Chat */}
            <View style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 10,
        flex:1,
        flexDirection: 'row',
    }}>
            {user?.primaryEmailAddress.emailAddress!=rent?.userEmail&&<TouchableOpacity style={{
            padding: 10,
            borderRadius: 10,
            marginRight: 5,
            marginLeft:10,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        onPress={InitiateChat}
        >
            <Image
            source={require('./../../assets/images/message.png')}
            style={{
                width:30,
                height:30
            }}
            />
            <Text style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 14,
                marginTop:15,
            }}>Message</Text>
        </TouchableOpacity>}
            {/* Action Buttons rent={rent} */}
            <ActionButton rent={rent}/>
            </View>
            {/* Description Section */}
            <About rent={rent}/>
            {/* Message */}
            <Messages rent={rent}/>
            {/* Display All the Message */}
            <View>
                {
                    rent?.messages?.map((message,index)=>{
                        return(
                            <View
                            key={index}
                            style={{
                                width:"100%",
                                backgroundColor:'white'
                            }}>
                            <View
                            style={{
                                flexDirection:"row",
                                padding:10,
                                borderBottomWidth:1,
                                borderBottomColor:"#000000",
                                marginTop:5,
                                marginLeft: 20,
                                marginBottom:20,
                                borderWidth: 1,
                                borderColor: '#186CEB',
                                borderRadius: 5,
                                width: '90%',
                                
                            }}>
                                <Image
                                source={{uri:message.userImage}}
                                style={{
                                    width:50,
                                    height:50,
                                    borderRadius:99,
                                    borderWidth:1,
                                    borderColor:"#186CEB"
                                }}
                                />
                                <View>
                                <Text
                                style={{
                                    fontFamily:"Montserrat-Bold",
                                    fontSize:16,
                                    marginLeft:10
                                }}
                                >{message.userName}</Text>
                                <Text
                                style={{
                                    fontFamily:"Montserrat-Regular",
                                    fontSize:14,
                                    marginLeft:10,
                                    width:'60%'

                                }}
                                >{message.message}</Text>
                                <Text
                                style={{
                                    fontFamily:"Montserrat-Regular",
                                    fontSize:14,
                                    marginLeft:10,
                                    color:"#186CEB"
                                }}
                                >{message.userEmail}</Text>
                                </View>
                            </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
        }
    </ScrollView>
  )
}