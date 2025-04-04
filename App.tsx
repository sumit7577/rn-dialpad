import { View, Text, ViewProps, HostComponent, SafeAreaView, StyleSheet, Dimensions, NativeModules, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CallManager, MessageManager } from './modules';
import { Messages } from './modules/MessageManager';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';
import { Contact } from 'react-native-contacts/type';

interface NativeProps extends ViewProps {
  color?: string;
}


const { height, width } = Dimensions.get("window")

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const requestContactsPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Contacts read & write permissions granted');
        fetchContacts();
      } else {
        console.log('Permissions denied');
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  const fetchContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        setContacts(contacts);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    requestContactsPermissions();
    CallManager.setDefaultDialer()
    MessageManager.setDefaultMessage().then(data => { console.log("data", data) })
      .catch(error => { console.log("error", error) })

    MessageManager.messageEvents.addListener("onSmsReceived", (data) => {
      console.log(data, "data")
    })

    MessageManager.messageEvents.addListener("onNotificationClick", (data) => {
      console.log(data, "notificationCLick data")
    })

    CallManager.callEvents.addListener("MissedCall", (data) => {
      console.log("call data missed", data)
    })

    CallManager.callEvents.addListener("RejectedCall", (data) => {
      console.log("call data rejected", data)
    })
    return () => {
      MessageManager.messageEvents.removeAllListeners("onSmsReceived")
      MessageManager.messageEvents.removeAllListeners("onNotificationClick")
      CallManager.callEvents.removeAllListeners("MissedCall")
      CallManager.callEvents.removeAllListeners("RejectedCall")
    }
  }, [])

  const getMessages = () => {
    MessageManager.getAllMessages(null, 20, 0).then(data => {
      const messsages: Messages[][] = JSON.parse(data)
      console.log("data", messsages.length, messsages[0])
    })
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
    CallManager.callUser("198")
  }

  const toggleVibration = () => {
    CallManager.toggleVibration(true).then((data) => {
      console.log("data", data)
    }).catch((error) => { console.log("error", error) })
  }

  const getVibrationStatus = () => {
    CallManager.getVibrationStatus().then((data) => {
      console.log("data", data)
    } ).catch((error) => { console.log("error", error) })
  }

  const forwardCalls = () => {
    //true for disable false for enable
    CallManager.forwardAllCalls({ cfi: false, phoneNumber: "+918709881007" }).then((data) => {
      console.log("data", data)
    }).catch((error) => { console.log("error", error) })
  }

  const getCallReplies = ()=>{
    CallManager.getCallReplies().then((data) => {
      console.log("data", data)
    }).catch((error) => { console.log("error", error) })
  }

  const addReplies = ()=>{
    CallManager.saveCallReplies("heeijhj").then((data) => {  
      console.log("data", data)
    }
    ).catch((error) => { console.log("error", error) })
  }

  const renderItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity onPress={() => {
      item.emailAddresses.push({
        label: "junk",
        email: "mrniet+junkmail@test.com",
      })
      Contacts.updateContact(item).then((data) => {
        console.log("data", data)
      }).catch((error) => {
        console.log("error", error)
      })
    }}>
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{item.displayName}</Text>
        {item.phoneNumbers.length > 0 && (
          <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
        )}
      </View>
    </TouchableOpacity>

  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Make Default Dialer App</Text>
        {/*<NativeView color="#32a852" style={styles.nativeView} />*/}
        <Button title="Call Me" onPress={getCallReplies} />
        <Button title="Call Me 2" onPress={addReplies} />
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.recordID}
          renderItem={renderItem}
        />
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
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 14,
    color: 'gray',
  },
});