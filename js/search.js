function searchIssue() {
  const text = document.getElementById("searchInput").value.toLowerCase();

  const result = issues.filter((issue) =>
    issue.title.toLowerCase().includes(text),
  );

  displayIssues(result);
}
