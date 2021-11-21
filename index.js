const express = require("express");
const axios = require("axios");

//Routes
const users = require("./routes/users");
const verify = require("./routes/verify");

const app = express();
app.use(express.json());

app.use("/api/user", users);
app.use("/api/verify", verify);

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});

// const checks = {};
// const url = ["http://www.google.com", "https://www.gergu4begiu43bgfuiy.com"];

// app.get("/", (req, res) => {
//   const check = { id: Math.random(), times: [] };
//   checks[check.id] = check;

//   const h = setInterval(async () => {
//     const start = Date.now();
//     console.log(`Check NO is ${checks[check.id].id}`);
//     let response;
//     try {
//       //   response = await axios.get(url[Math.floor(Math.random() * 2)]);
//       response = await axios.get(url[1]);
//       // response = await axios.get(url[0]);
//     } catch (error) {
//       console.log("fail no 1");
//       for (let i = 1; i <= 2; i++) {
//         try {
//           response = await axios.get(url[1]);
//         } catch (error) {
//           console.log(`fail no ${i + 1}`);
//           continue;
//         }
//       }
//       return console.log("errr");
//     }

//     console.log(response.status);
//     const end = Date.now();
//     checks[check.id].times.push(end - start);
//   }, 5000);
//   res.send(check);
// });

// app.get("/r", (req, res) => {
//   res.send(checks);
// });
