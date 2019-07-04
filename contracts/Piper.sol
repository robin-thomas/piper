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

    // Update the extension.
    extensions[_hash].extension = _extension;

    emit UpdateExtensionByHashEvent(_hash, extensions[_hash]);

    return true;
  }
}
