// Server
// Downloads and settings start here

const fs = require('fs');
const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const io = require('socket.io')(http);

const sanitizer = require('sanitizer');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let chat_log = "<link href='/static/WEBPAGE/chat.css' rel='stylesheet'><script src='/static/WEBPAGE/update_chat.js'></script><div id='chatlog'></div>";
let internal_chatlog = "";

// Google Firestore

const {
	type,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	auth_uri,
	token_uri,
	auth_provider_x509_cert_url,
	client_x509_cert_url
} = process.env;

const serviceAccount = {
	type,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	auth_uri,
	token_uri,
	auth_provider_x509_cert_url,
	client_x509_cert_url
};

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Socket.io 

let players_online = 0;

io.on("connection", (socket) => {
  console.log("A player joined.");
  players_online = players_online + 1;
  socket.on("disconnect", () => {
    console.log("A player left.");
    players_online = players_online - 1;
  });
});

// Routes

app.get('', function (req, res) {
  const index = __dirname + '/public/static/WEBPAGE/index.html';

  res.sendFile(index);
});

app.get('/get-suites', async function (req, res) {
  const suiteRef = db.collection("suite").doc("chatlog");
  const suite = await suiteRef.get();

  const suiteArray = suite.data().log.split("/*)95f-+");

  let number_of_suites = 0;
  
  for (i = 0; i < suiteArray.length; i++) {
    number_of_suites = number_of_suites + 1;
  }

  res.send(String(number_of_suites));
});

app.get('/players-online', function (req, res) {
  res.send(String(players_online));
});

app.get('/chat', function (req, res) {
  const chat = __dirname + "/public/static/WEBPAGE/chat.html";

  res.sendFile(chat);
});

app.get('/msgs', function (req, res) {
  res.send(chat_log);
});

app.get('/lols', function (req, res) {
  res.send(internal_chatlog);
});

app.get('/create', function (req, res) {
  const create = __dirname + "/public/static/WEBPAGE/create.html";

  res.sendFile(create);
});

app.post('/msg', function (req, res) {
  const username = req.body.username;
  const message = req.body.message;

  const cleaned_username = sanitizer.escape(username);
  const cleaned_message = sanitizer.escape(message);

  if (cleaned_message === null || cleaned_message === undefined || cleaned_message === "" || username === null || username === undefined || username === "") {
    res.send("empty-message-error");
  }  

  else if (cleaned_message.length > 200 || cleaned_username.length > 200) {
    res.send("long-message-error");
  }

  else {
    internal_chatlog = internal_chatlog + "<h3 class='message'><tt><b>" + cleaned_username + ": </b>" + cleaned_message + "</tt></h3><span></span>";

    res.send("success");
  }
});

app.post('/post-to-net', async function (req, res) {
  const array = req.body.array;
  console.log(array + " was sent....");

  const suiteRef = db.collection("suite").doc("chatlog");
  const suite = await suiteRef.get();

  await suiteRef.set({
    log : suite.data().log + "/*)95f-+" + array
  });

  const suiteArray = suite.data().log.split("/*)95f-+");

  let number_of_suites = 0;
  
  for (i = 0; i < suiteArray.length; i++) {
    number_of_suites = number_of_suites + 1;
  }

  res.send(String(number_of_suites + 1));
});

app.post("/retrieve-suite", async function (req, res) {
  const suite_thing = req.body.suite;
  const parsed_suite = parseInt(suite_thing);

  console.log(suite_thing);
  console.log("suite thingy called");

  const suiteRef = db.collection("suite").doc("chatlog");
  const suite = await suiteRef.get();

  const suiteArray = suite.data().log.split("/*)95f-+");
  
  console.log(suiteArray[suite_thing]);
  res.send(suiteArray[parseInt(suite_thing - 1)]);
});

http.listen(port, function(){
  console.log('listening on *:' + port);

  const suiteRef = db.collection("suite").doc("chatlog");
  const fix_data = {
    log : ""
  }

  async function fixSuite () {
    const suite = await suiteRef.get();

    if (!suite.exists) {
      await suiteRef.set(fix_data);
      console.log("Fixed the suites!");
    }

    else {
      console.log("No fix needed.")
    }
  }

  fixSuite();
});