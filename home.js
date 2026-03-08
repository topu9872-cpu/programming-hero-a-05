// variable names

let totalCardsCount =document.getElementById('totalCards');
let allCardContainer =document.getElementById('allCardContainer');
let allCards =document.getElementById('allCardSection');
let span = document.getElementById('span');
let openCardSection = document.getElementById('openCardSection');
let closeCardSection = document.getElementById('closeCardSection');


let searchBtn=document.getElementById('searchBtn');
let searchInput=document.getElementById('searchInput');
// ----------------------------------------------------


// btn toggle

let allBtn=   document.getElementById('all-btn');
let openBtn=   document.getElementById('open-btn');
 let closeBtn=  document.getElementById('closed-btn');

function togglestyle(id){
allBtn.classList.remove('bg-blue-800' ,'text-white');
openBtn.classList.remove('bg-blue-800' ,'text-white');
closeBtn.classList.remove('bg-blue-800' ,'text-white');



allBtn.classList.add('btn-outline' ,'text-blue-800');
openBtn.classList.add('btn-outline' ,'text-blue-800')
closeBtn.classList.add('btn-outline' ,'text-blue-800');


let selected= document.getElementById(id);
selected.classList.add('bg-blue-800', 'text-white');


 if(id == 'open-btn'){
   allCards.classList.add('hidden');
   closeCardSection.classList.add('hidden');
   openCardSection.classList.remove('hidden');
renderSection();
 } else if(id == 'all-btn'){
   allCards.classList.remove('hidden');
  openCardSection.classList.add('hidden'); 
  closeCardSection.classList.add('hidden');

 } else if(id == 'closed-btn'){
     openCardSection.classList.add('hidden');
   allCards.classList.add('hidden');
 closeCardSection.classList.remove('hidden');
renderSection();
};

};


// render section

const renderSection = ()=>{
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res=>res.json())
.then(data=>desplaycards(data.data));
};

const desplaycards=(data)=>{

openCardSection.innerHTML = "";
closeCardSection.innerHTML = "";

    data.forEach(item=>{

 let borderColor = "border-t-green-400";
 if (item.priority === "low") {
   borderColor = "border-t-purple-400";
 };

        let card=document.createElement('div');
        card.innerHTML=`
 <div onclick="showModal(${item.id})" id="colorClass" class=" space-y-3 border-t-4 p-8 pb-20 bg-white ${borderColor} rounded-2xl">
 <p class="priority flex justify-end">${item.priority}</p>
 <h2 class="title text-3xl font-semibold">${item.title}</h2>
 <p class= "description text-gray-500">${item.description}</p>
 <div class="flex gap-5">
     <p class="lebels1 bg-yellow-500 rounded-lg text-nowrap">${item.labels[0] || "did not found labels"}</p>
     <p class="lebels2 bg-yellow-500 rounded-lg text-nowrap">${item.labels[1] || "did not found labels"}</p>
      </div>
    
     <div class=" flex gap-5 justify-between border-t border-t-gray-400 pt-6">
          <div class="space-y-3">
         <p class="author text-gray-500">${item.author}</p>
         <p class="createAt text-gray-500">${item.createdAt}</p>
          </div>
         <div class="space-y-3">
           <p class="assignee text-gray-500">${item.assignee}</p>
           <p class="updateAt text-gray-500">${item.updatedAt}</p>  
         </div>
 </div>
   `;


if(item.priority=== 'low'){
    closeCardSection.append(card);
}else if(item.priority==='high'|| 'medium') {
   openCardSection.append(card);
   
}
    });
  
};


// span section

const spans=()=>{
    if(allCards.children.length===0){
    span.classList.add('hidden'); 
}else{
    span.classList.remove('hidden'); 
   }
};
spans();

togglestyle('all-btn');

// allcard section

const allApiSection = ()=>{
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res)=>res.json())
.then((data)=>allCardsSection(data.data));
};

