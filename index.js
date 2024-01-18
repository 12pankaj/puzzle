//body load after function call
function load() {
  $("#alert").modal("show");
}
window.onload = function () {
  load();
};
var images = [
  [7, 5, 2, 1, 8, 4, 6, 3, 9], //42 moves
  [1, 2, 9, 4, 7, 3, 5, 6, 8], //24 moves
  [1, 9, 8, 6, 3, 7, 2, 4, 5], //23 moves
  [8, 2, 5, 4, 3, 7, 1, 6, 9], //44 moves
  [5, 7, 3, 9, 2, 4, 8, 6, 1], //47 moves
  [2, 4, 9, 6, 7, 5, 1, 8, 3], //42 moves
  [8, 3, 7, 9, 6, 1, 5, 2, 4], //37 moves
  [8, 3, 7, 5, 6, 4, 1, 2, 9], //32 moves
  [2, 8, 9, 7, 1, 5, 6, 3, 4], //44 moves
  [6, 8, 7, 1, 4, 2, 9, 3, 5], //46 moves
];
//code for suffling array
var start = 1;
var posarray = [];
do {
  var r = Math.trunc(Math.random() * 10);
  var end = 0;
  while (end <= start) {
    if (posarray[end] == r) {
      r = Math.trunc(Math.random() * 10);
      end = -1;
    }
    end++;
  }
  posarray[start - 1] = r;
  start++;
} while (start <= 10);
let randimg = [];
for (let val of posarray) {
  randimg.push(images[val]);
}
images = randimg;
var rand = Math.trunc(Math.random() * 10); //random number generate
var move = 0;
var butbox = document.getElementById("randbutton");
var image = document.getElementById("image");
var moves = document.getElementById("moves");
var game = new Audio("asst/music/game.mp3");
moves.innerText = "Moves : " + move;
image.innerHTML = "<img src='im" + rand + "/main.jpg' id='myimage'/>"; //random image add on image box
//random images add on buttonbox
function imagesLoad(type) {
  for (var i = 0; i < images[rand].length; i++) {
    if (i == 3 || i == 6) butbox.append(document.createElement("br"));
    var but = document.createElement("button"); //create button for add images
    but.classList.add("col-4", "p-2", "bg-dark");
    but.setAttribute("onclick", "selectimg(" + i + ")"); //add onclick event
    if (images[rand][i] == 9) {
      but.innerHTML = '<img src=" ">';
      startTimer(90);
      game.play();
    } else {
      //when player choose easy mode than add number box
      if (type == "hint") {
        but.innerHTML = `<b>${images[rand][i]}</b><img src='im${rand}/${images[rand][i]}.jpg'/>`;
      } else {
        but.innerHTML = `<img src='im${rand}/${images[rand][i]}.jpg'/>`;
      }
    }
    butbox.append(but);
  }
}
var btn = document.getElementsByTagName("button");
var click = new Audio("asst/music/key.mp3"); //audio add
var win = new Audio("asst/music/win.mp3");
var losse = new Audio("asst/music/loose.mp3");

