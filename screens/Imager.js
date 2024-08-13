import { StyleSheet, View, Button, Image, Text } from "react-native"
import { launchCameraAsync } from "expo-image-picker"
import { useState } from "react"

export default function Imager() {
  const [snappedImage, setSnappedImage] = useState(null)
  async function takeImage() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })
    const uri = image.assets[0].uri
    setSnappedImage(uri)
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (snappedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: snappedImage }} />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="IMAGE TAKER" onPress={takeImage}></Button>
      <View style={styles.imagePreview}>{imagePreview}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
})
