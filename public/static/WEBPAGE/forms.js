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
        
      }
    }
  }

  else {
    elevator_error.innerText = "That's not a number!";
  }
});