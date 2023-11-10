import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
  name: string
  size?: number
  color?: string
}

export const Ionicon = ({ name, color = 'black', size = 25 }: Props) => {
  return (
    <Icon name={ name } size={ size } color={ color } />
  )
}
