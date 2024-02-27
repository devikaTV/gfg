window.onload=function(){
  const todoInp = document.getElementById('todo-inp');
  const todoBtn = document.getElementById('todo-btn');
  const list = document.getElementById('list');
  var deleteButton
  var editButton
  var upbutton
  var downbutton
  var editFlag = "false"
  var editItem

  
  
  

    function uuid() {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
  }
    
  const todos = [
      {
          id: uuid(),
          task: "Go to Gym"
      },
      {
          id: uuid(),
          task: "Buy Vegetables"
      },
      {
          id: uuid(),
          task: "Learn Web"
      },
  ];

  function createlist() {
    
    for (let todo of todos) {
      
      var taskDiv = document.createElement('div')
      taskDiv.style.display="flex"
      taskDiv.style.justifyContent ="space-between"
      taskDiv.style.border=  "0.2px solid lightgray"


      const li = document.createElement('li');
      li.className ="taskListItem"

      const p = document.createElement('p');
      p.className = "taskItem"
      p.innerText = todo.task;
      

      var controlDiv = document.createElement('div')
      controlDiv.style.display="flex"
      controlDiv.style.alignItems="center"
      controlDiv.style.justifyContent ="space-between"

      editButton = document.createElement('button')
      editButton.className='editbtn'
      editButton.textContent = 'Edit' 
      editButton.style.fontSize="1rem"
      editButton.style.width = "50%"
      editButton.style.height = "40%"
      controlDiv.appendChild(editButton)

      deleteButton = document.createElement('button')
      deleteButton.className='deletebtn'
      deleteButton.textContent = 'Delete'
      deleteButton.style.fontSize="1rem"
      deleteButton.style.width = "60%"
      deleteButton.style.height = "40%"          
      controlDiv.appendChild(deleteButton)


      var movediv = document.createElement('div')
      movediv.style.display="flex"
      movediv.style.flexDirection="column"
      movediv.style.justifyContent="space-between"

      upbutton = document.createElement('button')
      upbutton.className='upbtn'
      upbutton.innerHTML="<"
      upbutton.style.width="20px"
      upbutton.style.fontSize="0.9rem"

      upbutton.style.transform='rotate(90deg)'
      movediv.appendChild(upbutton)

      downbutton = document.createElement('button')
      downbutton.className='downbtn'
      downbutton.style.width="20px"
      downbutton.innerHTML= ">"
      downbutton.style.fontSize="0.9rem"

      downbutton.style.transform='rotate(90deg)'
      movediv.appendChild(downbutton)

      controlDiv.appendChild(movediv)

      taskDiv.appendChild(p)
      taskDiv.appendChild(controlDiv)

      li.appendChild(taskDiv)
      list.append(li);
      
  }

  }
  // Takes all the todos and add them to the UI
    function refreshTodos() {
      // remove all the li which are there in the list
      while (list.firstChild) {
          list.firstChild.remove();
      }

      createlist()
      editbtn=document.querySelectorAll('.editbtn')
      deletebtn=document.querySelectorAll('.deletebtn')
      upbtn=document.querySelectorAll('.upbtn')
      downbtn=document.querySelectorAll('.downbtn')    
    }


      // Add new todo
      function addTodo(taskItem,editItem) {
        if (editFlag!="true"){
          todos.push({ id: uuid(), task: taskItem });
          refreshTodos();
          listen();
        }
        else{
          
          content = editItem.target.parentElement.parentElement.firstChild.textContent
          console.log("contents:",content)
          for (i=0; i<todos.length; i++) {                       
            if (todos[i].task == content){
              todos[i].task = taskItem
              console.log("edited in list")
              break
            }
            
          }
          todoBtn.innerHTML="Add"
          //no need to change in ui -- refreshTodos create lis with todos dict
          //editItem.target.parentElement.parentElement.firstChild.textContent = taskItem
          
          editFlag="false"
          refreshTodos();
          listen();
        }
          
      }

      // Initialise todo
    function init() {
      createlist()
      editbtn = document.querySelectorAll('.editbtn')
      deletebtn=document.querySelectorAll('.deletebtn')
      upbtn=document.querySelectorAll('.upbtn')
      downbtn=document.querySelectorAll('.downbtn')
      listen()    
    }

    init();

    function listen(){
      //listener for edit button
      //limitation---> edit the first occurence of the task item in the ol in ui
      for (var i=0; i< editbtn.length; i++ ){
        editbtn[i].addEventListener('click',(e)=>{
          console.log(editbtn.length)
          console.log('edit is pressed')
          var controldiv = e.target.parentElement
          var taskdiv = controldiv.parentElement
          task = taskdiv.firstChild.textContent
          console.log(task)
          console.log(todoInp.innerHTML)
          todoInp.value = task
          todoBtn.innerHTML="Edit"
          editItem = e;
          editFlag="true"
        })
      }

      //listener for delete button
      for (var i=0; i< deletebtn.length; i++ ){
        deletebtn[i].addEventListener('click',(e)=>{
          //console.log(deletebtn.length)
          console.log('delete is pressed')
          var controldiv = e.target.parentElement
          var taskdiv = controldiv.parentElement
          var task = taskdiv.firstChild.textContent
          //console.log(task)

          taskdiv.parentElement.remove()

          //limitation--->only delete any of the occurence of that task in todos(if there are 2 todos with same task ??)
          
          for (i=0; i<todos.length; i++) {
            
            if (todos[i].task == task){
              console.log(todos[i].task)
              todos.splice(i,1)
              console.log(todos.length)
              console.log(todos[i+1])
              break;
            }
            
          }

        })
      }

      //ol--->li-->div-->p,(div)-->edit,deletebtn,(div)-->upbtn,downbtn
      for (var i=0; i< upbtn.length; i++ ){
        upbtn[i].addEventListener('click',(e)=>{
          console.log(upbtn.length)
          console.log('move up button is pressed')
          var movdiv = e.target.parentElement
          var taskdiv = movdiv.parentElement.parentElement
          console.log(taskdiv.firstChild.textContent)

          var liElement = taskdiv.parentElement
          
          var oList = liElement.parentElement
          console.log(oList.childElementCount)

          if(liElement.previousElementSibling){
            liElement.parentNode.insertBefore(liElement,liElement.previousElementSibling)
          }


        })
      }

      for (var i=0; i< downbtn.length; i++ ){
        downbtn[i].addEventListener('click',(e)=>{
          console.log('move down button is pressed')
          var movdiv = e.target.parentElement
          var taskdiv = movdiv.parentElement.parentElement
          console.log(taskdiv.firstChild.textContent)

          var liElement = taskdiv.parentElement
          
          var oList = liElement.parentElement
          console.log(oList.childElementCount)
          //nextElement = liElement.nextElementSibling

          if(liElement.nextElementSibling){
            liElement.parentNode.insertBefore(liElement.nextElementSibling,liElement)
          }

        })
      }

    }
    
    
    
    todoBtn.addEventListener('click', function () {
      const inpText = todoInp.value;
      addTodo(inpText,editItem)
    });
    
    
    
}