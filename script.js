// Quiz questions and answers data
const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Home Tool Markup Language",
        c: "Hyperlinks and Text Markup Language",
        d: "Hyper Tool Multi Language",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "None of the above",
        correct: "b",
    },
    {
        question: "Which language is used for styling web pages?",
        a: "HTML",
        b: "CSS",
        c: "JavaScript",
        d: "Python",
        correct: "b",
    }
];

// DOM elements
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const scoreEl = document.getElementById('score');
const answerEls = document.querySelectorAll('.answer');
const progressBar = document.getElementById('progress-bar');

// Track current question and score
let currentQuiz = 0;
let score = 0;

// Load initial question
loadQuiz();

/**
 * Loads current quiz question and answers into the UI,
 * and updates the progress bar accordingly.
 */
function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    // Update progress bar width as percentage of total questions completed
    const progressPercent = (currentQuiz / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

/**
 * Clears previously selected answers and removes
 * correct/wrong classes from labels.
 */
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
    document.querySelectorAll("label").forEach(label => {
        label.classList.remove("correct", "wrong");
    });
}

/**
 * Returns the id of the selected answer radio button.
 * If none selected, returns undefined.
 */
function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// Event listener for submit button click
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        const correctAnswer = quizData[currentQuiz].correct;

        // Highlight answers as correct or wrong
        if (answer === correctAnswer) {
            score++;
            document.querySelector(`label[for=${answer}]`).classList.add("correct");
        } else {
            document.querySelector(`label[for=${answer}]`).classList.add("wrong");
            document.querySelector(`label[for=${correctAnswer}]`).classList.add("correct");
        }

        // Wait 1.5 seconds before loading next question or results
        setTimeout(() => {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                // Quiz finished - show final score and play again button
                progressBar.style.width = `100%`;
                document.querySelector('.quiz-container').innerHTML = `
                    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                    <button onclick="location.reload()">Play Again</button>
                `;
            }
        }, 1500);
    }
});
