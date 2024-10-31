import { View, Text, FlatList, Image,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
export default function PopularRent() {
  const [rentList, setRentList] = useState([]);
  const router=useRouter();

  useEffect(() => {
    GetRentList();
  }, []);

  const GetRentList = async () => {
    setRentList([]);
    const q = query(collection(db, 'RentList'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id:doc.id,...doc.data() }));
    setRentList(data);
  };
  return (
    <View>
      <Text
      style={{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20
      }}
      >Just for You</Text>
      <View>
      <FlatList
          data={rentList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 10 }}
          renderItem={({ item, index }) => (
            
            <TouchableOpacity
            onPress={()=>{

              console.log(item)
              {router.push(`/rentdetail/${item.id}`)}
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
              <View
              style={{
                backgroundColor: '#FFFFFF',
                width: 310,
                height: 250,
                justifyContent:"start",
                alignItems:"start",
                borderRadius: 10,
                borderWidth:5,
                borderColor:"#CBDFFF"
              }}
              >
            <Image source={{
              uri: item.imageUrl
            }}
              style={{
                width: 300,
                height: 150,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              resizeMode="cover"
            />
            <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5
            }}
            >{item.name}</Text>
            <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,

            }}>
            <FontAwesome name="map-marker" size={12} color="#EA4335" />
            {" "}{item.address}</Text>
            <View
            style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-between',
              width:300,
              marginBottom:"5",
              
            }}>
            <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginTop: 5,
              marginLeft: 5,
              marginRight:0,

            }}>
            <MaterialCommunityIcons name="currency-rupee" size={16} color="#157811" />
            {" "}{item.price}</Text>
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
            
            {" "}{item.category}{" "}</Text>
            
            </View>
            
            </View>
            
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  )
}