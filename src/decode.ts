import { bech32 } from "bech32";
import { limit } from "./lnurl-bech32";

export const decodeBech32 = (lnurl: string): string => {
    const protocol = 'lightning:'
    if (lnurl.toLowerCase().includes(protocol)) {
        lnurl = lnurl.toLowerCase().split('lightning:')[1]
    }

    const decoded = bech32.decode(lnurl, limit);
    const decodedString = Buffer.from(bech32.fromWords(decoded.words)).toString("utf8");
    return decodedString
}

export const decodeKeyauth = (keyauth: string): string => {
    const isTorRegex = /^keyauth?:\/\/[a-z0-9]*\.onion(\/|$)/i;

    let decodedString = keyauth

    const protocol = 'keyauth://'
    if (isTorRegex.test(keyauth)) {
        decodedString = keyauth.replace(protocol, 'http://')
    } else {
        decodedString = keyauth.replace(protocol, 'https://')
    }

    return decodedString
}