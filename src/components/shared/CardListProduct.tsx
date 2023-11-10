import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { globalColors, globalStyles } from '../../theme/theme'
import { Ionicon } from './IonIcon'

interface Props {
  name: string
  id: string,
  onPress: () => void
}

export const CardListProduct = ({ id, name, onPress }: Props) => {
  return (
    <Pressable
      onPress={ () => onPress() }
      style={ [globalStyles.container, styles.card] }
    >
      <View>
        <Text ellipsizeMode='tail' numberOfLines={ 1 } style={ styles.textName }>{ name }</Text>
        <Text ellipsizeMode='tail' style={ styles.textId }>ID: { id }</Text>
      </View>
      <View style={ {
        position: 'absolute',
        right: 10,
        top: '50%'
      } }>
        <Ionicon name='chevron-forward-outline' />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    borderColor: globalColors.tertiary,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  textName: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    marginBottom: 5,
    paddingRight: 30
  },
  textId: {
    fontSize: 13,
    color: globalColors.gray,
  }
})