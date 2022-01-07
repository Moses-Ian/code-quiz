//variable declarations
var timer = document.querySelector("#timer p");
var time = 300;	//300 seconds = 5 minutes
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
		correct: "b"
	},
	{	//4.2.9
		title: "What does event.preventDefault() do?",
		answers: [
			"It stops the browser from reloading the page upon a form submission.",
			"It stops the browser from allowing the form submission event to occur.",
			"",
			""
		],
		correct: "a"
	},
	{	//4.2.9
		title: "The browser event submit allows us to do the following:",
		answers: [
			"Submit a form using a button.",
			"Submit a form using the Enter key.",
			"Submit a form using both a button and the Enter key.",
			""
		],
		correct: "c"
	},
	{	//4.2.9
		title: "How do we use JavaScript to get the information entered into a form’s input field?",
		answers: [
			"We can select the form’s input element and use the value property to read its data.",
			"We can select the form itself and use the value property to read all of its data.",
			"We can select the form’s input element and use the textContent or innerHTML properties to read its data.",
			""
		],
		correct: "a"
	},
	{	//4.3.11
		title: "In the DOM’s event object, what does its target property refer to?",
		answers: [
			"It refers to the HTML element that was interacted with to dispatch the event.",
			"It refers to the HTML element we want to affect as a result of our dispatched event.",
			"",
			""
		],
		correct: "a"
	},
	{	//4.4.9
		title: "If you save your array of objects to the browser’s local storage and it looks like [Object object] when you visit it in Chrome’s DevTools, what’s wrong?",
		answers: [
			"The array wasn’t stringified with JSON.stringify() before saving it in Local Storage.",
			"The array wasn’t parsed with JSON.parse() before saving it to Local Storage.",
			"",
			""
		],
		correct: "a"
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

//attach listeners
var startButton = document.querySelector("#start-quiz");
startButton.addEventListener("click", startQuiz);






//startup code






//function declarations
function startQuiz() {
	//start the timer
	displayTime();
	timerObject = window.setInterval(countDown, 1000);
	
	//start the questions
	welcomeSection.style.display = "none";
	questionSection.style.display = "block";
	displayQuestion(0);
}

//timer related
function countDown() {
	time--;
	displayTime();
	if (time != 0) {return;}
	clearInterval(timerObject);
	timeUp();
}

function timeString(t) {
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
function displayQuestion(index) {
	questionTitle.textContent = questions[index].title;
	for (let i=0; i < answers.length; i++) {
		answers[i].textContent = questions[index].answers[i];
		if (answers[i].textContent === "") {
			answers[i].style.display = "none";
		} else {
			answers[i].style.display = "block";
		}
	}
}


































