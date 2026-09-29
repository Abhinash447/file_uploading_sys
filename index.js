const http = require("http");
const fs = require("fs");
const httpServer = http.createServer();

httpServer.on("request", (req, res) => {
  // 1. ADDED: Stops the browser from blocking your fetch request
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/") {
    res.end(fs.readFileSync("index.html"));
    return;
  }

  if (req.url === "/upload") {
    const fileName = req.headers["file-name"];
    req.on("data", (chunk) => {
      fs.appendFileSync(fileName, chunk);
      console.log(`Recieved chunk! ${chunk.length}`);
    });

    // 2. FIXED: Moved inside "end" so it doesn't close the connection too early
    req.on("end", () => {
      res.end("Uploaded!");
    });
  }
});

httpServer.listen(3000, () => {
  console.log("Listning...");
});
