// In App.js in a new project
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductDetailContainer, ProductHomeContainer, WishlistHomeContainer} from './Containers';
import { ApplicationNavigator } from './Navigators'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Product" component={ProductHomeContainer} />
        <Stack.Screen name="Product Detail" component={ProductDetailContainer} />
        <Stack.Screen name="Wishlist" component={WishlistHomeContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
