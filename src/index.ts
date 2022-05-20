import { bech32 } from "bech32";

const limit = 1023;
const prefix = "lnurl";

export const decode = (lnurl: string): string => {
  const decoded = bech32.decode(lnurl, limit);
  return Buffer.from(bech32.fromWords(decoded.words)).toString("utf8");
}

export const encode = (unencoded: string): string => {
  let words = bech32.toWords(Buffer.from(unencoded, "utf8"));
  return bech32.encode(prefix, words, limit).toUpperCase();
}