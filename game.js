const buttonColours = ["red", "blue", "green", "yellow"];
let game = {
	gamePattern: [],
	userChoice: [],
	toggle: false,
	level: 0,
	numOfGames: 0,
};

function playSound(id) {
	let audio = new Audio("sounds/" + id + ".mp3");
	audio.volume = 0.05;
	audio.play();
}
function animate(randomColour, classname) {
	setTimeout(() => {
		document.getElementById(randomColour).classList.add(classname);
		setTimeout(() => {
			document.getElementById(randomColour).classList.remove(classname);
		}, 200);
	}, 5);
}

function nextSequence() {
	game.userChoice.length = 0;
	game.level += 1;
	document.getElementById("level-title").textContent = "Level " + game.level;
	randomNum = Math.floor(Math.random() * 4);
	randomColour = buttonColours[randomNum];
	game.gamePattern.push(randomColour);
	playSound(randomColour);
	animate(randomColour, "pressed");
}
function checkAnswer(lastChoice) {
	if (game.userChoice[lastChoice] == game.gamePattern[lastChoice]) {
		console.log("success");
		if (game.userChoice.length === game.gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");
		document.getElementById(
			"level-title"
		).innerHTML = `Game Over, Press Any Key to Restart <br />
			(or Click Here)`;
		animate("body", "game-over");
		startOver();
	}
}
function startOver() {
	game.gamePattern = [];
	game.userChoice = [];
	game.toggle = false;
	game.level = 0;
	game.numOfGames += 1;
	document.addEventListener("keypress", startGame);
	document.getElementById("level-title").addEventListener("click", startGame);
}

document.addEventListener("keypress", startGame);
document.getElementById("level-title").addEventListener("click", startGame);
function startGame() {
	if (game.toggle === false) {
		document
			.getElementById("level-title")
			.removeEventListener("click", startGame);
		document.removeEventListener("keypress", startGame);
		game.toggle = true;
		nextSequence();
		if (game.numOfGames == 0) {
			document.querySelectorAll(".btn").forEach(function (el) {
				el.addEventListener("click", function (event) {
					game.userChoice.push(event.target.id);
					playSound(event.target.id);
					animate(event.target.id, "pressed");
					checkAnswer(game.userChoice.length - 1);
				});
			});
		}
	}
}
