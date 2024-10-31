// // import React, { useEffect, useState, useContext } from 'react';
// // import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity,TextInput } from 'react-native';
// // import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { useRouter } from 'expo-router';
// // import * as Location from 'expo-location';




// // export default function mapSearch() {
// //   const router = useRouter();
// //   const [location, setLocation] = useState(null);
// //   const [errorMsg, setErrorMsg] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== 'granted') {
// //         setErrorMsg('Permission to access location was denied');
// //         return;
// //       }

// //       let location = await Location.getCurrentPositionAsync({});
// //       let address = await Location.reverseGeocodeAsync(location.coords);
// //       console.log(location);
// //       console.log(address[0].city);
// //       setLocation(location);
// //     })();
// //   }, []);
// //   return (
// //     <View>
// //         <View style={{
// //         padding:20,
// //         marginTop:30,
// //         flex:1,
// //         zIndex:20,
// //         }}>
// //       <TouchableOpacity onPress={()=>router.back()}
      
// //       style={{
// //         position:"absolute",
// //         flex:1,
// //         flexDirection:"row",
// //         justifyContent:"space-between",
// //         width:"100%",
// //         paddingTop:20 ,
// //         paddingLeft:10,
// //         paddingRight:10,
// //       }}
// //       >
// //      <Ionicons name="arrow-back" size={40} color="#186CEB" />
// //      </TouchableOpacity>
// //      <TextInput
// //           style={{height: 40,
// //             borderColor: 'gray',
// //             borderWidth: 1,
// //             borderRadius: 10,
// //             paddingLeft: 10,
// //             backgroundColor: '#fff',
// //             width: '90%',
// //             marginLeft: 30,}}
// //           placeholder="Search..."
// //           //value={searchQuery}
// //           //onChangeText={setSearchQuery}
// //         />
// //         </View>
// //         <MapView  style={{
// //             width: Dimensions.get("screen").width,
// //             height: Dimensions.get("screen").height,
// //             zIndex:10,
// //             position:"absolute",
// //           }}
          
// //           >
// //             <Marker
// //             coordinate={{
// //                 latitude: 37.78825,
// //                 longitude: -122.4324,
// //             }}
// //             title={"My Marker"}
// //             description={"This is my marker"}
// //             />
// //         </MapView>
// //     </View>
// //   )
// // }
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as Location from 'expo-location';
// import Geocoder from 'react-native-geocoding';
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import { db } from '../../configs/FirebaseConfig';
// import { useRouter } from 'expo-router';

// Geocoder.init("AIzaSyD7cOCeXXB80rP_o2cCbyvQk81q-h5QiKE"); // Initialize Google Geocoding API

// export default function MapSearch() {
//   const router = useRouter();
//   const [location, setLocation] = useState(null);
//   const [rentList, setRentList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredRentList, setFilteredRentList] = useState([]);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);

//       // Fetch and set rent list
//       await GetRentList();
//     })();
//   }, []);

//   const GetRentList = async () => {
//     const q = query(collection(db, 'RentList'), orderBy('price', 'asc'));
//     const querySnapshot = await getDocs(q);
//     const data = querySnapshot.docs.map(doc => ({ id: doc.id, price: doc.price, ...doc.data() }));

//     // Convert addresses to latitude and longitude
//     const dataWithCoordinates = await Promise.all(data.map(async (item) => {
//       const response = await Geocoder.from(item.address);
//       const { lat, lng } = response.results[0].geometry.location;
//       return { ...item, latitude: lat, longitude: lng };
//     }));

//     setRentList(dataWithCoordinates);
//     setFilteredRentList(dataWithCoordinates);
//   };

//   const onSearch = async () => {
//     const response = await Geocoder.from(searchQuery);
//     const { lat, lng } = response.results[0].geometry.location;
//     setLocation({ coords: { latitude: lat, longitude: lng } });
    
//     // Filter rent list based on the search location
//     const nearbyRents = rentList.filter(rent => {
//       // Calculate distance between the rent and search location (simple calculation)
//       const distance = Math.sqrt(
//         Math.pow(rent.latitude - lat, 2) + Math.pow(rent.longitude - lng, 2)
//       );
//       return distance < 0.5; // Adjust this threshold based on the distance sensitivity
//     });

