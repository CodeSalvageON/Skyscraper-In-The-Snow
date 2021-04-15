// Handles forms.

$("#elevator-form").submit(function () {
  event.preventDefault(); // Obviously lol
  
  const suite_number = document.getElementById("suite-number").value;
  const elevator_error = document.getElementById("elevator-error");

  if (suite_number - suite_number === 0) {
    
  }

  else {
    elevator_error.innerText = "That's not a number!";
  }
});