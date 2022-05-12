const weatherForm = document.querySelector("form");
const search = document.getElementById("search");
const message_1 = document.getElementById("message_1");
const message_2 = document.getElementById("message_2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message_1.textContent = "Loading...";
  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message_1.textContent = data.error;
          message_2.textContent = "";
        } else {
          message_1.textContent = data.location;
          message_2.textContent = data.forecast;
        }
      });
    }
  );
});
