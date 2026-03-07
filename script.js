const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner")

function login(e) {

    e.preventDefault();

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value

    if (user === "admin" && pass === 'admin123') {
        window.location = "main-page.html";
    }
    else {
        alert("Invalid login")
    }

}

function setActiveTab(type) {

    document.querySelectorAll(".tab").forEach(btn => {
        btn.classList.remove("bg-purple-600", "text-white");

        btn.classList.add("bg-white", "border");
    });

    document.getElementById(type + "Tab").classList.remove("bg-white", "border");

    document.getElementById(type + "Tab").classList.add("bg-purple-600", "text-white")

}

async function loadIssues(type = "all") {

    setActiveTab(type);

    spinner.classList.remove("hidden")

    const res = await fetch(API);
    const data = await res.json()

    spinner.classList.add("hidden")

    let issues = data.data;

    if (type === "open"){
        issues = issues.filter(i => i.status === "open");
    }

    if (type === "closed"){
        issues = issues.filter(i => i.status === "closed");
    }

    document.getElementById("issueCount").innerText = issues.length;

    renderIssues(issues);

}

function renderIssues(issues) {

    container.innerHTML = "";

    issues.forEach(issue => {

        const border =
            issue.status === "open"
                ? "border-t-4 border-green-500"
                : "border-t-4 border-purple-500";

        const priorityColor =
            issue.priority === "HIGH"
                ? "bg-red-100 text-red-500"
                : issue.priority === "MEDIUM"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-600";

        container.innerHTML += `

<div onclick="openModal(${issue.id})"
class="bg-white p-4 rounded shadow cursor-pointer ${border}">

<div class="flex justify-between items-center">

<img
src="./assets/${issue.status === "open" ? "Open-Status" : "Closed-Status "}.png"
class="w-5">

<span class="text-xs px-2 py-1 rounded ${priorityColor}">
${issue.priority}
</span>

</div>

<h3 class="font-semibold mt-2 text-[16px]">
${issue.title}
</h3>

<p class="text-[14px] text-gray-500 mt-1">
${issue.description}
</p>

<div class="flex gap-2 mt-3 text-xs">

<span class="bg-red-100 text-red-500 px-2 py-1 rounded">
BUG
</span>

<span class="bg-yellow-100 text-[12px] text-yellow-600 px-2 py-1 rounded">
HELP WANTED
</span>

</div>

<div class="text-[14px] text-gray-500 mt-3">
#${issue.id} by ${issue.author}
</div>

<div class="text-[14px] text-gray-400">
${issue.createdAt}
</div>

</div>

`;

    });

}

async function openModal(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

    const data = await res.json();

    const issue = data.data;

    document.getElementById("modalTitle").innerText = issue.title;

    document.getElementById("modalDesc").innerText = issue.description

    document.getElementById("modalAuthor").innerText = issue.author;

    document.getElementById("modalDate").innerText = issue.createdAt

    document.getElementById("modalAssignee").innerText = issue.author;

    document.getElementById("modalPriority").innerText = issue.priority

    const modal = document.getElementById("modal")
    modal.classList.remove("hidden");
    modal.classList.add("flex");

}

function closeModal() {

    const modal = document.getElementById("modal")

    modal.classList.add("hidden");
    modal.classList.remove("flex");

}

async function searchIssues() {

    const text = document.getElementById("searchInput").value

    if (text === "") {
        loadIssues();
        return;
    }

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

    const data = await res.json()

    renderIssues(data.data)

}

loadIssues();