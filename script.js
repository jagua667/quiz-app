// Array mit Fragen und Antworten für das Quiz
const questions = [
    {
        question: "Was ist die Hauptstadt von Frankreich?", // Die Frage
        answers: ["Berlin", "Madrid", "Paris", "Rom"], // Mögliche Antworten
        correctAnswers: [2] // Index der richtigen Antwort (Paris)
    },
    {
        question: "Welches ist das größte Land der Welt?",
        answers: ["Deutschland", "Indien", "Brasilien", "Russland"],
        correctAnswers: [3] // Russland ist korrekt
    },
    {
        question: "Welches Tier ist das Schnellste an Land?",
        answers: ["Gepard", "Leopard", "Schildkröte", "Tiger"],
        correctAnswers: [0] // Gepard ist korrekt
    },
    {
        question: "Welche Sehenswürdigkeiten sind in London beliebt?",
        answers: ["Tower of London", "Buckingham Palace", "London Eye", "Big Ben"],
        correctAnswers: [1, 3] // Buckingham Palace und Big Ben sind korrekt
    },
];

// Initialisierung von Variablen
let selected = false; // Um festzustellen, ob bereits eine Antwort gewählt wurde
let usedQuestions = []; // Array, um bereits gestellte Fragen zu speichern
let score = 0; // Punktestand des Spielers

// Funktion, um eine Frage und ihre Antworten zu laden
function loadQuestion() {
    selected = false; // Setzt die Auswahl zurück
    document.getElementById("next-btn").style.display = "none"; // Versteckt den "Nächste Frage"-Button

    // Zufällige Frage auswählen, die noch nicht gestellt wurde
    let questionIndex;
    do {
        questionIndex = Math.floor(Math.random() * questions.length); // Zufälliger Index
    } while (usedQuestions.includes(questionIndex) && usedQuestions.length < questions.length);

    usedQuestions.push(questionIndex); // Füge den Index der verwendeten Fragen hinzu
    const questionData = questions[questionIndex]; // Frage-Daten zum aktuellen Index

    document.getElementById("question").textContent = questionData.question; // Zeigt die Frage an

    const answerButtons = document.querySelectorAll(".answer"); // Sammelt alle Antwort-Buttons
    answerButtons.forEach((button, index) => {
        button.textContent = questionData.answers[index]; // Setzt den Text des jeweiligen Buttons
        button.className = "answer"; // Setzt die Klasse auf Standard, um Farben zurückzusetzen
    });
}

// Funktion, um die Antwortauswahl zu verarbeiten
function selectAnswer(selectedIndex) {
    if (selected) return; // Verhindert Mehrfachauswahl
    selected = true;

    const questionData = questions[usedQuestions[usedQuestions.length - 1]]; // Die aktuelle Frage
    const answerButtons = document.querySelectorAll(".answer"); // Alle Antwort-Buttons

    let isCorrect = false; // Variable, um die Korrektheit der Antwort zu verfolgen
    answerButtons.forEach((button, index) => {
        // Setzt Farben für richtige und falsche Antworten
        if (questionData.correctAnswers.includes(index)) { // Richtige Antwort(en)
            button.classList.add("correct"); // Markiert die richtige Antwort grün
            if (index === selectedIndex) {
                isCorrect = true; // Setzt isCorrect auf true, wenn die Auswahl richtig ist
            }
        } else if (index === selectedIndex) { // Falls die Antwort falsch ist
            button.classList.add("incorrect"); // Markiert die falsche Antwort rot
        }
    });

    if (isCorrect) {
        score += 1; // Erhöht den Punktestand, wenn die Antwort korrekt ist
    }

    document.getElementById("next-btn").style.display = "block"; // Zeigt den Button für die nächste Frage an
    updateScoreDisplay(); // Aktualisiert die Anzeige des Punktestands
}

// Funktion, um zur nächsten Frage zu gelangen
function nextQuestion() {
    if (usedQuestions.length < questions.length) { // Falls noch Fragen übrig sind
        loadQuestion(); // Nächste Frage laden
    } else {
        // Wenn das Quiz beendet ist, zeigt das Ergebnis an
        document.querySelector(".quiz-container").innerHTML = `
            <h2>Quiz beendet! Danke fürs Mitspielen!</h2>
            <p>Dein Punktestand: ${score} von ${questions.length}</p>
        `;
    }
}

// Funktion, um den Punktestand auf der Seite anzuzeigen
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById("score-display"); // Sucht die Punktestand-Anzeige
    if (!scoreDisplay) {
        // Erstellt die Punktestand-Anzeige, falls sie noch nicht existiert
        const scoreElement = document.createElement("p");
        scoreElement.id = "score-display"; // Setzt die ID für zukünftige Referenzen
        scoreElement.textContent = `Punktestand: ${score}`; // Setzt den Text mit aktuellem Punktestand
        document.querySelector(".quiz-container").appendChild(scoreElement); // Fügt die Anzeige zum Quiz-Container hinzu
    } else {
        // Aktualisiert den Punktestand-Text, falls die Anzeige bereits existiert
        scoreDisplay.textContent = `Punktestand: ${score}`;
    }
}

// Startet das Quiz, indem die erste Frage geladen wird
loadQuestion();
