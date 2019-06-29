pragma solidity ^0.5.0;

contract Piper {
  string saySomething;

  constructor() public  {
    saySomething = "Hello World!";
  }

  function speak() public view returns(string memory) {
    return saySomething;
  }

  function saySomethingElse(string memory newSaying) public returns(bool) {
    saySomething = newSaying;
    return true;
  }
}
