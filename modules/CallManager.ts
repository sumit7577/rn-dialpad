import { NativeModules } from "react-native";



const { DialPadHelper } = NativeModules;

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
export async function callUser(phoneNumber: string) {
    return await DialPadHelper.makeCall(phoneNumber)
} 