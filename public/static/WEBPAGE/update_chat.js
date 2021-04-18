// Updating chatlogs, boring....

setInterval(function () {
  fetch ("/lols")
  .then(response => response.text())
  .then(data => {
    document.getElementById("chatlog").innerHTML = data;
    window.scrollTo(0, document.body.scrollHeight);
  })
  .catch(error => {
    throw error;
  });
}, 500);