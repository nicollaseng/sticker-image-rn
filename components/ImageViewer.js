import { Image, StyleSheet } from 'react-native'
import React from 'react'

const ImageViewer = ({
  source
}) => {
  return (
   <Image
      style={styles.image}
      source={source}
   />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    resizeMode: 'cover',
    borderRadius: 18,
  }
})

export default ImageViewer
