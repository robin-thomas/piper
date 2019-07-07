import Portis from "@portis/web3";
import Web3 from "web3";

import * as config from "../../config.json";
import * as contract from "../../build/contracts/Piper.json";

const PortisWeb3 = {
  portis: null,
  web3: null,
  contract: null,

  init: () => {
    if (PortisWeb3.portis === null) {
      PortisWeb3.portis = new Portis(
        config.portis.dapp_id,
        config.network.name,
        {
          scope: ["email"]
        }
      );

      PortisWeb3.web3 = new Web3(PortisWeb3.portis.provider);

      PortisWeb3.contract = new PortisWeb3.web3.eth.Contract(
        contract.abi,
        contract.networks[config.network.network_id].address
      );
    }
  }
};

const InfuraWeb3 = {
  web3: null,
  contract: null,

  init: () => {
    if (InfuraWeb3.web3 === null) {
      const provider = new Web3.providers.HttpProvider(
        `https://ropsten.infura.io/v3/aa055fbdf8474ec79929cbaff2328d45`
      );

      InfuraWeb3.web3 = new Web3(provider);

      InfuraWeb3.contract = new InfuraWeb3.web3.eth.Contract(
        contract.abi,
        contract.networks[config.network.network_id].address
      );
    }
  }
};

const PiperContract = {
  portis: null,
  web3: null,
  contract: null,

  getWeb3: (usePortis = true) => {
    if (usePortis === true) {
      PortisWeb3.init();

      return {
        web3: PortisWeb3.web3,
        portis: PortisWeb3.portis,
        contract: PortisWeb3.contract
      };
    } else {
      InfuraWeb3.init();

      return {
        web3: InfuraWeb3.web3,
        portis: InfuraWeb3.portis,
        contract: InfuraWeb3.contract
      };
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
          data: fnABI,
          gas: 8000000,
          gasPrice: web3.utils.toHex(web3.utils.toWei("20", "Gwei"))
        }
      ]);
    } catch (err) {
      throw err;
    }
  },

  getTransactionReceipt: async (web3, txHash) => {
    const sleep = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const transactionReceipt = () => {
      return new Promise((resolve, reject) => {
        web3.eth.getTransactionReceipt(txHash, async (error, receipt) => {
          if (error) {
            reject(error);
          } else if (receipt === null) {
            await sleep(1000);
            try {
              resolve(await transactionReceipt());
            } catch (error) {
              reject(error);
            }
          } else {
            resolve(receipt);
          }
        });
      });
    };

    if (Array.isArray(txHash)) {
      return Promise.all(
        txHash.map(oneTxHash =>
          PiperContract.getTransactionReceipt(web3, oneTxHash)
        )
      );
    } else if (typeof txHash === "string") {
      return await transactionReceipt();
    } else {
      throw new Error("Invalid Type: " + txHash);
    }
  }
};

export default PiperContract;
