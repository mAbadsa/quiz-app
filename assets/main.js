const $questionsCount = document.querySelector(".count span");
const $indicatorsContainer = document.querySelector(".bullets .spans");

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const questionsObj = JSON.parse(this.responseText);
      console.log(questionsObj);
      createIndicators(questionsObj.length);
    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

function createIndicators(num) {
  $questionsCount.innerHTML = num;

  for (let i = 0; i < num; i++) {
    // Create indecator
    let indicator = document.createElement("span");

    if (i === 0) {
      indicator.className = "on";
    }
    // Append indicators to main indicators container
    $indicatorsContainer.appendChild(indicator);
  }
}

getQuestions();
