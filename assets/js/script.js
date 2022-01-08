//variable declarations
var points = 0;

var timer = document.querySelector("#timer p");
const _START_TIME = 300;	//300 seconds = 5 minutes
var time = _START_TIME;
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
		title: "What does <code>event.preventDefault()</code> do?",
		answers: [
			"It stops the browser from reloading the page upon a form submission.",
			"It stops the browser from allowing the form submission event to occur.",
			"",
			""
		],
		correct: "A"
	},
	{	//4.2.9
		title: "The browser event <code>submit</code> allows us to do the following:",
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
			"We can select the form’s <code>input</code> element and use the <code>value</code> property to read its data.",
			"We can select the form itself and use the <code>value</code> property to read all of its data.",
			"We can select the form’s <code>input</code> element and use the <code>textContent</code> or <code>innerHTML</code> properties to read its data.",
			""
		],
		correct: "A"
	},
	{	//4.3.11
		title: "In the DOM’s <code>event</code> object, what does its <code>target</code> property refer to?",
		answers: [
			"It refers to the HTML element that was interacted with to dispatch the event.",
			"It refers to the HTML element we want to affect as a result of our dispatched event.",
			"",
			""
		],
		correct: "A"
	},
	{	//4.4.9
		title: "If you save your array of objects to the browser’s local storage and it looks like <code>[Object object]</code> when you visit it in Chrome’s DevTools, what’s wrong?",
		answers: [
			"The array wasn’t stringified with <code>JSON.stringify()</code> before saving it in Local Storage.",
			"The array wasn’t parsed with <code>JSON.parse()</code> before saving it to Local Storage.",
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
var questionId = -1;

var hr = document.querySelector("#question hr");
var resultElement = document.querySelector("#question h2");

var resultTitle = document.querySelector("#save-info h1");
var finalScore = document.querySelector("#save-info p");

var highScores = [];
var highScoreList = document.querySelector(".high-scores");

var myName;
var myScore;

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
var goBackButton = document.querySelector("#go-back");
goBackButton.addEventListener("click", goBack);



//startup code
//DEBUG: so I style the code tags easily
// questionId = 5;
// displayQuestion();
// displayHighScores();




//function declarations
function restart() {
	points = 0;
	time = _START_TIME;
	timer.style.color = "black";
	displayTime();
	questionId = -1;
	hr.style.display = "none";
	resultElement.style.display = "none";
}

//welcome related
function displayWelcome() {
	show(0);
}

function startQuiz() {
	//start the timer
	displayTime();
	timerObject = window.setInterval(countDown, 1000);
	
	//start the questions
	show(1);
	questionId = 0;
	displayQuestion();
}

//timer related
function countDown() {
	time--;
	displayTime();
	if (time > 0) {return;}
	questionId = questions.length;
	displayResultScreen();
}

function displayTime() {
	timer.textContent = `Time: ${timeString(time)}`;	//this is bad form but it's fun
	if (time <= 10) {
		timer.style.color = "red";
	}
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

//question related
function displayQuestion() {
	questionTitle.innerHTML = questions[questionId].title;
	for (let i=0; i < answers.length; i++) {
		if (questions[questionId].answers[i] === "") {
			answers[i].style.display = "none";
		} else {
			answers[i].innerHTML = questions[questionId].answers[i];
			answers[i].style.display = "block";
		}
	}
	correctAnswer = questions[questionId].correct;
	show(1);
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
	show(2);
}

function saveName() {
	event.preventDefault();
	
	//increment questionId so that the go back button works
	questionId++;
	
	//get the name
	myName = document.querySelector("input[name='name']").value;
	if (!myName) {myName = "Guest";}
	console.log(myName);
	
	//load from local storage
	getScores();
	
	//save the name
	myScore = points;
	highScores = insertInOrder({
		name: myName,
		score: myScore
	});
	console.log(highScores);
	
	//save to storage
	localStorage.setItem("highScores", JSON.stringify(highScores));
	
	//display high scores
	displayHighScores();
}

function insertInOrder(item) {
	let newScores = [];
	let i = 0;
	//push the scores >= item
	while(i < highScores.length && highScores[i].score >= item.score){
		newScores.push(highScores[i++]);
	}
	//push item
	newScores.push(item);
	//push the scores < item
	for(i; i<highScores.length; i++) {
		newScores.push(highScores[i]);
	}
	//return the updated listeners
	return newScores;
}

//high scores related
function displayHighScores() {
	highScoreList.innerHTML = "";
	
	//set the button text
	goBackButton.textContent = questionId == questions.length+1 ? "Retake" : "Go Back";
	
	
	//load up the scores!
	getScores();
	
	//make the elements!
	for (let i=0; i<highScores.length; i++) {
		let item = document.createElement("li");
		// item.textContent = `${i+1}. ${highScores[i].name} - ${highScores[i].score}`;
		div1 = document.createElement("div");
		div2 = document.createElement("div");
		div1.textContent = i+1 + ". " + highScores[i].name;
		div2.textContent = highScores[i].score;
		item.appendChild(div1);
		item.appendChild(div2);
		if (highScores[i].name === myName && highScores[i].score === myScore) {
			item.style.backgroundColor = "plum";
		}
		highScoreList.appendChild(item);
	}
		
	//display it!
  show(3);
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

function goBack() {
	//if you clicked from welcome
	if (questionId == -1) {
		displayWelcome();
		return;
	}
	
	//if you were on the results screen
	if (questionId == questions.length) {
		show(2);
		return;
	}
	
	//if you finished the quiz
	if (questionId == questions.length+1) {
		restart();
		displayWelcome();
		return;
	}
	
	//if you click from questionSection
	if (questionId >= 0 && questionId < questions.length) {
		displayQuestion();
		return;
	}
	
	//if questionId is somehow nothing, do nothing
}

function show(index) {
	welcomeSection.style.display = "none";
	questionSection.style.display = "none";
  saveInfoSection.style.display = "none";
  scoresSection.style.display = "none";
	
	switch (index) {
		case 0:
			welcomeSection.style.display = "flex";
			break;
		case 1:
			questionSection.style.display = "block";
			break;
		case 2:
			saveInfoSection.style.display = "block";
			break;
		case 3:
			scoresSection.style.display = "block";
			break;
		default:
			break;
	}
}

















