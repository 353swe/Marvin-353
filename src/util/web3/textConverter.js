const toBytes32 = text => web3.fromAscii(text);

const toText = hex => web3.toAscii(hex);

export { toBytes32, toText };
