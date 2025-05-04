const currentEmail = localStorage.getItem("currentUserEmail");
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = users.find(user => user.email === currentEmail);
if (currentUser) {
  document.getElementById("profileName").textContent = `Name: ${currentUser.username}`;
  document.getElementById("profileEmail").textContent = `Email: ${currentUser.email}`;
}