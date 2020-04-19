#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const axios = require("axios");
const Table = require("cli-table");
const ora = require("ora");
const readline = require("readline");
const inquirer = require("inquirer");
const fs = require("fs");
const { spawn, exec } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fonts = ["Slant", "Ghost", "Cricket", "standard"];
const API = "https://opengate-20.herokuapp.com/list";
let LIST = null;

const logo = chalk.magenta(
  figlet.textSync("Open Gate", {
    font: fonts[Math.floor(Math.random() * 4)],
    horizontalLayout: "default",
    verticalLayout: "default",
  })
);

const desc = chalk.white(
  "In United States, Japan and most Europian countries, people do not let their governments placing such firewall, as their Constitutions state. However, it is said that some other countries have such firewall for the sake of censorship."
);

function selectVpn() {
  exec(`rm -f ${__dirname}/../*.ovpn`, function (error, stdout, stderr) {
    if (error) {
      console.log(error);
    }
  });

  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter VPN No. :",
        validate: function (value) {
          var no = parseInt(value.match(/^[0-9]*$/));
          if (no && no <= LIST.length && no > 0) {
            return true;
          }

          return "Please enter a valid No.";
        },
      },
    ])
    .then((answer) => {
      let no = answer.id;

      fs.writeFile(
        `${__dirname}/../${LIST[no - 1]["#HostName"]}.ovpn`,
        Buffer.from(
          LIST[no - 1]["OpenVPN_ConfigData_Base64"],
          "base64"
        ).toString("ascii"),
        function (err) {
          if (err) {
            return console.log(err);
          }

          ls = spawn("sudo", [
            "openvpn",
            `${__dirname}/../${LIST[no - 1]["#HostName"]}.ovpn`,
          ]);

          ls.stdout.on("data", function (data) {
            console.log(data.toString());
          });

          ls.stderr.on("data", function (data) {
            console.log("stderr: " + data.toString());
          });
        }
      );
    });
}

async function printPage(page) {
  const table = new Table({
    head: ["No.", "IP", "Score", "Ping", "Speed", "Ctry."],
    colWidths: [5, 20, 15, 7, 15, 7],
  });

  if (page < 0) page = 0;
  clear();
  console.log(logo + "\n");
  console.log(desc + "\n");

  const spinner = ora({ text: "Loading Servers", discardStdin: false }).start();

  setTimeout(() => {
    spinner.color = "red";
    spinner.text = "Loading Servers";
  }, 1000);

  if (LIST) {
    spinner.succeed(chalk.bgRed.bold("VPN Servers :"));
  } else {
    LIST = await axios
      .get(API)
      .then((res) => {
        spinner.succeed(chalk.bgRed.bold("VPN Servers :"));
        return JSON.parse(res.data.list);
      })
      .catch((e) => console.log(e));
  }

  for (let i = page * 10; i < page * 10 + 10; i++) {
    if (i >= LIST.length) break;
    table.push([
      chalk.red(i + 1),
      LIST[i]["IP"],
      LIST[i]["Score"],
      LIST[i]["Ping"],
      LIST[i]["Speed"],
      LIST[i]["CountryShort"],
    ]);
  }

  console.log(table.toString());

  inquirer
    .prompt([
      {
        type: "list",
        name: "theme",
        message: "Options :",
        choices: ["Next", "Prev", new inquirer.Separator(), "Select a VPN"],
      },
    ])
    .then((answer) => {
      switch (answer.theme) {
        case "Next":
          printPage(page + 1);
          break;
        case "Prev":
          printPage(page - 1);
          break;
        default:
          selectVpn();
      }
    });
}

async function main() {
  printPage(0);
}

main();
