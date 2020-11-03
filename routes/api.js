var express = require("express");
var router = express.Router();
var cors = require("cors");
const { default: axios } = require("axios");
var fetch = require("node-fetch");

let sheet =
  "https://sheet.best/api/sheets/84343413-ef9a-4f1f-9e95-e291b39df402";

router.get("/", cors(), function (req, response, next) {
  let data = [req.query];
  console.log(data);
  fetch(sheet, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((data) => {
      // The response comes here
      console.log(data);
    })
    .catch((error) => {
      // Errors are reported there
      console.log(error);
    });
});

module.exports = router;
