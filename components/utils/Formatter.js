import moment from "moment";
import _ from "lodash";

const Formatter = {
  formatText: data => {
    if (_.isEmpty(data)) {
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
    if (_.isEmpty(timestamp)) {
      return null;
    }

    return moment(timestamp)
      .local()
      .format("MMM DD, YYYY");
  },

  formatFileSize: bytes => {
    if (_.isEmpty(bytes)) {
      return 0;
    }

    const size = ["B", "kB", "MB", "GB"];
    const factor = Math.floor((bytes.toString().length - 1) / 3);
    return (bytes / Math.pow(1024, factor)).toFixed(2) + size[factor];
  }
};

export default Formatter;
