// Makes individual IDs for players to be identified by.

const localStorageID = localStorage.getItem("skyscraper-in-the-snow-id");

if (localStorageID === null || localStorageID === undefined || localStorageID === "") {
  const improvised_id = Math.floor(Math.random() * 10000);

  localStorage.setItem("skyscraper-in-the-snow-id", improvised_id);
}

else {
  // Do nothing I guess?
}