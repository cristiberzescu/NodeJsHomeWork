const csvtojson = require("csvtojson");
const fs = require("fs");

const rute = "prob1.csv";

csvtojson()
  .fromFile(rute)
  .then((json) => {
    console.log(json);

    fs.writeFile("prob1.json", JSON.stringify(json), (err) => {
      if (err) console.log(err);
    });
  });
