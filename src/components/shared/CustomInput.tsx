import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'

interface Props {
  label: string,
  value: string,
  onChangeText: (text: string) => void,
  isRequired?: boolean,
  labelError?: string,
  editable?: boolean,
  minLength?: number,
  maxLength?: number,
}

export const CustomInput = ({
  label,
  value,
  onChangeText,
  isRequired = false,
  labelError = 'El campo es requerido',
  editable = true,
  minLength = 1,
  maxLength
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    if (isFocused && value.trim() === '') {
      setIsEmpty(true)
    } else if (value.trim().length < minLength && isRequired) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
      setIsFocused(false)
    }
  }

  return (
    <View style={ styles.inputContainer }>
      <Text style={ globalStyles.label }>{ label }</Text>
      <TextInput
        value={ value }
        onChangeText={ onChangeText }
        style={ [
          globalStyles.input,
          isFocused && isEmpty ? styles.inputError : null,
          editable ? null : { backgroundColor: '#e9ecef', color: globalColors.gray },

        ] }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        editable={ editable }
        maxLength={ maxLength }
      />
      {
        isRequired && isEmpty
          ? (<Text
            style={ {
              color: 'red',
              position: 'absolute',
              bottom: -20,
            } }>
            { labelError }
          </Text>)
          : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30
  },

  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
})
