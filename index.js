const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set Static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = "BFvDWCMnGFYcIEY-fGw2loM3LxmjRWHwuip6PP1DQPm5MUVMTkObCUZ_NlflBwaeb101X_aKycMxkoKc7JvTg3U";
const privateVapidKey = "pkNIDhkh2KFS_ZrbZnshY6IYiC8G5_b4zB0NJKJp9fE";

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe Route
app.post('/subscribe', (req, res) => {
    // get pushsubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({
        title: "Push test"
    });

    // Pass object into sendNotification
    webPush.sendNotification(subscription, payload).catch(err => console.log(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));