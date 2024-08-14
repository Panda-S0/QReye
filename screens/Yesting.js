import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import { CameraView, Camera } from "expo-camera"

export default function Yesting({ setLink, webShowing }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [btntxt, setBtntxt] = useState("")
  function isValidUrl(string) {
    try {
      new URL(string) // Attempt to create a new URL object
      return true // If successful, it's a valid URL
    } catch (_) {
      return false // If an error is thrown, it's not a valid URL
    }
  }

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
    if (isValidUrl(data)) {
      setScanned(true)
      setLink(data)
    } else {
      if (data.length <= 50) {
        setBtntxt(data)
      } else {
        setBtntxt(data.slice(0, 50) + "...")
      }
      setScanned(true)
    }
  }

  useEffect(() => {
    setScanned(webShowing)
    setBtntxt("")
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
      <View style={styles.btnout}>
        <View style={styles.btnin}>
          {scanned && btntxt && (
            <Button
              title={`QR with data: ${btntxt}\n is not a link, tap to scan again`}
              onPress={() => {
                setScanned(false)
                setBtntxt("")
              }}
            />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  btnout: {
    width: "100%",
    alignItems: "center",
  },
  btnin: { width: "50%" },
})
