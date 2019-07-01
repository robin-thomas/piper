import Portis from "@portis/web3";
import Web3 from "web3";

import * as keys from "../../keys.json";
import * as config from "../../config.json";
import * as contract from "../../build/contracts/Piper.json";

const provider = new Web3.providers.HttpProvider(
  `https://ropsten.infura.io/v3/${keys.infura.ropsten}`
);

const PiperWeb3 = {
  getWeb3: (usePortis = true) => {
    if (usePortis) {
      const portis = new Portis(config.portis.dapp_id, config.network.name, {
        scope: ["email"]
      });

      const web3 = new Web3(portis.provider);

      return {
        web3,
        portis,
        contract: new web3.eth.Contract(
          contract.abi,
          config.deployment.contract_address
        )
      };
    } else {
      return new Web3(provider);
    }
  },

  getSignedTx: async (web3, account, fn) => {
    const fnABI = fn.encodeABI();

    // const gasAmount = await fn.estimateGas({from: account});
    // const estimatedGas = gasAmount.toString(16);

    // const nonce_ = await web3.eth.getTransactionCount(account);
    // const nonce = nonce_.toString(16);

    const txParams = {
      gasPrice: "0x09184e72a000",
      gasLimit: 3000000,
      to: config.deployment.contract_address,
      data: fnABI,
      from: account
      // nonce: `0x${nonce}`
    };

    return await web3.currentProvider.send("eth_signTypedData", [
      txParams,
      account
    ]);
  }
};

const web3 = new Web3(provider);
const PiperContract = new web3.eth.Contract(
  contract.abi,
  config.deployment.contract_address
);

export { PiperWeb3 };
export default PiperContract;
