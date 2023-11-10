import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CardListProduct, HamburgerMenu, PrimaryButton } from '../../components'
import { useProducts } from '../../hooks/useProducts'
import { RootStackParams } from '../../routes/StackNavigator'
import { globalColors, globalStyles } from '../../theme/theme'

export const ProductsScreen = () => {
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  const { products, loading } = useProducts()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }>
          <HamburgerMenu />
        </Pressable>
      ),
    })
  }, [])

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.description.toLowerCase().includes(searchText.toLowerCase()) ||
    item.id.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <View style={ globalStyles.container }>
      <TextInput
        style={ { ...globalStyles.input, marginBottom: 40 } }
        placeholder="Search..."
        placeholderTextColor={ globalColors.secondary }
        value={ searchText }
        onChangeText={ (text) => setSearchText(text) }
      />
      { loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={ filteredProducts }
          renderItem={ ({ item }) => (
            <CardListProduct
              key={ item.id }
              id={ item.id }
              name={ item.name }
              onPress={ () => navigation.navigate('ProductDetail', { item }) }
            />
          ) }
          keyExtractor={ (item) => item.id }
          style={ { marginBottom: bottom + 80 } }
        />
      ) }

      <View style={ { position: 'absolute', bottom: bottom, left: 20, right: 20 } }>
        <PrimaryButton text="Agregar" onPress={ () => navigation.navigate('RegisterProduct', { isEdit: false }) } />
      </View>
    </View>
  )
}
