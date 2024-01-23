import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const Button = ({ label, theme, onPress }) => {
  const isPrimaryTheme = useMemo(() => theme === 'primary', [theme])

  return (
    <View style={[styles.buttonContainer, isPrimaryTheme && styles.primaryTheme]}>
      <Pressable style={[
        styles.button,
        isPrimaryTheme && { backgroundColor: '#fff' }
      ]} onPress={onPress}>
        {isPrimaryTheme && (
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
        )}
        <Text style={[styles.buttonLabel, isPrimaryTheme && { color: '#25292e'}]}>{label}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonIcon: {
    paddingRight: 8
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16
  },
  primaryTheme: {
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 18
  }
})

export default Button
