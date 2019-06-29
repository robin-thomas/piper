pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Piper {
  address owner;
  string name;

  struct Extension {
    address owner;
    string hash;
    string developer;
    address developerETH;
    string name;
    string overview;
    string category;
    string version;
    uint extensionSize;
    string iconURL;
    string extensionCrxURL;
    uint8 rating;
    uint reviews;
    uint downloads;
    uint updated;
  }
  mapping(string => Extension) extensions;

  constructor() public {
    owner = msg.sender;
    name = "Piper";
  }

  function getExtensionByHash(string memory hash) public view returns(Extension memory) {
    // Make sure the extension exists.
    require(keccak256(bytes(extensions[hash].hash)) == keccak256(bytes(hash)));

    return extensions[hash];
  }

  function createNewExtension(string memory hash, Extension memory extension) public returns(bool) {
    // Make sure that the extension doesnt exist.
    require(keccak256(bytes(extensions[hash].hash)) != keccak256(bytes(hash)));

    // Create new extension.
    extensions[hash] = extension;

    return true;
  }

  function updateExtensionByHash(string memory hash, Extension memory extension) public returns(bool) {
    // Check if extension owner is the one trying to edit it.
    require(msg.sender == extensions[hash].owner);

    // Update the extension.
    extensions[hash] = extension;

    return true;
  }
}
