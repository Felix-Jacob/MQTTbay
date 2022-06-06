const express = require('express'); 
const app = express(); 

const ydd = require('nodem').Ydb();
console.log(ydb.get({global: 'num'}));

const port = 4000;

app.listen(port, (err) => {
	console.log(`UserService was successfully started on port: ${port}`);
});
