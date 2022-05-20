import { test } from "@japa/runner";
import { decode, encode } from "../src/index";

test.group("LNURL", () => {
  test("can encode", ({ expect }) => {
    const unencoded =
      "https://service.com/api?q=3fc3645b439ce8e7f2553a69e5267081d96dcd340693afabe04be7b0ccd178df";
    const encoded = encode(unencoded);

    const expected =
      "LNURL1DP68GURN8GHJ7UM9WFMXJCM99E3K7MF0V9CXJ0M385EKVCENXC6R2C35XVUKXEFCV5MKVV34X5EKZD3EV56NYD3HXQURZEPEXEJXXEPNXSCRVWFNV9NXZCN9XQ6XYEFHVGCXXCMYXYMNSERXFQ5FNS";
    expect(encoded).toEqual(expected);
  });

  test("can decode", ({ expect }) => {
    const unencoded =
      "LNURL1DP68GURN8GHJ7UM9WFMXJCM99E3K7MF0V9CXJ0M385EKVCENXC6R2C35XVUKXEFCV5MKVV34X5EKZD3EV56NYD3HXQURZEPEXEJXXEPNXSCRVWFNV9NXZCN9XQ6XYEFHVGCXXCMYXYMNSERXFQ5FNS";
    const decoded = decode(unencoded);

    const expected =
      "https://service.com/api?q=3fc3645b439ce8e7f2553a69e5267081d96dcd340693afabe04be7b0ccd178df";
    expect(decoded).toEqual(expected);
  });
});
