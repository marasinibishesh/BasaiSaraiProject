import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { UserLocationContext } from '../../app/Context/UserLocationContext';

export default function LocationScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      if (location && location.coords) {
        let address = await Location.reverseGeocodeAsync(location.coords);
        setAddress(address[0].city);
      }
    })();
  }, [location]);

  let text = address;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#186CEB',
    marginLeft:5,
    padding: 10,
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});