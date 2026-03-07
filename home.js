let totalCardsCount =document.getElementById('totalCards');
let allCardContainer =document.getElementById('allCardContainer');
let allCards =document.getElementById('allCardSection');
let span = document.getElementById('span');

let openSection= [];
let closeSection= [];

let searchBtn=document.getElementById('searchBtn');
let searchInput=document.getElementById('searchInput');

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
};

const spans=()=>{
    if(allCards.children.length===0){
    span.classList.add('hidden'); 
}else{
    span.classList.remove('hidden'); 
   }
};
spans();

togglestyle('all-btn');



const allApiSection = ()=>{
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res)=>res.json())
.then((data)=>allCardsSection(data.data));
};

const allCardsSection =(cards)=>{

cards.forEach(item => {

let borderColor = "border-t-green-400"; 
if(item.priority === "low"){
    borderColor = "border-t-purple-400";
};


    totalCardsCount.innerText=Number(allCards.children.length)+ " Issues";
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
};
allApiSection();

// allCardContainer.addEventListener('click', function(event){
// if(event.target.classList.contains('openBtn')){
    // let parentNode=event.target.parentNode.parentNode;
    // let priority=parentNode.querySelector('.priority').innerText;
    // let title=parentNode.querySelector('.title').innerText;
    // let description=parentNode.querySelector('.description').innerText;
    // let lebels1=parentNode.querySelector('.lebels1').innerText;
    // let lebels2=parentNode.querySelector('.lebels2').innerText;
    // let author=parentNode.querySelector('.author').innerText;
    // let createAt=parentNode.querySelector('.createAt').innerText;
    // let assignee=parentNode.querySelector('.assignee').innerText;
    // let updateAt=parentNode.querySelector('.updateAt').innerText;
    // 
// 
    // let cardInfo={
// 
// priority,
// title,
// description,
// lebels1,
// lebels2,
// author,
// createAt,
// assignee,
// updateAt
    // };
//    let exist =openSection.find(item=> item.priority ===cardInfo.priority);
//    if(!exist){
    // openSection.push(cardInfo);
//    }
// };
// 
// });

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
if(item.priority === "low"){
    borderColor = "border-t-purple-400";
};




    
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
    






