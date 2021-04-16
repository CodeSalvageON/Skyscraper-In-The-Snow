// Declare canvas variables here

const game_window = document.getElementById("game-window");
const skyscraper = game_window.getContext("2d");

const elevator_window = document.getElementById("elevator-window");
const elevator = elevator_window.getContext("2d");

const text_overlay = document.getElementById("text-overlay");
const text_overlay_1 = document.getElementById("text-overlay-1");

let is_not_playing = true;
let is_on_title = true;

skyscraper.font = "30px Courier New";

const default_page = "https://Skyscraper-In-The-Snow.codesalvageon.repl.co"; // Change this to whatever URL you are on

// Declare physics variables

let angle_degrees = 0;
let general_y_adder = 0;
let general_x_adder = 0;
let general_z_adder = 0;

let floor = 1;

let pace_count_adder = false;
let jump_count_adder = false;

let general_y_adder_limit = [100, -100];
const room_look_border = [Math.floor(game_window.width) + 100, Math.floor(-game_window.width) - 100];

// From here, start the styling of the page

$("#elevator-window").hide();

document.body.style.overflow = "hidden";

game_window.style.backgroundSize = "cover";
game_window.style.backgroundImage = "url('" + default_page + "/static/WEBPAGE/title1.png')";

elevator_window.style.backgroundSize = "cover";
elevator_window.style.backgroundImage = "url('" + default_page + "/static/WEBPAGE/elevatorinterior.jpg')";

text_overlay.style.zIndex = "100";

// Begin canvas game functions- probably not very optimized, but who the fuck cares

function refreshCanvas () {
  game_window.style.width = document.body.clientWidth + "px";
  game_window.style.height = document.body.clientHeight + "px";

  elevator_window.style.width = document.body.clientWidth + "px";
  elevator_window.style.height = document.body.clientHeight + "px";

  text_overlay.style.width = document.body.clientWidth + "px";
  text_overlay.style.height = document.body.clientHeight + "px";

  // Render text overlay 

  text_overlay_1.style.left = "10vw";
  text_overlay_1.style.bottom = "10vh";
}

function refreshFloor () {
  text_overlay_1.innerText = "Floor: " + String(floor);
}

function clearScreen () {
  skyscraper.clearRect(0, 0, game_window.width, game_window.height);
}

function fadeOutScreen () {
  $("#game-window").fadeOut(2000);
}

function fadeInScreen () {
  $("#game-window").fadeIn(2000);
}

function pressAnyKey () {
  const press_any_key = new Image();

  press_any_key.onload = function () {
    skyscraper.drawImage(press_any_key, 90, 50, Math.floor(press_any_key.width / 10), Math.floor(press_any_key.height / 10));
  }

  press_any_key.src = "/static/WEBPAGE/pressanykey.png";

  setTimeout(function () {
    clearScreen();
  }, 600)
}

// Below function renders a bunch of sprites. Probably not a good idea considering how fucking laggy the canvas is. Next time, use more than one canvas.

function renderBackgroundUndFloor () {
  const floor_sprite_1 = new Image();

  floor_sprite_1.onload = function () {
    skyscraper.drawImage(floor_sprite_1, -20, Math.floor(100 + general_y_adder));
  }
  floor_sprite_1.src = "/static/WEBPAGE/floor.png";

  const elevator = new Image();

  elevator.onload = function () {
    skyscraper.drawImage(elevator, Math.floor(30 + general_x_adder), Math.floor(0 + general_y_adder), Math.floor(elevator.width / 3 + general_z_adder), Math.floor(elevator.height / 3 + general_z_adder));
  }
  elevator.src = "/static/WEBPAGE/elevator.png";

  const cctv = new Image(); 

  cctv.onload = function () {
    skyscraper.drawImage(cctv, Math.floor(0 + general_x_adder), Math.floor(-30 + general_y_adder), Math.floor(cctv.width / 10 + general_z_adder), Math.floor(cctv.height / 10 + general_z_adder));
  }
  cctv.src = "/static/WEBPAGE/cctv.png";

  const potted_plant = new Image();

  potted_plant.onload = function () {
    skyscraper.drawImage(potted_plant, Math.floor(120 + general_x_adder), Math.floor(30 + general_y_adder), Math.floor(potted_plant.width / 5 + general_z_adder), Math.floor(potted_plant.height / 5 + general_z_adder));
  }
  potted_plant.src = "/static/WEBPAGE/pottedplant.png";

  const fal = new Image();

  fal.onload = function () {
    skyscraper.drawImage(fal, Math.floor(30 + general_x_adder), Math.floor(100 + general_y_adder), Math.floor(fal.width + general_z_adder), Math.floor(fal.height + general_z_adder));
  }
  fal.src = "/static/WEBPAGE/fal.png";
}

