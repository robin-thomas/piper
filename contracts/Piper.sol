pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract Piper {
  address owner;
  string name;

  struct Extension_ {
    string hash;
    string developer;
    string developerETH;
    string name;
    string overview;
    string category;
    string version;
    uint size;
    string iconURL;
    string crx;
    uint8 rating;
    uint reviews;
    uint downloads;
    uint updated;
  }

  struct ExtensionWithOwner {
    Extension_ extension;
    address owner;
  }

  mapping(string => ExtensionWithOwner) extensions;
  mapping(string => bool) hasExtension;

  constructor() public {
    owner = msg.sender;
    name = "Piper";
  }

  function isExtension(string memory _hash) public view returns(bool) {
    return hasExtension[_hash] == true;
  }

  event Extension(ExtensionWithOwner);
  event ExtensionVersion(string hash, string version, string crx);
  event ExtensionReview(string hash, string review, uint rating);

  function createNewExtension(string memory _hash, Extension_ memory _extension) public returns(bool) {
    // Creating a new extension.
    if (!isExtension(_hash)) {
      // Create new extension.
      extensions[_hash].extension = _extension;
      extensions[_hash].owner = msg.sender;
      hasExtension[_hash] = true;

      emit Extension(extensions[_hash]);

      return true;
    } else {
      // Updating the extension.

      // Check if extension owner is the one trying to edit it.
      require(msg.sender == extensions[_hash].owner);

      // Check whether they are updating the version.
      if (keccak256(bytes(_extension.crx)) != keccak256(bytes(extensions[_hash].extension.crx))) {
        require(keccak256(bytes(_extension.version)) != keccak256(bytes(extensions[_hash].extension.version)));

        // Update the extension.
        extensions[_hash].extension.developer = _extension.developer;
        extensions[_hash].extension.developerETH = _extension.developerETH;
        extensions[_hash].extension.name = _extension.name;
        extensions[_hash].extension.overview = _extension.overview;
        extensions[_hash].extension.category = _extension.category;
        extensions[_hash].extension.size = _extension.size;
        extensions[_hash].extension.iconURL = _extension.iconURL;
        extensions[_hash].extension.updated = _extension.updated;
        extensions[_hash].extension.version = _extension.version;
        extensions[_hash].extension.crx = _extension.crx;
        extensions[_hash].owner = msg.sender;

        emit Extension(extensions[_hash]);
        emit ExtensionVersion(_hash, _extension.version, _extension.crx);

        return true;
      }

      // Update the extension.
      extensions[_hash].extension.developer = _extension.developer;
      extensions[_hash].extension.developerETH = _extension.developerETH;
      extensions[_hash].extension.name = _extension.name;
      extensions[_hash].extension.overview = _extension.overview;
      extensions[_hash].extension.category = _extension.category;
      extensions[_hash].extension.size = _extension.size;
      extensions[_hash].extension.iconURL = _extension.iconURL;
      extensions[_hash].extension.updated = _extension.updated;
      extensions[_hash].extension.version = _extension.version;
      extensions[_hash].extension.crx = _extension.crx;
      extensions[_hash].owner = msg.sender;

      emit Extension(extensions[_hash]);

      return true;
    }
  }

  function addReview(string memory _hash, string memory _review, uint _rating) public returns(bool) {
    require (isExtension(_hash));

    emit ExtensionReview(_hash, _review, _rating);

    return true;
  }
}
