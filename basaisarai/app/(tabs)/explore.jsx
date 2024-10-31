import { View, Text, FlatList, Image,TouchableOpacity,TextInput,ActivityIndicator,ScrollView } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import PopularRent from '../../components/Home/PopularRent';
import { useRouter } from 'expo-router';
import RentListCard from '../../components/explore/RentListCard';
import { UserLocationContext } from '../../app/Context/UserLocationContext';

export default function explore() {
  const [rentList, setRentList] =useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const[loading,setLoading]=useState(false);
    const {location, setLocation} = useContext(UserLocationContext)
  
    useEffect(()=>{
        getRentList();
        console.log('location',location)
    },[]
    );



    const getRentList=async()=>{
      setLoading(true);
      setRentList([]);
  const q=query(collection(db,'RentList'))
  const querySnapshot=await getDocs(q)
  querySnapshot.forEach((doc)=>{
      console.log(doc.data())
      setRentList(prev=>[...prev,{id:doc?.id,...doc.data()}]);
  });
  setLoading(false);
};
const filteredRentList = searchQuery
        ? rentList.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())||item.address.toLowerCase().includes(searchQuery.toLowerCase())||item.category.toLowerCase().includes(searchQuery.toLowerCase())||item.price.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
        : rentList;
  return (
    <View style={{flex: 1,
      backgroundColor: '#fff',}}>
      {/* Search Bar */}
      <View style={{flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#186CEB',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,}}>
        <AntDesign name="search1" size={24} color="white" />
        <TextInput
          style={{height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            backgroundColor: '#fff',
            width: '90%',
            marginLeft: 10,}}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {/* Other components */}
      {filteredRentList?.length>0&&loading==false?<FlatList
      data={filteredRentList}
      refreshing={loading}
        onRefresh={getRentList}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>(
        <RentListCard
        rent={item}
        key={index}
        />
      )}
      />:
      loading?<ActivityIndicator
      size={30}
        color={"#186CEB"}
      />:
      <Text
      style={{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
        textAlign:'center'
      }}
      >Not Available 🙃</Text>}
    </View>
    
  );
}