import { StyleSheet } from 'react-native'

export const globalColors = {
  primary: '#ffdd00',
  secondary: '#0f265c',
  tertiary: '#b5b5bb',
  gray: '#595959',
  danger: 'red',

  background: '#ffffff',
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.background,
    padding: 20
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

  button: {
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },

  primaryButton: {
    backgroundColor: globalColors.primary,
  },

  secondaryButton: {
    backgroundColor: globalColors.secondary,
  },

  tertiaryButton: {
    backgroundColor: globalColors.tertiary,
  },

  dangerButton: {
    backgroundColor: globalColors.danger,
  },

  buttonText: {
    color: globalColors.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },

  input: {
    height: 45,
    borderWidth: 1,
    padding: 10,
    borderColor: globalColors.tertiary,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 15,
    color: globalColors.gray,
    marginBottom: 5
  },

  textGray: { color: globalColors.gray },

  disabledButton: {
    backgroundColor: globalColors.primary,
    opacity: 0.5
  }
})