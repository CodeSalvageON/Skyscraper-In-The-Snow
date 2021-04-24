// Handles forms.

$("#elevator-form").submit(function () {
  event.preventDefault(); // Obviously lol
  
  const suite_number = document.getElementById("suite-number").value;
  const elevator_error = document.getElementById("elevator-error");

  if (suite_number - suite_number === 0) {
    is_on_elevator = false;
    optimizeFetch();

    if (parseInt(suite_number) > number_of_suites || parseInt(suite_number) < number_of_suites) {
      elevator_error.innerText = "That suite doesn't exist!";
    }

    else {
      elevator_error.innerText = "";

      if (parseInt(suite_number) === 0 || parseInt(suite_number) === 1) {
        $("#elevator-window").fadeOut(2000);
        $("#elevator-controls").fadeOut(2000);

        setTimeout(function () {
          $("#game-window").fadeIn(2000);
          is_not_playing = false;
        }, 2000);
      }

      else {
        console.log(suite_number);
        
        fetch ("/retrieve-suite", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            suite : String(suite_number)
          })
        })
        .then(response => response.text())
        .then(data => {
          console.log(data);

          localStorage.setItem("data-thing-sins", data);

          generateSuite(data);
          generateSuite(data);
          generateSuite(data);
          generateSuite(data);
          generateSuite(data);
          generateSuite(data);
          generateSuite(data);
          generateSuite(data);
          generateSuite(data);
        })
        .catch(error => {
          throw error;
        });

        $("#elevator-window").fadeOut(2000);
        $("#elevator-controls").fadeOut(2000);

        setTimeout(function () {
          $("#suite-div").fadeIn(2000);
        }, 2000);
      }
    }
  }

  else {
    elevator_error.innerText = "That's not a number!";
  }
});

$("#item-menu-form").submit(function () {
  event.preventDefault();

  const item_width = document.getElementById("item-width").value;
  const item_height = document.getElementById("item-height").value;
  const item_x = document.getElementById("item-x").value;
  const item_y = document.getElementById("item-y").value;

  if (document.getElementById("item-chosen").value === "cctv") {
    createSprite("/static/WEBPAGE/cctv.png", item_width, item_height, item_x, item_y);
  }

  else if (document.getElementById("item-chosen").value === "elevator") {
    createSprite("/static/WEBPAGE/elevator.png", item_width, item_height, item_x, item_y);
  }

  else if (document.getElementById("item-chosen").value === "plant") {
    createSprite("/static/WEBPAGE/pottedplant.png", item_width, item_height, item_x, item_y);
  }

  else if (document.getElementById("item-chosen").value === "computer") {
    createSprite("/static/WEBPAGE/computer.png", item_width, item_height, item_x, item_y);
  }

  else if (document.getElementById("item-chosen").value === "table") {
    createSprite("/static/WEBPAGE/table.png", item_width, item_height, item_x, item_y);
  }

  else if (document.getElementById("item-chosen").value === "bourbon") { // Ah yes, priorities
    createSprite("/static/WEBPAGE/bourbon.png", item_width, item_height, item_x, item_y);
  }

  else if (document.getElementById("item-chosen").value === "wallphone") {
    createSprite("/static/WEBPAGE/wallphone.png", item_width, item_height, item_x, item_y);
  }

  else if (document.getElementById("item-chosen").value === "tv") {
    createSprite("/static/WEBPAGE/crttv.png", item_width, item_height, item_x, item_y);
  }

  $("#item-menu").fadeOut(2000);

  document.getElementById("item-chosen").value = "";
  document.getElementById("item-width").value = "";
  document.getElementById("item-height").value = "";
  document.getElementById("item-x").value = "";
  document.getElementById("item-y").value = "";
});

$("#import-form").submit(function () {
  event.preventDefault();

  const image_url = document.getElementById("url").value;
  const image_width = document.getElementById("image-width").value;
  const image_height = document.getElementById("image-height").value;
  const image_x = document.getElementById("image-x").value;
  const image_y = document.getElementById("image-y").value;

  if (image_url.includes("porn") || image_url.includes("grabify") || image_url.includes("dirty") || image_url.includes("fuck")) {
    document.getElementById("import-error").innerText = "What the fuck, I know there's no rules but have some standards you degenerate!";

    document.getElementById("url").value = "";
    document.getElementById("image-width").value = "";
    document.getElementById("image-height").value = "";
    document.getElementById("image-x").value = "";
    document.getElementById("image-y").value = "";
  }

  else {
    createSprite(image_url, image_width, image_height, image_x, image_y);
    
    document.getElementById("import-error").innerText = "";
    document.getElementById("url").value = "";
    document.getElementById("image-width").value = "";
    document.getElementById("image-height").value = "";
    document.getElementById("image-x").value = "";
    document.getElementById("image-y").value = "";

    $("#import-menu").fadeOut(2000);
  }
});