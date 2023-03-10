import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const ListProductContainer = (props) => {
  const [item] = useState(props.data)
  const [navigation] = useState(props.navigation)

  const fetch = id => {
  }

  useEffect(
    () => {

    }
  )

  // console.log('item', props)
  const labelProductHot = (item) => {
    var curr = moment().format('YYYY-MM-DD');
    if (moment(curr).format('YYYYMMDD') - moment(item.createDate).format('YYYYMMDD') < 7 && item.totalReviews > 20 && item.rating > 4) {
      return (
        <View style={[styles.row]}>
          <View style={[styles.labelNew, styles.boxShadow, {marginRight: 10}]}>
            <Text style={styles.textLabel}>
              NEW
            </Text>
          </View>
          <View style={[styles.lableBest,  styles.boxShadow, {marginRight: 10}]}>
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
        <View style={[styles.lableBest, styles.boxShadow]}>
          <Text style={styles.textLabel}>
            BEST SELLER
          </Text>
        </View>
      )
    }
    if (moment(curr).format('YYYYMMDD') - moment(item.createDate).format('YYYYMMDD') < 7) {
      return (
        <View style={[styles.labelNew, styles.boxShadow]}>
          <Text style={styles.textLabel}>
            NEW
          </Text>
        </View>
      )
    }
  }

  return (
    <TouchableOpacity style={styles.listProduct} onPress={() => navigation.navigate('Product Detail', item)}>
      <Image
          style={{width: 100, height: 70, flex: 1, marginRight: 10}}
          source={{
            uri: item.image
          }}
      />
      <View style={{flex: 2}}>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={styles.title}>
          {item.title}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode='tail'
          style={{marginBottom: 2, fontSize: 13, color: '#000'}}
        >
          {item.description}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{marginBottom: 2, fontSize: 12, color: '#363636'}}
        >
          {item.listPenulis}
        </Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <Text style={{fontSize:12, fontWeight: 'bold', color: '#e59819', marginRight: 3}}>{item.rating} </Text>
          <Icon name={item.rating >= 1 ? "star" : item.rating - 0 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Icon name={item.rating >= 2 ? "star" : item.rating - 1 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Icon name={item.rating >= 3 ? "star" : item.rating - 2 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Icon name={item.rating >= 4 ? "star" : item.rating - 3 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Icon name={item.rating >= 5 ? "star" : item.rating - 4 > 0 ? "star-half-empty" : "star-o"} size={15} color="#e59819" />
          <Text style={{fontSize:12, marginLeft: 3, color: '#626464'}}> ({item.totalReviews == 0 ? "No Review Yet" : item.totalReviews})</Text>
        </View>
        <Text style={{fontSize: 11, marginBottom: 5, color: '#626464'}}>{item.totalHour} total jam . {item.totalStudents} Pelajar . {item.levels}</Text>
        {labelProductHot(item)}
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        {item.discount == 0 &&
            <Text style={[styles.bold, styles.priceDiscount]}>Rp{ (item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }</Text>
        }
        {item.discount > 0 &&
          <View>
            <Text style={[styles.bold, styles.priceDiscount]}>Rp{ (item.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }</Text>
            <Text style={item.discount > 0 ? styles.textDiscound : [styles.priceDiscount, styles.bold]}>Rp{item.discount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
          </View>
        }
      </View>
    </TouchableOpacity>
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
    fontSize: 12
  },
  bold: {
    fontWeight: 'bold',
    color: '#000'
  },
  priceDiscount: {
    fontSize: 14
  },
  labelNew: {
    backgroundColor:'#f44336',
    width: 41,
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 5
  },
  lableBest: {
    backgroundColor:'#8fce00', 
    width: 98, 
    padding: 3, 
    paddingHorizontal: 5,
    borderRadius: 5
  },
  labelHot: {
    backgroundColor:'#ffd966',
    width: 83,
    padding: 3, 
    paddingHorizontal: 5,
    borderRadius: 5
  },
  textLabel: {
    fontWeight: 'bold', 
    color: '#353531'
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

export default ListProductContainer
