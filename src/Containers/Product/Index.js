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
  FlatList, 
  TouchableOpacity, 
  Text,
  Image, 
  ScrollView,
  StyleSheet
} from 'react-native';
import ListProductContainer from "./List/Index";
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductHomeContainer = ({navigation}) => {
  
  const [data, setData] = useState([]);
  const [priceSort, setPriceSort] = useState(false);

  const productList = [
    {
      id: 1,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
      listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 4.7,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-05',
      levels: 'Pemula',
      price: 179000,
      discount: 1199000,
      wishlist: 0
    },
    {
      id: 2,
      image:
        'data:image/jpeg;base64,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',
      title: 'Sisco Foundation Untuk Pemula',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
        listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 4.5,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-01',
      levels: 'Pemula',
      price: 189000,
      discount: 1199000,
      wishlist: 0
    },
    {
      id: 3,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
        listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 1.5,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-05',
      levels: 'Pemula',
      price: 1199000,
      discount: 0,
      wishlist: 0
    },
    {
      id: 4,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
      listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 0,
      totalReviews: 0,
      totalStudents: 0,
      totalHour: 9.5,
      createDate: '2023-03-11',
      levels: 'Pemula',
      price: 179000,
      discount: 1199000,
      wishlist: 0
    },
    {
      id: 5,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
        listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 4.5,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-01',
      levels: 'Pemula',
      price: 189000,
      discount: 1199000,
      wishlist: 0
    },
  ];

  const productList2 = [
    {
      id: 6,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
        listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 1.5,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-05',
      levels: 'Pemula',
      price: 1199000,
      discount: 0,
      wishlist: 0
    },
    {
      id: 7,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
      listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 4.7,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-05',
      levels: 'Pemula',
      price: 179000,
      discount: 1199000,
      wishlist: 0
    },
    {
      id: 8,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
        listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 4.5,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-01',
      levels: 'Pemula',
      price: 189000,
      discount: 1199000,
      wishlist: 0
    },
    {
      id: 9,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
        listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 1.5,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-05',
      levels: 'Pemula',
      price: 1199000,
      discount: 0,
      wishlist: 0
    },
    {
      id: 10,
      image:
        'https://images.tokopedia.net/img/BgtCLw/2020/7/14/c20fab6b-b377-4a30-bf7d-277bd2e89783.jpg?ect=4g',
      title: 'Kursus Mikrotik Terlengkap, Lebih dari 100 video Tutorial!',
      description:
        'Menjadi Profesional Network Engineer dengan menguasai Mikrotik Advanced! Belajar materi MITCNA, MITCRE, MTCUME, MTCTCE!',
      listPenulis: 'Ahmad Rodis Komarudin, AgunaCourse.com | Kursus IT',
      rating: 4.7,
      totalReviews: 596,
      totalStudents: 111,
      totalHour: 9.5,
      createDate: '2023-03-05',
      levels: 'Pemula',
      price: 179000,
      discount: 1199000,
      wishlist: 0
    }
  ]

  const baseUrl = 'http://192.168.1.8:8000/api/';

  const fetch = id => {};

  //example hit api with axios
  useEffect(() => {
    if(data.length > 0) {
      const source = axios.CancelToken.source();
      const url = `${baseUrl}product/list/1`;
      const fetchProduct = async () => {
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
      fetchProduct();
      return () => source.cancel("Data fetching cancelled");
    }
    setData(productList);
  });

  const getData = () => {
    console.log('data.length', data.length)
    if(data.length > 5) {
      const source = axios.CancelToken.source();
      const url = `${baseUrl}product/list/1`;
      const fetchProduct2 = async () => {
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
      fetchProduct2();
      return () => source.cancel("Data fetching cancelled");
    }
    setData(productList.concat(productList2));
    console.log('data2', data)
  };

  const ListProduct = ({item}) => {
    return (
      <ListProductContainer data={item} navigation={navigation}></ListProductContainer>
    );
  };

  const sortPrice = (priceSort) => {
    console.log('priceSort', priceSort);
    if (priceSort == false) {
      setData(data.sort((a, b) => { return a.price - b.price }))
      setPriceSort(true)
      console.log('data', data);
    } else {
      setData(data.sort((a, b) => { return b.price - a.price }))
      setPriceSort(false)
      console.log('data', data);
    }
  }

  return (
    <View style={styles.product}>

      <ScrollView>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginLeft: 15, alignItems: 'center'}} onPress={() => navigation.navigate('Wishlist', data)}>
            <Icon name="list-alt" size={30} color="#000"/>
            <Text style={{color: '#000', fontSize: 12, marginLeft: 5}}>Wishlist</Text>
          </TouchableOpacity>
          <View style={{flex: 2}}></View>
          <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => sortPrice(priceSort)}>
            <Icon name="sort" size={20} color="#000"/>
            <Text style={{color: '#000', fontSize: 12, marginLeft: 5}}>Sort price</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          renderItem={ListProduct}
          keyExtractor={item => item.id}
        />

        {data.length !== 10 &&
          <View style={[{justifyContent: 'center', flexDirection: 'row'}, styles.shadowProp]}>
            <TouchableOpacity style={styles.buttonLoad} onPress={getData}>
              <Text style={styles.buttonLoadText}>Load More</Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    paddingTop: 15
  },
  buttonLoad: {
    backgroundColor: '#fff',
    padding: 10,
    width: '50%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonLoadText: {
    textAlign: 'center'
  },
  shadowProp: {
    marginBottom: 15
  }
});

export default ProductHomeContainer;
