import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList,Image } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';

export default function Slider() {
  const [slider,setSlider]=useState([]);
  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = () => {
    GlobalApi.getSlider()
      .then((resp) => {
        // console.log("rsp",resp.sliders)
        setSlider(resp?.sliders)
      })
  };

  return (
    <View>
      <Text style={styles.header}>Offers For You</Text>
      <FlatList horizontal={true}  showsHorizontalScrollIndicator={false}
      data={slider} renderItem={({item,index})=>(
        <View style={{marginRight:20}}>
            <Image source={{uri:item?.image?.url}}
            style={styles.SliderIamge}
            />
        </View>

      )}
      />

 
    </View>
  );
}

const styles = StyleSheet.create({
    header:{
        fontSize:20,
        fontFamily:'outfit-medium',
        marginBottom:10
    },
    SliderIamge:{
        width :220,
        height:100,
        borderRadius:20,
        objectFit: 'contain'
    }
});
