// Handles the Realtime component, and updates variables from the server to the client.

let is_on_elevator = false; // This variable is needed
let interval_set = ["suite", "chat"];

function getSuites () {
  fetch ("/get-suites")
  .then(response => response.text())
  .then(data => {
    document.getElementById("current-number-of-suites").innerText = "Current Number of Suites: " + data;
  })
  .catch(error => {
    throw error;
  });
}

function optimizeFetch (overcomplicate) { // This function optimizes the lobby a bit more, by limiting fetch requests.
  if (is_on_elevator === false) {
    for (i = 1; i < 99999; i++)
      window.clearInterval(i); // Too lazy to do anything else; might cause a memory leak later.
  }

  if (overcomplicate === interval_set[0]) {
    setInterval(getSuites, 500);
  }

  else {
    return;
  }
}