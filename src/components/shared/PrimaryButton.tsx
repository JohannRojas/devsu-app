import React from 'react'
import { Pressable, Text } from 'react-native'
import { globalStyles } from '../../theme/theme'

interface Props {
  text: string
  onPress: () => void
  disabled?: boolean
}

export const PrimaryButton = ({ onPress, text, disabled = false }: Props) => {

  return (
    <Pressable
      onPress={ () => onPress() }
      style={ [
        globalStyles.button,
        globalStyles.primaryButton,
        disabled && globalStyles.disabledButton
      ] }
      disabled={ disabled }
    >
      <Text style={ globalStyles.buttonText }>{ text }</Text>
    </Pressable>
  )
}
