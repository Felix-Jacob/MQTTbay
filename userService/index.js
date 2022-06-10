const express = require('express'); 
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

const port = 4000;

const ydb=require('nodem').Ydb();
ydbStatus = ydb.open();
console.log(ydbStatus);

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

	let queryResultUsername = ydb.data('^Users',enteredUsername);

	if(queryResultUsername.defined == 0) 
		return res.status(400).send('username doesnt exist\n'); 

	let queryResultPassword = ydb.get('^Users', enteredUsername, "password");
	let savedPassword = queryResultPassword.data;

	if(savedPassword != enteredPassword)
		return res.status(401).send('wrong password\n'); 

	return res.status(200).send('successful login\n'); 
});

app.post('/register', (req, res) => {
	if(!req.body.username) 
		return res.status(400).send('Please enter usename\n'); 

	if(!req.body.password) 
		return res.status(400).send('Please enter password\n'); 

	let enteredUsername = req.body.username;
	let enteredPassword = req.body.password;

	let queryResultUsername = ydb.data('^Users', enteredUsername);

	console.log(JSON.stringify(queryResultUsername));

	if(queryResultUsername.defined != 0) 
		return res.status(400).send('username already exists\n'); 

	ydb.set('^Users', enteredUsername, 'password', enteredPassword, (err, result) => {
		if(err)
			return res.status(400).send('database error. couldnt create user');

		return res.status(200).send('registration was successful\n');
	}); 
});

//ydb.set({global:'Users', subscripts: ["emilia", "password"], data: 1234});
