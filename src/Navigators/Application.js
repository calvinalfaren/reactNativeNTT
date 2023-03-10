import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './Root'
import { SafeAreaView, StatusBar } from 'react-native'

const Stack = createStackNavigator()

let MainNavigator

// @refresh reset
const ApplicationNavigator = () => {

  useEffect(() => {
  })

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false)
      MainNavigator = null
    },
    [],
  )

  return (
    <SafeAreaView>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Startup" component={IndexStartupContainer} /> */}
          {/* {MainNavigator != null && ( */}
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            />
          {/* )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
