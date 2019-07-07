pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract Piper {
  struct Ext {
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
  mapping(string => address) owner;
  mapping(string => bool) hasExtension;

  function isExtension(string memory _hash) public view returns(bool) {
    return hasExtension[_hash] == true;
  }

  event Extension(address owner, Ext extension);
  event ExtensionVersion(string hash, string version, string crx);
  event ExtensionReview(string hash, uint32 rating, string review);

  function createNewExtension(Ext memory _extension) public {
    if (!isExtension(_extension.hash)) {
      // Create new extension.
      versions[_extension.hash] = _extension.version;
      owner[_extension.hash] = msg.sender;
      hasExtension[_extension.hash] = true;

      emit Extension(msg.sender, _extension);
    } else {
      // Updating the extension.

      // Check if extension owner is the one trying to edit it.
      require(msg.sender == owner[_extension.hash]);

      // Check whether they are updating the version.
      if (keccak256(bytes(_extension.version)) != keccak256(bytes(versions[_extension.hash]))) {
        versions[_extension.hash] = _extension.version;

        emit ExtensionVersion(_extension.hash, _extension.version, _extension.crx);
      }

      emit Extension(msg.sender, _extension);
    }
  }

  function addReview(string memory _hash, uint32 _rating, string memory _review) public {
    require (isExtension(_hash));

    emit ExtensionReview(_hash, _rating, _review);
  }
}
