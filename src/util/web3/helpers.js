export const bytes32ToString = stringToConvert => (
  web3.toAscii(stringToConvert).replace(/\u0000/g, '')
);
export default bytes32ToString;
