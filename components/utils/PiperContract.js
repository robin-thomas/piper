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

      const web3_ = new Web3(portis.provider);

      return {
        web3: web3_,
        portis,
        contract: new web3.eth.Contract(
          contract.abi,
          contract.networks[config.network.network_id].address
        )
      };
    } else {
      return new Web3(provider);
    }
  },

  sendSignedTx: async (web3, portis, fn) => {
    const fnABI = fn.encodeABI();

    try {
      const accounts = await portis.provider.enable();

      return await web3.currentProvider.send("eth_sendTransaction", [
        {
          from: accounts[0],
          to: contract.networks[config.network.network_id].address,
          data: fnABI
        }
      ]);
    } catch (err) {
      throw err;
    }
  }
};

const web3 = new Web3(provider);
const PiperContract = new web3.eth.Contract(
  contract.abi,
  contract.networks[config.network.network_id].address
);

export { PiperWeb3 };
export default PiperContract;
