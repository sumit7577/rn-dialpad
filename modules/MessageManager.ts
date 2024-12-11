import { NativeModules, Platform } from 'react-native';


const LINKING_ERROR =
  `The package 'react-native-messager' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const MessagerModule = isTurboModuleEnabled
  ? require('./NativeMessager').default
  : NativeModules.Messager;

const Messager = MessagerModule
  ? MessagerModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export function multiply(a: number, b: number): Promise<number> {
  return Messager.multiply(a, b);
}

export function getAllMessages(): Promise<Array<{
  body: string;
  type: number;
  date: number;
  read: boolean;
  threadId: number;
  isMMS: boolean;
  senderPhoneNumber: string;
  senderName: string;
  senderPhotoUri: string;
  subscriptionId: number;
  isScheduled: boolean;
}>> {
  return Messager.getAllMessages()
}

export function setDefaultMessage(): Promise<string> {
  return Messager.requestMessageRole()
}

export function sendSmsMessage(text: string,
  addresses: string[],
  subId: number,
  requireDeliveryReport: boolean): Promise<string> {
  return Messager.sendSmsMessage(text, addresses, subId, requireDeliveryReport)
}