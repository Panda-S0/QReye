import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native"
import { WebView } from "react-native-webview"

export default function Wembed({ URL, mod, setURL }) {
  const [modalVisible, setModalVisible] = useState(mod)
  const [QRurl, setQRurl] = useState(null)

  function reset() {
    setModalVisible(false)
    setURL("")
    setQRurl("")
  }
  useEffect(() => {
    setModalVisible(mod)
    setQRurl(URL)
  }, [URL])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.big}>
        <Text style={styles.outsideText}>AIM AT A QR LINK TO SCAN</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => reset()}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.webView}>
              <WebView
                source={{
                  uri: QRurl ? QRurl : "example.com",
                }}
                style={{ flex: 1 }}
              />
            </View>
            <TouchableOpacity
              onPress={() => reset()}
              style={styles.touchable}
            >
              <Text style={styles.textColor}>scan another qr code ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  big: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outsideText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "lightpink",
    padding: 15,
    borderRadius: 10,
    textShadowColor: "#2c3e50",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    textAlign: "center", // Center align text
  },
  webView: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  textColor: {
    color: "cyan",
    fontSize: 16,
    fontWeight: "bold",
  },
  touchable: { alignItems: "center", marginTop: 10 },
  modalBackground: {
    flex: 1,
    backgroundColor: "#25244677",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    marginTop: "auto",
    marginBottom: 20,
    width: "90%",
    height: "90%",
    backgroundColor: "#0098db",
    padding: 10,
    borderRadius: 30,
  },
})
