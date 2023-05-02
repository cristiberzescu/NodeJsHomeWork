const csvtojson = require("csvtojson");
const fs = require("fs");

const rute = "prob4.csv";

const csvToJson = (rute) => {
  return new Promise((resolve, reject) => {
    csvtojson()
      .fromFile(rute)
      .then((json) => {
        fs.writeFile("prob4.txt", JSON.stringify(json), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(json);
          }
        });
      })
      .catch((err) => reject(err));
  });
};

csvToJson(rute)
  .then((json) => {
    console.log(json);
  })
  .catch((err) => console.log(err));
