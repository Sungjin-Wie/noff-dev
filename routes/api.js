var express = require("express");
var router = express.Router();
var cors = require("cors");
var request = require("request");

router.get("/", cors(), function (req, response, next) {
  console.log(req.query);
  let url =
    "https://script.google.com/macros/s/AKfycbxHjuWNQAcqLbE7Xj22yKjXXgUJ8qSpzXSyXBUjF7vN6IGoZaY/exec";
  request.post(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      url: url,
      body: JSON.stringify(req.query),
      json: true,
    },
    function (error, res, body) {
      response.send(res);
      console.log("finished posting");
    }
  );
});

module.exports = router;
