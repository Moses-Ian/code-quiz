//variable declarations
var timer = document.querySelector("#timer p");
var time = 300;	//300 seconds = 5 minutes
var timerObject;

//attach listeners
var startButton = document.querySelector("#start-quiz");
startButton.addEventListener("click", startQuiz);





//startup code






//function declarations
function startQuiz() {
	displayTime();
	timerObject = window.setInterval(countDown, 1000);
	console.log(timerObject);
}

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
	console.log(result);
	return result;
}

function displayTime() {
	timer.textContent = `Time: ${timeString(time)}`;	//this is bad form but it's fun
}

function timeUp() {
	
}