const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");

function login(e) {

    e.preventDefault();

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "admin123") {
        window.location = "main-page.html";
    }
    else {
        alert("Invalid login");
    }

}

