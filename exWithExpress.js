const express = require("express");
const csvtojson = require("csvtojson");
const fs = require("fs");
const https = require("https");

const fisierCsv = "prob1.csv";
const url = "https://www.boredapi.com/api/activity/";

const app = express();
const port = 3005;

//prob1
const csvToJsonProb1 = () => {
  csvtojson()
    .fromFile(fisierCsv)
    .then((json) => {
      fs.writeFile("prob1.json", JSON.stringify(json), (err) => {
        if (err) console.log(err);
      });
    });
};

app.get("/1", (req, res) => {
  csvToJsonProb1();
  fs.readFile("./prob1.json", "UTF-8", (err, json) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    res.status(200).send(json);
  });
});

//prob2
app.get("/2", (req, res) => {
  fs.readFile("./prob2.html", "UTF-8", (err, html) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    res.status(200).send(html);
  });
});

//prob3
const jsonFromApi = () => {
  https
    .get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        fs.writeFile("prob3.json", data, (err) => {
          if (err) throw err;
        });
      });
    })
    .on("error", (err) => {
      console.log("error");
    });
};

app.get("/3", (req, res) => {
  jsonFromApi();
  fs.readFile("./prob3.json", "UTF-8", (err, json) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    res.status(200).send(json);
  });
});

//prob4
const prob4 = () => {
  const csvToJsonWithPromise = (rute) => {
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

  csvToJsonWithPromise(fisierCsv)
    .then((json) => {
      console.log(json);
    })
    .catch((err) => console.log(err));
};

app.get("/4", (req, res) => {
  prob4();
  fs.readFile("./prob4.txt", "UTF-8", (err, text) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    res.status(200).send(text);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
