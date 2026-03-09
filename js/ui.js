function displayIssues(data) {
  const container = document.getElementById("issuesContainer");
  const issueCount = document.getElementById("issueCount");

  issueCount.innerText = data.length;

  container.innerHTML = "";

  data.forEach((issue) => {
    const border =
      issue.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";

    const priorityBadge =
      issue.priority === "high"
        ? `<span class="badge badge-error">HIGH</span>`
        : issue.priority === "medium"
          ? `<span class="badge badge-warning">MEDIUM</span>`
          : `<span class="badge badge-neutral">LOW</span>`;

    const labels = issue.labels
      .map((label) => {
        let color = "badge-outline";

        if (label.toLowerCase() === "bug") color = "badge-error";
        else if (label.toLowerCase() === "help wanted") color = "badge-warning";
        else if (label.toLowerCase() === "enhancement") color = "badge-success";
        else if (label.toLowerCase() === "documentation") color = "badge-info";
        else if (label.toLowerCase() === "good first issue")
          color = "badge-secondary";

        return `<span class="badge ${color}">${label}</span>`;
      })
      .join("");

    const statusIcon =
      issue.status === "open"
        ? `<div class="w-3 h-3 rounded-full bg-green-500"></div>`
        : `<div class="w-3 h-3 rounded-full bg-purple-500"></div>`;

    const card = document.createElement("div");

    card.className = `
bg-white
rounded-xl
shadow-md
hover:shadow-xl
hover:-translate-y-1
transition
cursor-pointer
${border}
`;

    card.onclick = () => openModal(issue);

    card.innerHTML = `

<div class="p-5 space-y-4">

<div class="flex justify-between bg-gray-100 items-center">

<div class="flex items-center gap-2">

${statusIcon}

<span class="text-xs text-gray-500 uppercase">
${issue.status}
</span>

</div>

${priorityBadge}

</div>


<h2 class="font-semibold text-md leading-snug">

${issue.title}

</h2>


<p class="text-sm text-gray-500">

${issue.description.slice(0, 90)}...

</p>


<div class="flex gap-2 flex-wrap">

${labels}

</div>

</div>


<div class="border-t px-5 py-3 text-xs text-gray-500 flex justify-between">

<span>#${issue.id} by ${issue.author}</span>

<span>${issue.createdAt.slice(0, 10)}</span>

</div>

`;

    container.appendChild(card);
  });
}

function openModal(issue) {
  const modal = document.getElementById("issueModal");

  const modalTitle = document.getElementById("modalTitle");

  const modalDesc = document.getElementById("modalDesc");

  const modalInfo = document.getElementById("modalInfo");

  const labels = issue.labels
    .map((label) => {
      let color = "badge-outline";

      if (label.toLowerCase() === "bug") color = "badge-error";
      else if (label.toLowerCase() === "help wanted") color = "badge-warning";
      else if (label.toLowerCase() === "enhancement") color = "badge-success";
      else if (label.toLowerCase() === "documentation") color = "badge-info";
      else if (label.toLowerCase() === "good first issue")
        color = "badge-secondary";

      return `<span class="badge ${color}">${label}</span>`;
    })
    .join("");

  const statusBadge =
    issue.status === "open"
      ? `<span class="badge badge-success">OPEN</span>`
      : `<span class="badge badge-secondary">CLOSED</span>`;

  const priorityBadge =
    issue.priority === "high"
      ? `<span class="badge badge-error">HIGH</span>`
      : issue.priority === "medium"
        ? `<span class="badge badge-warning">MEDIUM</span>`
        : `<span class="badge badge-neutral">LOW</span>`;

  modalTitle.innerHTML = issue.title;

  modalDesc.innerHTML = issue.description;

  modalInfo.innerHTML = `

<div class="space-y-5">

<div class="flex gap-3">

${statusBadge}

${priorityBadge}

</div>


<div>

<h3 class="font-semibold mb-2">Labels</h3>

<div class="flex gap-2 flex-wrap">

${labels}

</div>

</div>


<div class="divider"></div>


<div class="grid grid-cols-2 gap-4 text-sm">


<div>

<p class="text-gray-400">Author</p>

<p class="font-medium">${issue.author}</p>

</div>


<div>

<p class="text-gray-400">Assignee</p>

<p class="font-medium">${issue.assignee || "None"}</p>

</div>


<div>

<p class="text-gray-400">Created</p>

<p class="font-medium">${issue.createdAt.slice(0, 10)}</p>

</div>


<div>

<p class="text-gray-400">Updated</p>

<p class="font-medium">${issue.updatedAt.slice(0, 10)}</p>

</div>

</div>

</div>

`;

  modal.showModal();
}

function setActive(tab) {
  const tabs = ["tabAll", "tabOpen", "tabClosed"];

  tabs.forEach((id) => {
    document.getElementById(id).classList.remove("btn-primary");

    document.getElementById(id).classList.add("btn-outline");
  });

  document.getElementById(tab).classList.remove("btn-outline");

  document.getElementById(tab).classList.add("btn-primary");
}
