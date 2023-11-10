import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { CustomDatePicker, CustomInput, CustomModal, PrimaryButton } from '../../components'
import { useProducts } from '../../hooks/useProducts'
import { RootStackParams } from '../../routes/StackNavigator'
import { globalStyles } from '../../theme/theme'
import { ProductType } from '../../types/types'
import { formatDate } from '../../utils/utils'
export const RegisterProductScreen = () => {

  const params = useRoute<RouteProp<RootStackParams, 'RegisterProduct'>>().params

  const { isEdit, item } = params

  const [id, setId] = useState<string>(item?.id || '')
  const [name, setName] = useState<string>(item?.name || '')
  const [description, setDescription] = useState<string>(item?.description || '')
  const [logo, setLogo] = useState<string>(item?.logo || '')
  const [launchDate, setLaunchDate] = useState<Date>(new Date(item?.date_release || new Date()))
  const [revisionDate, setRevisionDate] = useState<Date>(new Date(item?.date_revision || new Date()))

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const { saveProduct, editProduct, statusSave } = useProducts()

  const navigation = useNavigation()

  const handleSubmit = () => {
    const product: ProductType = {
      id,
      name,
      description,
      logo,
      date_release: formatDate(launchDate),
      date_revision: formatDate(revisionDate)
    }

    if (isEdit) {
      editProduct(product).then(() => {
        setModalVisible(true)
        resetForm()
      })
      return
    }
    saveProduct(product)
    setModalVisible(true)
    resetForm()
  }

  const resetForm = () => {
    if (isEdit) {
      setName('')
      setDescription('')
      setLogo('')
      setLaunchDate(new Date())
      updateRevisionDate()
    } else {
      setName('')
      setDescription('')
      setLogo('')
      setLaunchDate(new Date())
      updateRevisionDate()
      setId('')
    }
  }

  const updateRevisionDate = () => {
    const date = new Date(launchDate)
    date.setFullYear(date.getFullYear() + 1)
    setRevisionDate(date)
  }

  const handleConfirmModal = () => {
    if (isEdit) {
      if (statusSave === 200) {
        navigation.dispatch(StackActions.popToTop())
        resetForm()
        setModalVisible(false)
      } else {
        setModalVisible(false)
      }
    } else {
      if (statusSave === 200) {
        resetForm()
        setModalVisible(false)
      } else {
        setModalVisible(false)
      }
    }


  }


  useEffect(() => {
    if (isEdit) {
      navigation.setOptions({
        title: 'Editar Producto',
        headerBackTitle: 'Atrás',
        headerBackTitleVisible: true,
      })
    } else {
      navigation.setOptions({
        title: 'Registrar Producto',
        headerBackTitle: 'Atrás',
        headerBackTitleVisible: true,
      })
    }
  }, [])

  useEffect(() => {
    updateRevisionDate()
  }, [launchDate])


  return (
    <View style={ globalStyles.container }>
      <Text style={ styles.title }>Formulario de Registro</Text>

      <View >
        <CustomInput
          label='ID'
          value={ id }
          onChangeText={ setId }
          isRequired
          labelError='ID no valido'
          maxLength={ 10 }
          minLength={ 3 }
          editable={ !isEdit }
        />
        <CustomInput
          label="Nombre"
          value={ name }
          onChangeText={ setName }
          isRequired
          maxLength={ 100 }
          minLength={ 5 }
        />
        <CustomInput
          label="Descripcion"
          value={ description }
          onChangeText={ setDescription }
          isRequired
          maxLength={ 200 }
          minLength={ 10 }
        />
        <CustomInput
          label="Logo"
          value={ logo }
          onChangeText={ setLogo }
          isRequired
        />


        <CustomDatePicker
          label='Fecha de lanzamiento'
          value={ launchDate }
          onChange={ setLaunchDate }
          minimumDate={ new Date() }
        />

        <CustomInput
          label="Fecha de revision"
          value={ new Intl.DateTimeFormat("es-CO", { day: '2-digit', month: '2-digit', year: 'numeric' }).format(revisionDate) }
          onChangeText={ () => { } }
          isRequired
          editable={ false }
        />


      </View>

      <PrimaryButton
        text='Enviar'
        onPress={ handleSubmit }
        disabled={ !id || !name || !description || !logo }
      />

      <Pressable
        onPress={ () => resetForm() }
        style={ [globalStyles.button, globalStyles.tertiaryButton] }
      >
        <Text style={ globalStyles.buttonText }>Reiniciar</Text>
      </Pressable>

      <CustomModal
        message={ statusSave === 200 ? 'Producto registrado correctamente' : 'Ocurrio un error al registrar el producto, por favor intente nuevamente' }
        modalVisible={ modalVisible }
        setModalVisible={ setModalVisible }
        onConfirm={ handleConfirmModal }
      />

    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
  }
})