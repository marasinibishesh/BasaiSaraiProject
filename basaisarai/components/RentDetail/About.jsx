import { View, Text,TouchableOpacity, Dimensions } from 'react-native'
import React,{ useState } from 'react'
const height = Dimensions.get('window').height;

export default function About({rent}) {
    const [expanded, setExpanded] = useState(false);
  return (
    <View
    style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        //height:height*0.85,
        padding: 10,

    }}>
      <Text
      style={{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10
      }}>Description</Text>
      <Text
      style={{
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10,
        lineHeight:30,
        
      }}
      numberOfLines={expanded ? undefined : 5}
      >
        {rent?.about}
      </Text>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 14,
            marginTop: 10,
            marginLeft: 10,
            color: '#186CEB', // Change color to indicate it's clickable
          }}
        >
          {expanded ? 'See Less' : 'See More'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}