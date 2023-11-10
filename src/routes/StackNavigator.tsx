import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useEffect } from 'react'
import { ProductDetailScreen } from '../screens/product/ProductDetailScreen'
import { ProductsScreen } from '../screens/product/ProductsScreen'
import { RegisterProductScreen } from '../screens/register/RegisterProductScreen'
import { ProductType } from '../types/types'

export type RootStackParams = {
  Products: undefined,
  ProductDetail: { item: ProductType },
  RegisterProduct: { isEdit: boolean, item?: ProductType }
}

const Stack = createStackNavigator<RootStackParams>()

export const StackNavigator = () => {

  const navigator = useNavigation()

  useEffect(() => {
    navigator.setOptions({
      headerShown: false
    })
  }, [])


  return (
    <Stack.Navigator
      // initialRouteName='Home'
      screenOptions={ {
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent'
        }
      } }>
      <Stack.Screen
        name="Products"
        component={ ProductsScreen }
      />

      <Stack.Screen
        name="ProductDetail"
        component={ ProductDetailScreen }
      />

      <Stack.Screen
        name="RegisterProduct"
        component={ RegisterProductScreen }
      />



    </Stack.Navigator>
  )
}