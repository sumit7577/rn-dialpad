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

export async function getCallReplies(): Promise<string[]> {
    return await DialPadHelper.getReplies();
}

export async function saveCallReplies(replies: string): Promise<void> {
    return await DialPadHelper.saveReplies(replies);
}

/**
 * A contact entry fetched from the native address book.
 */
export interface PhoneNumber {
    value: string;
    type: number; // e.g., mobile, home, work, etc.
    label: string; // custom label if type is custom
    normalizedNumber: string;
    isPrimary: boolean;
}

export interface SimpleContact {
    rawId: number;
    contactId: number;
    name: string;
    photoUri: string;
    phoneNumbers: PhoneNumber[];
    birthdays: string[];        // format may vary (e.g., "1990-01-01")
    anniversaries: string[];    // format may vary (e.g., "2015-06-25")
}

/**
 * Fetches all contacts from the native address book.
 *
 * @returns {Promise<Contact[]>} A promise that resolves to an array of contacts.
 * @throws {Error} If the native method fails or permissions are denied.
 */
export async function getAllContacts(): Promise<SimpleContact[]> {
    return await DialPadHelper.getAllContacts();
}