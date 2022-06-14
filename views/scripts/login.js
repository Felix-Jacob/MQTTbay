
window.onload = function() {
    buttonLogin = document.getElementById('buttonLogin');
    buttonRegister = document.getElementById('buttonRegister');
    
    buttonLogin.addEventListener('click', login);
};

async function login() {
    console.log('login pressed');
    let enteredUsername = document.getElementById('inputUsername').value;
    let enteredPassword = document.getElementById('inputPassword').value;

    fetch('16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:4000/login', {
        method: 'POST'
    });
}

async function register() {

}