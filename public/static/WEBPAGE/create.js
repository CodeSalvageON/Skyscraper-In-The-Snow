// Script for the creation canvas

const creation = document.getElementById("creation-canvas");
const creator = creation.getContext("2d");

let elements_on_screen = 0;
let elements_in_total = [];
let is_holding_item = false;
let is_on_deletion = false;
let element_on_hold = 0;
let shift_down = false;

function createSprite (src, width, height, x, y) {
  elements_on_screen = elements_on_screen + 1;
  elements_in_total.push({
    width : width,
    height : height,
    src : src,
    x : x, 
    y : y
  });

  const sprite = new Image();

  sprite.onload = function () {
    creator.drawImage(sprite, parseInt(elements_in_total[elements_on_screen - 1].x), parseInt(elements_in_total[elements_on_screen - 1].y), parseInt(width), parseInt(height));
  }

  sprite.src = String(elements_in_total[elements_on_screen - 1].src);
}

function clearALL () {
  creator.clearRect(0, 0, creation.width, creation.height);
}

// holy fucking shit im going to have to make something completely different thanks so much you piece of shit javascript 

function updateCanvas () { // Holy fucking shit I should never be allowed to write UI code again
  creator.clearRect(0, 0, creation.width, creation.height);

  for (x = 0; x < elements_on_screen; x++) {
    console.log("Cycle");

    const random_element = JSON.parse(JSON.stringify(elements_in_total));
    console.log(random_element);

    if (x === 0) {
      console.log("Is a zero");
    }

    console.log("weird");
    const sprite = new Image();

    sprite.onload = function () {
      creator.drawImage(sprite, parseInt(random_element[x].x), parseInt(random_element[x].y), parseInt(random_element[x].width), parseInt(random_element[x].height));
    }

    sprite.src = String(elements_in_total[x].src);
  }
}

function trackMouse () {
  const mousePos = {
    x: event.clientX - creation.offsetLeft,
    y: event.clientY - creation.offsetTop
  }

  if (shift_down === true) {
    return false;
  }

  document.getElementById("mouse-position").innerText = "Mouse Position: (X = " + mousePos.x + ")(Y = " + mousePos.y + ")";
}

$("#creation-canvas").click(function () {
  const mousePos = {
    x: event.clientX - creation.offsetLeft,
    y: event.clientY - creation.offsetTop
  }

  for (i = 0; i < elements_in_total.length; i++) {
    if (mousePos.x > parseInt(elements_in_total[i].x) && mousePos.x < parseInt(elements_in_total[i].width)+ parseInt(elements_in_total[i].x) && mousePos.y > parseInt(elements_in_total[i].y) && mousePos.y < parseInt(elements_in_total[i].height) + parseInt(elements_in_total[i].y)) {
      if (is_on_deletion === true) {
        const image_pending_deletion = creator.createImageData(parseInt(elements_in_total[i].width), parseInt(elements_in_total[i].height));

        for (w = image_pending_deletion.data.length; --w >= 0; ) {
          image_pending_deletion.data[w] = 0;
        }

        creator.putImageData(image_pending_deletion, 100, 100);

        is_on_deletion = false;
      }

      else {
        is_holding_item = true;
        element_on_hold = i;
      }
    }
  }
});

$(document).keydown(function (event) {
  if (event.which === 16) {
    if (shift_down === true) {
      shift_down = false;
      document.getElementById("mouse-tutorial").innerText = "Press SHIFT to lock the mouse coordinates.";
    }
    
    else {
      shift_down = true;
      document.getElementById("mouse-tutorial").innerText = "Press SHIFT to release mouse coordinates.";
    }
  }
});

setInterval(function () {
  creation.onmousemove = trackMouse;
}, 500);