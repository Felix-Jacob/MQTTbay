window.onload = async function() {
    // check if token is set
    let cookieArr = document.cookie.split(';');
    let found = cookieArr.find(cookie => cookie.split('=')[0] == 'token');

    if (!found)
        document.location.href = "http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000/login";

    else { // TODO: is 'else' here necessary? 
        // check if token is legit
        let response = await fetch('http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:4000/checkToken', {
            method: 'POST',
            headers: {
                'authorization': 'bearer ' + found.split('=')[1]
            }
        });
        
        if (await !response.ok)
            document.location.href = "http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000/login";
        else {
            buttonAddArticle = document.getElementById('buttonAddArticle');
            buttonAddArticle.addEventListener('click', () => {
                document.location.href = "http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000/addArticle";
            });        
        }
    }
};