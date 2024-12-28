import { View, Text, ViewProps, HostComponent, SafeAreaView, StyleSheet, Dimensions, NativeModules, Button } from 'react-native'
import React, { useEffect } from 'react'
import { CallManager, MessageManager } from './modules';

interface NativeProps extends ViewProps {
  color?: string;
}


const { height, width } = Dimensions.get("window")

export default function App() {
  useEffect(() => {
    CallManager.setDefaultDialer()
    MessageManager.setDefaultMessage().then(data => { console.log("data", data) })
      .catch(error => { console.log("error", error) })

    MessageManager.messageEvents.addListener("onSmsReceived",(data)=>{
      console.log(data,"data")
    })
    return ()=>{
      MessageManager.messageEvents.removeAllListeners("onSmsReceived")
    }
  }, [])

  const getMessages = () => {
    MessageManager.getAllMessages().then(data => console.log("data", data))
      .catch(error => { console.log("error", error) }
      )
  }

  const sendMessage = () => {
    MessageManager.sendSmsMessage("hi brother", ["+918709881007"], 0, false).then((data) => {
      console.log("data", data)
    }).catch((error) => { console.log("error", error) })
  }

  const makeCall = () => {
    CallManager.callUser("121")
  }

  const makeCall2 = () => {
    CallManager.callUser("141")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Make Default Dialer App</Text>
        {/*<NativeView color="#32a852" style={styles.nativeView} />*/}
        <Button title="Call Me" onPress={getMessages} />
        <Button title="Call Me 2" onPress={sendMessage} />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nativeView: {
    width: width,
    height: height,
  }
});