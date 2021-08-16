import React from 'react';
import { StatusBar } from 'react-native';

import Search from './screens/Search'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Tab = createBottomTabNavigator()

export default function App () {

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor="#00aaff"/>      
      <NavigationContainer >
        <Tab.Navigator
        initialRouteName="home"
        screenOptions={({route})=>({
          tabBarIcon:({color})=>{
            let iconName
            if(route.name === "home"){
              iconName = 'home-city-outline'
            } else if(route.name==="search"){
              iconName = 'city'
            }
            return <MaterialCommunityIcons name={iconName} size={25} color={color}/>
          }
        })}
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "grey",
          activeBackgroundColor:"#00aaff",
          inactiveBackgroundColor:"#00aaff"
          
        }}
        >
          <Tab.Screen name="home" component={Home} initialParams={{city : 'sao paulo'}}/>
          <Tab.Screen name="search" component={Search}/>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};