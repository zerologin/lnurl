import { bech32 } from "bech32";
import { getLnurlObject, getRootDomain } from "./utils.js";

const limit = 1023;
const prefix = "lnurl";

interface LnurlDecoded {
  decoded: string,
  domain: string,
  tag: string,
  k1: string,
  action: string,
}

const decode = (lnurl: string): LnurlDecoded => {
  const protocol = 'lightning:'
  if (lnurl.toLowerCase().includes(protocol)) {
    lnurl = lnurl.toLowerCase().split('lightning:')[1]
  }
  
  const decoded = bech32.decode(lnurl, limit);
  const decodedString = Buffer.from(bech32.fromWords(decoded.words)).toString("utf8");

  const split = decodedString.split('?')
  if (split.length !== 2) {
    throw new Error(`Cannot decode LNURL string ('${lnurl}')`);
  }

  const url = split[0]
  const domain = getRootDomain(url)
  const lnurlObject = new URLSearchParams(split[1])
  return { decoded: decodedString, domain, tag: getLnurlObject(lnurlObject, "tag"), k1: getLnurlObject(lnurlObject, "k1"), action: getLnurlObject(lnurlObject, "action") };
};

const encode = (unencoded: string): string => {
  let words = bech32.toWords(Buffer.from(unencoded, "utf8"));
  return bech32.encode(prefix, words, limit).toUpperCase();
};

export { decode, encode };
