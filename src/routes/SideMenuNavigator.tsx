import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Ionicon } from '../components/shared/IonIcon'
import { HomeScreen } from '../screens/home/HomeScreen'
import { globalColors } from '../theme/theme'
import { StackNavigator } from './StackNavigator'

export type RootDrawerParams = {
  Stack: undefined,
  Home: undefined
}

const Drawer = createDrawerNavigator<RootDrawerParams>()

export const SideMenuNavigator = () => {


  return (
    <Drawer.Navigator
      initialRouteName='Home'
      backBehavior='initialRoute'
      screenOptions={ {

        headerShown: false,
        drawerType: 'slide',

        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: globalColors.secondary,
        drawerItemStyle: {
          borderRadius: 100,
          paddingHorizontal: 20
        }
      } }
    >
      <Drawer.Screen
        options={ {
          drawerIcon: ({ color }) => (<Ionicon name='bag-outline' color={ color } />),
          title: 'Home'
        } }
        name="Home"
        component={ HomeScreen }

      />
      <Drawer.Screen

        options={ {
          drawerLabel: () => null,
          drawerActiveBackgroundColor: 'transparent',

        } }
        name="Stack"
        component={ StackNavigator }

      />

    </Drawer.Navigator>
  )
}


