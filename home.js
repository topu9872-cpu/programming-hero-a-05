let totalCardsCount =document.getElementById('totalCards');


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
togglestyle('all-btn');

const allApiSection = ()=>{
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res)=>res.json())
.then((data)=>allCardsSection(data.data));
};


const allCardsSection =(cards)=>{
let allCards =document.getElementById('allCardSection');

cards.forEach(item => {
    totalCardsCount.innerText=Number(allCards.children.length)+ " "+ "Issues"
    let card =document.createElement('div');
    card.innerHTML=`
     <div class="space-y-3 border-t-4 p-8 pb-20 bg-white border-t-green-400 rounded-2xl">
     <p class="flex justify-end">${item.priority}</p>
     <h2 class="text-3xl font-semibold">${item.title}</h2>
     <p class="text-gray-500">${item.description}</p>
     <div class="flex gap-5">
         <p class="bg-yellow-500 rounded-lg p-2">${item.labels[0] || "did not found labels"}</p>
         <p class="bg-yellow-500 rounded-lg p-2">${item.labels[1] || "did not found labels"}</p>
          </div>
         
         <div class=" flex gap-5 justify-between border-t border-t-gray-400 pt-6">
              <div class="space-y-3">
             <p class="text-gray-500">${item.author}</p>
             <p class="text-gray-500">${item.createdAt}</p>
              </div>
             <div class="space-y-3">
               <p class="text-gray-500">${item.assignee}</p>
               <p class="text-gray-500">${item.updatedAt}</p>  
             </div>
     </div>
 </div>
    `;
    allCards.append(card);
});

};
allApiSection();
