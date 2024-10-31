import { View, Text,TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, doc, getDocs,where, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import RentListCard from '../../components/explore/RentListCard'



export default function MyRent() {
    const { user } = useUser();
    const[myrent,setmyrent]=useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            GetUserRent();
        }
    }, [user]);

    const GetUserRent = async () => {
        try {
            setLoading(true);
            setmyrent([]);
            const q = query(collection(db, 'RentList'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                setmyrent(prev=>[...prev,{id:doc.id,...doc.data()}]);
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user rent data: ", error);
        }

    };

  return (
    <View style={{
        flex: 1,
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
        }}>
      <TouchableOpacity onPress={()=>router.back()}
                style={{
                    paddingTop:10,
                    margin:0,
                    marginTop:20,
                }}>
            <Ionicons name="arrow-back" size={40} color="#ffffff" />
            </TouchableOpacity>
            <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '60%',
            }}>
      <Text style={{
        fontFamily: 'Montserrat-Regular',
        fontSize: 30,
        color: '#ffffff',
        marginLeft: 20,
        marginTop:20,
      }}>My Rent</Text>
      </View>
      </View>
      <FlatList
      data={myrent}
        refreshing={loading}
        onRefresh={GetUserRent}
      renderItem={({
        item,index
      })=>(
        <RentListCard rent={item} key={index}/>
      )}
      />
    </View>
  )
}