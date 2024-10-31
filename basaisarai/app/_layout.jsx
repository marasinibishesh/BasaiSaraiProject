import { ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo'
import { Stack } from "expo-router/stack";
import {useFonts} from 'expo-font'
import LoginScreen from './../components/LoginScreen'
import * as SecureStore from 'expo-secure-store'
const tokenCache={
  async getToken(key){
    try{
      return await SecureStore.getItemAsync(key);
    }catch(err){
      return null;
    }
  },
  async saveToken(key,value){
    try{
      return await SecureStore.setItemAsync(key,value);
    } catch (err){
      return;
    }
  },
};


export default function RootLayout() {
  useFonts({
    'Montserrat-Regular':require('./../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold':require('./../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold':require('./../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium':require('./../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Italic':require('./../assets/fonts/Montserrat-Italic.ttf'),
    'Montserrat-ExtraLight':require('./../assets/fonts/Montserrat-ExtraLight.ttf'),
  })
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
    <Stack screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="(tabs)"
      />
    </Stack>
    </SignedIn>
    <SignedOut>
    <LoginScreen/>
    </SignedOut>
    </ClerkProvider>
  );
}
