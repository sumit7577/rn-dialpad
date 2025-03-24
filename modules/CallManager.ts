import { NativeEventEmitter, NativeModules } from "react-native";


const { DialPadHelper } = NativeModules;

export const callEvents = new NativeEventEmitter(DialPadHelper)

/**
 * Native function to set your app to default caller app
 * After User agree to make the app as default dialer your app will able to pick and receive calls
 * This function will be mostly called inside useEffect when component get mounted
 * @example
 * CallManager.setDefaultDialer()
 */
export const setDefaultDialer = () => {
    return DialPadHelper.requestRole()
}

/**
 * Native function to make a call to a specific user from contact
 * @example
 * CallManager.CallUser("+9191191119111")
 */
export async function callUser(phoneNumber: string): Promise<string> {
    return await DialPadHelper.makeCall(phoneNumber)
}

/**
 * Native function to toggle vibration for incoming calls.
 * @example
 * CallManager.toggleVibration(true);
 */
export const toggleVibration = (value: boolean): Promise<string> => {
    return DialPadHelper.toggleVibration(value);
};

/**
 * Native function to get the current vibration status for incoming calls.
 * @example
 * CallManager.getVibrationStatus();
 */
export const getVibrationStatus = (): Promise<boolean> => {
    return DialPadHelper.getVibrationStatus();
};