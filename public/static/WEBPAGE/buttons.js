// Script for buttons, im going to be lazy and proably not optimize anything here just like in the chat scripts 

$("#create-suite").click(function () {
  window.open("/create");
});

$("#open-item-menu").click(function () {
  $("#item-menu").fadeIn(2000);
});

$("#close-item-menu").click(function () {
  $("#item-menu").fadeOut(2000);
});

$("#import-image").click(function () {
  $("#import-menu").fadeIn(2000);
});

$("#close-import-menu").click(function () {
  $("#import-menu").fadeOut(2000);
});

$("#delete-item").click(function () {
  clearALL();
});

$("#create-suite-lol").click(function () {
  fetch ("/post-to-net", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      array : JSON.stringify(elements_in_total)
    })
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("suite-number-thingy").innerText = "Your suite number is: " + data;

    $("#suite-number-modal").fadeIn(2000);

    setTimeout(function () {
      setTimeout(function () {
        window.close();
      }, 2000);
    }, 5000);
  })
  .catch(error => {
    throw error;
  });
});

$("#go-back-button").click(function () {
  $("#suite-div").fadeOut(2000);
  
  setTimeout(function () {
    $("#elevator-window").fadeIn(2000);
    $("#elevator-controls").fadeIn(2000);
  }, 2000);
});

$("#refresh-suite").click(function () {
  generateSuite(localStorage.getItem("data-thing-sins"));
});

$("#return-to-lobby").click(function () {
  $("#elevator-window").fadeOut(2000);
  $("#elevator-controls").fadeOut(2000);

  setTimeout(function () {
    $("#game-window").fadeIn(2000);
    is_not_playing = false;
  }, 2000);
});