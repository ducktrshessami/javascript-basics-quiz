// Define vars
var currentQuestion, score, timeout;
var mainEl = document.querySelector("main");
var questions = [ // A proper quiz wouldn't have the answers in plaintext >.>
    {
        question: "Commonly used data types DO NOT include:",
        choices: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        answer: 3
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        choices: [
            "quotes",
            "curly brackets",
            "parentheses",
            "square brackets"
        ],
        answer: 3
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        answer: 4
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: [
            "commas",
            "curly brackets",
            "quotes",
            "parentheses"
        ],
        answer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "JavaScript",
            "terminal / bash",
            "for loops",
            "console.log"
        ],
        answer: 4
    }
];

/*
Clear all content inside the main tag
*/
function clearContent() {
    mainEl.innerHTML = "";
}

function message(text) {
    // Create message
    let msgEl = document.createElement("p")
    msgEl.id = "msg";
    msgEl.className = "mt-4 py-3";
    msgEl.textContent = text;

    // Show message for 1 second
    document.querySelector("section").appendChild(msgEl);
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        msgEl.remove();
    }, 1000);
}

/*
Change page structure for question screen
*/
function questionPage() {
    let section, questionEl, divider, choiceList;
    
    clearContent();

    // Content section
    section = document.createElement("section");
    section.id = "question-page";
    section.className = "col-md-6 m-auto";

    // Question header
    questionEl = document.createElement("h1");
    questionEl.id = "question";

    // Line break
    divider = document.createElement("br");

    // Choice list buttons
    choiceList = document.createElement("ul");
    choiceList.id = "choice-list";
    choiceList.className = "list-unstyled";

    // Append to parents
    mainEl.appendChild(section);
    section.appendChild(questionEl);
    section.appendChild(divider);
    section.appendChild(choiceList);
}

/*
Change page structure and display score screen
*/
function scorePage() {
    let section, header, display, form;

    clearContent();
}

/*
Display a question
'questions' constant assumed to be defined
@params:
i - the index of the question in the 'questions' constant
*/
function displayQuestion(i) {
    let questionEl, choiceList;

    if (!document.querySelector("#question-page")) { // Page layout
        questionPage();
    }

    // Get elements
    questionEl = document.querySelector("#question");
    choiceList = document.querySelector("#choice-list");

    // Fill layout with content
    questionEl.textContent = questions[i].question;
    choiceList.innerHTML = ""; // Clear previous choices
    for (let j = 0; j < questions[i].choices.length; j++) {
        let choiceEl, choiceBtn;

        // Create choice elements
        choiceEl = document.createElement("li");
        choiceBtn = document.createElement("button");

        // List item
        choiceEl.className = "mb-1";

        // Choice button
        choiceBtn.className = "btn";
        choiceBtn.setAttribute("data-value", j + 1);
        choiceBtn.textContent = (j + 1) + ". " + questions[i].choices[j];

        // Append to parents
        choiceList.appendChild(choiceEl);
        choiceEl.appendChild(choiceBtn);
    }

    // Listen for choice
    choiceList.addEventListener("click", choiceSelect);
}

/*
Start timer and display question screen (except in the exact opposite order from that)
*/
function startQuiz() {
    // Set vars
    score = 0;
    currentQuestion = 0;
    
    // Display first question
    questionPage();
    displayQuestion(currentQuestion);

    //Start timer
}

/*
User clicked a choice on a question: verify answer and display next question
@params:
event - click event
*/
function choiceSelect(event) {
    let correct = validateAnswer(event.target.getAttribute("data-value"));

    if (event.target.matches("button")) {
        if (++currentQuestion >= questions.length) {
            endQuiz();
        }
        else {
            displayQuestion(currentQuestion);
        }
    }

    message(correct ? "Correct!" : "Wrong!");
}

/*
Evaluate answer and change score
@params:
choice - the selected choice data-value
*/
function validateAnswer(choice) {
    if (choice == questions[currentQuestion].answer) {
        score++;
        return true;
    }
    else {
        score--;
        return false;
    }
}

/*

*/
function endQuiz() {
    scorePage();
}

// Event listeners
document.querySelector("#start-btn").addEventListener("click", startQuiz);
