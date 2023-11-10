import { render } from '@testing-library/react-native'
import React from 'react'
import { HomeScreen } from '../src/screens/home/HomeScreen'

test('renders welcome text', () => {
  const { getByText } = render(<HomeScreen />)
  const welcomeText = getByText(/Bienvenido a nuestra App/i)
  expect(welcomeText).toBeTruthy()
})

test('renders Ver Productos button', () => {
  const { getByText } = render(<HomeScreen />)
  const verProductosButton = getByText(/Ver Productos/i)
  expect(verProductosButton).toBeTruthy()
})
