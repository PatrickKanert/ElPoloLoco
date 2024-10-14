function htmlLose() {
  return (
    '<img class="lost-img" src="img/9_intro_outro_screens/game_over/oh no you lost!.png">' +
    '<div class="endscreen-lose-button">' +
    '<button id="restartButton" class="btn" onclick="restartGame()">Restart</button>' +
    '<button class="btn" onclick="goHome()">Home</button>' +
    "</div>"
  );
}

function htmlWin() {
  return (
    '<img class="win-img" src="img/9_intro_outro_screens/win/win_2.png">' +
    '<div class="endscreen-win-button">' +
    '<button id="restartButton" class="btn" onclick="restartGame()">Restart</button>' +
    '<button id="homeButton" class="btn" onclick="goHome()">Home</button>' +
    "</div>"
  );
}
