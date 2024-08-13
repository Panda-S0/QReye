import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import Yesting from "./screens/Yesting"
import Wembed from "./screens/Wembed"
import Imager from "./screens/Imager"

export default function App() {
  const [QRlink, setQRlink] = useState("")

  return (
    <View style={styles.fullView}>
      <View style={styles.upView}>
        <Yesting setLink={setQRlink} webShowing={!!QRlink} />
      </View>
      <View style={styles.downView}>
        <Wembed URL={QRlink} mod={!!QRlink} setURL={setQRlink} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
  },
  upView: {
    width: "100%",
    height: "80%",
    paddingTop: 40,
    backgroundColor: "lightblue",
  },
  downView: {
    width: "100%",
    height: "20%",
    padding: 10,
    backgroundColor: "lightblue",
  },
})
