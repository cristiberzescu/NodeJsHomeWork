const csvtojson = require("csvtojson");
const fs = require("fs");
const http = require("http");
const https = require("https");

const fisierCsv = "prob1.csv";
const url = "https://www.boredapi.com/api/activity/";

const host = "localhost";
const port = "3005";

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

//prob2
const server = http.createServer((req, res) => {
  if (req.url === "/1") {
    csvToJsonProb1();
    fs.readFile("./prob1.json", "UTF-8", (err, json) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(json);
    });
    return;
  }

  if (req.url === "/2") {
    fs.readFile("./prob2.html", "UTF-8", (err, html) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    });
    return;
  }

  if (req.url === "/3") {
    jsonFromApi();
    fs.readFile("./prob3.json", "UTF-8", (err, json) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(json);
      return;
    });
  }

  if (req.url === "/4") {
    prob4();
    fs.readFile("./prob4.txt", "UTF-8", (err, text) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(text);
    });
    return;
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

//prob3
const jsonFromApi = () => {
  https
    .get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        fs.writeFile("prob3.json", data, (err) => {
          if (err) throw err;
        });
      });
    })
    .on("error", (err) => {
      console.log("error");
    });
};

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
