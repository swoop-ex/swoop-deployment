const crypto = require('@harmony-js/crypto');
const defualtTokens = require('@swoop-exchange/default-token-list');
const Fs=require('fs');

const File = e=>Fs.readFileSync(e).toString()

const contracts = {}

function readContracts(filename) {
    const context = File(filename).replace(/#.+/, '').replace(/export/g, '').replace(/=([a-zA-Z0-9]+)/g, "='$1'");
    //console.log(context);
    //return;
    eval(context);
    const chainId = NETWORK == 'mainnet' ? 1 : 2;
    const obj = {};
    obj.UNISWAPV2FACTORY = UNISWAPV2FACTORY;

    defualtTokens.tokens.filter(e=>e.chainId==chainId).forEach(e=>obj[e.symbol]=e.address);
    obj.Multicall = MULTICALL;
    /*
    obj.WONE = WONE;
    obj.OneBUSD = ONEBUSD;
    obj.OneBTC = ONEBTC;
    obj.OneETH = ONEETH;
    obj.OneChainlink = ONECHAINLINK;
    obj.OneSeed = ONESEED;*/
    obj.UNISWAPV2ROUTER02 = UNISWAPV2ROUTER02;
    contracts[NETWORK] = obj;
}

readContracts('mainnet_contract_deployed.txt');
readContracts('testnet_contract_deployed.txt');

console.log(contracts.mainnet)

table = `
| Contract     | Testnet                                                                                 | Mainnet     |
| -----------  | --------------------------------------------------------------------------------------- | ----------- |
| FACTORY      | ${contracts.testnet.UNISWAPV2FACTORY} (${crypto.toBech32(contracts.testnet.UNISWAPV2FACTORY)}) | ${contracts.mainnet.UNISWAPV2FACTORY} (${crypto.toBech32(contracts.mainnet.UNISWAPV2FACTORY)}) |
| ROUTER02     | ${contracts.testnet.UNISWAPV2ROUTER02} (${crypto.toBech32(contracts.testnet.UNISWAPV2ROUTER02)}) | ${contracts.mainnet.UNISWAPV2ROUTER02} (${crypto.toBech32(contracts.mainnet.UNISWAPV2ROUTER02)}) |
| Multicall    | ${contracts.testnet.Multicall} (${crypto.toBech32(contracts.testnet.Multicall)}) | ${contracts.mainnet.Multicall} (${crypto.toBech32(contracts.mainnet.Multicall)}) |
| WONE         | ${contracts.testnet.WONE} (${crypto.toBech32(contracts.testnet.WONE)}) | ${contracts.mainnet.WONE} (${crypto.toBech32(contracts.mainnet.WONE)}) |
| OneBUSD      | ${contracts.testnet['1BUSD']} (${crypto.toBech32(contracts.testnet['1BUSD'])}) | ${contracts.mainnet.BUSD} (${crypto.toBech32(contracts.mainnet.BUSD)}) |
| OneBTC       | ${contracts.testnet['1BTC']} (${crypto.toBech32(contracts.testnet['1BTC'])}) | ${contracts.mainnet['1WBTC']} (${crypto.toBech32(contracts.mainnet['1WBTC'])}) |
| OneETH       | ${contracts.testnet['1ETH']} (${crypto.toBech32(contracts.testnet['1ETH'])}) | ${contracts.mainnet['1WETH']} (${crypto.toBech32(contracts.mainnet['1WETH'])}) |
| OneLINK      | ${contracts.testnet['1LINK']} (${crypto.toBech32(contracts.testnet['1LINK'])}) | ${contracts.mainnet.LINK} (${crypto.toBech32(contracts.mainnet.LINK)}) |
| OneSEED      | ${contracts.testnet['1SEED']} (${crypto.toBech32(contracts.testnet['1SEED'])}) | -  |
`

console.log(table);