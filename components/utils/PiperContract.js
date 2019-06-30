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

      return {
        web3: new Web3(portis.provider),
        portis: portis
      };
    } else {
      return new Web3(provider);
    }
  }
};

const web3 = new Web3(provider);
const PiperContract = new web3.eth.Contract(
  contract.abi,
  config.deployment.contract_address
);

export { PiperWeb3 };
export default PiperContract;
