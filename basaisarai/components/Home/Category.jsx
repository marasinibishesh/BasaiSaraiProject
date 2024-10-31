import { View, Text, FlatList, Image,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';


export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const router=useRouter();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'), orderBy('id', 'asc'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategoryList(data);
  };

  return (
    <View>
      <Text style={{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20
      }}>Category</Text>
      <View
        style={{
          marginLeft: 20,
          marginTop: 10,
          height: 100,
          width: '90%',
          backgroundColor: '#FFFFFF',
          justifyContent:"center",
          alignItems:"center",
          borderRadius: 10,
          borderWidth:2,
          borderColor:"#CBDFFF"
        }}
      >
        <FlatList
          data={categoryList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 10 }}
          renderItem={({ item, index }) => (
            
            <TouchableOpacity
            onPress={()=>{

              router.push(`/rentlist/${item.name}`)
            }}
            style={{
              padding: 10,
              borderRadius: 10,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            >
              <View
              style={{
                backgroundColor: '#69A5FF',
                width: 50,
                height: 50,
                borderRadius: 100,
                justifyContent:"center",
                alignItems:"center",
              }}
              >
            <Image source={{
              uri: item.icon
            }}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="cover"
            />
            </View>
            <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginTop: 5,
            }}
            >{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}