import fetch from "node-fetch";
import cheerio from "cheerio";

const keys = ["ratingCount", "ratingValue", "UserDownloads"];

const parse = e => parseFloat(e.replace(/,/g, ""));

const Chrome = {
  get: async id => {
    const url = `https://cors-anywhere.herokuapp.com/https://chrome.google.com/webstore/detail/${id}`;

    try {
      const html = await (await fetch(url)).text();
      const $ = cheerio.load(html);

      let prop,
        props = {};
      $("meta[itemprop]").each((index, ele) => {
        if (
          $(ele).attr("itemprop") === "interactionCount" &&
          $(ele)
            .attr("content")
            .indexOf(":") !== -1
        ) {
          prop = $(ele).attr("itemprop");
          props[prop] = props[prop] || {};

          const val = $(ele)
            .attr("content")
            .split(":", 2);
          props[prop][val[0]] = keys.includes(val[0]) ? parse(val[1]) : val[1];
        } else {
          prop = $(ele).attr("itemprop");

          const val = $(ele).attr("content");
          props[prop] = keys.includes(prop) ? parse(val) : val;
        }
      });

      return props;
    } catch (err) {
      throw err;
    }
  }
};

export default Chrome;