//     setFilteredRentList(nearbyRents);
//   };

//   const handleMarkerPress = (rent) => {
//     // Handle marker press, maybe show FlatList or navigate to details page
//     console.log("Marker pressed:", rent);
//   };

//   return (
//     <View>
//       <View style={{
//         padding: 20,
//         marginTop: 30,
//         flex: 1,
//         zIndex: 20,
//       }}>
//         <TouchableOpacity onPress={() => router.back()}
//           style={{
//             position: "absolute",
//             flex: 1,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//             paddingTop: 20,
//             paddingLeft: 10,
//             paddingRight: 10,
//           }}
//         >
//           <Ionicons name="arrow-back" size={40} color="#186CEB" />
//         </TouchableOpacity>
//         <TextInput
//           style={{
//             height: 40,
//             borderColor: 'gray',
//             borderWidth: 1,
//             borderRadius: 10,
//             paddingLeft: 10,
//             backgroundColor: '#fff',
//             width: '90%',
//             marginLeft: 30,
//           }}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onSubmitEditing={onSearch}
//         />
//       </View>
//       <MapView
//         style={{
//           width: Dimensions.get("screen").width,
//           height: Dimensions.get("screen").height,
//           zIndex: 10,
//           position: "absolute",
//         }}
//         region={{
//           latitude: location?.coords.latitude || 37.78825,
//           longitude: location?.coords.longitude || -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {filteredRentList.map((rent, index) => (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: rent.latitude,
//               longitude: rent.longitude,
//             }}
//             title={rent.name}
//             description={`Price: ${rent.price}`}
//             onPress={() => handleMarkerPress(rent)}
//           />
//         ))}
//       </MapView>
//       <View style={{ position: 'absolute', width: '100%',
//         height: 250,
//         zIndex: 20,
//         position: "absolute",
//         marginTop: '140%',
//        }}>
        
//         <FlatList
//           data={filteredRentList}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           style={{ paddingLeft: 10,
//             zIndex:20,
//             position:"absolute",
//             marginTop:40,

//            }}
//           renderItem={({ item, index }) => (
//             <TouchableOpacity
//               onPress={() => router.push(`/rentdetail/${item.id}`)}
//               style={{
//                 padding: 10,
//                 borderRadius: 10,
//                 marginRight: 5,
//                 justifyContent: 'center',
//                 alignItems: 'center'
//               }}
//               key={index}
//             >
//               <View
//                 style={{
//                   backgroundColor: '#FFFFFF',
//                   width: 310,
//                   height: 250,
//                   justifyContent: "start",
//                   alignItems: "start",
//                   borderRadius: 10,
//                   borderWidth: 5,
//                   borderColor: "#CBDFFF"
//                 }}
//               >
//                 <Image source={{
//                   uri: item.imageUrl
//                 }}
//                   style={{
//                     width: 300,
//                     height: 150,
//                     borderTopLeftRadius: 5,
//                     borderTopRightRadius: 5,
//                   }}
//                   resizeMode="cover"
//                 />
//                 <Text
//                   style={{
//                     fontFamily: 'Montserrat-Medium',
//                     fontSize: 14,
//                     marginTop: 5,
//                     marginLeft: 5
//                   }}
//                 >{item.name}</Text>
//                 <Text
//                   style={{
//                     fontFamily: 'Montserrat-Regular',
//                     fontSize: 14,
//                     marginTop: 5,
//                     marginLeft: 5,
//                   }}>
//                   <Ionicons name="location-outline" size={12} color="#EA4335" />
//                   {" "}{item.address}</Text>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     width: 300,
//                     marginBottom: "5",
//                   }}>
//                   <Text
//                     style={{
//                       fontFamily: 'Montserrat-Regular',
//                       fontSize: 14,
//                       marginTop: 5,
//                       marginLeft: 5,
//                       marginRight: 0,
//                     }}>
//                     <Ionicons name="cash-outline" size={16} color="#157811" />
//                     {" "}{item.price}</Text>
//                   <Text
//                     style={{
//                       fontFamily: 'Montserrat-Regular',
//                       color: "white",
//                       fontSize: 14,
//                       marginTop: 0,
//                       marginLeft: 5,
//                       backgroundColor: "#186CEB",
//                       borderRadius: 5,
//                       padding: 2,
//                       marginRight: 5,
//                     }}>
//                     {" "}{item.category}{" "}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//           keyExtractor={item => item.price.toString()}
//         />
//       </View>
//     </View>
//   )
// }
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';

