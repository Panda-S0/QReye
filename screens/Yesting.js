import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"
import { CameraView, Camera } from "expo-camera"

export default function Yesting({ setLink, webShowing }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    }

    getCameraPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(
      `Bar code with type '${type}' and data "${data}" has been scanned!`
    )
    setScanned(true)
    setLink(data)
    // alert(
    //   `Bar code with type ${type} and data "${data}" has been scanned!`
    // )
  }

  useEffect(() => {
    setScanned(webShowing)
  }, [webShowing])

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
})
