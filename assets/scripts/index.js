// Define vars
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        answer: 2
    }
];

/*
Clear all content inside the main tag
*/
function clearContent() {
    document.querySelector("main").innerHTML = "";
}

/*
Change page structure for question screen
*/
function questionPage() {
    ;
}

/*
Display a question on the question screen
'questions' constant assumed to be defined
@params:
i - the index of the question in the 'questions' constant
*/
function displayQuestion(i) {
    ;
}

/*
Start timer and display question screen
*/
function startQuiz() {
    clearContent();
}

/*
User clicked a choice on a question: verify answer and display next question
@params:
event - click event
*/
function choiceSelect(event) {
    if (event.target.matches("button")) {
        ;
    }
}

// Event listeners
document.querySelector("#start-btn").addEventListener("click", startQuiz);
