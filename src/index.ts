import { bech32 } from "bech32";
import { decodeBech32, decodeKeyauth } from "./decode.js";
import { LnurlDecoded } from "./interfaces/LnurlDecoded.js";
import { limit, prefix } from "./lnurl-bech32.js";
import { getLnurlObject, getRootDomain } from "./utils.js";

const decode = (lnurl: string): LnurlDecoded => {
  let decodedString: string | null = null

  if (lnurl.toLowerCase().startsWith('lightning:') || lnurl.toLowerCase().startsWith('lnurl1')) {
    decodedString = decodeBech32(lnurl)
  } else if (lnurl.toLowerCase().startsWith('keyauth://')) {
    decodedString = decodeKeyauth(lnurl)
  } else {
    throw new Error(`URL not valid ('${lnurl}')`);
  }

  const split = decodedString.split('?')
  if (split.length !== 2) {
    throw new Error(`Cannot decode LNURL string ('${lnurl}')`);
  }

  const url = split[0]
  const domain = getRootDomain(url)
  const lnurlObject = new URLSearchParams(split[1])
  return { decoded: decodedString, domain, tag: getLnurlObject(lnurlObject, "tag"), k1: getLnurlObject(lnurlObject, "k1"), action: getLnurlObject(lnurlObject, "action") };
};

const encode = (unencoded: string, keyauth: boolean = false): string => {
  if (keyauth) {
    return unencoded.replace('http://', 'keyauth://').replace('https://', 'keyauth://');
  }
  else {
    let words = bech32.toWords(Buffer.from(unencoded, "utf8"));
    return bech32.encode(prefix, words, limit).toUpperCase();
  }
};

export { decode, encode };
