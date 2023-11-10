import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CustomModal } from '../../components/shared/CustomModal'
import { useProducts } from '../../hooks/useProducts'
import { RootStackParams } from '../../routes/StackNavigator'
import { globalColors, globalStyles } from '../../theme/theme'
export const ProductDetailScreen = () => {

  const [showModal, setShowModal] = useState(false)

  const { bottom } = useSafeAreaInsets()
  const { item } = useRoute<RouteProp<RootStackParams, 'ProductDetail'>>().params
  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const { deleteProduct, statusDelete } = useProducts()

  const [showSuccessModal, setshowSuccessModal] = useState(false)


  const handleDelete = (id: string) => {
    deleteProduct(id)
    setShowModal(false)
  }

  useEffect(() => {
    if (statusDelete === 200) {
      setshowSuccessModal(true)
    }
  }, [statusDelete])

  useEffect(() => {
    navigation.setOptions({
      title: item.name,
      headerBackTitle: 'Atrás',
      headerBackTitleVisible: true,
    })
  }, [])

  return (
    <View style={ globalStyles.container }>

      <Text numberOfLines={ 1 } style={ styles.textId }>ID: { item.id.toUpperCase() }</Text>
      <Text style={ globalStyles.textGray }>Información extra</Text>

      <View style={ styles.infoContainer }>
        <View style={ styles.item }>

          <Text style={ styles.itemInfo }>
            Nombre
          </Text>
          <Text numberOfLines={ 1 } ellipsizeMode='tail' style={ { fontWeight: 'bold', } }>{ item.name }</Text>
        </View>
        <View style={ styles.item }>

          <Text style={ styles.itemInfo }>
            Descripción
          </Text>
          <Text style={ { fontWeight: 'bold', width: '50%', textAlign: 'right' } }>{ item.description }</Text>
        </View>

        <View style={ styles.item }>

          <Text style={ styles.itemInfo }>Logo</Text>
          <View style={ { width: '100%', alignItems: 'center', marginVertical: 20 } }>
            <Image source={ { uri: item.logo } } style={ { width: 300, height: 200 } } />
          </View>
        </View>

        <View style={ styles.item }>

          <Text style={ styles.itemInfo }>Fecha de lanzamiento</Text>
          <Text numberOfLines={ 1 } ellipsizeMode='tail' style={ { fontWeight: 'bold', } }>{ new Intl.DateTimeFormat().format(new Date(item.date_release)) }</Text>
        </View>
        <View style={ styles.item }>

          <Text style={ styles.itemInfo }>Fecha de revision</Text>
          <Text numberOfLines={ 1 } ellipsizeMode='tail' style={ { fontWeight: 'bold', } }>{ new Intl.DateTimeFormat().format(new Date(item.date_revision)) }</Text>
        </View>
      </View>

      <View style={ { position: 'absolute', bottom: bottom + 20, left: 20, right: 20 } }>

        <Pressable
          onPress={ () => navigation.navigate('RegisterProduct', { isEdit: true, item }) }
          style={ [globalStyles.button, globalStyles.tertiaryButton] }
        >
          <Text style={ { textAlign: 'center', fontWeight: 'bold' } }>Editar</Text>
        </Pressable>
        <Pressable
          onPress={ () => setShowModal(true) }
          style={ [globalStyles.button, globalStyles.dangerButton] }
        >
          <Text style={ { textAlign: 'center', fontWeight: 'bold', color: 'white' } }>Eliminar</Text>
        </Pressable>
      </View>
      <CustomModal
        modalVisible={ showModal }
        setModalVisible={ setShowModal }
        onConfirm={ () => handleDelete(item.id) }
        message={ `¿Estás seguro de eliminar el producto ${item.name}?` }
      />
      <CustomModal
        modalVisible={ showSuccessModal }
        setModalVisible={ setshowSuccessModal }
        onConfirm={ () => {
          setshowSuccessModal(false)
          navigation.goBack()
        } }
        message='Producto eliminado correctamente'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textId: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  infoContainer: {
    marginTop: 70,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  item: {
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 100,
  },
  itemInfo: {
    color: globalColors.gray,
    fontSize: 15,
    marginBottom: 15,
  }
})