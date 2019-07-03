import fetch from "node-fetch";

const Chrome = {
  get: async id => {
    const url = `https://chrome.google.com/webstore/detail/${id}`;

    try {
      let r = await fetch(url, {
        method: "GET"
      });
      r = await r.text();
      console.log(r);
    } catch (err) {
      throw err;
    }
  }
};

export default Chrome;
