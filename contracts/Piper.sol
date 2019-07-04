pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract Piper {
  address owner;
  string name;

  struct Extension {
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
    Extension extension;
    address owner;
  }

  mapping(string => ExtensionWithOwner) extensions;
  mapping(string => bool) hasExtension;

  struct ExtensionVersion {
    string version;
    string crx;
    uint created;
  }

  mapping(string => ExtensionVersion[]) versions;

  constructor() public {
    owner = msg.sender;
    name = "Piper";
  }

  function isExtension(string memory _hash) public view returns(bool) {
    return hasExtension[_hash] == true;
  }

  function getExtensionByHash(string memory _hash) public view returns(ExtensionWithOwner memory) {
    // Make sure the extension exists.
    require(isExtension(_hash));

    return extensions[_hash];
  }

  event CreateNewExtensionEvent(string hash, ExtensionWithOwner extension);
  event UpdateExtensionByHashEvent(string hash, ExtensionWithOwner extension);
  event CreateNewExtensionVersionEvent(string hash, ExtensionVersion version);

  function createNewExtension(string memory _hash, Extension memory _extension) public returns(bool) {
    // Make sure that the extension doesnt exist.
    require(!isExtension(_hash));

    // Create new extension.
    extensions[_hash].extension = _extension;
    extensions[_hash].owner = msg.sender;
    hasExtension[_hash] = true;

    emit CreateNewExtensionEvent(_hash, extensions[_hash]);

    return true;
  }

  function updateExtensionByHash(string memory _hash, Extension memory _extension) public returns(bool) {
    // Check if extension owner is the one trying to edit it.
    require(isExtension(_hash));
    require(msg.sender == extensions[_hash].owner);

    // Check whether they are updating the version.
    if (keccak256(bytes(_extension.crx)) != keccak256(bytes(extensions[_hash].extension.crx))) {
      ExtensionVersion memory _extensionVersion = ExtensionVersion(_extension.version, _extension.crx, _extension.updated);
      versions[_hash].push(_extensionVersion);

      extensions[_hash].extension.developer = _extension.developer;
      extensions[_hash].extension.developerETH = _extension.developerETH;
      extensions[_hash].extension.name = _extension.name;
      extensions[_hash].extension.overview = _extension.overview;
      extensions[_hash].extension.category = _extension.category;
      extensions[_hash].extension.size = _extension.size;
      extensions[_hash].extension.iconURL = _extension.iconURL;
      extensions[_hash].extension.updated = _extension.updated;

      emit CreateNewExtensionVersionEvent(_hash, _extensionVersion);

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

    emit UpdateExtensionByHashEvent(_hash, extensions[_hash]);

    return true;
  }
}
