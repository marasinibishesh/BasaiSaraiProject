import { useState, useEffect } from 'react';
import * as Location from 'expo-location';


const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [text, setText] = useState('Waiting..');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setText('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      setLocation(address[0]);
      setText(`${address[0].formattedAddress}`);
    })();
  }, []);

  return { location, errorMsg, text };
};

export default useLocation;