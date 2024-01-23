import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View , Platform} from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const defaultImage = require('./assets/images/background-image.png')

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef();
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  useEffect(() => {
    if (status === null) {
      requestPermission()
    }
  }, [])

  const pickImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    if (!image.canceled){
      setSelectedImage(image.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  }

   const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveWebImage = async () => {
    try {
      const dataUrl = await domtoimage.toJpeg(imageRef.current, {
        quality: 1,
        width: 320,
        height: 440,
      });

      let link = document.createElement('a');
      link.download = 'sticker-smash.jpeg';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.log(e);
    }
  }

  const onSaveImage = async () => {
    if (Platform.OS === 'web') return onSaveWebImage()
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1
      })

      await MediaLibrary.saveToLibraryAsync(localUri)
      alert('Saved!')
    } catch (e) {
      alert('Error')
      console.log(e)
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer source={selectedImage ? { uri: selectedImage } : defaultImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
          </View>
        </View>
      ) : (
        <View  style={styles.footerContainer}>
          <Button onPress={pickImage} theme="primary" label="Choose a photo" />
          <Button onPress={() => setShowAppOptions(true)} label="Use this photo" />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
