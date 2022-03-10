// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// // Get method for login
// router.get("/login", function(req, res) {
//     let admin = readJSONFile()
//     res.json(admin);
// });

// // Post method for login
// router.post("/login", function(req, res) {
//     let adminList = readJSONFile()
//     let admin = adminList.users.find(
//         (i) => i.email == req.body.email && i.password == req.body.password
//     );
//     if (!admin) {
//         res.status(404).send({ message: "Invalid username or password." });
//     } else {
//         res.status(200).send(admin);
//     }
// });

// function readJSONFile() {
//     return JSON.parse(fs.readFileSync("admin.json"))["admin"];
// }

// module.exports = router;