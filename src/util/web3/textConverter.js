const toBytes32 = text => web3.fromAscii(text).replace(/\u0000/g, '');

const toText = hex => web3.toAscii(hex);

export { toBytes32, toText };
