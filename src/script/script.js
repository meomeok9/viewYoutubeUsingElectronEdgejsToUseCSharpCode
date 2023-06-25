// const Promise = require("bluebird");
const adb = require("adbkit");
const { ipcRenderer } = require("electron");

var client = adb.createClient();
console.log("helo from script!!!");
client.listDevices().then((devices) => {
  //   ipcRenderer.send("device:load", devices);
  devices.forEach((element) => {
    console.log(element);
  });
});
