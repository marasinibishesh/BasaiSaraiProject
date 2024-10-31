import { View, Text,FlatList,Image,TouchableOpacity,Linking, Share } from 'react-native'
import React from 'react'

export default function ActionButton({rent}) {
    const actionButtonMenu=[
        {   
            id:1,
            name:"Call",
            icon:require("./../../assets/images/telephone.png"),
            url:'tel:'+rent?.contact
        },
        {   
            id:2,
            name:"Location",
            icon:require("./../../assets/images/googlemap.png"),
            url:'https://www.google.com/maps/search/?api=1&query='+rent?.address
        },
        {   
            id:3,
            name:"Share",
            icon:require("./../../assets/images/share.png"),
            url:'tel:'+rent?.contact
        },
    ]
    const onPressHandle=(item)=>{
        if(item.name==='Share'){
            Share.share(
                {
                    message:rent?.name+"\nAddress:"+rent?.address+"\nFind more details on BasaiSarai App by Team Tensor"
                }
            )
            return;
        }
        Linking.openURL(item.url);
    };
  return (
    <View> 
      <FlatList
      data={actionButtonMenu}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
            <TouchableOpacity key={index}
            onPress={()=>onPressHandle(item)}
            style={{
                paddingLeft:20,
                paddingRight: 10,
                borderRadius: 10,
                marginRight: 5,
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}
            >
                <Image
                source={item?.icon}
                style={
                    {
                        width:30,
                        height:30
                    }
                }
                />
                <Text style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 14,
                    marginTop: 5,
                }}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
      )}
      />
    </View>
  )
}