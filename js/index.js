let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');
todoList=[];
if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}
addButton.addEventListener('click', function(){
    let newToDo={
        todo:addMessage.value,
        checked:false,
        important:false
    }
    todoList.push(newToDo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList))

});
function displayMessages(){
    let displayMessage=''
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked':''}>
        <label for='item_${i}' class="${item.important ? 'important':''}">${item.todo}</label>
        </li>
        `
        todo.innerHTML= displayMessage;
    });
   
}
todo.addEventListener('change',function(event){
    let ValueLabel = todo.querySelector('[for=' +event.target.getAttribute('id') +']').innerHTML;
    console.log(ValueLabel);
    todoList.forEach(function(item){
        if(item.todo === ValueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})
todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey){
                todoList.splice(i,1);
            }
            else{
                item.important = !item.important;
            }
            
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});