var gameover = false;
var chanceindex; //array for check around image is blank
//function call when user click on image
function selectimg(y) {
  // click.pause();
  if (gameover) return 0; // game over than function return

  //check user's moves comeplet
  if (move >= 50) {
    losse.play();
    confirmMessageHandler("move_complet");
    return;
  }
  var co = btn[y].innerHTML;
  //check image not equal blanck
  if (btn[y].innerHTML != '<img src=" ">') {
    let valid = false;
    chanceindex = [y + 1, y - 1, y + 3, y - 3];
    if (y == 2 || y == 5) {
      chanceindex.splice(0, 1);
    } else if (y == 3 || y == 6) {
      chanceindex.splice(1, 1);
    }
    //Loop will check if the slide next to the image is blank.
    for (var i of chanceindex) {
      if (i >= 0 && i <= 8 && btn[i].innerHTML == '<img src=" ">') {
        btn[i].innerHTML = co;
        btn[y].innerHTML = '<img src=" ">';
        valid = true;
        wincheck();
      }
    }
    if (valid) {
      //moves count and play click sound
      click.play();
      move++;
      moves.innerText = "Moves : " + move;
    }
  }
}
//function for check player complete the puzzle or not
function wincheck() {
  if (
    (btn[8].innerHTML == '<img src=" ">' &&
      btn[0].innerHTML == `<img src="im${rand}/1.jpg">` &&
      btn[2].innerHTML == `<img src="im${rand}/3.jpg">` &&
      btn[6].innerHTML == `<img src="im${rand}/7.jpg">` &&
      btn[3].innerHTML == `<img src="im${rand}/4.jpg">` &&
      btn[4].innerHTML == `<img src="im${rand}/5.jpg">`) || //check for hint images
    (btn[8].innerHTML == '<img src=" ">' &&
      btn[0].innerHTML == `<b>1</b><img src="im${rand}/1.jpg">` &&
      btn[2].innerHTML == `<b>3</b><img src="im${rand}/3.jpg">` &&
      btn[6].innerHTML == `<b>7</b><img src="im${rand}/7.jpg">` &&
      btn[3].innerHTML == `<b>4</b><img src="im${rand}/4.jpg">` &&
      btn[4].innerHTML == `<b>5</b><img src="im${rand}/5.jpg">`)
  ) {
    var i = 0;
    timerstop = true;
    win.play();
    while (i != 9) {
      btn[i].classList.add("p-0");
      btn[i].classList.remove("p-2");
      btn[i].innerHTML = `<img src="im${rand}/${i + 1}.jpg">`;
      i++;
    }
    if (btn[8].innerHTML == '<img src=" ">') {
      btn[8].innerHTML = `<img src="im${rand}/9.jpg">`;
    }
    if (btn[8].innerHTML == `<img src="im${rand}/9.jpg">`) {
      setTimeout(() => {
        confirmMessageHandler("complet");
      }, 3000);
    }
  }
}

var timerstop = false; //variable for stop timer
function startTimer(seconds) {
  const timer = document.getElementById("timer");
  const timerimage = document.getElementById("timerimage");
  timerimage.setAttribute("src", "asst/image/timerimage.gif"); //timer image change to gif
  let timerInterval = setInterval(() => {
    if (timerstop || gameover) {
      timerimage.setAttribute("src", "asst/image/timerimage.png"); //timer image change gif to png when game over
      clearInterval(timerInterval); //stop timer
    }
    timer.innerText = `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`; //tostring function will convert sec%60 into string and padStart function will check whether the length of the string is 2, if not then add 0
    seconds--;
    if (seconds <= -1) {
      losse.play();
      seconds = -1;
      timerstop = true;
      timerimage.setAttribute("src", "asst/image/timerimage.png");
      clearInterval(timerInterval);
      confirmMessageHandler("timing_complet");
    }
  }, 1000);
}
function confirmMessageHandler(mes) {
  let message;
  gameover = true;
  game.pause();
  switch (mes) {
    case "complet":
      message = `<h2>Congratulations you win!</h2><p>Puzzle Complete </p><p>Your Total Moves = ${move}</p><q>Do you want to play again?</q> `;
      break;
    case "move_complet":
      message = `<p>Game Over as all 50 moves are exhausted</p> <q>Do you want to play again?</q>`;
      break;
    case "timing_complet":
      message = `<h4>Time Over</h4><p>Better luck next time</p> <q>Do you want to play again?</q> `;
      break;
  }
  $("#confirm .modal-body").html(message);
  $("#confirm").modal("show");
}
function handleUserConfirmation(res) {
  if (res) {
    location.reload();
  } else {
    timerstop = true;
    //edit alert modal for showing thanks message
    $("#alert #modalheading").text("message");
    $("#alert .modal-body").text("Thanks for playing this game");
    $("#alert .modal-footer").html(
      "<button class='btn btn-outline-danger' data-bs-dismiss='modal' id='closemodel'> Close </button>"
    );
    $("#modal-size").removeClass("modal-lg");
    $("#modal-size").addClass("modal-sm");
    $("#alert").removeClass("bg-dark");
    $("#alert").modal("show");
  }
}
