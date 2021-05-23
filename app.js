document.querySelector('#addbutton').addEventListener('click', function(){
    const name = document.querySelector('#nameInput').value;
    const assignedTo = document.querySelector('#assignedInput').value;
    const taskDescription = document.querySelector('#descriptionInput').value;
    const dueDate = document.querySelector('#dateInput').value;
    const status = document.querySelector('#statusInput').value;

    let valuesValid = validateForm(name, assignedTo, taskDescription, dueDate, status)
    if(valuesValid == true){
        console.log("all valid")

        let newTask = createObject (name, assignedTo, taskDescription, dueDate, status)
        tm.addTask(newTask)
        display()
        console.log(tm.tasks)
    } else {
        console.log("Not valid")
    }  
})
                                        //TASK 3
// this is where I check for input validation 
        function validateForm(name, assignedTo, taskDescription, dueDate, status){
        let validateForm = true
        if (name === '' || name.length > 20) {
            alert ('Name is required and it needs to be less than 20 characters')
            validateForm=false
          }
        
          if (assignedTo === '' || assignedTo.length>20) {
            alert('Assigned to is required and it needs to be less than 20 characters')
            validateForm=false
          }            
          if (taskDescription === '' || taskDescription.length>20) {
            alert('Description to is required and it needs to be less than 20 characters')
            validateForm=false
          }   
          if (dueDate === '') {
            alert('Enter valid due date')
            validateForm=false
          }
          if (status === '' || status.length>20) {
            alert('Please enter valid status')
            validateForm=false
          }
          return validateForm;
        }
        //for todays date
        dateInput.min = new Date().toISOString().split("T")[0];

                                                // TASK 4


function createObject (name, assignedTo, taskDescription, dueDate, status){
    //this function takes the user input and makes an object
    //this object is stored in the taskArray for use later on
    let ID = 0
    if(tm.tasks.length == 0){
        ID = 1
    } else {
        let lastItemID =tm.tasks[tm.tasks.length-1].ID
        ID = lastItemID + 1
    }

    let myObject = {
        "name": name,
        "AssignedTo": assignedTo,
        "taskDescription": taskDescription,
        "DueDate": dueDate,
        "status": status,
        "ID": ID
        }
    

    // myTaskArray.push(myObject)
    return myObject
}
class TaskManager {
    constructor() {
        this.tasks=[]
}

 getAllTasks(){
    return this.tasks
    //function that populates all tasks on the page when it loads 
}

addTask(task){
    this.tasks.push (task)
    console.log (this.tasks)
    this.updateLocalStorage()
    
}
                                    // This will be stored in Local storage
updateLocalStorage(){
    localStorage.setItem("taskList" , JSON.stringify(this.tasks))
    location.reload()
}

loadFromLocalStorage(){
    let tasks = JSON.parse(localStorage.getItem("taskList"))
    if (tasks){
        this.tasks = tasks
    }
    for (let items in this.tasks) {
        display ()
    }
}

deleteTasks(){
    let event = window.event.target 
    // parent node is basically a step up to a class - first parent node = line 117, second parent node = line 112 , 3rd parent node = ID 
   //  work out how to identify the task that was clicked, delete from array and page
   console.log (event)
   let removeTheCard = event.parentNode.parentNode.parentNode
   console.log (removeTheCard)
   let taskID = removeTheCard.attributes.id.value
   console.log (taskID)

   let deletedCard= document.getElementById(taskID)
   deletedCard.remove()
 

   // for each task in my array (this.tasks) , if the array task is equal to the identical ID, then splice will remove the task (index 1) for instance. 
   let task = 0
   for (task in this.tasks) {
       if (this.tasks[task].ID == taskID){
           this.tasks.splice (task, 1)
       }

   };
   console.log (this.tasks)
   this.updateLocalStorage()
}

}
                                                        //TASK 5 - ADD TASK PROGRAMATICALLY
    let tm = new TaskManager(); 
    tm.loadFromLocalStorage();

    function display(){

     let cardOutput = document.querySelector('#myTaskCards')

     cardOutput.innerHTML=""   

for (x in tm.tasks) {
 
    
    let createCard =  `
    <div style="width:20rem" id="${tm.tasks[x]["ID"]}">
    <div class="card" >
    <div class="card-header">
        <h3>Task ${tm.tasks[x]["ID"]}</h3>
    </div>
    <ul class="list-group list-group-flush card-space">
             <li class="list-group-item">Name: </span>${tm.tasks[x] ["name"]}</li>
             <li class="list-group-item">Assigned To: </span>${tm.tasks[x] ["AssignedTo"]}</li>
            <li class="list-group-item">Description: </span>${tm.tasks[x] ["taskDescription"]}</li>
            <li class="list-group-item">Due Date: </span>${tm.tasks[x] ["DueDate"]}</li>
            <li class="list-group-item">Status: </span>${tm.tasks[x] ["status"]}</li>
            <button type="button" class="btn btn-danger" onclick = "tm.deleteTasks()" btn-purpose="delete-card">Delete Task</button>
        </ul>
     </div>
     </div>
    `
    cardOutput.innerHTML += createCard

    

    // let summary = document.querySelector("#cardSummary")
    // summary.innerHTML =  ""
    
    // for (x in tm.tasks){
    //     let summaryHTML = ` <a href="#" class="list-group-item list-group-item-action " id="${tm.tasks[x]["ID"]}">
    //     <div class="d-flex w-100 justify-content-between">
    //       <h5 class="mb-1"><strong>Task for: </strong>${tm.tasks[x]["AssignedTo"]}</h5>
    //       <small><strong>Due: </strong>${tm.tasks[x]["DueDate"]}</small>
    //     </div>
    //     <p class="mb-1"><strong>Status: </strong>${tm.tasks[x]["status"]}</p>
    //     <small></small>
    //   </a>`
    //   summary.innerHTML += summaryHTML
    //     }

        }
    };
