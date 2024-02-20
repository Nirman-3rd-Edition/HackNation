import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import HeaderScreen from './HeadeScreenr'
import Slider from './Slider'
import Categories from './Categories'
import Business from './Business'


export default function Home(){
    return (
     <ScrollView>
      <View>
   
        <HeaderScreen />
       
        <View style={{padding:20}}>
        <Slider/>
        <Categories/>
        <Business/>
        </View>
      </View>
      </ScrollView>     
    )
}
