import { bech32 } from "bech32";

const limit = 1023;
const prefix = "lnurl";

function decode(lnurl: string) {
  const decoded = bech32.decode(lnurl, limit);
  return Buffer.from(bech32.fromWords(decoded.words)).toString("utf8");
}

function encode(unencoded: string) {
  let words = bech32.toWords(Buffer.from(unencoded, "utf8"));
  return bech32.encode(prefix, words, limit);
}

export default { decode, encode };
