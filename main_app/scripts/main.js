window.onload = async function() {

    if(checkAccessToken()) {
        buttonAddArticle = document.getElementById('buttonAddArticle');
        buttonAddArticle.addEventListener('click', () => {
            document.location.href = origin + "/addArticle";
        });        

      setupMQTTConnection();
    }
    else {
        document.location.href = origin + "/login";
    }
};
