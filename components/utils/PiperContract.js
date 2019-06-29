import Portis from "@portis/web3";
import Web3 from "web3";

import * as keys from "../../keys.json";
import * as config from "../../config.json";
import * as contract from "../../build/contracts/Piper.json";

const provider = new Web3.providers.HttpProvider(
  `https://ropsten.infura.io/v3/${keys.infura.ropsten}`
);
const PiperWeb3 = new Web3(provider);

// const portis = new Portis(config.portis.dapp_id, config.network.name);
// const PiperWeb3 = new Web3(portis.provider);

const PiperContract = new PiperWeb3.eth.Contract(
  contract.abi,
  config.deployment.contract_address
);

export { PiperWeb3 };
export default PiperContract;
