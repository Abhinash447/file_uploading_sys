const http = require("http");
const fs = require("fs");
const httpServer = http.createServer();

httpServer.on("listing", () => console.log("Listring..."));

httpServer.on("request", (req, res) => {
    if (req.url === "/") {
        res.end(fs.readFileSync("index.html"));
        return;
    }
});

httpServer.listen(3000);