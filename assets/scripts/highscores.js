renderScores(); // Render scores at start

/*
Display stored highscores
*/
function renderScores() {
    let highscores = getScores();
    let scoreList = document.querySelector("#score-list");

    scoreList.innerHTML = ""; // Clear list

    // Render each score
    for (let i = 0; i < highscores.length; i++) {
        let item = document.createElement("li");
        item.textContent = (i + 1) + ". " + highscores[i].name + " - " + highscores[i].score;
        scoreList.appendChild(item);
    };

    // Fill blank space in the case of no scores
    if (!scoreList.childElementCount) {
        let item = document.createElement("li");
        let blank = document.createElement("br");

        item.appendChild(blank);
        scoreList.appendChild(item);
    }
}

/*
Handle possibility of no scores
*/
function getScores() {
    let highscores = localStorage.getItem("highscores"); // Retrieve stored scores

    // Handle no stored scores
    if (!highscores) {
        return [];
    }
    else {
        return JSON.parse(highscores);
    }
}

/*
Return home
*/
function restart() {
    location.href = "./index.html";
}

/*
Clear all stored highscores
*/
function clearScores() {
    localStorage.setItem("highscores", "[]");
    renderScores();
}

// Event listeners
document.querySelector("#restart-btn").addEventListener("click", restart);
document.querySelector("#clear-btn").addEventListener("click", clearScores);
