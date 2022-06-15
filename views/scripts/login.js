
window.onload = function() {
    buttonLogin = document.getElementById('buttonLogin');
    buttonRegister = document.getElementById('buttonRegister');
    
    buttonLogin.addEventListener('click', login);
    buttonRegister.addEventListener('click', register);
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

    let responseText = await response.text();

    console.log(`fetch response: ${responseText}`);
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

    let responseText = await response.text();

    console.log(`fetch response: ${responseText}`);
}

function getEnteredAccessDetails() {

    let enteredUsername = document.getElementById('inputUsername').value;
    let enteredPassword = document.getElementById('inputPassword').value;

    return { username: enteredUsername, password: enteredPassword};
}