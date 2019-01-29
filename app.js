let taskInput = document.querySelector('#tasks');
let addTaskBtn=document.querySelector('#add');
let clearTaskBtn=document.querySelector('#clear');
let list=document.querySelector('.list-group');
let card=document.querySelector('.card');
let alertDiv=document.querySelector('.alert')
let sort=document.querySelector('#sort')
let tasks;
let inputValue
(function taskParser() {
    if(JSON.parse(localStorage.getItem('tasks'))!==null)
    {tasks= JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(addTaskToUI)}
})();



function addTaskToUI(task) {
    let li=document.createElement('li');
    li.className='list-group-item small py-2 text-uppercase';
    li.appendChild(document.createTextNode(task))
    // time=document.createElement('small')
    // time.className='text-muted';
    // time.innerText=`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    // li.appendChild(time)
    let span1=document.createElement('span');
    let span2=document.createElement('span');
    let div=document.createElement('div')
    div.className='input-group d-none'
    div.innerHTML='<input type="text"class="form-control form-control-sm mt-2" id="tasks"><span class="text-danger pl-1"><i class="fa fa-check" aria-hidden="true"></i></span>'
    span1.className='float-right text-danger d-inline-block';
    span1.innerHTML='<i class="fa fa-times" aria-hidden="true"></i>'
    span2.className='float-right text-danger d-inline-block';
    span2.innerHTML='<i class="fa fa-pencil pr-3" aria-hidden="true"></i>'
    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(div);
    list.appendChild(li)
}

function addTask(e) {
    e.preventDefault()
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[]
    }
    else
    {
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    taskInputValue=taskInput.value.toUpperCase()
    if(taskInputValue!=="")
            {  if(!tasks.includes(taskInputValue))
                    {tasks.push(taskInputValue);
                        localStorage.setItem('tasks',JSON.stringify(tasks))
                        addTaskToUI(taskInputValue);
                        alertDisplay('Task Successfully Added!')
                    } 
                else alertDisplay('Task Already Exist!')
            }
    else alertDisplay('Empty Task Cannot Be Added!')
    taskInput.value="";
    
}

function alertDisplay(alertMessage) {
    alertDiv.innerText=`${alertMessage}`
    alertDiv.classList.remove('d-none')
        alertDiv.classList.add("d-Block")
        setTimeout(function () {
            alertDiv.classList.remove('d-block')
            alertDiv.classList.add("d-none")
        },1000)
}



function deleteTask(e) { 
    let search = tasks.indexOf(e.target.parentElement.parentElement.childNodes[0].nodeValue);
        if(search!==-1)
        {
            tasks.splice(search,1) ;
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
        e.target.parentElement.parentElement.remove();
        alertDisplay('Task Successfully Deleted') 
}

function taskEditor(e) {
    if (e.target.className==='fa fa-times') {
        deleteTask(e);
    }
    else if(e.target.className==='fa fa-pencil pr-3')
    {
        updateTaskDisp(e);
    }
    else if(e.target.className==='fa fa-check')
    {
        let newVal=e.target.parentElement.parentElement.children[0].value;
        newVal=newVal.toUpperCase()
        tasks= JSON.parse(localStorage.getItem('tasks'));
        itemIndex=tasks.indexOf(inputValue)
        if(newVal!=="")
            {  if(!tasks.includes(newVal))
                    {
                        tasks[itemIndex]=newVal;
                        localStorage.setItem('tasks',JSON.stringify(tasks));
                        alertDisplay('Task Successfully Updated')
                        
                        setTimeout(location.reload(),4000)
                        
                    } 
                
            }

           else location.reload();
        
        
        
        
    }
}

function updateTaskDisp(e) {
    inputValue=e.target.parentElement.parentElement.childNodes[0].nodeValue;
    let el=e.target.parentElement.parentElement.children
    el[0].classList.remove('d-inline-block');
    el[0].classList.add('d-none');
    el[1].classList.remove('d-inline-block');
    el[1].classList.add('d-none');
    el[2].classList.remove('d-none');
    
}

function sortTasks() {
    tasks= JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks.sort());
    
    localStorage.setItem('tasks',JSON.stringify(tasks.sort()));
    // location.reload();
}


function clearTask() {
   let  l=tasks.length;
   if(tasks.length===0)
   alertDisplay('Nothing To Clear')
   else{
            lis=document.querySelectorAll('li')
            for (let i = 0; i < l; i++) {
                tasks.pop();
                lis[i].remove()
            }
            localStorage.setItem('tasks',JSON.stringify(tasks))
            alertDisplay('Tasks Successfully Cleared')
   }
   

}


card.addEventListener('click',taskEditor)
addTaskBtn.addEventListener('click',addTask);
clearTaskBtn.addEventListener('click',clearTask)
sort.addEventListener('click',sortTasks)