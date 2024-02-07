import { pageUpdate } from "./quiz.js";

const htmlTopic = document.getElementById("html");
const cssTopic = document.getElementById("css");
const jsTopic = document.getElementById("javascript");
const accessTopic = document.getElementById("accessibility");
const modeSwitch = document.getElementById("mode-switch");
const topicBtns = document.querySelectorAll(".answer-btn");
const toggleBox = document.getElementById("toggle-box");
const answerSection = document.getElementById("answer-section");
const questionSection = document.getElementById("question-section");
const navbar = document.getElementById("navbar");

//Functions

async function quizData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  let topics = data.quizzes;
  //Getting all the elements of the array
  for (let topic of topics) {
    if (topic.title === "HTML") {
      htmlTopic.addEventListener("click", function () {
        pageUpdate(topic);
      });
    } else if (topic.title === "CSS") {
      cssTopic.addEventListener("click", function () {
        pageUpdate(topic);
      });
    } else if (topic.title === "JavaScript") {
      jsTopic.addEventListener("click", function () {
        pageUpdate(topic);
      });
    } else if (topic.title === "Accessibility") {
      accessTopic.addEventListener("click", function () {
        pageUpdate(topic);
      });
    }
  }
}
modeSwitch.addEventListener("click", function () {
  navbar.classList.toggle("dark-text");
  document.body.classList.toggle("dark-body");
  questionSection.classList.toggle("dark-text");
  answerSection.classList.toggle("dark-box-body");
  topicBtns.forEach((btn) => {
    btn.classList.toggle("dark-box");
  });
  toggleBox.classList.toggle("toggle");
  document.body.classList.toggle("dark-img");
});

quizData();
