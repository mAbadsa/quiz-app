function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const questionsObj = JSON.parse(this.responseText);
      console.log(questionsObj);
    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

getQuestions();
