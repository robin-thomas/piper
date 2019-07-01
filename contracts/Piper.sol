pragma solidity >=0.4.0 <0.6.0;
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
    uint extensionSize;
    string iconURL;
    string extensionCrxURL;
    string[] previews;
    uint8 rating;
    uint reviews;
    uint downloads;
    uint updated;
    bool isExtension;
  }
  mapping(string => Extension) extensions;
  mapping(string => address) owners;

  constructor() public {
    owner = msg.sender;
    name = "Piper";
  }

  function isExtension(string memory _hash) public view returns(bool) {
    return extensions[_hash].isExtension;
  }

  function getExtensionByHash(string memory _hash) public view returns(Extension memory) {
    // Make sure the extension exists.
    require(isExtension(_hash));

    return extensions[_hash];
  }

  function createNewExtension(string memory _hash, Extension memory _extension) public returns(bool) {
    // Make sure that the extension doesnt exist.
    require(!isExtension(_hash));

    // Create new extension.
    extensions[_hash] = _extension;
    owners[_hash] = msg.sender;

    return true;
  }

  function updateExtensionByHash(string memory _hash, Extension memory _extension) public returns(bool) {
    // Check if extension owner is the one trying to edit it.
    require(msg.sender == owners[_hash]);

    Extension memory extension = extensions[_hash];

    // Update the extension.
    extensions[_hash] = _extension;

    return true;
  }
}
