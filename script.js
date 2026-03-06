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