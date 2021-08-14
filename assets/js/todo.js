const input = document.querySelector("#add-input"); //for the inputting of task
const add_btn = document.querySelector("#btn-add"); //for the adding task 
const remove_btn = document.querySelector("#btn-remove"); //for removing a specific task
const clear_btn = document.querySelector('#btn-clear'); // for clearing all task
const list_task = document.querySelector('#task-list'); //for displaying the inputted task
var elements_task = document.getElementsByTagName("LI"); //getting the tag name of 'list' (LI)

//this function is for the adding a task
add_btn.onclick = function () {
    var task = input.value; //where the inputted task is stored

    //checks if input is empty
    if (task == '') {
        alert('please input a task'); //alerts user if no inputted task
    
    } else {

        li = document.createElement('LI'); // creating the newly inputted task
        li.innerHTML = task; //displaying the task
        list_task.insertBefore(li, list_task.childNodes[0]); //appends the newly added task
        input.value = ''; //after adding task, this empties the input form for adding a task
    }
};

//this function is for removing a specific task
remove_btn.onclick = function() {
   var completedTask = list_task.getElementsByClassName('checked'); //getting the checked task by the user

   //checks if there's no task 
    while(completedTask.length > 0){ 
        completedTask.item(0).remove(); /*removes the specific task 
                                          item is zero '(0)' because an element always start w/ index 0*/
    }
}

//this function clears all the task displayed
clear_btn.onclick = function() {
    var allTask = list_task.children; //getting the children or all of the task that being displayed
   
    //checks if there's no task 
    while(allTask.length > 0){
        allTask.item(0).remove(); /*removes all the task 
                                    item is zero '(0)' because an element always start w/ index 0*/
    }
}

//this function is for user allowing to check the selected task
list_task.onclick = function(task){
    if (task.target.tagName == 'LI') { //if element by tag name is equal to list (LI)
        task.target.classList.toggle('checked'); //selected task will have a line through 
    }
};

