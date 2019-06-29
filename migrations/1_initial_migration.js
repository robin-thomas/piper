const Migrations = artifacts.require("Migrations");
const Piper = artifacts.require("Piper");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Piper);
};
