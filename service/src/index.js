/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');
import { connect } from './db';

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
connect.then(() => {
    /**
     * Routes Definitions
     */
    app.get("/", (req, res) => {
        res.status(200).send("WHATABYTE: Food For Devs");
    });

    app.post("/user", (req, res) => {
        res.status(200).send(`${req.body.email}`);
    })

    /**
     * Server Activation
     */
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
    });
});
