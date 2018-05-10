const toBytes32 = text => (text !== null ? web3.fromUtf8(text) : null);

const toText = hex =>
  (hex !== null ? web3.toUtf8(hex).replace(/\u0000/g, '').replace(/\0/g, '') : null);

export { toBytes32, toText };
