window.onload = async function() {

    if(checkAccessToken()) {
        setupMQTTConnection();
        buttonAddArticle = document.getElementById('buttonAdd');
        buttonAddArticle.addEventListener('click', () => {
          addArticle();
        });       

        buttonBack = document.getElementById('buttonBack');
        buttonBack.addEventListener('click', () => {
          document.location.href = origin + "/main";
        });       
}
    else {
        document.location.href = origin + "/login";
    }
};

function getArticleDetails() {
    let generatedArticleId = uuidv4();
    let enteredArticleName = document.getElementById('inputArticleName').value;
    let enteredArticlePrice = document.getElementById('inputArticlePrice').value;
    let userName = 'dummy';

    return {articleId: generatedArticleId, articleName: enteredArticleName, articlePrice: enteredArticlePrice, userName: userName};
}

async function addArticle() {
  enteredArticleDetails = getArticleDetails();

  let response = await fetch('http://16996205-7370-4149-bed2-ae69b3073539.ul.bw-cloud-instance.org:4000/addArticle', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(enteredArticleDetails)
  });

  let responseOk = await response.ok;

  if(responseOk) {}

  console.log(`fetch response: ${response.status}`);
}
