

let totalCardsCount = document.getElementById("totalCards");
let allCards = document.getElementById("allCardSection");
let span = document.getElementById("span");
let openCardSection = document.getElementById("openCardSection");
let closeCardSection = document.getElementById("closeCardSection");

let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");

let allBtn = document.getElementById("all-btn");
let openBtn = document.getElementById("open-btn");
let closeBtn = document.getElementById("closed-btn");

let modalContainer = document.getElementById("modalContainer");

// store API data
let issues = [];


const fetchIssues = async () => {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  issues = data.data;

  renderAllCards(issues);
  renderOpenClosed(issues);

  totalCardsCount.innerText = issues.length + " Issues";
};

fetchIssues();


function togglestyle(id) {

  allBtn.classList.remove("bg-blue-800", "text-white");
  openBtn.classList.remove("bg-blue-800", "text-white");
  closeBtn.classList.remove("bg-blue-800", "text-white");

  let selected = document.getElementById(id);
  selected.classList.add("bg-blue-800", "text-white");

  if (id === "all-btn") {

    allCards.classList.remove("hidden");
    openCardSection.classList.add("hidden");
    closeCardSection.classList.add("hidden");

    totalCardsCount.innerText = issues.length + " Issues";

  } 
  else if (id === "open-btn") {

    allCards.classList.add("hidden");
    openCardSection.classList.remove("hidden");
    closeCardSection.classList.add("hidden");

    const openIssues = issues.filter(
      item => item.status.toLowerCase() === "open"
    );

    totalCardsCount.innerText = openIssues.length + " Issues";
console.log(openIssues);
  } 
  else if (id === "closed-btn") {

    allCards.classList.add("hidden");
    openCardSection.classList.add("hidden");
    closeCardSection.classList.remove("hidden");

    const closedIssues = issues.filter(
      item => item.status.toLowerCase() === "closed"
    );

    totalCardsCount.innerText = closedIssues.length + " Issues";
  }
}

togglestyle("all-btn");



// span section

const spans=()=>{
    if(allCards.children.length===0){
    span.classList.add('hidden'); 
}else{
    span.classList.remove('hidden'); 
   }
};
spans();

//  "id": 2,
      // "title": "Add dark mode support",
      // "description": "Users are requesting a dark mode option. This would improve accessibility and user experience.",
      // "status": "open",
      // "labels": [
        // "enhancement",
        // "good first issue"
      // ],
      // "priority": "medium",
      // "author": "sarah_dev",
      // "assignee": "",
      // "createdAt": "2024-01-14T14:20:00Z",
      // "updatedAt": "2024-01-16T09:15:00Z"

    const createCard = (item) => {

  let borderColor = "border-t-purple-400";

  if (item.status === "open") {
    borderColor = "border-t-green-400";
  }else if (item.status === "mudium") {
   borderColor = "border-t-green-400";
 }

  let card = document.createElement("div");

  card.innerHTML = `
  <div onclick="showModal(${item.id})"
  class="space-y-3 border-t-4 p-8 pb-20 bg-white ${borderColor} rounded-2xl">

  <p class="priority flex justify-end">${item.priority}</p>

  <h2 class="title text-3xl font-semibold">${item.title}</h2>

  <p class="description text-gray-500">${item.description}</p>

  <div class="flex gap-5">
      <p class="lebels1 bg-yellow-500 rounded-lg text-nowrap">
      ${item.labels[0] || "No label"}
      </p>

      <p class="lebels2 bg-yellow-500 rounded-lg text-nowrap">
      ${item.labels[1] || "No label"}
      </p>
  </div>

  <div class="flex gap-5 justify-between border-t border-t-gray-400 pt-6">

      <div class="space-y-3">
        <p class="author text-gray-500">${item.author}</p>
        <p class="createAt text-gray-500">${item.createdAt}</p>
      </div>

      <div class="space-y-3">
        <p class="assignee text-gray-500">${item.assignee}</p>
        <p class="updateAt text-gray-500">${item.updatedAt}</p>
      </div>

  </div>

  </div>
  `;

  return card;
};


// ================= RENDER ALL =================

const renderAllCards = (cards) => {

  allCards.innerHTML = "";

  cards.forEach(item => {

    const card = createCard(item);

    allCards.append(card);

  });

};


const renderOpenClosed = (data) => {

  openCardSection.innerHTML = "";
  closeCardSection.innerHTML = "";

  const openIssues = data.filter(
    item => item.status.toLowerCase() === "open" 
   );


   const closedIssues = data.filter(
  item => item.status.toLowerCase() === "closed"
   );

  openIssues.forEach(item => {

    const card = createCard(item);

    openCardSection.append(card);

  });

  closedIssues.forEach(item => {

    const card = createCard(item);

    closeCardSection.append(card);

  });

};


// ================= MODAL =================

const showModal = async (id) => {

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  );

  const details = await res.json();

  const data = details.data;

  modal(data);
};

const modal = (data) => {

  modalContainer.innerHTML = `
  
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">

<div class="modal-box">

<div class="space-y-4">

<h2 class="text-2xl font-bold">${data.title}</h2>

<div class="flex gap-4">

<p class="bg-yellow-500 rounded p-1">
${data.labels[0] || "No label"}
</p>

<p class="bg-yellow-500 rounded p-1">
${data.labels[1] || "No label"}
</p>

</div>

<p class="text-gray-500">${data.description}</p>

<div class="flex justify-between">

<div>
<p class="text-gray-500">Assignee</p>
<p>${data.assignee || "Not assigned"}</p>
</div>

<div>
<p class="text-gray-500">Priority</p>
<p>${data.priority}</p>
</div>

</div>

</div>

<div class="flex justify-end mt-6">

<form method="dialog">
<button class="btn btn-primary">Close</button>
</form>

</div>

</div>

</dialog>
`;

  document.getElementById("my_modal_5").showModal();

};


searchBtn.addEventListener("click", () => {

  const value = searchInput.value.toLowerCase().trim();

  const filtered = issues.filter(issue =>
    issue.title.toLowerCase().includes(value)
  );

  renderAllCards(filtered);

  totalCardsCount.innerText = filtered.length + " Issues";

});

