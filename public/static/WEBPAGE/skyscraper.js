const game_window = document.getElementById("game-window");
const skyscraper = game_window.getContext("2d");

let is_not_playing = true;
let is_on_title = true;

const default_page = "https://Skyscraper-In-The-Snow.codesalvageon.repl.co";

let angle_degrees = 0;
let general_y_adder = 0;
let general_x_adder = 0;
let general_z_adder = 0;

document.body.style.overflow = "hidden";

game_window.style.backgroundSize = "cover";
game_window.style.backgroundImage = "url('" + default_page + "/static/WEBPAGE/title1.png')";

function refreshCanvas () {
  game_window.style.width = document.body.clientWidth + "px";
  game_window.style.height = document.body.clientHeight + "px";
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

  press_any_key.src = default_page + "/static/WEBPAGE/pressanykey.png";

  setTimeout(function () {
    clearScreen();
  }, 600)
}

function renderBackgroundUndFloor () {
  const floor_sprite_1 = new Image();

  floor_sprite_1.onload = function () {
    skyscraper.drawImage(floor_sprite_1, -20, Math.floor(100 + general_y_adder));
  }
  floor_sprite_1.src = default_page + "/static/WEBPAGE/floor.png";

  const elevator = new Image();

  elevator.onload = function () {
    skyscraper.drawImage(elevator, Math.floor(30 + general_x_adder), Math.floor(0 + general_y_adder), Math.floor(elevator.width / 3 + general_z_adder), Math.floor(elevator.height / 3 + general_z_adder));
  }
  elevator.src = default_page + "/static/WEBPAGE/elevator.png";

  const cctv = new Image(); 

  cctv.onload = function () {
    skyscraper.drawImage(cctv, Math.floor(0 + general_x_adder), Math.floor(-30 + general_y_adder), Math.floor(cctv.width / 10 + general_z_adder), Math.floor(cctv.height / 10 + general_z_adder));
  }
  cctv.src = default_page + "/static/WEBPAGE/cctv.png";

  const fal = new Image();

  fal.onload = function () {
    skyscraper.drawImage(fal, Math.floor(30 + general_x_adder), Math.floor(100 + general_y_adder), Math.floor(fal.width + general_z_adder), Math.floor(fal.height + general_z_adder));
  }
  fal.src = default_page + "/static/WEBPAGE/fal.png";
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
  if (angle_degrees > 90) {
    return false;
  }

  else {
    angle_degrees = -5;

    clearScreen();
    skyscraper.save();
    skyscraper.rotate(Math.floor(angle_degrees * Math.PI / 180));
    renderBackgroundUndFloor();
    skyscraper.restore();
  }
}

function moveForward () {
  if (general_z_adder > 50) {
    return false;
  }

  else {
    general_z_adder = general_z_adder + 2;
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
    clearScreen();
    renderBackgroundUndFloor();
  }
}

function moveLeft () {
  if (general_x_adder > 100) {
    return false; 
  }

  else {
    general_x_adder = general_x_adder + 2;
    clearScreen(); 
    renderBackgroundUndFloor();
  }
}

function moveRight () {
  if (general_x_adder < -100) {
    return false;
  }

  else {
    general_x_adder = general_x_adder - 2;
    clearScreen();
    renderBackgroundUndFloor();
  }
}

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

              fadeInScreen();
              is_not_playing = false;
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }

  else {
    console.log(event.keyCode);

    if (is_not_playing === true) {
      return false;
    }

    else {
    }
  }
});

refreshCanvas();
const press_any_keyInterval = setInterval(pressAnyKey, 2000);