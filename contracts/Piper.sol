pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract Piper {
  struct Extension_ {
    uint32 updated;
    uint32 size;
    string version;
    string category;
    string name;
    string hash;
    string crx;
    string iconURL;
    string developer;
    string overview;
  }

  mapping(string => string) versions;
  mapping(string => address) developer;
  mapping(string => bool) hasExtension;

  function isExtension(string memory _hash) public view returns(bool) {
    return hasExtension[_hash] == true;
  }

  event Extension(address, Extension_);
  event ExtensionVersion(string hash, string version, string crx);
  event ExtensionReview(uint32 rating, string review, string hash);

  function createNewExtension(Extension_ memory _extension) public {
    // Creating a new extension.
    if (!isExtension(_extension.hash)) {
      // Create new extension.
      versions[_extension.hash] = _extension.version;
      developer[_extension.hash] = msg.sender;
      hasExtension[_extension.hash] = true;

      emit Extension(msg.sender, _extension);
    } else {
      // Updating the extension.

      // Check if extension owner is the one trying to edit it.
      require(msg.sender == developer[_extension.hash]);

      // Check whether they are updating the version.
      if (keccak256(bytes(_extension.version)) != keccak256(bytes(versions[_extension.hash]))) {
        versions[_extension.hash] = _extension.version;

        emit ExtensionVersion(_extension.hash, _extension.version, _extension.crx);
      }

      emit Extension(msg.sender, _extension);
    }
  }

  function addReview(uint32 _rating, string memory _review, string memory _hash) public {
    require (isExtension(_hash));

    emit ExtensionReview(_rating, _review, _hash);
  }
}
