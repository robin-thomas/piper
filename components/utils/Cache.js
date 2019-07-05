import config from "../../package.json";

const Cache = {
  get: hash => {
    const key = `${config.name}_${config.version}_extension_${hash}`;
    const val = localStorage.getItem(key);

    if (val === null) {
      throw new Error("Not found in the cache");
    }

    return val;
  },

  set: (hash, extension, owner) => {
    const key = `${config.name}_${config.version}_extension_${hash}`;
    const val = JSON.stringify({ extension, owner });

    localStorage.setItem(key, val);
  }
};

export default Cache;
