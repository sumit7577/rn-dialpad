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
 * Type definition for call forwarding parameters.
 */
export type ForwardCallParams = {
    /**
     * `true` to enable call forwarding, `false` to disable it.
     */
    cfi: boolean;

    /**
     * The phone number to forward calls to when enabling call forwarding.
     * If `cfi` is `false`, this can be an empty string or `null`.
     */
    phoneNumber: string;
};

/**
 * Enables or disables call forwarding using USSD codes.
 *
 * @param {ForwardCallParams} params - The parameters for call forwarding.
 * @returns {Promise<string>} Resolves with a success message or rejects with an error.
 * @throws {Error} If the native method fails or permissions are denied.
 */
export async function forwardAllCalls(params: ForwardCallParams): Promise<string> {
    return await DialPadHelper.forwardAllCalls(params.cfi, params.phoneNumber);
}