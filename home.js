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
closeBtn.classList.add('btn-outlinek' ,'text-blue-800');


let selected= document.getElementById(id);
currentStatus = id;
selected.classList.add('bg-blue-800', 'text-white');
};
togglestyle('all-btn');