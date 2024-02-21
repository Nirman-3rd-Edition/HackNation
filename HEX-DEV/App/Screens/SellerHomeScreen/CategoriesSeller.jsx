import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CategoriesSeller() {
  return (
    <FlatList
    data={sellerList}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          
                    <TouchableOpacity key={bookingIndex} style={styles.bookingItem} onPress={()=>{navigation.navigate('user-profile',{booking:booking,item:item})}}>
                        <Image source={{ uri: item.category[0].icon.url }} style={styles.userImage} />
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.userName}>{category.name}</Text>
  
                        <Ionicons name="chevron-forward" size={24} color={color.PRIMARY_LIGHT} />
                    </TouchableOpacity>
        </View>
    )}
/>
  )
}

const styles = StyleSheet.create({})