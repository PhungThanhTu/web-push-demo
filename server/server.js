const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const PushNotifications = require("node-pushnotifications");
const vapidDetails = require("./keys.json");
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));
console.log(__dirname)

app.use(bodyParser.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
  console.log(subscription);
  const settings = {
    web: {
      vapidDetails,
      gcmAPIKey: "gcmkey",
      TTL: 2419200,
      contentEncoding: "aes128gcm",
      headers: {},
    },
    isAlwaysUseFCM: false,
  };

  // Send 201 - resource created
  const push = new PushNotifications(settings);

  // Create payload
  const payload = { title: "Hey hey hey" };
  push.send(subscription, payload, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  res.sendStatus(200);
});


const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));