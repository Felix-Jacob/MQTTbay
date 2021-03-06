const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const rand = '489ff0dd3d55fd69ed103b662106c4c29a57e8d3694b20a4c7afeef210bb899be9e42268b8a1fefe879ba331c3f07f6a6fcaff77ed8e2ac78e3a637e3552d8ec';
const express = require('express'); 
const cors = require('cors');
const app = express(); 
const corsOptions = {
	origin: 'http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000',
	optionsSuccessStatus: 200
}

app.options('/*', cors(corsOptions)); // enable pre-flight
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

const port = 4000;

const ydb=require('nodem').Ydb();

function printJson(JsonObject) {
	console.log(JSON.stringify(JsonObject, null, 2));
}

ydbStatus = ydb.open(
	{
		routinesPath: '/root/MQTTbay/userService/node_modules/nodem/src',
		callinTable: '/root/MQTTbay/userService/node_modules/nodem/resources/nodem.ci'
	}
);
console.log(ydbStatus);

app.listen(port, (err) => {
	console.log(`UserService was successfully started on port: ${port}`);
 });

app.post('/login', cors(corsOptions), (req, res) => {
	console.log('loginattempt');
	if(!req.body.username) 
		return res.status(400).send('Please enter username\n'); 

	if(!req.body.password) 
		return res.status(400).send('Please enter password\n'); 

	let enteredUsername = req.body.username;
	let enteredPassword = req.body.password;

	let queryResultUsername = ydb.data('^Users',enteredUsername);
	
	if(queryResultUsername == 0) 
		return res.status(400).send('username doesnt exist\n')

	let queryResultPassword = ydb.get('^Users', enteredUsername, "password");
	let savedPassword = queryResultPassword;

	if(savedPassword != enteredPassword)
		return res.status(401).send('wrong password\n'); 

	else {
		let accessToken = jwt.sign(enteredUsername, rand);
		return res.status(200).json({accessToken: accessToken});
	}
});

app.post('/register', cors(corsOptions), (req, res) => {
	if(!req.body.username) 
		return res.status(400).send('Please enter usename\n'); 

	if(!req.body.password) 
		return res.status(400).send('Please enter password\n'); 

	let enteredUsername = req.body.username;
	let enteredPassword = req.body.password;

	let queryResultUsername = ydb.data('^Users', enteredUsername);

	if(queryResultUsername != 0) 
		return res.status(400).send('username already exists\n'); 

	ydb.set('^Users', enteredUsername, 'password', enteredPassword, (err, result) => {
		if(err)
			return res.status(400).send('database error. couldnt create user');
		else {
			let accessToken = jwt.sign(enteredUsername, rand);
			return res.status(200).json({accessToken: accessToken});
		}
	}); 
});

app.post('/checkToken', cors(corsOptions), (req, res) => {
	var authHeader = req.headers['authorization'];
    
	if(!authHeader) 
		return res.status(400).send();

	let token = authHeader.split(' ')[1];

	jwt.verify(token, rand, (err, username) => {
        if(err)
            return res.status(400).send();
	    
		res.status(200).json({username: username});
    });
});

app.post('/addArticle', cors(corsOptions), (req, res) => {
    if(req.body.articleName
      && req.body.articlePrice
      && req.body.articleId
      && req.body.userName) {
      if(ydb.data('^Articles')) {
		let articles = JSON.parse(ydb.get('^Articles'));
		articles.push(article);
		ydb.set('^Articles', JSON.stringify(articles));
	}
	else {
		let articles = [article];
		ydb.set('^Articles', JSON.stringify(articles));
	}

	variableName ='^Article' + String(article.id);
	ydb.set(variableName, 'name', article.name);
	ydb.set(variableName, 'userName', article.userName);
	printJson(ydb.get('^Articles'));
    }
    else {
      return res.status(400).send('Missing Information\n'); 
    }
});

app.post('/removeArticle', cors(corsOptions), (req, res) => {
    if(req.body.articleName
      && req.body.articlePrice
      && req.body.articleId
      && req.body.userName) {

    }
    else {
      return res.status(400).send('Missing Information\n'); 
    }
});
// ydb.set({global:'Users', subscripts: ["emilia", "password"], data: 1234});
