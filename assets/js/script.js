//variable declarations
var points = 0;

var timer = document.querySelector("#timer p");
var time = 10;	//300 seconds = 5 minutes
var timerObject;

var welcomeSection = document.querySelector("#welcome");
var questionSection = document.querySelector("#question");
var saveInfoSection = document.querySelector("#save-info");
var scoresSection = document.querySelector("#high-scores");

var questions = [
	{	//4.1.8
		title: "True or false: The DOM is built into the JavaScript language.",
		answers: [
			"True",
			"False",
			"",
			""
		],
		correct: "B"
	},
	{	//4.2.9
		title: "What does event.preventDefault() do?",
		answers: [
			"It stops the browser from reloading the page upon a form submission.",
			"It stops the browser from allowing the form submission event to occur.",
			"",
			""
		],
		correct: "A"
	},
	{	//4.2.9
		title: "The browser event submit allows us to do the following:",
		answers: [
			"Submit a form using a button.",
			"Submit a form using the Enter key.",
			"Submit a form using both a button and the Enter key.",
			""
		],
		correct: "C"
	},
	{	//4.2.9
		title: "How do we use JavaScript to get the information entered into a form’s input field?",
		answers: [
			"We can select the form’s input element and use the value property to read its data.",
			"We can select the form itself and use the value property to read all of its data.",
			"We can select the form’s input element and use the textContent or innerHTML properties to read its data.",
			""
		],
		correct: "A"
	},
	{	//4.3.11
		title: "In the DOM’s event object, what does its target property refer to?",
		answers: [
			"It refers to the HTML element that was interacted with to dispatch the event.",
			"It refers to the HTML element we want to affect as a result of our dispatched event.",
			"",
			""
		],
		correct: "A"
	},
	{	//4.4.9
		title: "If you save your array of objects to the browser’s local storage and it looks like [Object object] when you visit it in Chrome’s DevTools, what’s wrong?",
		answers: [
			"The array wasn’t stringified with JSON.stringify() before saving it in Local Storage.",
			"The array wasn’t parsed with JSON.parse() before saving it to Local Storage.",
			"",
			""
		],
		correct: "A"
	}
	// commented out so I can easily duplicate it
	// {
		// title: "",
		// answers: [
			// "",
			// "",
			// "",
			// ""
		// ],
		// correct: ""
	// }
];

var questionTitle = document.querySelector("#question h1");
var answers = [];
answers.push(document.querySelector("#A"));
answers.push(document.querySelector("#B"));
answers.push(document.querySelector("#C"));
answers.push(document.querySelector("#D"));
var correctAnswer;
var questionId;

var hr = document.querySelector("#question hr");
var resultElement = document.querySelector("#question h2");

var resultTitle = document.querySelector("#save-info h1");
var finalScore = document.querySelector("#save-info p");

var highScores = [];
var highScoreList = document.querySelector(".high-scores");

//attach listeners
var startButton = document.querySelector("#start-quiz");
startButton.addEventListener("click", startQuiz);
var answersDiv = document.querySelector(".answers");
answersDiv.addEventListener("click", selectAnswer);
var nameForm = document.querySelector("#enter-name");
nameForm.addEventListener("submit", saveName);
var viewScores = document.querySelector("#view-high-scores");
viewScores.addEventListener("click", displayHighScores);
var clearScoresButton = document.querySelector("#clear-scores");
clearScoresButton.addEventListener("click", clearScores);




//startup code






//function declarations
function startQuiz() {
	//start the timer
	displayTime();
	timerObject = window.setInterval(countDown, 1000);
	
	//start the questions
	welcomeSection.style.display = "none";
	questionSection.style.display = "block";
	questionId = 0;
	displayQuestion();
}

//timer related
function countDown() {
	time--;
	displayTime();
	if (time > 0) {return;}
	displayResultScreen();
}

function timeString(t) {
	if (t <= 0) {
		return "0:00";
	}
	let m = 0;
	while(t >= 60) {
		m++;
		t -= 60;
	}
	let result = "";
	result += m + ":";
	result += t >= 10 ? t : "0" + t;
	return result;
}

function displayTime() {
	timer.textContent = `Time: ${timeString(time)}`;	//this is bad form but it's fun
}

function timeUp() {
	
}

//question related
function displayQuestion() {
	questionTitle.textContent = questions[questionId].title;
	for (let i=0; i < answers.length; i++) {
		answers[i].textContent = questions[questionId].answers[i];
		if (answers[i].textContent === "") {
			answers[i].style.display = "none";
		} else {
			answers[i].style.display = "block";
		}
	}
	correctAnswer = questions[questionId].correct;
}

function selectAnswer(event) {
	//get the details
	let target = event.target;
	let correctness = target.id === correctAnswer;
	
	//tell the user he was right/wrong
	displayCorrectness(correctness)
	if (correctness) {
		points += 20;
	} else {
		time -= 20;
	}
	
	//show the next question
	questionId++;
	if (questionId >= questions.length) {
		displayResultScreen();
	} else {
		displayQuestion();
	}
}

function displayCorrectness(isCorrect) {
	resultElement.textContent = isCorrect ? "Correct!" : "Wrong...";
	
	hr.style.display = "block";
	resultElement.style.display = "block";
}

//save-info related
function displayResultScreen() {
	//stop the timer
	clearInterval(timerObject);
	timer.style.color = time <= 0 ? "red" : "rebeccapurple";
	
	//show the thing
	points += time;
	resultTitle.textContent = time <= 0 ? "Time's Up!" : "Quiz Complete!";
	finalScore.textContent = `Your final score is ${points}`;
	questionSection.style.display = "none";
	scoresSection.style.display = "none";
	saveInfoSection.style.display = "block";
}

function saveName() {
	event.preventDefault();
	
	//get the name
	let nameInput = document.querySelector("input[name='name']").value;
	if (!nameInput) {nameInput = "Guest";}
	console.log(nameInput);
	
	//load from local storage
	getScores();
	
	//save the name
	highScores.push({
		name: nameInput,
		score: points
	});
	console.log(highScores);
	
	//save to storage
	localStorage.setItem("highScores", JSON.stringify(highScores));
	
	//display high scores
	displayHighScores();
}

//high scores related
function displayHighScores() {
	//since this could have come from anywhere, set all the others to display: none
	welcomeSection.style.display = "none"; 
	questionSection.style.display = "none";
  saveInfoSection.style.display = "none";
	highScoreList.innerHTML = "";
	
	//load up the scores!
	getScores();
	
	//make the elements!
	for (let i=0; i<highScores.length; i++) {
		let item = document.createElement("li");
		item.textContent = `${i+1}. ${highScores[i].name} - ${highScores[i].score}`;
		highScoreList.appendChild(item);
	}
		
	//display it!
  scoresSection.style.display = "block";
}

function getScores() {
	savedScores = localStorage.getItem("highScores");
	if(savedScores) {
		highScores = JSON.parse(savedScores);
	}
	//if there are no saved scores, the highScores will still be the default -> []
}

function clearScores() {
	localStorage.removeItem("highScores");
	highScores = [];
	displayHighScores();
}























