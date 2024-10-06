import { View, Text, ViewProps, HostComponent, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {
  color?: string;
}

const NativeView = codegenNativeComponent<NativeProps>('ReactDialpadView') as HostComponent<NativeProps>;

const { height, width } = Dimensions.get("window")

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <NativeView color="#32a852" style={styles.nativeView} />
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