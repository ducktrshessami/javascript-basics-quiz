// Define vars
var currentQuestion, score, secRemaining, timeout, interval;
var mainEl = document.querySelector("main");
var timeEl = document.querySelector("#time");
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
Display time remaining
*/
function renderTime() {
    timeEl.textContent = secRemaining;
}

/*
Begin counting down
*/
function startTimer() {
    secRemaining = 75; // Starting time
    interval = setInterval(decrementTimer, 1000);
    renderTime();
}

/*
Countdown and end the quiz at 0
*/
function decrementTimer() {
    secRemaining--;
    checkTime();
    renderTime();
}

/*
Check if time's up
*/
function checkTime() {
    if (secRemaining <= 0) { // Time's up
        secRemaining = 0;
        clearInterval(interval);
        endQuiz();
    }
}

/*
Stop counting down
*/
function stopTimer() {
    secRemaining = 0; // Ensure no negative time
    clearInterval(interval);
}

/*
Clear all content inside the main tag
*/
function clearContent() {
    mainEl.innerHTML = "";
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
    section.className = "col-md-6 m-auto p-5";

    // Question header
    questionEl = document.createElement("h1");
    questionEl.id = "question";
    questionEl.className = "font-weight-bold";

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
    let section, header, divider1, display, divider2, form, formText, initials, submit;

    clearContent();

    // Content section
    section = document.createElement("section");
    section.id = "score-page";
    section.className = "col-md-6 m-auto p-5";

    // End screen header
    header = document.createElement("h1");
    header.className = "font-weight-bold";
    header.textContent = "All done!";

    // Line break
    divider1 = document.createElement("br");

    // Score display
    display = document.createElement("p");
    display.textContent = "Your final score is " + score + ".";

    // Line break, but again
    divider2 = document.createElement("br");

    // Initials form for highscores
    form = document.createElement("form");

    // Text for the form
    formText = document.createElement("span");
    formText.className = "mr-1";
    formText.textContent = "Enter initials:";

    // Input for user initials
    initials = document.createElement("input");
    initials.id = "initials";
    initials.type = "text";
    initials.className = "mx-1";
    
    // Submit button
    submit = document.createElement("button");
    submit.className = "btn ml-1";
    submit.textContent = "Submit";
    submit.addEventListener("click", submitInitials);
    
    // Append to parents
    mainEl.appendChild(section);
    section.appendChild(header);
    section.appendChild(divider1);
    section.appendChild(display);
    section.appendChild(divider2);
    section.appendChild(form);
    form.appendChild(formText);
    form.appendChild(initials);
    form.appendChild(submit);
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
Display a message below the content
@params:
text - the text to be displayed
*/
function message(text) {
    let msgEl;

    // Update existing message element or create a new one
    if (!(msgEl = document.querySelector("#msg"))) {
        msgEl = document.createElement("p")
        msgEl.id = "msg";
        msgEl.className = "mt-4 py-3";
        document.querySelector("section").appendChild(msgEl);
    }
    msgEl.textContent = text; // Set text

    // Show message for 1 second
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        msgEl.remove();
    }, 1000);
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

    startTimer();
}

/*
User clicked a choice on a question: verify answer and display next question
@params:
event - click event
*/
function choiceSelect(event) {
    if (event.target.matches("button")) {
        let correct = validateAnswer(event.target.getAttribute("data-value"));

        if (++currentQuestion >= questions.length) {
            endQuiz();
        }
        else {
            displayQuestion(currentQuestion);
        }

        message(correct ? "Correct!" : "Wrong!");
    }
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

        // Time penalty
        secRemaining -= 15;
        checkTime();
        renderTime();

        return false;
    }
}

/*
Stop timer and display score screen
*/
function endQuiz() {
    stopTimer();
    scorePage();
}

/*
Handle player name for highscore
event - click event
*/
function submitInitials(event) {
    event.preventDefault();

    // Store score and initials

    // Redirect to highscores page
    location.href = "./highscores.html";
}

// Event listeners
document.querySelector("#start-btn").addEventListener("click", startQuiz);