function interactWithSprite () {
  if (general_z_adder > 50) {
    $("#game-window").fadeOut(2000);
    is_not_playing = true;

    setTimeout(function () {
      $("#elevator-window").fadeIn(2000);

      $("#elevator-controls").fadeIn(2000);
      optimizeFetch(interval_set[0]);
    }, 2000);
  }
}

// The below function is absolute retarded shit. Only use when the canvas is optimized in a future build.

function spriteJump () { 
  if (jump_count_adder === true) {
    return false;
  }

  jump_count_adder = true;
  
  for (i = 0; i < 5; i++) {
    general_y_adder = general_y_adder + 2;
    setTimeout(function () {
      clearScreen();
      renderBackgroundUndFloor();
    }, 10);
  }

  setTimeout(function () {
    for (i = 0; i < 5; i++) {
      general_y_adder = general_y_adder - 2;
      setTimeout(function () {
        clearScreen();
        renderBackgroundUndFloor();
      }, 10);
    }
  }, 50);

  jump_count_adder = false;
}

function countPace () { 
  if (pace_count_adder === true) {
    general_y_adder = general_y_adder + 2;
    pace_count_adder = false;
  }

  else if (pace_count_adder === false) {
    general_y_adder = general_y_adder - 2;
    pace_count_adder = true;
  }
}

function lookUp () {
  if (general_y_adder > 100) {
    return false;
  }

  else {
    general_y_adder = general_y_adder + 2;
    clearScreen();
    renderBackgroundUndFloor();
  }
}

function lookDown () {
  if (general_y_adder < -100) {
    return false;
  }

  else {
    general_y_adder = general_y_adder - 2;
    clearScreen();
    renderBackgroundUndFloor();
  }
}

function tiltLeft () {
  if (angle_degrees < -2) {
    return false;
  }

  else {
    angle_degrees = angle_degrees - 0.5;

    skyscraper.rotate(angle_degrees * Math.PI / 180);
    clearScreen();
    renderBackgroundUndFloor();
  }
}

function tiltRight () {
  if (angle_degrees > 2) {
    return false;
  }

  else {
    angle_degrees = angle_degrees + 0.5;

    skyscraper.rotate(angle_degrees * Math.PI / 180);
    clearScreen();
    renderBackgroundUndFloor();
  }
}

function moveForward () {
  if (general_z_adder > 50) {
    return false;
  }

  else {
    general_z_adder = general_z_adder + 2;
    countPace();
    clearScreen();
    renderBackgroundUndFloor();
  }
}

function moveBackward () {
  if (general_z_adder < -30) {
    return false;
  }

  else {
    general_z_adder = general_z_adder - 2;
    countPace();
    clearScreen();
    renderBackgroundUndFloor();
  }
}

function moveLeft () {
  if (general_x_adder > 120) {
    return false;
  }

  general_x_adder = general_x_adder + 2;
  clearScreen(); 
  renderBackgroundUndFloor();
}

function moveRight () {
  if (general_x_adder < -120) {
    return false;
  }

  general_x_adder = general_x_adder - 2;
  clearScreen();
  renderBackgroundUndFloor();
}

// Detect keys

$(document).keydown(function (event) {
  if (is_not_playing === false) {
    if (event.which === 38) {
      lookUp();
    }

    else if (event.which === 40) {
      lookDown();
    }

    else if (event.which === 87) {
      moveForward();
    }

    else if (event.which === 83) {
      moveBackward();
    }

    else if (event.which === 65) {
      moveLeft();
    }

    else if (event.which === 68) {
      moveRight();
    }

    else if (event.which === 69) {
      interactWithSprite();
    }
  }
});

$(this).keypress(function (event) {
  if (is_on_title === true) {
    fadeOutScreen();

    setTimeout(function () {
      clearScreen();
      clearInterval(press_any_keyInterval);

      is_on_title = false;

      game_window.style.backgroundImage = "url('" + default_page + "/static/WEBPAGE/date.png')";

      fadeInScreen();

      setTimeout(function () {
        fadeOutScreen();

        setTimeout(function () {
          clearScreen();

          game_window.style.backgroundImage = "url('" + default_page + "/static/WEBPAGE/select.png')";

          fadeInScreen();

          setTimeout(function () {
            clearScreen(); 

            fadeOutScreen();

            setTimeout(function () {
              game_window.style.backgroundImage = "";
              game_window.style.backgroundColor = "beige";

              renderBackgroundUndFloor();

              setTimeout(function () {
                lookUp();
                lookDown();
              }, 10);

              fadeInScreen();
              is_not_playing = false;
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }

  else {
    // console.log(event.keyCode);

    if (is_not_playing === true) {
      return false;
    }

    else {
    }
  }
});

// Networking functions related to players online and such. See index.js to figure out what routes to add.

function getPlayersOnline () {
  fetch ("/players-online")
  .then(response => response.text())
  .then(data => {
    
  })
  .catch(error => {
    throw error;
  });
}

// Intervals and initial functions

refreshCanvas();

const press_any_keyInterval = setInterval(pressAnyKey, 2000);