const express = require('express'); 
const cors = require('cors');
const app = express(); 
const corsOptions = {
	origin: 'http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000',
	optionsSuccessStatus: 200
}

app.options('/login', cors(corsOptions)); // enable pre-flight
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

const port = 4000;

const ydb=require('nodem').Ydb();

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
	if(!req.body.username) 
		return res.status(400).send('Please enter username\n'); 

	if(!req.body.password) 
		return res.status(400).send('Please enter password\n'); 

	let enteredUsername = req.body.username;
	let enteredPassword = req.body.password;

	let queryResultUsername = ydb.data('^Users',enteredUsername, (err, result) => {
		console.log('result: ', result);
		if(queryResultUsername.defined == 0) 
		return res.status(400).send('username doesnt exist\n'); 

		console.log(queryResultUsername);
	});



	let queryResultPassword = ydb.get('^Users', enteredUsername, "password");
	let savedPassword = queryResultPassword.data;

	if(savedPassword != enteredPassword)
		return res.status(401).send('wrong password\n'); 

	return res.status(200).send('successful login\n'); 
});

app.post('/register', cors(corsOptions), (req, res) => {
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
