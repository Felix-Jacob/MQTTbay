window.onload = async function() {
    
    if(checkAccessToken()) {
        buttonAddArticle = document.getElementById('buttonAddArticle');
        buttonAddArticle.addEventListener('click', () => {
            document.location.href = "http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000/addArticle";
        });        
    }
    else {
        document.location.href = "http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:3000/login";
    }
};