import { View, Text,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import LocationScreen from '../../components/Home/LocationScreen'
import PopularRent from '../../components/Home/PopularRent'
import Footer from '../../components/Home/Footer'


export default function home() {
  return (
    <ScrollView>
      {/* Header */}
      <Header/>
      {/* Slider */}
      <Slider/>
      {/* Categories */}
      <Category/>
      {/* Hot pic for you */}
      <PopularRent/>
      {/* Footer */}
      <Footer/>
      
    </ScrollView>
  )
}