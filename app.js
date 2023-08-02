const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const server = http.Server(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connectionUri = process.env.MONGO_URI;

mongoose
  .connect(connectionUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection to database established');
  })
  .catch(err => {
    console.log(err);
    process.exit(-1);
  });

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: String,
  timeline: { type: Date, default: Date.now }
});

app.post('/channel/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;
  const { message } = req.body;
  // Retrieve model which contain info documents of user with id
  const MessageModel = mongoose.model(`Channel${id}_User${userId}`, MessageSchema);

  const log = new MessageModel({ message });
  await log.save();
  res.send(log);
})

app.get('/channel/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;
  // Retrieve model which contain info documents of user with id
  const MessageModel = mongoose.model(`Channel${id}_User${userId}`, MessageSchema);

  const logs = await MessageModel.find();
  res.send(logs);
})


server.listen('8080', () => console.log('Listening on 8080'));
