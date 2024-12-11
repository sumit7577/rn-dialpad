import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';


export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  getAllMessages(): Promise<Array<{
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
  }>>;
  requestMessageRole(): Promise<String>;
  sendSmsMessage(
    text: string,
    addresses: string[],
    subId: number,
    requireDeliveryReport: boolean
  ): Promise<string>
}

export default TurboModuleRegistry.getEnforcing<Spec>('Messager');