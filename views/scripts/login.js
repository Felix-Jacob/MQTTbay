
window.onload = function() {
    buttonLogin = document.getElementById('buttonLogin');
    buttonRegister = document.getElementById('buttonRegister');
    
    buttonLogin.addEventListener('click', login);
    buttonRegister.addEventListener('click', register);

    // check if token is already set
    let cookieArr = document.cookie.split(';');
    let found = cookieArr.find(cookie => cookie.split('=')[0] == 'token');
    if(found) {
        console.log('token already set');

        // check if token is legit
        let response = await fetch('http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:4000/checkToken', {
            method: 'POST',
            headers: {
                'authorization': 'bearer ' + found
            }
        });
    
        console.log(await response.ok);
    }
};

async function login() {

    let data = getEnteredAccessDetails();

    let response = await fetch('http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let responseOk = await response.ok;

     if(responseOk) {
        let responseJson = await response.json();
        document.cookie = 'token=' + responseJson.accessToken;
        document.location.href = "http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000/";
    }

    console.log(`fetch response: ${responseOk}`);
}

async function register() {

    let data = getEnteredAccessDetails();

    let response = await fetch('http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:4000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let responseOk = await response.ok;
    
    if(responseOk) {
        let responseJson = await response.json();
        document.cookie = 'token=' + responseJson.accessToken;
        document.location.href = "http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000/";
    }

    console.log(`fetch response: ${responseOk}`);
}

function getEnteredAccessDetails() {

    let enteredUsername = document.getElementById('inputUsername').value;
    let enteredPassword = document.getElementById('inputPassword').value;

    return { username: enteredUsername, password: enteredPassword};
}
