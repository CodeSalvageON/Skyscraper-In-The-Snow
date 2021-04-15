// Server
// Downloads and settings start here

const fs = require('fs');
const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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
});