async function checkAccessToken() {

    let cookieArr = document.cookie.split(';');
    let accessTokenCookie = cookieArr.find(cookie => cookie.split('=')[0] == 'token');

    if(!accessTokenCookie)
        document.location.href = "http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000/login"; 

    else {
        let accessToken = accessTokenCookie.split('=')[1];
        let accessTokenValidity = await fetch('http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:4000/checkToken', {
            method: 'POST',
            headers: {
                'authorization': 'bearer ' + accessToken
            }
        });
        
        if (await accessTokenValidity.ok)
            return true;

        else
            return false;
    }
}