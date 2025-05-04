let admin = document.getElementById("Admin");
let user = document.getElementById("user");
let code = document.querySelector(".codee");
let butt = document.querySelector(".btn");
let nname = document.getElementById("uname");
let pass = document.getElementById("pass");
let ccode = document.getElementById("codeee");

if (admin) {
  admin.addEventListener("click", function () {
    code.style.display = "flex";
  });
}

if (user) {
  user.addEventListener("click", function () {
    code.style.display = "none";
  });
}

localStorage.setItem("code", 123);

function handleAdminLogin() {
  let adminList = ["Mohamed", "Abdelrhman", "Mahmoud", "Nourhan", "Mary", "Aseel"];
  let inputCode = ccode.value;

  if (adminList.includes(nname.value)) {
    if (inputCode == localStorage.getItem("code")) {
      window.location.href = "Admin.html";
    } else {
      alert("code is wrong");
    }
  } else {
    alert("Sorry, you are not an admin");
  }
}

function handleUserLogin() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = users.find(u => u.username === nname.value && u.password === pass.value);

  if (found && user.checked) {
    localStorage.setItem("currentUserEmail", found.email);
    window.location.href = "indexx.html";
  } else {
    alert("Sorry, your username or password is wrong");
  }
}

butt.addEventListener("click", function (e) {
  e.preventDefault();

  if (admin.checked) {
    handleAdminLogin();
  } else if (user.checked) {
    handleUserLogin();
  } else {
    alert("Please select a role (Admin or User)");
  }
});
