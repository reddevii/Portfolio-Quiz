const questions = [
    {
        question: "Which university did I graduate from?",
        answers: [
            { text: "Kansas State University", correct: true },
            { text: "University of Kansas", correct: false },
            { text: "University of Michigan", correct: false },
            { text: "Ohio State University", correct: false }
        ]
    },
    {
        question: "Where do I currently live?",
        answers: [
            { text: "Kansas, USA", correct: false },
            { text: "Dublin, Ireland", correct: false },
            { text: "Tokyo, Japan", correct: false },
            { text: "Busan, South Korea", correct: true }
        ]
    },
    {
        question: "What do my feature projects have in common?",
        answers: [
            { text: "They are featured", correct: false },
            { text: "Nothing", correct: false },
            { text: "They all focus on AR/XR/multimedia/coding", correct: true },
            { text: "They are all blog stories", correct: false }
        ]
    },
    {
        question: "What color is my website?",
        answers: [
            { text: "Purple", correct: true },
            { text: "Blue", correct: false },
            { text: "Yellow", correct: false },
            { text: "Pink", correct: false }
        ]
    },
    {
        question: "How many certificates do I have?",
        answers: [
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "4", correct: false },
            { text: "1", correct: false }
        ]
    },
    {
        question: "Which social media platform is linked to my website?",
        answers: [
            { text: "Instagram", correct: false },
            { text: "Facebook", correct: false },
            { text: "TikTok", correct: false },
            { text: "LinkedIn", correct: true }
        ]
    },
    {
        question: "Are you excited to see the impact I can make?",
        answers: [
            { text: "Very excited", correct: true },
            { text: "Thrilled", correct: true },
            { text: "Extremely eager", correct: true },
            { text: "Totally", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
