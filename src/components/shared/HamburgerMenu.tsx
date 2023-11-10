import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import { globalColors } from '../../theme/theme'
import { Ionicon } from './IonIcon'
export const HamburgerMenu = () => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
          style={ { marginLeft: 10 } }

        >
          <Ionicon name='menu-outline' color={ globalColors.secondary } />
        </Pressable>
      ),
    })
  }, [])

  return <></>
}
