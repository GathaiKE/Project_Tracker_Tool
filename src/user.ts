interface Project{
  id:number,
  projectname:string,
  projectstatus:string,
  projectdescription:string
}
interface Users{
  id:number,
  username:string,
  pfpimg:string,
}


let overviewcards = document.querySelector(".overview-cards") as HTMLDivElement;
let projectCards=document.querySelector('.details') as HTMLDivElement
let profile=document.querySelector('.profile') as HTMLDivElement

async function renderprojects() {
  let res = await fetch(`http://localhost:3000/Users/1`);
  let user = await res.json() as Users;
  let username = user.username;
  let pfpimg=user.pfpimg;
// profile information
  let profileHtml:string=`
      <img src=${pfpimg} alt="pfp">
      <h4>${username}</h4>
      `
      profile.innerHTML=profileHtml

// fetching project information for the top cards
  let response = await fetch(`http://localhost:3000/Projects/1`);
  let project = await response.json() as Project;
  let projectname = project.projectname;
  let projectdescription=project.projectdescription;
  let projectstatus=project.projectstatus;

// The top cards
  let overviewhtml=`
          <div class="assigned">
              <div class="assigned-img">
              <img src="./images/Rectangle 35.png" alt="assigned">
              <img src="./images/Rectangle 35.png" alt="assigned">
              </div>
              <h3 class="assigned-h3">Assigned</h3>
              <h2>1</h2>
          </div>
          <div class="completed" id="complete">
              <img src="./images/complete.png" alt="completed">
              <h3>completed</h3>
              <h2>1</h2>
          </div>
          <div class="pending" id="pending">
              <img src="./images/pending.png" alt="Pending">
              <h3>Pending</h3>
              <h2>1</h2>
          </div>
  `
  overviewcards.innerHTML=overviewhtml 
  
// bottom cards
  if(projectstatus==='pending'){
      let assignedDetails =document.querySelector('.assigned-project-details') as HTMLDivElement
      let assignedHtml=`
      <details>
          <summary>
          <p><span>${projectname}</span><span>User Name</span><span id="pending"> Pending <img src="./images/done.png" id="pending-img" alt="icon"><img src="./images/arrow-down.png" id="pending-img" alt=""></p>
          </summary>
          ${projectdescription} 
      </details>
          
      `
      assignedDetails.innerHTML = assignedHtml
  }   else{
      let completeProjects =document.querySelector('.complete-project-details') as HTMLDivElement

      let completeHtml = `
      <details>
          <summary>
          <p><span>${projectname}</span><span>${username}</span><span id="complete"> Complete</p>
          </summary>
          ${projectdescription} 
      </details>
      `
      completeProjects.innerHTML = completeHtml
  }

}

renderprojects();