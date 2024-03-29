import { test } from 'vitest'
import { encode, decode } from "../src/index.js";

test("can encode", ({ expect }) => {
  const unencoded =
    "https://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161";
  const encoded = encode(unencoded);

  const expected =
    "LNURL1DP68GURN8GHJ7UM9WFMXJCM99E3K7MF0D3H82UNV9ASH2ARG8A6XZEEAD3HKW6TWYE4NZ0T9XY6R2WTYX3JNZCEJV56NGDTP8QUKGWRYVE3RWEF4VDNRVCMP8YCXZVNY8PNRVETYXGCNWDEJXFJK2VEJX5UXXCNZVVMRYVPKXGURZFNGD4SKX0TRV9JNXCM98QMRWV35XFNRXVNPXUENSCTRXEJRQCEKXPJK2ETXVSCNSERXXQMRZWRRXE3NQCTZXAJKYDRY8QENXERYVS6NSDRPXYMRZAJXAKZ";
  expect(encoded).toEqual(expected);
});

test("can encode to keyauth from clearnet", ({ expect }) => {
  const unencoded =
    "https://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161";
  const encoded = encode(unencoded, true);

  const expected =
    "keyauth://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161";
  expect(encoded).toEqual(expected);
});

test("can encode to keyauth from onion", ({ expect }) => {
  const unencoded =
    "http://service.onion/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161";
  const encoded = encode(unencoded, true);

  const expected =
    "keyauth://service.onion/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161";
  expect(encoded).toEqual(expected);
});

test("can decode without protocol", ({ expect }) => {
  const encoded =
    "lnurl1dp68gurn8ghj7um9wfmxjcm99e3k7mf0d3h82unv9ash2arg8a6xzeead3hkw6twye4nz0t9xy6r2wtyx3jnzcejv56ngdtp8qukgwryve3rwef4vdnrvcmp8ycxzvny8pnrvetyxgcnwdejxfjk2vejx5uxxcnzvvmryvpkxgurzfngd4skx0trv9jnxcm98qmrwv35xfnrxvnpxuensctrxejrqcekxpjk2etxvscnserxxqmrzwrrxe3nqctzxajkydry8qenxeryvs6nsdrpxymrzajxakz";
  const decoded = decode(encoded);

  const expected =
  {
    decoded: "https://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161",
    domain: "service.com",
    action: "",
    k1: "e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281",
    tag: "login"
  };
  expect(decoded).toEqual(expected);
});

test("can decode with protocol lowercase", ({ expect }) => {
  const encoded =
    "lightning:lnurl1dp68gurn8ghj7um9wfmxjcm99e3k7mf0d3h82unv9ash2arg8a6xzeead3hkw6twye4nz0t9xy6r2wtyx3jnzcejv56ngdtp8qukgwryve3rwef4vdnrvcmp8ycxzvny8pnrvetyxgcnwdejxfjk2vejx5uxxcnzvvmryvpkxgurzfngd4skx0trv9jnxcm98qmrwv35xfnrxvnpxuensctrxejrqcekxpjk2etxvscnserxxqmrzwrrxe3nqctzxajkydry8qenxeryvs6nsdrpxymrzajxakz";
  const decoded = decode(encoded);

  const expected =
  {
    decoded: "https://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161",
    domain: "service.com",
    action: "",
    k1: "e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281",
    tag: "login"
  };
  expect(decoded).toEqual(expected);
});

test("can decode with protocol UPPERCASE", ({ expect }) => {
  const encoded =
    "LIGHTNING:LNURL1DP68GURN8GHJ7UM9WFMXJCM99E3K7MF0D3H82UNV9ASH2ARG8A6XZEEAD3HKW6TWYE4NZ0T9XY6R2WTYX3JNZCEJV56NGDTP8QUKGWRYVE3RWEF4VDNRVCMP8YCXZVNY8PNRVETYXGCNWDEJXFJK2VEJX5UXXCNZVVMRYVPKXGURZFNGD4SKX0TRV9JNXCM98QMRWV35XFNRXVNPXUENSCTRXEJRQCEKXPJK2ETXVSCNSERXXQMRZWRRXE3NQCTZXAJKYDRY8QENXERYVS6NSDRPXYMRZAJXAKZ";
  const decoded = decode(encoded);

  const expected =
  {
    decoded: "https://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161",
    domain: "service.com",
    action: "",
    k1: "e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281",
    tag: "login"
  };
  expect(decoded).toEqual(expected);
});

test("can decode without protocol UPPERCASE", ({ expect }) => {
  const encoded =
    "LNURL1DP68GURN8GHJ7UM9WFMXJCM99E3K7MF0D3H82UNV9ASH2ARG8A6XZEEAD3HKW6TWYE4NZ0T9XY6R2WTYX3JNZCEJV56NGDTP8QUKGWRYVE3RWEF4VDNRVCMP8YCXZVNY8PNRVETYXGCNWDEJXFJK2VEJX5UXXCNZVVMRYVPKXGURZFNGD4SKX0TRV9JNXCM98QMRWV35XFNRXVNPXUENSCTRXEJRQCEKXPJK2ETXVSCNSERXXQMRZWRRXE3NQCTZXAJKYDRY8QENXERYVS6NSDRPXYMRZAJXAKZ";
  const decoded = decode(encoded);

  const expected =
  {
    decoded: "https://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161",
    domain: "service.com",
    action: "",
    k1: "e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281",
    tag: "login"
  };
  expect(decoded).toEqual(expected);
});

test("can decode keyauth:// protocol clearnet", ({ expect }) => {
  const encoded =
    "keyauth://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161";
  const decoded = decode(encoded);

  const expected =
  {
    decoded: "https://service.com/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161",
    domain: "service.com",
    action: "",
    k1: "e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281",
    tag: "login"
  };
  expect(decoded).toEqual(expected);
});

test("can decode keyauth:// protocol onion", ({ expect }) => {
  const encoded =
    "keyauth://service.onion/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161";
  const decoded = decode(encoded);

  const expected =
  {
    decoded: "http://service.onion/lnurl/auth?tag=login&k1=e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281&hmac=cae3ce867242f32a738ac6d0c60eeefd18df0618c6c0ab7eb4d833ddd584a161",
    domain: "service.onion",
    action: "",
    k1: "e1459d4e1c2e545a89d8dfb7e5cf6ca90a2d8f6ed217722ee3258cbbc6206281",
    tag: "login"
  };
  expect(decoded).toEqual(expected);
});

test("throw exception when invalid string is passed", ({ expect }) => {
  const encoded =
    "invalidprotocol:invalidstring";

  expect(() => { decode(encoded) }).toThrowError();
});