const { spawn } = require("child_process");

const config = require("./config.json");

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

const initGraph = () => {
  const network = config.network.name;
  const cmd = spawn("graph", [
    "init",
    "--network",
    network,
    "--abi",
    "build/contracts/Piper.json",
    "robin-thomas/piper"
  ]);

  cmd.stdout.on("data", data => console.log(data.toString()));
  cmd.stderr.on("data", data => console.log(data.toString()));
};

switch (args) {
  case "truffle":
    truffle();
    break;

  case "graph":
    initGraph();
    break;
}
