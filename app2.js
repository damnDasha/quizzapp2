const STORE = {
  questions: [
    {
      question: "Who was the first female fashion designer?",
      answers: [
        "Jennifer anniston",
        "Coco Chanel",
        "Ruth Bader Ginsberg",
        "Hillary Clinton"
      ],
      correct: 1
    },
    {
      question: "Who is a famed shoe designer featured in Sex and the City?",
      answers: [
        "Christian Lacroix",
        "John Leguizamo",
        "Manolo Blahnik",
        "Brad Pitt"
      ],
      correct: 2
    },
    {
      question: "What does OTK stand for in OTK boots?",
      answers: [
        "Off the knife",
        "Over the kounter",
        "Oh that kangaroo",
        "Over the knee"
      ],
      correct: 3
    },
    {
      question: "What shoe designer created the red soled shoe?",
      answers: [
        "Christian Louboutin",
        "Jonathan Taylor Thomas",
        "Steven Tyler",
        "Gene Simmons"
      ],
      correct: 0
    },
    {
      question: "What is widely considered the fashion capital of the world?",
      answers: [
        "Juneau, Alaska",
        "Mexico City",
        "Paris, France",
        "North Siberia, Russia"
      ],
      correct: 2
    }
  ],
  quizStarted: false,
  currentQuestion: 0,
  score: 0
};

function generateStartScreenHtml() {
  return `
  <div class="start-screen">
    <p>This quiz will test your fashion knowledge.
      When it is over you will be a fashion... monger!
    </p>
    <button type="button" id="start">Start Quiz</button>
  </div>
  `;
}

function generateResultsScreen() {
  return `
  <body>
  <div class="results">
  <form id="reset-quiz">
  <fieldset>
  <h3>You Scored:${STORE.score}/${STORE.questions.length}</h3>
  </div>
  <p>
  <button type="button" id="reset">Reset Quiz</button></p>
  </fieldset>
  </form>
  </body>
  `;
}

function generateQuestionHtml() {
  // what question are we on
  // STORE.questionNumber
  // how do we grab that question?
  //let currentQuestion = STORE.questions[STORE.questionNumber];
  //$("main").text(STORE.questionTitle);
  return `
   
    <form id="question-form" class="question-form">
  <fieldset class="fieldset">
  <div class="question">
  <h2>${currentQuestion.question}</h2>
  </div>
  <form class="answers">
  <ul class="radio">
  <li class="radio">
  <input type="radio" id="a" name="option" value="${
    STORE.questions[STORE.questionNumber].answers[0]
  }">
  <label for="A">${
    STORE.questions[STORE.questionNumber].answers[0]
  }</label></li>
  <li class="radio">
 <input type="radio" id="b" name="option" value="${
   STORE.questions[STORE.questionNumber].answers[1]
 }">
 <label for="b">${STORE.questions[STORE.questionNumber].answers[1]}</label></li>
 <li class="radio">
 <input type="radio" id="c" name="option" value="${
   STORE.questions[STORE.questionNumber].answers[2]
 }">
 <label for="c">${STORE.questions[STORE.questionNumber].answers[2]}</label></li>
 <li class="radio">
 <input type="radio" id="d" name="option" value="${
   STORE.questions[STORE.questionNumber].answers[3]
 }">
 <label for="A">${STORE.questions[STORE.questionNumber].answers[3]}</label></li>
 
 </ul>
 </fieldset>
 </form>
  </div>
  <form id="question-submit"
  <p>
  <button class="submit-button" id="submit-button"
  tabindex="5">Submit</button>
  </p>
  </form>
  `;
}

function generateFeedbackCorrect() {
  return `
  <div id="feedback-correct">
    <ul class="tracker">
      <li>Question ${STORE.questionNumber + 1} of ${STORE.questions.length}</li>
      <li>Current Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>
    <h2>You got it babe!</h2>
    <form id="next-question">
      <button type="submit">Next</button>
    </form>
  </div>`;
}

function generateFeedbackWrong() {
  return `
  <div id="feedback-wrong">
    <ul class="tracker">
      <li>Question ${STORE.questionNumber + 1} of ${STORE.questions.length}</li>
      <li>Current Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>
    <h2>
    Are you serious right now?! It's actually ${
      STORE.questions[STORE.questionNumber].correctAnswer
    }.
    </h2>
    <form id="next-question">
      <button type="submit">Next</button>
    </form>
  </div>`;
}

function renderStartScreenHtml() {
  $(".quiz").html(generateStartScreenHtml());
}

function renderQuestionHtml() {
  $(".quiz").html(generateQuestionHtml());
}

function renderFeedbackCorrect() {
  $(".quiz").html(generateFeedbackCorrect());
}

function renderFeedbackWrong() {
  $(".quiz").html(generateFeedbackWrong());
}

function renderResultsScreen() {
  $(".quiz").html(generateResultsScreen());
}

//event handlers

function handleStartClick() {
  $(".quiz").on("click", "#start", function(event) {
    STORE.quizStarted = true;
    renderQuestionHtml();
  });
}
function handleNextQuestion() {
  $(".quiz").on("submit", "#next-question", event => {
    event.preventDefault();
    STORE.questionNumber++;
    if (STORE.questionNumber < STORE.questions.length) {
      renderQuestionHtml();
    } else {
      renderResultsScreen();
    }
  });
}

function handleAnswerSubmitted() {
  $(".quiz").on("submit", "#question-submit", event => {
    event.preventDefault();
    let selected = $('input[type="radio"]:checked').val();
    STORE.userAnswer = selected;
    if (
      selected === `${STORE.questions[STORE.questionNumber].correctAnswer}` &&
      selected !== undefined
    ) {
      STORE.score++;
      renderFeedbackCorrect();
    } else if (
      selected !== `${STORE.questions[STORE.questionNumber].correctAnswer}` &&
      selected !== undefined
    ) {
      renderFeedbackWrong();
    }
  });
}

function handleResetQuiz() {
  $(".quiz").on("submit", "#reset-quiz", event => {
    event.preventDefault();
    STORE.score = 0;
    STORE.questionNumber = 0;
    renderStartScreenHtml();
  });
}

function handleQuizApp() {
  renderStartScreenHtml();
  handleStartClick();
  handleNextQuestion();
  handleAnswerSubmitted();
  handleResetQuiz();
}
