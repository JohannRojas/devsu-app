import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import { RootDrawerParams } from '../../routes/SideMenuNavigator'
import { globalStyles } from '../../theme/theme'
export const HomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootDrawerParams>>()
  const { top } = useSafeAreaInsets()

  const { width, height } = useWindowDimensions()

  return (
    <View style={ {
      ...globalStyles.container,
      paddingTop: top + 20
    } } >

      <Image
        source={ { uri: 'https://www.bancopichincha.com.co/o/pichincha-theme/images/logo.png' } }
        width={ 218 }
        height={ 54 }
        style={ {
          marginBottom: 20,
          justifyContent: 'center',
          alignSelf: 'center'
        } }
      />

      <Text style={ globalStyles.welcomeText }>
        Bienvenido a nuestra App para gestionar tus productos financieros
      </Text>

      <Image
        source={ { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiVbCeuzVUUUlYwxjRb6OfIYyt4L6QCo7Sbg&usqp=CAU' } }
        width={ width * 0.85 }
        height={ height * 0.35 }
        style={ {
          marginVertical: 20,
          justifyContent: 'center',
          alignSelf: 'center'
        } }
      />

      <Text style={ globalStyles.welcomeText }>
        Da click aqui para comenzar
      </Text>
      <View style={ {
        flex: 1,
        justifyContent: 'flex-end'
      } }>
        <PrimaryButton
          text='Ver Productos'
          onPress={ () => navigation.navigate('Stack') }
        />

      </View>
    </View>
  )
}
