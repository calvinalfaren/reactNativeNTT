import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import axios from "axios";

const ProductDetailContainer = ({route}) => {
  const [item, setItem] = useState(route.params);
  const [data, setData] = useState([]);
  const [wishlist, setWishlist] = useState(false);

  const baseUrl = 'http://192.168.1.8:8000/api/';

  useEffect(
    (id) => {
      if (data == null || data.length == 0) {
        const source = axios.CancelToken.source();
        const url = `${baseUrl}product/detail/${id}`;
        const fetchProductDetail = async () => {
          try {
            const response = await axios.get(url);
            console.log(response.data);
            
          } catch (error) {
            if(axios.isCancel(error)){
              console.log('Data fetching cancelled');
            }else{
            // Handle error
            }
          }
        };
        fetchProductDetail();
        getData()
        return () => source.cancel("Data fetching cancelled");
      }
    }
  )

  const getData = async () => {
    try {
      var jsonValue = await AsyncStorage.getItem('wishlist')
      jsonValue ? setData(JSON.parse(jsonValue)) : [];
      var result = JSON.parse(jsonValue);
      if (result && result.find(x => x.id === item.id)) {
        setWishlist(true)
      }
    } catch(e) {
      console.log('e', e)
    }
  }

  const addWishlist = async () => {
    try {
      console.log('data', data)
      // const result = JSON.stringify(data)
      // console.log('objWithIdIndex', data.findIndex((x) => x.id == item.id))
      if (data !== null && data.find(x => x.id === item.id)) {
        // data.push(item)

        console.log('data1', data)

        console.log('data', data.findIndex((x) => x.id == item.id))
        const objWithIdIndex =  data.findIndex((x) => x.id == item.id);
        if (objWithIdIndex > -1) {
          data.splice(objWithIdIndex, 1);
        }

        const result = JSON.stringify(data)
        await AsyncStorage.setItem('wishlist', result)
        setWishlist(false)
      } else {
        console.log('data2', data)
        data.push(item)
        const result = JSON.stringify(data)
        await AsyncStorage.setItem('wishlist', result)
        setWishlist(true)
      }
    } catch (e) { q
      console.log('e', e)
    }
  }

  const labelProductHot = (item) => {
    var curr = moment().format('YYYY-MM-DD');
    if (moment(curr).format('YYYYMMDD') - moment(item.createDate).format('YYYYMMDD') < 7 && item.totalReviews > 20 && item.rating > 4) {
      return (
        <View style={[styles.row, {marginBottom: 35}]}>
          <View style={[styles.labelNew, styles.boxShadow, {marginRight: 10}]}>
            <Text style={styles.textLabel}>
              NEW
            </Text>
          </View>
          <View style={[styles.lableBest, styles.boxShadow, {marginRight: 10}]}>
            <Text style={styles.textLabel}>
              BEST SELLER
            </Text>
          </View>
          <View style={[styles.labelHot, styles.boxShadow]}>
            <Text style={styles.textLabel}>
              Hot Lesson
            </Text>
          </View>
        </View>
      )
    }
    if (item.totalReviews > 20 && item.rating > 4) {
      return (
        <View style={[styles.lableBest, styles.boxShadow, {marginBottom: 35}]}>
          <Text style={styles.textLabel}>
            BEST SELLER
          </Text>
        </View>
      )
    }
    if (moment(curr).format('YYYYMMDD') - moment(item.createDate).format('YYYYMMDD') < 7) {
      return (
        <View style={[styles.labelNew, styles.boxShadow, {marginBottom: 35}]}>
          <Text style={styles.textLabel}>
            NEW
          </Text>
        </View>
      )
    }
  }

  // console.log('item', item);
  return (
    <View>
      <Image
          style={{width: '100%', height: 200, marginRight: 10}}
          source={{
            uri: item.image
          }}
      />
      <View style={{padding: 15}}>
        <Text
          style={styles.title}>
          {item.title}
        </Text>
        <Text
          style={{marginBottom: 12, fontSize: 13, color: '#000'}}
        >
          {item.description}
        </Text>
        <Text
          style={{marginBottom: 12, fontSize: 13, color: '#363636'}}
        >
          {item.listPenulis}
        </Text>
        <View style={{flexDirection: 'row', marginBottom: 12}}>
          <Text style={{fontSize:12, fontWeight: 'bold', color: '#e59819', marginRight: 3}}>{item.rating} </Text>
          <Icon name={item.rating >= 1 ? "star" : item.rating - 0 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Icon name={item.rating >= 2 ? "star" : item.rating - 1 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Icon name={item.rating >= 3 ? "star" : item.rating - 2 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Icon name={item.rating >= 4 ? "star" : item.rating - 3 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Icon name={item.rating >= 5 ? "star" : item.rating - 4 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Text style={{fontSize:12, marginLeft: 3, color: '#626464'}}> ({item.totalReviews == 0 ? "No Review Yet" : item.totalReviews})</Text>
        </View>
        
        {item.discount == 0 &&
            <Text style={[styles.bold, styles.priceDiscount]}>Rp{ (item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }</Text>
        }
        {item.discount > 0 &&
          <View>
            <Text style={[styles.bold, styles.priceDiscount]}>Rp{ (item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }</Text>
            <Text style={item.discount > 0 ? styles.textDiscound : [styles.priceDiscount, styles.bold]}>Rp{item.discount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
          </View>
        }

        <Text style={{fontSize: 13, marginBottom: 25, marginTop: 15, color: '#626464'}}>{item.totalHour} total jam . {item.totalStudents} Pelajar . {item.levels}</Text>
        {labelProductHot(item)}
        <TouchableOpacity onPress={() => addWishlist()}>
          {wishlist &&
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon style={{marginRight: 10}} name="heart" size={30} color="red"/>
              <Text>Remove from Wishlist</Text>
            </View>
          }
          {!wishlist &&
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon style={{marginRight: 10}} name="heart-o" size={30} color="red"/>
              <Text >Add to Wishlist</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  listProduct: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C8CDCD'

  },
  title: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
    lineHeight: 15,
    marginBottom: 2
  },
  gradient: {
    height: 73, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 50   ,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  textDiscound: {
    textDecorationLine: "line-through",
    fontSize: 14,
    marginBottom: 12
  },
  bold: {
    fontWeight: 'bold',
    color: '#000'
  },
  priceDiscount: {
    fontSize: 15
  },
  labelNew: {
    backgroundColor:'#f44336',
    width: 60,
    padding: 7,
    paddingHorizontal: 5,
    borderRadius: 10
  },
  lableBest: {
    backgroundColor:'#8fce00', 
    width: 145, 
    padding: 7,
    paddingHorizontal: 5,
    borderRadius: 10
  },
  labelHot: {
    backgroundColor:'#ffd966',
    width: 120,
    padding: 7,
    paddingHorizontal: 5,
    borderRadius: 10
  },
  textLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#353531',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default ProductDetailContainer
