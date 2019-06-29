import ipfsClient from "ipfs-http-client";

import config from "../../config.json";

const ipfs = ipfsClient(config.infura.ipfs.host, config.infura.ipfs.port, {
  protocol: config.infura.ipfs.protocol
});

const IPFS = {
  uploadBuffer: async buffer => {
    try {
      const result = await ipfs.add(buffer);
      return result[0].hash;
    } catch (err) {
      throw err;
    }
  }
};

export default IPFS;
