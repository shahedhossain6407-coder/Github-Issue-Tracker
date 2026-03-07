const allIssueLoaded = () =>{
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
     fetch(url)
    .then((res)=>res.json())
    .then((json)=>displayAllIssue(json.data))
}


 const displayAllIssue = (allData) => {
    const totalIssue = document.getElementById(`total-issue`);
    const issueContainer = document.getElementById(`issue-container`);
    issueContainer.innerHTML = ""; 
  
    const count = allData.length;
    totalIssue.innerText = count;
  
 allData.forEach((each)=>{
    
 const newDiv = document.createElement(`div`);
 newDiv.innerHTML = `
 
 <div class=" shadow-xl rounded-xl my-5 py-7 px-7 space-y-4  ">
 <div class="icon flex justify-between ">
    <img class="w-10" src="./assets/Open-Status.png" alt="">
    <button class="btn btn-soft btn-error">Medium</button>
 </div>

 <h1 class="font-bold text-2xl ">Fix navigation menu on mobile devices</h1>
 <p>The navigation menu doesn't collapse properly on mobile devices...</p>

   <div class="flex justify-between">
    <button class="btn btn-outline btn-error rounded-full"><i class="fa-solid fa-bug"></i>Bug</button>
    <button class="btn btn-outline btn-warning rounded-full"><i class="fa-regular fa-life-ring"></i> help wanted</button>
   </div><hr>
    <h1 class="text-xl text-gray-500">#1 by john_doe</h1>
    <h1 class="text-xl text-gray-500">#1 by john_doe</h1>
</div>

 `
 issueContainer.append(newDiv)
 })

 }
allIssueLoaded()