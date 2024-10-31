import { View, Text, FlatList,TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import RentListCard from '../../components/RentList/RentListCard';

export default function RentListByCategory() {
    const navigation=useNavigation();
    const {category}=useLocalSearchParams();
    const [rentList, setRentList] =useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle:category,
            headerStyle:{
                backgroundColor:'#186CEB',
                

            },
            headerTitleStyle: {
                color: 'white',
            },
            headerTintColor: 'white',

        });
        getRentList();
    },[]);
    // Used to get Rent by Category
    const getRentList=async()=>{
        setLoading(true);
        setRentList([]);
    const q=query(collection(db,'RentList'),where("category","==",category))
    const querySnapshot=await getDocs(q)
    querySnapshot.forEach((doc)=>{
        console.log(doc.data())
        setRentList(prev=>[...prev,{id:doc?.id,...doc.data()}]);
    });
    setLoading(false);
};
const filteredRentList = searchQuery
        ? rentList.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())||item.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : rentList;
  return (
    <View style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    }}>
         <TextInput
                style={{height: 40,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    marginBottom: 16,
                    backgroundColor: '#FFFFFF',
                    borderWidth:2,
                    borderColor:"#186CEB"
                }}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#888"
            />
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
  )
}