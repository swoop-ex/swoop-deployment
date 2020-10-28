const crypto = require('@harmony-js/crypto');
const Fs=require('fs');

const File = e=>Fs.readFileSync(e).toString()

const contracts = {}

function readContracts(filename) {
    const context = File(filename).replace(/#.+/, '').replace(/export/g, '').replace(/=([a-zA-Z0-9]+)/g, "='$1'");
    //console.log(context);
    //return;
    eval(context);
    const obj = {};
    obj.UNISWAPV2FACTORY = UNISWAPV2FACTORY;
    obj.Multicall = MULTICALL;
    obj.WONE = WONE;
    obj.OneBUSD = ONEBUSD;
    obj.OneBTC = ONEBTC;
    obj.OneETH = ONEETH;
    obj.OneChainlink = ONECHAINLINK;
    obj.OneSeed = ONESEED;
    obj.UNISWAPV2ROUTER02 = UNISWAPV2ROUTER02;
    contracts[NETWORK] = obj;
}

readContracts('mainnet_contract_deployed.txt');
readContracts('testnet_contract_deployed.txt');

table = `
| Contract     | Testnet                                                                                 | Mainnet     |
| -----------  | --------------------------------------------------------------------------------------- | ----------- |
| Multicall    | ${contracts.testnet.Multicall} (${crypto.toBech32(contracts.testnet.Multicall)}) | ${contracts.mainnet.Multicall} (${crypto.toBech32(contracts.mainnet.Multicall)}) |
| WONE         | ${contracts.testnet.WONE} (${crypto.toBech32(contracts.testnet.WONE)}) | ${contracts.mainnet.WONE} (${crypto.toBech32(contracts.mainnet.WONE)}) |
| OneBUSD      | ${contracts.testnet.OneBUSD} (${crypto.toBech32(contracts.testnet.OneBUSD)}) | ${contracts.mainnet.OneBUSD} (${crypto.toBech32(contracts.mainnet.OneBUSD)}) |
| OneBTC       | ${contracts.testnet.OneBTC} (${crypto.toBech32(contracts.testnet.OneBTC)}) | ${contracts.mainnet.OneBTC} (${crypto.toBech32(contracts.mainnet.OneBTC)}) |
| OneETH       | ${contracts.testnet.OneETH} (${crypto.toBech32(contracts.testnet.OneETH)}) | ${contracts.mainnet.OneETH} (${crypto.toBech32(contracts.mainnet.OneETH)}) |
| OneChainlink | ${contracts.testnet.OneChainlink} (${crypto.toBech32(contracts.testnet.OneChainlink)}) | ${contracts.mainnet.OneChainlink} (${crypto.toBech32(contracts.mainnet.OneChainlink)}) |
| OneSeed      | ${contracts.testnet.OneSeed} (${crypto.toBech32(contracts.testnet.OneSeed)}) | ${contracts.mainnet.OneSeed} (${crypto.toBech32(contracts.mainnet.OneSeed)}) |
`

console.log(table);