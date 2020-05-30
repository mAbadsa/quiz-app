const $questionsCount = document.querySelector(".count span");
const $indicators = document.querySelector(".bullets");
const $indicatorsContainer = document.querySelector(".bullets .spans");
const $quizArea = document.querySelector(".quiz-area");
const $answerArea = document.querySelector(".answers-area");
const $submitButton = document.querySelector(".submit-button");
const $resultsContainer = document.querySelector(".results");
const $countDownContainer = document.querySelector(".countdown");

let currentIndex = 0;
let rightAnswersCount = 0;
let countDownInterval;

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

      $submitButton.addEventListener("click", (e) => {
        let rightAnswer = questionsObj[currentIndex].right_answer;

        // Go to Next question
        currentIndex++;

        checkAnswer(rightAnswer, questionsCount);

        $quizArea.innerHTML = "";
        $answerArea.innerHTML = "";

        addQuestions(questionsObj[currentIndex], questionsCount);

        // Handle Indicators Class
        handleIndicatorsClass();
        
        // Fire CountDown
        countDown(3, questionsCount);

        // Show Result
        showResult(questionsCount);
      });

      // Fire CountDown
      countDown(3, questionsCount);
    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

function createIndicators(num) {
  $questionsCount.innerHTML = num + 1;

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
function addQuestions(questions, numberOfQuestions) {
  if (currentIndex < numberOfQuestions) {
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

      i === 1 ? ($radioButton.checked = true) : false;

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
    }
  }
}

function checkAnswer(rightAnswer, questionsCount) {
  let answer = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answer.length; i++) {
    if (answer[i].checked) {
      theChoosenAnswer = answer[i].dataset.answer;
    }
  }
  if (rightAnswer === theChoosenAnswer) {
    rightAnswersCount++;
  }
}

function handleIndicatorsClass() {
  const $indicatorSpan = document.querySelectorAll(".bullets .spans span");
  const arrayOfSpan = Array.from($indicatorSpan);
  arrayOfSpan.forEach((span, index) => {
    if (currentIndex === index) span.className = "on";
  });
}

function showResult(questionCount) {
  let theResults;

  if (currentIndex === questionCount) {
    $quizArea.remove();
    $answerArea.remove();
    $submitButton.remove();
    $indicators.remove();

    if (
      rightAnswersCount > questionCount / 2 &&
      rightAnswersCount < questionCount
    ) {
      theResults = `<span class="good">Good</span> ${rightAnswersCount} From ${questionCount}.`;
    } else if (rightAnswersCount === questionCount) {
      theResults = `<span class="perfect">Perfect</span> All Answer Is Correct.`;
    } else {
      theResults = `<span class="bad">Bad</span> ${rightAnswersCount} From ${questionCount}.`;
    }
    // const textNode = document.createTextNode('')
    $resultsContainer.innerHTML = theResults;
    $resultsContainer.style.padding = "10px";
    $resultsContainer.style.backgroundColor = "white";
    $resultsContainer.style.marginTop = "10px";
  }
}

function countDown(duration, questionCount) {
  if (currentIndex < questionCount) {
    let minutes, seconds;

    countDownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      // duration--;

      let countDownSpan = `<span>${minutes < 10 ? 0 : ""}${minutes} : ${
        seconds < 10 ? 0 : ""
      }${seconds} </span>`;

      $countDownContainer.innerHTML = countDownSpan;

      if (--duration < 0) {
        clearInterval(countDownInterval);
        console.log("Finished");
        $submitButton.click();
      }
    }, 1000);
  }
}

getQuestions();
