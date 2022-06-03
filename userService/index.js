const express = require('express'); 
const app = express(); 

const port = 4000;

app.listen(port, (err) => {
	console.log(`UserService was successfully started on port: ${port}`);
});
