import moment from "moment";

const Formatter = {
  prettifyString: str => {
    if (str === undefined || str === null) {
      return "0";
    } else {
      return parseInt(str).toLocaleString();
    }
  },

  formatText: data => {
    if (data === null || data === undefined) {
      return;
    }

    data = data.replace(/\r?\n/g, "<br />");
    data = data.split("<br />");

    return data.map((line, index) => (
      <p key={index}>
        {line}
        <br />
      </p>
    ));
  },

  formatDate: timestamp => {
    if (timestamp === null || timestamp === undefined) {
      return null;
    }

    try {
      return moment(timestamp)
        .local()
        .format("MMM DD, YYYY");
    } catch (err) {
      return null;
    }
  },

  formatFileSize: bytes => {
    try {
      const size = ["B", "kB", "MB", "GB"];
      const factor = Math.floor((bytes.toString().length - 1) / 3);
      return (bytes / Math.pow(1024, factor)).toFixed(2) + size[factor];
    } catch (err) {
      return 0;
    }
  }
};

export default Formatter;
