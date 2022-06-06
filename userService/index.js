const express = require('express'); 
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

const port = 4000;

const ydb=require('nodem').Ydb();
ydb.open();

app.listen(port, (err) => {
	console.log(`UserService was successfully started on port: ${port}`);
 });

app.post('/login', (req, res) => {
	if(!req.body.username) 
		return res.status(400).send('Please enter usename\n'); 

	if(!req.body.password) 
		return res.status(400).send('Please enter password\n'); 

	let enteredUsername = req.body.username;
	let enteredPassword = req.body.password;

	let queryResultUsername = ydb.data({global: 'Users', subscripts: [enteredUsername]});

	if(queryResultUsername.defined == 0) 
		return res.status(400).send('username doesnt exist\n'); 

	let queryResultPassword = ydb.get({global:'Users', subscripts: [enteredUsername, "password"]});
	let savedPassword = queryResultPassword.data;

	if(savedPassword != enteredPassword)
		return res.status(401).send('wrong password\n'); 

	return res.status(200).send('successful login\n'); 
});

//ydb.set({global:'Users', subscripts: ["emilia", "password"], data: 1234});
