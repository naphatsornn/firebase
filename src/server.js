// server.js
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static React files
app.use(express.static(path.join(__dirname, "build")));

// ดัก request แรกที่เปิด Mini App
app.get("/*", (req, res) => {
  const accessToken = req.headers["access_token"] || req.headers["authorization"] || "";

  const indexFile = path.join(__dirname, "build", "index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading app");
    }

    // ฝัง accessToken ลงใน HTML ก่อนเสิร์ฟ
    const modifiedHtml = data.replace(
      "<body>",
      `<body><script>window.accessToken = "${accessToken}";</script>`
    );

    res.send(modifiedHtml);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
