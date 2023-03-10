import React from 'react'
import {Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { ProductHomeContainer } from '../Containers'

const Tab = createBottomTabNavigator()
const NTTReactNativeStack = createStackNavigator()

const IndexHome = () => {
  return (
  <NTTReactNativeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <NTTReactNativeStack.Screen name='Product' component={ProductHomeContainer}
      options={{
        title: 'Product'
      }} 
    />
    {/* <ExpenditureStack.Screen name='Detail Contact' component={DetailContactContainer} />
    <ExpenditureStack.Screen name='Add Expenditure' component={AddExpenditureContainer} />
    <ExpenditureStack.Screen name='Edit Expenditure' component={EditExpenditureContainer} />
    <ExpenditureStack.Screen name='Camera Expenditure' component={CameraExpenditureContainer} /> */}
  </NTTReactNativeStack.Navigator>
  )
}

const IndexSettings = () => {
  return (
    <NTTReactNativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <NTTReactNativeStack.Screen name='Whislist' component={ProductHomeContainer}
        options={{
          title: 'Whislist'
        }} 
      />
      {/* <ExpenditureStack.Screen name='categoryExpenditure' component={CategoryContactContainer} />
      <ExpenditureStack.Screen name='addCategoryExpenditure' component={AddCategoryContainer} />
      <ExpenditureStack.Screen name='editCategoryExpenditure' component={EditCategoryContainer} /> */}
    </NTTReactNativeStack.Navigator>
  )
}

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? require('../Assets/Images/icons/home_active.png')  : require('../Assets/Images/icons/home.png') ;
          } else if (route.name === 'Settings') {
            iconName = focused ? require('../Assets/Images/icons/settings_active.png')  : require('../Assets/Images/icons/settings.png') ;
          }

          // You can return any component that you like here!
          return <Image source={iconName} style={{width: 25, height: 25}}/>;
        },
        tabBarActiveTintColor: '#0D3EFF',
        tabBarInactiveTintColor: '#888888',
      })}
    >
      <Tab.Screen name="Home" component={IndexHome} />
      <Tab.Screen name="Settings" component={IndexSettings} />
    </Tab.Navigator>
  )
}

export default MainNavigator
