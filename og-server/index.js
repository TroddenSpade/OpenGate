const express = require("express");
const NodeCache = require("node-cache");
var rp = require("request-promise");
const bodyParser = require("body-parser");

const List = new NodeCache({ stdTTL: 600 });

const PORT = process.env.PORT || 3000;
const API = "http://www.vpngate.net/api/iphone/";

const app = express();
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log("running on port " + PORT);
  return true;
});

app.get("/", (req, res) => res.send("yellow !"));

app.get("/list", async (req, res) => {
  let list = List.get("LIST");
  if (list == undefined) {
    let csvList = await getCVSList();
    let jsonList = CSVtoJson(csvList);
    let success = List.set("LIST", jsonList, 600);
    return res.send({ success: success, list: jsonList });
  }
  return res.send({ success: null, list: list });
});

async function getCVSList() {
  return rp(API).catch(function (err) {
    console.log(err);
  });
}

function CSVtoJson(csv) {
  var lines = csv.split("\r\n");
  var result = [];
  var headers = lines[1].split(",");
  for (var i = 2; i < lines.length - 2; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  return JSON.stringify(result);
}
