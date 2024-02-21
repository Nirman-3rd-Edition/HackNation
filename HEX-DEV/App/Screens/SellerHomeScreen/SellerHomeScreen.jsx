import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import HeaderHomeScreen from './HeaderHomeScreen';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import color from '../../Utils/color';
import CategoriesSeller from './CategoriesSeller';
import SellerBookingList from './SellerBookingList';
import DashBoard from './DashBoard';
import Support from './Support';

export default function SellerHomeScreen () {
  const {user}=useUser();
  const [sellerList,setSellerList]=useState([]);
  const [activeItem, setActiveItem] = useState('Dashboard'); // State to keep track of active item
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getSellerList();
  },[]);
  
  const getSellerList=()=>{
    setLoading(true);
    GlobalApi.SellerDetails(user.primaryEmailAddress.emailAddress).then(resp=>{
      setSellerList(resp.businessLists);
      })
      .finally(() => {
        setLoading(false);
    });
  }

  // Define the array of items for the FlatList
  const menuItems = [
    { title: 'Dashboard', component: <DashboardComponent />, onPress: () => { setActiveItem('Dashboard'); getSellerList(); } },
    { title: 'Categories', component: <CategoriesComponent />, onPress: () => {setActiveItem('Categories');getSellerList(); }},
    { title: 'Bookings', component: <BookingsComponent />, onPress: () => {setActiveItem('Bookings');getSellerList();} },
    { title: 'Support', component: <SupportComponent />, onPress: () => {setActiveItem('Support');} },
    
  ];

  // Components to render based on active item
  function DashboardComponent() {
    return <DashBoard sellerList={sellerList} />
  }

  function CategoriesComponent() {
    return <Text>Categories Component</Text>;
  }
  function BookingsComponent() {
    return <SellerBookingList sellerList={sellerList}  />
}
function SupportComponent(){
  return <Support/>
}

  return (
      <View style={{flex:1,backgroundColor:color.WHITE}}>
      <View style={{backgroundColor:color.PRIMARY}}>
        <View>
          <HeaderHomeScreen sellerList={sellerList}/>
        </View>
        <View style={{borderTopLeftRadius:25,borderTopRightRadius:25,backgroundColor:color.WHITE,padding:20}}>
          <FlatList 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={menuItems} // Use the menuItems array as data
            keyExtractor={(item, index) => index.toString()} // Key extractor function
            renderItem={({ item }) => ( // Render item function
              <TouchableOpacity onPress={item.onPress} style={{ flex: 1, alignItems: 'center' }}>
                <View style={[styles.Container, { backgroundColor: item.title === activeItem ? color.PRIMARY : color.WHITE }]}>
                  <Text style={{ fontFamily: 'outfit', color: item.title === activeItem ? color.WHITE : color.BLACK }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {/* Render component based on active item */}
          {menuItems.find(item => item.title === activeItem)?.component}
        </View>
      </View>
      </View>
   
  )
}

const styles = StyleSheet.create({
  Container: {
    padding: 8,
    borderRadius: 10,
    borderColor: color.PRIMARY_LIGHT,
    borderWidth: 2.5,
    marginRight: 10,
    marginTop: 5
  },
});