import config from "../../package.json";

const Cache = {
  get: hash => {
    const key = `${config.name}_${config.version}_extension_${hash}`;
    const val = localStorage.getItem(key);

    if (val === null) {
      throw new Error("Not found in the cache");
    }
  },

  set: (hash, extension, owner) => {
    const key = `${config.name}_${config.version}_extension_${hash}`;
    const val = localStorage.setItem(
      key,
      JSON.stringify({
        ...extension,
        owner
      })
    );
  }
};

export default Cache;
