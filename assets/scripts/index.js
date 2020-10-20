// Define vars
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
    }
];

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
    let section, questionEl, divider, choiceList, message;
    
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

    // Answer validation message
    message = document.createElement("span");
    message.id = "msg";
    message.style.display = "none";

    // Append to parents
    mainEl.appendChild(section);
    section.appendChild(questionEl);
    section.appendChild(divider);
    section.appendChild(choiceList);
    section.appendChild(message);
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

        // Button properties
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
Start timer and display question screen
*/
function startQuiz() {
    questionPage();
    displayQuestion(0);
}

/*
User clicked a choice on a question: verify answer and display next question
@params:
event - click event
*/
function choiceSelect(event) {
    if (event.target.matches("button")) {
        console.log(event.target.getAttribute("data-value"));
    }
}

// Event listeners
document.querySelector("#start-btn").addEventListener("click", startQuiz);
