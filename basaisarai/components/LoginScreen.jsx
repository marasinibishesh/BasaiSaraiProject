import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const {startOAuthFlow}=useOAuth({strategy:"oauth_google"});
    const onPress=React.useCallback(async()=>{
        try{
            const {createdSessionId, signIn, SignUp, setActive}=await startOAuthFlow();
            if(createdSessionId){
                setActive({session:createdSessionId});
        }
        else{}
    }catch(error){
        console.error("OAuth error",error);
    }
    },[]);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ImageBackground 
          source={require('./../assets/images/loginbackground.png')} 
          style={styles.backgroundImage}
        />
        <Image 
          source={require('./../assets/images/login.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>BasaiSarai</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome Back !!!</Text>
          <Text style={styles.descriptionText}>
            Explore Flats, Rooms, and Houses for rent. Find your perfect home with ease and convenience. Sign in to start your search today!
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => {
            onPress();
          }}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 40,
  },
  backgroundImage: {
    width: '100%',
    height: 400,
    alignItems: 'center',
    objectFit: 'cover',
    position: 'absolute',
  },
  logo: {
    marginTop: 250,
    width: 128,
    height: 128,
    position:'absolute'
  },
  title: {
    marginTop: 380,
    fontSize: 24,
    fontWeight: 'bold',
    position:'absolute',
    fontFamily:'Montserrat-Regular',

    
  },
  contentContainer: {
    marginTop: 400,
    flex: 1,
    paddingTop: 8,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#9FC5FF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    top: 10,
    objectFit: 'cover',
  },
  welcomeText: {
    marginTop:20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionText: {
    marginTop: 50,
    padding:20,
    color: '#64748b',
    paddingTop: 3,
    
  },
  button: {
    marginTop:50,
    padding: 12,
    width: 160,
    marginTop: 20,
    backgroundColor: '#3b82f6',
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});