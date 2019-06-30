import * as _ from "lodash";

const Validator = {
  validateExtension: extension => {
    if (_.isEmpty(extension.name)) {
      return {
        err: "Extension name is missing"
      };
    }

    if (_.isEmpty(extension.iconURL)) {
      return {
        err: "Extension icon is not upload"
      };
    }

    if (_.isEmpty(extension.developer)) {
      return {
        err: "Developer URL is missing"
      };
    }

    if (_.isEmpty(extension.extensionSize)) {
      return {
        err: "Extension CRX is not uploaded"
      };
    }

    if (_.isEmpty(extension.overview)) {
      return {
        err: "Extension description is missing"
      };
    }

    if (_.isEmpty(extension.version)) {
      return {
        err: "Extension version is missing"
      };
    }
  }
};

export default Validator;
