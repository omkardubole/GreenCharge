// FILE: auth.js
// ================================
// 🔁 CHANGE ONLY THIS LINE LATER
const REVIEW_MODE = false; // true = review | false = final demo
// ================================

// ===== DEMO USERS LIST =====
const DEMO_USERS = [
  { email: "user@greencharge.com", password: "green123" },
  { email: "demo@greencharge.com", password: "demo123" },
  { email: "admin@greencharge.com", password: "admin123" },
  { email: "test@greencharge.com", password: "test123" },
  { email: "guest@greencharge.com", password: "guest123" }
];

// ===== LOGIN FUNCTION =====
function login() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  // Review mode → skip validation
  if (REVIEW_MODE) {
    alert("Login simulated (review mode)");
    window.location.href = "dashboard.html";
    return;
  }

  // Final demo mode → real check
 const userFound = DEMO_USERS.some(
  user => user.email === email && user.password === password
);

if (userFound) {
  localStorage.setItem("loggedIn", "true");
  alert("Login successful");
  window.location.href = "dashboard.html";
} else {
  alert("Invalid email or password");
}
}

// ===== SIGNUP (DEMO) =====
function signup() {
  alert("Signup disabled in demo");
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// ===== PAGE PROTECTION =====
(function protectPages() {
  if (REVIEW_MODE) return; // review mode = open all

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // ✅ ONLY LOGIN PAGE IS PUBLIC
  const publicPages = ["index.html", ""];

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  // ❌ Not logged in → redirect to login
  if (!isLoggedIn && !publicPages.includes(currentPage)) {
    window.location.href = "index.html";
  }

  // ❌ Logged in but trying to open login page again
  if (isLoggedIn && currentPage === "index.html") {
    window.location.href = "dashboard.html";
  }
})();

// ===== PASSWORD TOGGLE =====
function togglePassword() {
  const pwd = document.getElementById("password");
  if (pwd) pwd.type = pwd.type === "password" ? "text" : "password";
}

