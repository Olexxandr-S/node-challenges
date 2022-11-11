import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());

let messages = [];
let messagesCounter = 0;

server.get("/messages", (req, res) => {
  res.status(200).send(messages);
});

server.get("/messages/:id", (req, res) => {
  const message = messages.find((message) => message.id == req.params.id);
  res.status(200).send(message);
});

server.get("/messages/search/all", (req, res) => {
  const text = req.query.text;
  let filteredMessages = messages.filter((message) =>
    message.text.includes(text)
  );
  res.status(200).send(filteredMessages);
});

server.get("/messages/latest/ten", (req, res) => {
  const lastTenMessages = messages.slice(messages.length - 10, messages.length);
  res.status(200).send(lastTenMessages);
});

server.post("/messages", (req, res) => {
  const message = { ...req.body };
  if (message.from && message.text) {
    messagesCounter += 1;
    message.id = messagesCounter;
    messages.push(message);
    res.status(200).send(message);
  } else {
    res.status(400).send("Wrong sender or message");
  }
});

server.put("/messages/:id", (req, res) => {
  const message = messages.find((message) => message.id == req.params.id);
  if (req.body.from && req.body.text) {
    message.from = req.body.from;
    message.text = req.body.text;
    res.status(200).send(message);
  } else {
    res.status(400).send("Wrong sender or message");
  }
});

server.delete("/messages/:id", (req, res) => {
  const message = messages.find((message) => message.id == req.params.id);
  const messageId = messages.indexOf(message);
  messages.splice(messageId, 1);
});

server.listen(4000, () => {
  console.log("server started on port 4000");
});
