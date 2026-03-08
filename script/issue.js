let allIssues = []
const allBtn = document.getElementById(`all-btn`);
const openBtn = document.getElementById(`open-btn`);
const closedBtn = document.getElementById(`closed-btn`);
const loadingSpinner = document.getElementById(`loading`);
const buttons = [allBtn,openBtn,closedBtn]

const manageSpinner = (stutus) =>{
 if(stutus == true){
    document.getElementById(`loading`).classList.remove(`hidden`);
    document.getElementById(`issue-container`).classList.add(`hidden`);
 }else{
    document.getElementById(`loading`).classList.add(`hidden`);
    document.getElementById(`issue-container`).classList.remove(`hidden`);
 }
}
const clickBtn = (id) =>{

buttons.forEach((btn)=>btn.classList.remove(`active`));
const currentBtn = document.getElementById(id);
currentBtn.classList.add(`active`);
}
clickBtn(`all-btn`);


allBtn.addEventListener('click', () => {
    clickBtn('all-btn');
    displayAllIssue(allIssues);
});

openBtn.addEventListener('click', () => {
    clickBtn('open-btn');
    const openIssues = allIssues.filter(issue => issue.status === 'open');
    displayAllIssue(openIssues);
});
closedBtn.addEventListener('click', () => {
    clickBtn('closed-btn');
    const closedIssues = allIssues.filter(issue => issue.status === 'closed');
    displayAllIssue(closedIssues);
});


const allIssueLoaded = () =>{
    manageSpinner(true) 
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
     fetch(url)
    .then((res)=>res.json())
    .then((json) => {
     allIssues = json.data;
     displayAllIssue(allIssues);
   })
}

const showModel = async (id) =>{
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  console.log(url)
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data)
}
const displayDetails = (person) =>{
   
 const detailsContainer = document.getElementById(`details-container`);
 detailsContainer.innerHTML = `
 
 
                <div class="space-y-6 ">
                    <h1 class="font-bold text-2xl">${person.title}</h1>
                 <div class="flex items-center gap-2">

                 <button class="btn btn-accent rounded-3xl text-white">${person.status}</button>
                 <span class="text-xl font-bold">•</span>
                 <h2 class="text-gray-500 font-bold text-xl">${person.status} by ${person.author}</h2>
                 <span class="text-xl font-bold">•</span>
                 <h2 class="text-gray-500 text-sm">
                 ${new Date(person.createdAt).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                })}
                 </h2>
                 </div>

                 <div class="flex gap-2">
                    <button class="btn btn-outline btn-error rounded-full"><i class="fa-solid fa-bug"></i>${person.labels[0]?person.labels[0]:"No labels found"}</button>
                    <button class="btn btn-outline btn-warning rounded-full"><i class="fa-regular fa-life-ring"></i>${person.labels[1]?person.labels[1]:"No labels found"}</button>
                 </div>

                   <p class="text-xl text-gray-500">${person.description}</p>
              
                  <div>
                    <div class="bg-blue-50 mt-10 p-5 flex gap-20 rounded-md ">
                       <div>
                        <h1>Assignee:</h1>
                        <h2>${person.assignee? person.assignee : "Unassigned"}</h2>
                       </div>
                        <div class="flex flex-col justify-center items-start gap-2 ">
                            <h1>Priority:</h1>
                            <button class="btn btn-active btn-error w-[70px] h-[24px] rounded-[80px] text-white ">${person.priority}</button>
                        </div>
                    </div>
                </div>
                  <div class="modal-action">
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary">Close</button>
                  </form>
                </div>
 `
    document.getElementById(`details_modal`).showModal()
}

      document.getElementById(`search-btn`).addEventListener(`click`,()=>{
       const searchInput = document.getElementById(`search-input`);
       const searchValue = searchInput.value.trim().toLowerCase();
       
       fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
       .then((res)=>res.json())
       .then((data)=> {
        const allDocument = data.data;
        displayAllIssue(allDocument);  
         
       })
    })

 const displayAllIssue = (allData) => {
 
    const totalIssue = document.getElementById(`total-issue`);
    const issueContainer = document.getElementById(`issue-container`);
    issueContainer.innerHTML = ""; 
    const count = allData.length;
    totalIssue.innerText = count;
  
 allData.forEach((each,i)=>{
 const newDiv = document.createElement(`div`);
 if(each.status === "open"){
    newDiv.classList.add(`green-border`)    
 }else{
   newDiv.classList.add(`purple-border`)
 }
 newDiv.innerHTML = `
 
 <div onclick="showModel(${each.id})"  class=" shadow-xl rounded-xl my-5  px-7 space-y-2 w-[100%]  min-h-full">
 <div class="icon flex justify-between ">
    <img  class="w-10" src="./assets/Open-Status.png" alt="">
    <button class="btn btn-soft btn-error">${each.priority}</button>
 </div>
 <h1 class="font-bold text-2xl ">${each.title}</h1>
 <p>${each.description}</p>
   <div class="flex justify-between">
    <button class="btn btn-outline btn-error btn-sm rounded-full"><i class="fa-solid fa-bug"></i>${each.labels[0]?each.labels[0]:"No labels found"}</button>
    <button class="btn btn-outline btn-warning btn-sm rounded-full"><i class="fa-regular fa-life-ring"></i>${each.labels[1]?each.labels[1] : "No labels found"}</button>
   </div><hr>
    <h1 class="text-xl text-gray-500">#${i + 1} by ${each.author}</h1>
    <h1 class="text-xl text-gray-500">
    ${new Date(each.createdAt).toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    })}
    </h1>
</div>

 `
 issueContainer.append(newDiv)
 
 })
 manageSpinner(false)
}
allIssueLoaded()