import * as _ from "lodash";

const Validator = {
  validateExtension: (extension, prevExtension) => {
    if (_.isEmpty(extension.name)) {
      return {
        error: "Extension name is missing!"
      };
    }

    if (_.isEmpty(extension.iconURL)) {
      return {
        error: "Extension icon is not upload!"
      };
    }

    if (_.isEmpty(extension.developer)) {
      return {
        error: "Developer URL is missing!"
      };
    }

    if (isNaN(extension.size) || parseInt(extension.size) <= 0) {
      return {
        error: "Extension CRX is not uploaded!"
      };
    }

    if (_.isEmpty(extension.overview)) {
      return {
        error: "Extension description is missing!"
      };
    }

    if (_.isEmpty(extension.version)) {
      return {
        error: "Extension version is missing!"
      };
    }

    if (
      !_.isEmpty(extension.hash) &&
      extension.version === prevExtension.version &&
      extension.size !== prevExtension.size
    ) {
      return {
        error: "Cannot modify CRX file without changing the version!"
      };
    }

    return {
      error: null
    };
  }
};

export default Validator;
