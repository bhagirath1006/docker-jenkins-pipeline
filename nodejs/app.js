const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Node.js Container Running Successfully!");
});
server.listen(3000, () => console.log("Node.js running on port 3000"));
