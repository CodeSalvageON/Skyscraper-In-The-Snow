// Script for the chatroom

$("#message-form").submit(function () {
  event.preventDefault();

  fetch ("/msg", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      username : localStorage.getItem("skyscraper-in-the-snow-id"),
      message : document.getElementById("message").value
    })
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("message").value = "";
    $("#message").value = "";

    if (data === "empty-message-error") {
      document.getElementById("chat-error").innerText = "Error: Empty message";
    }

    else if (data === "long-message-error") {
      document.getElementById("chat-error").innerText = "Error: Wall of text";
    }

    else {
      document.getElementById("chat-error").innerText = "";
      document.getElementById("message").value = "";
    }
  })
  .catch(error => {
    throw error;
  });
});