import { View, Text, ViewProps, HostComponent, SafeAreaView, StyleSheet, Dimensions, NativeModules, Button, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CallManager, MessageManager } from './modules';
import { Messages } from './modules/MessageManager';

interface NativeProps extends ViewProps {
  color?: string;
}


const { height, width } = Dimensions.get("window")

export default function App() {
  const [contacts, setContacts] = useState<CallManager.SimpleContact[]>([])

  const fetchContacts = () => {
    CallManager.getAllContacts().then((data) => {
      setContacts(data)
    }
    ).catch((error) => {
      console.log("error", error)
    }
    )
  };

  useEffect(() => {
    CallManager.setDefaultDialer().then((data)=>{
      console.log("data", data)
    }).catch((error) => {
      console.log("error", error)
    })

    CallManager.blockNumber("+919503838135").then((data) => {
      console.log("data", data)
    }).catch((error) => { console.log("error", error) })

    CallManager.getBlockedNumbers().then((data) => {
      console.log("data", data)
    }).catch((error) => { console.log("error", error) })

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

    CallManager.callEvents.addListener("onBlockNotificationClick", (data) => {
      console.log("call data incoming", data)
    })
    
    fetchContacts()
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
    }).catch((error) => { console.log("error", error) })
  }

  const forwardCalls = () => {
    //true for disable false for enable
    CallManager.forwardAllCalls({ cfi: false, phoneNumber: "+918709881007" }).then((data) => {
      console.log("data", data)
    }).catch((error) => { console.log("error", error) })
  }

  const getCallReplies = () => {
    CallManager.getCallReplies().then((data) => {
      console.log("data", data)
    }).catch((error) => { console.log("error", error) })
  }

  const addReplies = () => {
    CallManager.saveCallReplies("heeijhj").then((data) => {
      console.log("data", data)
    }
    ).catch((error) => { console.log("error", error) })
  }

  const insertContact = () => {
    const contact: CallManager.Contact = {
      id: 1,
      prefix: "don",
      firstName: "banega",
      middleName: "jon",
      surname: "Doe",
      suffix: "Jr.",
      nickname: "Johnny",
      photo: null,
      phoneNumbers: [
        {
          value: "+1234567890",
          type: 2, // Example: 2 = mobile
          label: "Mobile",
          normalizedNumber: "+1234567890",
          isPrimary: true,
        },
      ],
      contactId: 0
    }
    CallManager.createNewContact(contact).then((data) => {
      console.log("data", data)
    }
    ).catch((error) => { console.log("error", error) })
  };


  const updateContact = (id:number,cId:number) => {
    const contact: CallManager.Contact = {
      id: id,
      prefix: "damgea",
      firstName: "banega",
      middleName: "jon",
      surname: "Doe",
      suffix: "Jr.",
      nickname: "Johnny",
      photo: null,
      phoneNumbers: [
        {
          value: "+1234567890",
          type: 2, // Example: 2 = mobile
          label: "Mobile",
          normalizedNumber: "+1234567890",
          isPrimary: true,
        },
      ],
      contactId: cId
    }
    CallManager.updateContact(contact, 4).then((data) => {
      console.log("data", data)
    }
    ).catch((error) => { console.log("error", error) })
  }

  const renderItem = ({ item }: { item: CallManager.SimpleContact }) => (
    <TouchableOpacity onPress={() => {
      updateContact(item.rawId,item.contactId)
    }}>
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{item.name} {item.rawId} {item.contactId}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Make Default Dialer App</Text>
        {/*<NativeView color="#32a852" style={styles.nativeView} />*/}
        <Button title="Call Me" onPress={insertContact} />
        <Button title="Call Me 2" onPress={addReplies} />
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.rawId.toString()}
          contentContainerStyle={styles.container}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
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