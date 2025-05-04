let form = document.querySelector("form");
let pass = document.getElementById("pass");
let conpas = document.getElementById("conpass");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let sname = document.getElementById("usname").value;
  let passw = document.getElementById("pass").value;
  let emaiil = document.getElementById("eemaill").value;

  if (pass.value != conpas.value) {
    alert("Sorry, the confirmation of password is wrong, please try again");
    location.reload();
    return;
  }
  if (!(emaiil.endsWith("gmail.com") || emaiil.endsWith("email.com"))) {
    alert("Email must end with @gmail.com or @email.com");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username: sname, password: passw, email: emaiil});
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "index.html";
});
