const quizTopic = document.getElementById("quiz-topic");
const questionSection = document.getElementById("question-section");
const answerSection = document.getElementById("answer-section");

//Functions
function pageUpdate(user) {
  quizTopic.innerHTML = `
  <img src=${user.icon} alt="${user.title}" />
  <h3>${user.title}</h3>`;

  const questions = user.questions;

  let currentIndex = 0;
  let score = 0;
  function startQuiz() {
    currentIndex = 0;
    score = 0;
    showQuestion();
  }
  function showQuestion() {
    answerSection.innerHTML = ``;
    let currentQuestion = questions[currentIndex];
    let questionNo = currentIndex + 1;
    questionSection.innerHTML = `
  <p>Question ${questionNo} of ${questions.length}</p>
  <h2 class='h2Quiz'>${currentQuestion.question}</h2>
  <div class='progress-bar' id='progress-bar'>
  <div class='progress' id='progress'></div>
  </div>
  `;
    const progressBar = document.getElementById("progress-bar");
    const progress = document.getElementById("progress");
    if (currentIndex) {
      let width = (currentIndex + 1) * 10 + "%";
      progress.style.width = width;
    }

    let currentAnswers = currentQuestion.options;
    let answerText = "";
    for (let i = 0; i < currentAnswers.length; i++) {
      answerText += `<button id='buttons' class='options' value="${
        currentAnswers[i]
      }"><span class='option-span' >${
        i === 0 ? "A" : i === 1 ? "B" : i === 2 ? "C" : "D"
      }</span>${currentAnswers[i].replace(/(<([^>]+)>)/gi, "")}</button>`;
      answerSection.innerHTML =
        answerText +
        "<button class=' submit-btn disabled' id='submit-btn'>Submit Answer</button>";
    }

    const submitBtn = document.getElementById("submit-btn");
    const optionsArray = document.querySelectorAll(".options");
    const optionsSpanArray = document.querySelectorAll(".option-span");

    for (let option of optionsArray) {
      let child = option.children[0];

      option.addEventListener("click", function () {});

      option.addEventListener("mouseenter", function () {
        child.classList.add("hover");
      });
      option.addEventListener("mouseleave", function () {
        child.classList.remove("hover");
      });
      option.addEventListener("focusin", () => {
        child.classList.add("focus");
        submitBtn.classList.remove("disabled");
      });
      option.addEventListener("focusout", () => {
        child.classList.remove("focus");
        submitBtn.classList.add("disabled");
      });

      let currentValue = "";
      let currentTarget = "";
      let currentText = "";
      let isCorrect = false;
      option.addEventListener("click", function (e) {
        currentValue = e.target.value;
        currentText = e.target.firstChild;
        currentTarget = e.target;

        submitBtn.addEventListener("click", function () {
          for (let i = 0; i < optionsArray.length; i++) {
            if (optionsArray[i].value === currentQuestion.answer) {
              optionsArray[i].innerHTML += `
              <img src="assets/images/icon-correct.svg" alt="correct" class='endImage'>
              `;
            }
          }
          if (currentValue === currentQuestion.answer) {
            currentTarget.classList.add("correct");
            currentText.classList.add("correctFocus");
            isCorrect = true;
          } else if (currentValue !== currentQuestion.answer) {
            currentTarget.classList.add("wrong");
            currentText.classList.add("wrongFocus");
            isCorrect = false;
            currentTarget.innerHTML += ` 
              <img src="assets/images/icon-incorrect.svg" alt="correct" class='endImage'>   
            `;
          }

          optionsArray.forEach((option) => {
            option.setAttribute("disabled", true);
            option.classList.add("disabled");
            option.classList.remove("hover");
          });

          submitBtn.innerText = "Next Question";
          if (submitBtn.innerText === "Next Question") {
            submitBtn.classList.remove("disabled");
            submitBtn.addEventListener("click", function () {
              if (isCorrect) {
                score++;
                // console.log(score);
              }
              // console.log(score);
              currentIndex = currentIndex + 1;

              if (currentIndex < 10) {
                showQuestion();
              }

              if (currentIndex === 10) {
                questionSection.innerHTML = `
                  <h1><span>Quiz Completed </br></span>You Scored</h1>
                `;
                answerSection.innerHTML = `
                <div class='score-card' id='score-card'>
                <div class='topic'>
                <img src=${user.icon} alt="${user.title}"/>
                <h3>${user.title}</h3>
                </div>
                <div class='bigBox'><span>${score}</span><p>out of 10</p> </div>
                <button class='submit-btn' id='play-again'>Play Again</button>
                </div>
                  
                `;
                const playAgain = document.getElementById("play-again");
                playAgain.addEventListener("click", function () {
                  window.location.reload();
                });
              }
            });
          }
        });
      });
    }
  }

  startQuiz();
}

export { pageUpdate };