Geocoder.init("AIzaSyD7cOCeXXB80rP_o2cCbyvQk81q-h5QiKE"); // Initialize Google Geocoding API

export default function MapSearch() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [rentList, setRentList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRentList, setFilteredRentList] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Fetch and set rent list
      await GetRentList();
    })();
  }, []);

  const GetRentList = async () => {
    const q = query(collection(db, 'RentList'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id,...doc.data() }));

    // Convert addresses to latitude and longitude
    const dataWithCoordinates = await Promise.all(data.map(async (item) => {
      const response = await Geocoder.from(item.address);
      const { lat, lng } = response.results[0].geometry.location;
      return { ...item, latitude: lat, longitude: lng };
    }));

    setRentList(dataWithCoordinates);
    setFilteredRentList(dataWithCoordinates); // Display all markers initially
  };

  const onSearch = async () => {
    const response = await Geocoder.from(searchQuery);
    const { lat, lng } = response.results[0].geometry.location;
    setLocation({ coords: { latitude: lat, longitude: lng } });
    
    // Filter rent list based on the search location
    const nearbyRents = rentList.filter(rent => {
      const distance = Math.sqrt(
        Math.pow(rent.latitude - lat, 2) + Math.pow(rent.longitude - lng, 2)
      );
      return distance < 0.1; // Adjust this threshold based on the distance sensitivity
    });

    setFilteredRentList(nearbyRents);
  };

  const handleMarkerPress = (rent) => {
    // Handle marker press, maybe show FlatList or navigate to details page
    console.log("Marker pressed:", rent);
  };

  return (
    <View>
      <View style={{
        padding: 20,
        marginTop: 30,
        flex: 1,
        zIndex: 20,
      }}>
        <TouchableOpacity onPress={() => router.back()}
          style={{
            position: "absolute",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Ionicons name="arrow-back" size={40} color="#186CEB" />
        </TouchableOpacity>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            backgroundColor: '#fff',
            width: '90%',
            marginLeft: 30,
          }}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={onSearch}
        />
      </View>
      <MapView
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
          zIndex: 10,
          position: "absolute",
        }}
        region={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {filteredRentList.map((rent, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: rent.latitude,
              longitude: rent.longitude,
            }}
            title={rent.name}
            description={`Price: ${rent.price}`}
            onPress={() => handleMarkerPress(rent)}
          />
        ))}
      </MapView>
      <View style={{ position: 'absolute', width: '100%',
        height: 250,
        zIndex: 20,
        position: "absolute",
        marginTop: '120%',
       }}>
        <FlatList
          data={filteredRentList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 10,
            zIndex:20,
            position:"absolute",
            marginTop:40,

           }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push(`/rentdetail/${item.id}`)}
              style={{
                padding: 10,
                borderRadius: 10,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              key={index}
            >
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  width: 310,
                  height: 250,
                  justifyContent: "start",
                  alignItems: "start",
                  borderRadius: 10,
                  borderWidth: 5,
                  borderColor: "#CBDFFF"
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
                  <Ionicons name="location-outline" size={12} color="#EA4335" />
                  {" "}{item.address}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 300,
                    marginBottom: "5",
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 14,
                      marginTop: 5,
                      marginLeft: 5,
                      marginRight: 0,
                    }}>
                    <Ionicons name="cash-outline" size={16} color="#157811" />
                    {" "}{item.price}</Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: "white",
                      fontSize: 14,
                      marginTop: 0,
                      marginLeft: 5,
                      backgroundColor: "#186CEB",
                      borderRadius: 5,
                      padding: 2,
                      marginRight: 5,
                    }}>
                    {" "}{item.category}{" "}
                  </Text>
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

