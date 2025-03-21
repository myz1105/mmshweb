const { createServer } = require("http");
const { parse } = require("url");
const fs = require("fs");

const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const logFilePath = "d:/server-info.txt";
const currentDateTime = new Date().toISOString();

try {
  fs.writeFileSync(
    logFilePath,
    `Port: ${port}\nEnvironment: ${process.env.NODE_ENV || "development"}\nDateTime: ${currentDateTime}\n`,
  );

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const logMessage = `Incoming request: ${req.method} ${req.url}\n`;
      fs.appendFileSync(logFilePath, logMessage);
      handle(req, res, parsedUrl);
    }).listen(port, () => {
      const startMessage = `Server is running on port ${port}\n`;
      fs.appendFileSync(logFilePath, startMessage);
    });
  }).catch((err) => {
    const errorMessage = `Error during app preparation: ${err.message}\n`;
    fs.appendFileSync(logFilePath, errorMessage);
  });
} catch (err) {
  const initErrorMessage = `Error initializing server: ${err.message}\n`;
  fs.appendFileSync(logFilePath, initErrorMessage);
}