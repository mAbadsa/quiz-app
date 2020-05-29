const $questionsCount = document.querySelector(".count span");
const $indicatorsContainer = document.querySelector(".bullets .spans");
const $quizArea = document.querySelector(".quiz-area");
const $answerArea = document.querySelector(".answers-area");

let currentIndex = 0;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const questionsObj = JSON.parse(this.responseText);
      let questionsCount = questionsObj.length;
      console.log(questionsObj);
      // Create Questions Indicators
      createIndicators(questionsObj.length);

      // Add Questions
      addQuestions(questionsObj[currentIndex], questionsCount);
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

// Add Question To Dom
function addQuestions(questions, numberOgQuestions) {
  let keys = Object.keys(questions);

  // Create Questions Head
  let $questionsTitle = document.createElement("h3");

  // Create Question Text
  let questionText = document.createTextNode(questions["title"]);

  // Append Question Title Text to Question Title
  $questionsTitle.appendChild(questionText);

  //Append Question title to Quiz Area Elemnet
  $quizArea.appendChild($questionsTitle);

  for (let i = 1; i <= 4; i++) {
    // Create Container Div for Answer
    let $answersContainer = document.createElement("div");

    // Add answer Class To answersContainer div
    $answersContainer.className = "answer";

    // Create Radio Button
    let $radioButton = document.createElement("input");

    // Add type, name and id to radio button
    $radioButton.name = "question";
    $radioButton.type = "radio";
    $radioButton.id = `answer_${i}`;
    $radioButton.dataset.answer = questions[`answer_${i}`];

    i === 1 ? $radioButton.checked = true : false;

    // Create Label
    let $theLabel = document.createElement("label");

    // Add For Attribute to The label
    $theLabel.htmlFor = `answer_${i}`;

    // Create Label Text
    let labelText = document.createTextNode(questions[`answer_${i}`]);

    $theLabel.appendChild(labelText);

    // Add Input + Label to Container Div
    $answersContainer.appendChild($radioButton);
    $answersContainer.appendChild($theLabel);

    // Add The Answer Container Div to Answer Area Div
    $answerArea.appendChild($answersContainer);

    currentIndex++;
  }
  //   $quizArea.appendChild;
}

getQuestions();
