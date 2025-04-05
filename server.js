const { createServer } = require("http");
const { parse } = require("url");
const fs = require("fs");

const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();



try {


  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const logMessage = `Incoming request: ${req.method} ${req.url}\n`;
      handle(req, res, parsedUrl);
    }).listen(port, () => {
      const startMessage = `Server is running on port ${port}\n`;
    });
  }).catch((err) => {
    const errorMessage = `Error during app preparation: ${err.message}\n`;
  });
} catch (err) {
  const initErrorMessage = `Error initializing server: ${err.message}\n`;
}