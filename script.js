let playerX = document.querySelector(".options .playerx");
let playerO = document.querySelector(".options .playero");
let slider = document.querySelector(".play-board .slider");
let AllBoxes = document.querySelectorAll(".play-area span");
let wonTextElement = document.querySelector(".won-text");
let ReplayBtton = document.querySelector(".replay-btn");
let theSelectedPlayer = "x";

playerX.onclick = function () {
  theSelectedPlayer = "x";
  document.styleSheets[1].rules[4].style.setProperty("display", "none");
  document.styleSheets[1].rules[12].style.removeProperty("display");
};

playerO.onclick = function () {
  theSelectedPlayer = "o";
  document.styleSheets[1].rules[4].style.setProperty("display", "none");
  document.styleSheets[1].rules[12].style.removeProperty("display"); // select box
  document.styleSheets[1].rules[18].style.setProperty("left", "50%"); // slider
  document.styleSheets[1].rules[16].style.setProperty("color", "#f5c842"); // first player
  document.styleSheets[1].rules[17].style.setProperty("color", "#1b2370"); //second player
};

AllBoxes.forEach(function (currentbox) {
  currentbox.onclick = () => {
    if (theSelectedPlayer == "x" && currentbox.innerHTML == "") {
      currentbox.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      currentbox.setAttribute("id", "x");
      document.styleSheets[1].rules[18].style.setProperty("left", "50%"); // slider
      document.styleSheets[1].rules[16].style.setProperty("color", "#f5c842"); // first player
      document.styleSheets[1].rules[17].style.setProperty("color", "#1b2370"); //second player

      //   check the  winner

      selectTheWiner("x");

      // bot
      setTimeout(function () {
        botTurn(theSelectedPlayer);

        document.styleSheets[1].rules[18].style.setProperty("left", "0%"); // slider
        document.styleSheets[1].rules[16].style.setProperty("color", "#1b2370"); // first player
        document.styleSheets[1].rules[17].style.setProperty("color", "#f5c842"); //second player

        selectTheWiner("o");
      }, 700);

      // check the winer
    } else if (theSelectedPlayer == "o" && currentbox.innerHTML == "") {
      currentbox.innerHTML = `<i class="fa-solid fa-o"></i>`;
      currentbox.setAttribute("id", "o");

      document.styleSheets[1].rules[18].style.setProperty("left", "0%"); // slider
      document.styleSheets[1].rules[16].style.setProperty("color", "#1b2370"); // first player
      document.styleSheets[1].rules[17].style.setProperty("color", "#f5c842"); //second player

      //   check the  winner

      selectTheWiner("o");

      // bot
      setTimeout(function () {
        botTurn(theSelectedPlayer);
        document.styleSheets[1].rules[18].style.setProperty("left", "50%"); // slider
        document.styleSheets[1].rules[16].style.setProperty("color", "#f5c842"); // first player
        document.styleSheets[1].rules[17].style.setProperty("color", "#1b2370"); //second player

        selectTheWiner("x");
      }, 700);

      //   check the  winner
    }
  };
});

// bot

function botTurn(passedtheSelectedPlayer) {
  if (passedtheSelectedPlayer == "x") {
    let embtyBoxesArray1 = [];

    for (let i = 0; i < AllBoxes.length; i++) {
      if (AllBoxes[i].innerHTML == "") {
        embtyBoxesArray1.push(i);
      } else {
        /*nothing*/
      }
    }

    let chosenIndex = Math.floor(Math.random() * embtyBoxesArray1.length);
    AllBoxes[
      embtyBoxesArray1[chosenIndex]
    ].innerHTML = `<i class="fa-solid fa-o"></i>`;

    AllBoxes[embtyBoxesArray1[chosenIndex]].setAttribute("id", "o");
  } else {
    let embtyBoxesArray2 = [];

    for (let i = 0; i < AllBoxes.length; i++) {
      if (AllBoxes[i].innerHTML == "") {
        embtyBoxesArray2.push(i);
      } else {
        /*nothing*/
      }
    }

    let chosenIndex = Math.floor(Math.random() * embtyBoxesArray2.length);
    AllBoxes[
      embtyBoxesArray2[chosenIndex]
    ].innerHTML = `<i class="fa-solid fa-x"></i>`;

    AllBoxes[embtyBoxesArray2[chosenIndex]].setAttribute("id", "x");
  }
}

// select te winer or draw

function helperFunction(box1, box2, box3, thePlayer) {
  if (
    AllBoxes[box1].id == thePlayer &&
    AllBoxes[box2].id == thePlayer &&
    AllBoxes[box3].id == thePlayer
  ) {
    return true;
  } else {
    return false;
  }
}

function selectTheWiner(thePlayer) {
  if (
    helperFunction(0, 1, 2, thePlayer) ||
    helperFunction(3, 4, 5, thePlayer) ||
    helperFunction(6, 7, 8, thePlayer) ||
    helperFunction(0, 3, 6, thePlayer) ||
    helperFunction(1, 4, 7, thePlayer) ||
    helperFunction(2, 5, 8, thePlayer) ||
    helperFunction(2, 4, 6, thePlayer) ||
    helperFunction(0, 4, 8, thePlayer)
  ) {
    setTimeout(function () {
      document.styleSheets[1].rules[12].style.setProperty("display", "none"); // playboard
      wonTextElement.innerHTML = `player <span> ${thePlayer} </span> won the game!`;
      document.styleSheets[1].rules[22].style.removeProperty("display"); //result  box
    }, 600);
  } else if (
    AllBoxes[0].innerHTML != "" &&
    AllBoxes[1].innerHTML != "" &&
    AllBoxes[2].innerHTML != "" &&
    AllBoxes[3].innerHTML != "" &&
    AllBoxes[4].innerHTML != "" &&
    AllBoxes[5].innerHTML != "" &&
    AllBoxes[6].innerHTML != "" &&
    AllBoxes[7].innerHTML != "" &&
    AllBoxes[8].innerHTML != ""
  ) {
    setTimeout(function () {
      document.styleSheets[1].rules[12].style.setProperty("display", "none"); // playboard
      wonTextElement.innerHTML = `The Game is Drwa!!`;
      document.styleSheets[1].rules[22].style.removeProperty("display"); //result  box
    }, 600);
  }
}

ReplayBtton.onclick = function () {
  window.location.reload();
};
