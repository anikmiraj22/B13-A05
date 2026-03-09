let issues = [];

async function getIssues() {
  document.getElementById("loading").classList.remove("hidden");

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );

  const data = await res.json();

  issues = data.data;

  displayIssues(issues);

  document.getElementById("loading").classList.add("hidden");
}

function loadAll() {
  setActive("tabAll");

  displayIssues(issues);
}

function loadOpen() {
  setActive("tabOpen");

  const openIssues = issues.filter((issue) => issue.status === "open");

  displayIssues(openIssues);
}

function loadClosed() {
  setActive("tabClosed");

  const closedIssues = issues.filter((issue) => issue.status === "closed");

  displayIssues(closedIssues);
}