const allCardsSection =(cards)=>{

cards.forEach(item => {
 let borderColor = "border-t-green-400";
 if (item.priority === "low") {
   borderColor = "border-t-purple-400";
 }

 
    
    let card =document.createElement('div');
 
    card.innerHTML=`
     <div onclick="showModal(${item.id})" id="colorClass" class=" space-y-3 border-t-4 p-8 pb-20 bg-white ${borderColor} rounded-2xl">
     <p class="priority flex justify-end">${item.priority}</p>
     <h2 class="title text-3xl font-semibold">${item.title}</h2>
     <p class= "description text-gray-500">${item.description}</p>
     <div class="flex gap-5">
         <p class="lebels1 bg-yellow-500 rounded-lg text-nowrap">${item.labels[0] || "did not found labels"}</p>
         <p class="lebels2 bg-yellow-500 rounded-lg text-nowrap">${item.labels[1] || "did not found labels"}</p>
          </div>
         
         <div class=" flex gap-5 justify-between border-t border-t-gray-400 pt-6">
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



    allCards.append(card);
});
totalCardsCount.innerText=Number(allCards.children.length)+ " Issues";
};
allApiSection();



// modal section

const showModal = async (id)=>{
const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
let res= await fetch(url);
   let details= await res.json();
   modal(details.data);
   
};
const modal =(data)=>{
    console.log(data)
   let detailsContainer = document.getElementById('modalContainer');
   
 detailsContainer.innerHTML=`
 <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
  
    <div class="modal-action">
      <form method="dialog">
     <div id="colorClass" class=" space-y-3 p-8  bg-white rounded-2xl">
   
     <h2 class="title text-3xl font-semibold">${data.title}</h2>
     
     <div class="flex gap-5">
         <p class="lebels1 bg-yellow-500 rounded-lg text-nowrap">${data.labels[0]}</p>
         <p class="lebels2 bg-yellow-500 rounded-lg text-nowrap">${data.labels[1]}</p>
          </div>
        <p class= "description text-gray-500">${data.description}</p>
        <div class="flex justify-between">
              <div class="space-y-3">
             <p class="author text-gray-500">assignee:</p>
             <p class="createAt">${data.assignee || 'not find'}</p>
              </div>
             <div class="space-y-3">
               <p class="assignee text-gray-500">priority:</p>
               <p class="updateAt text-gray-500">${data.priority}</p>  
             </div>
             </div>
     </div>
     <div class="flex justify-end">
        <button class="btn btn-outline btn-primary">Close</button>
        </div>
         </div>
      </form>
    </div>
  </div>
</dialog>
 
 `;
 document.getElementById('my_modal_5').showModal();

};



// search section

searchBtn.addEventListener('click',()=>{
    let searchInputValue=searchInput.value.trim().toLowerCase();
     
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInputValue}`)
    .then(res=>res.json())
    .then(data=>{
        let items =data.data;
        let filterItems=items.filter(item=>item.title.toLowerCase().includes(searchInputValue));
        allCards.innerHTML="";
        filterItems.forEach(item=>{


 let borderColor = "border-t-green-400";
 if (item.priority === "low") {
   borderColor = "border-t-purple-400";
 }
    
    let card =document.createElement('div');


    card.innerHTML=`
     <div id="colorClass" class=" space-y-3 border-t-4 p-8 pb-20 bg-white ${borderColor} rounded-2xl">
     <p class="priority flex justify-end">${item.priority}</p>
     <h2 class="title text-3xl font-semibold">${item.title}</h2>
     <p class= "description text-gray-500">${item.description}</p>
     <div class="flex gap-5">
         <p class="lebels1 bg-yellow-500 rounded-lg text-nowrap">${item.labels[0] || "did not found labels"}</p>
         <p class="lebels2 bg-yellow-500 rounded-lg text-nowrap">${item.labels[1] || "did not found labels"}</p>
          </div>
         
         <div class=" flex gap-5 justify-between border-t border-t-gray-400 pt-6">
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

    allCards.append(card);
});
totalCardsCount.innerText=Number(allCards.children.length)+ " Issues";
});
        });
    