const https = require("https");
const fs = require("fs");

const url = "https://www.boredapi.com/api/activity/";

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      fs.writeFile("prob3.json", data, (err) => {
        if (err) throw err;
        console.log("successful saved");
      });
    });
  })
  .on("error", (err) => {
    console.log("error");
  });
