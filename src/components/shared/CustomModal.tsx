import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { Ionicon } from './IonIcon'

interface Props {
  modalVisible: boolean,
  setModalVisible: (value: boolean) => void
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}
export const CustomModal = ({
  modalVisible,
  setModalVisible,
  message,
  confirmText = 'Confirmar',
  cancelText,
  onConfirm = () => { },
}: Props) => {


  return (
    <Modal
      animationType="slide"
      transparent={ true }
      visible={ modalVisible }
      onRequestClose={ () => {
        setModalVisible(!modalVisible)
      } }>
      <View style={ styles.centeredView }>
        <View style={ styles.modalView } >
          <Pressable style={ styles.closeButton } onPress={ () => setModalVisible(!modalVisible) }>
            <Ionicon name='close-outline' />
          </Pressable>
          <View style={ styles.divider } />
          <Text style={ styles.modalText }>{ message }</Text>
          <View style={ styles.divider } />
          <Pressable
            style={ [globalStyles.button, globalStyles.primaryButton] }
            onPress={ () => onConfirm() }>
            <Text style={ styles.textStyle }>{ confirmText }</Text>
          </Pressable>
          {
            cancelText &&
            <Pressable
              style={ [globalStyles.button, globalStyles.tertiaryButton] }
              onPress={ () => setModalVisible(!modalVisible) }>
              <Text style={ styles.textStyle }>{ cancelText }</Text>
            </Pressable>
          }
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 18,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  }
})