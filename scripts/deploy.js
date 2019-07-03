const { onExit } = require("@rauschma/stringio");
const { spawn } = require("child_process");

const config = require("../config.json");
const contract = require("../build/contracts/Piper.json");

const args = process.argv.slice(2).join(" ");
console.log(`RUNNING build with args: ${args}`);

const truffle = () => {
  const network = config.network.name;
  const cmd = spawn("truffle", [
    "deploy",
    "--network",
    network,
    "--reset",
    "all"
  ]);

  cmd.stdout.on("data", data => console.log(data.toString()));
  cmd.stderr.on("data", data => console.log(data.toString()));
};

const initGraph = async () => {
  const cmd = spawn(
    "graph",
    [
      "init",
      "--from-contract",
      contract.networks[config.network.network_id].address,
      "--network",
      config.network.name,
      "--abi",
      "build/contracts/Piper.json",
      "robin-thomas/piper"
    ],
    {
      stdio: [process.stdin, process.stdout, process.stderr]
    }
  );

  await onExit(cmd);
};

switch (args) {
  case "truffle":
    truffle();
    break;

  case "graph":
    initGraph();
    break;
}
