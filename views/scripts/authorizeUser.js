async function checkToken(token) {

}

async function isUserAuthorized() {
    // check if token is set


    // check if token is legit
}

function getAccessTokenFromCookies() {
    let cookieArr = document.cookie.split(';');
    return cookieArr.find(cookie => cookie.split('=')[0] == 'token');
}