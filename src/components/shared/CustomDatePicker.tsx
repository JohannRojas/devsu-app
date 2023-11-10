import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { globalStyles } from '../../theme/theme'

interface Props {
  label: string,
  value: Date,
  onChange: (date: Date) => void,
  minimumDate?: Date,
}

export const CustomDatePicker = ({ label, value, onChange, minimumDate, }: Props) => {

  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  return (
    <View style={ { marginBottom: 30 } }>
      <Text style={ globalStyles.label }>{ label }</Text>
      <Pressable onPressIn={ () => setShowCalendar(!showCalendar) } style={ globalStyles.input } >
        <Text>{ value.toLocaleDateString() }</Text>
      </Pressable>
      {
        showCalendar && (
          <DatePicker
            modal
            open={ showCalendar }
            date={ value }
            onConfirm={ (date) => {
              setShowCalendar(false)
              onChange(date)
            } }
            onCancel={ () => {
              setShowCalendar(false)
            } }
            mode='date'
            minimumDate={ minimumDate }
          />
        )

      }
    </View>
  )
}
