import axios from "axios";
import React, {
  useEffect,
  useState
} from 'react';
import {
  useDispatch, 
  useSelector
} from 'react-redux';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListProductContainer from "../Product/List/Index";

const WishlistHomeContainer = ({navigation}) => {
  
  const [data, setData] = useState([]);
  
  const getData = async () => {
    // console.log('getData', getData);
    try {
      const jsonValue = await AsyncStorage.getItem('wishlist')
      jsonValue ? setData(JSON.parse(jsonValue)) : [];
      // setData(productList);
    } catch(e) {
      console.log('e', e)
      // error reading value
    }
  }

  const ListProduct2 = ({item}) => {
    return (
      <ListProductContainer data={item} navigation={navigation}></ListProductContainer>
    );
  };

  useEffect(() => {
    if (data != null && data.length == 0) {
      getData()
    }
  });

  return (
    <View style={{marginVertical: 15}}>
      {data.length == 0 &&
        <Text>Belum ada wishlist</Text>
      }
      <FlatList
        data={data} 
        renderItem={ListProduct2}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default WishlistHomeContainer;