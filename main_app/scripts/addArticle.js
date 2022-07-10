window.onload = async function() {

    if(checkAccessToken()) {
        setupMQTTConnection();
        buttonAddArticle = document.getElementById('buttonBack');
        buttonAddArticle.addEventListener('click', () => {
            document.location.href = origin + "/main";
        });        
}
    else {
        document.location.href = origin + "/login";
    }
};
