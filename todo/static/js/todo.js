
var todoList = []
var log = function() {
    console.log.apply(console, arguments)
}

var bindAddEvent = function() {
    var addButton = document.querySelector('#id-button-add')
    addButton.addEventListener('click', function(){
        //获取 Input.value
        var todoInput = document.querySelector('#id-input-todo')
        var task = todoInput.value
        //生成 todo对象
        var todo = {
            'task':task,
            'time': currentTime()
        }
        todoList.push(todo)
        saveTodos()
        insertTodo(todo)
    })
}

var insertTodo = function(todo) {
    //添加到container中
    var todoContainer = document.querySelector('#id-div-container')
    var t = templateTodo(todo)
    //这个方法用来添加元素更加方便，不需要 createElement
    todoContainer.insertAdjacentHTML('beforeend', t)
}
var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <button class='todo-edit'>编辑</button>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span contenteditable='true'>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `
    return t
}

var bindTodoEvent = function() {
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('click', function(event){
        log('container click', event, event.target)
        var target = event.target
        if(target.classList.contains('todo-done')) {
            log('done')
            // 给 todo div 开关一个状态class
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
        } else if (target.classList.contains('todo-delete')) {
            log('delete')
            var todoDiv = target.parentElement
            var index = indexOfElement(target.parentElement)
            todoDiv.remove()
            //把元素从todoList中 remove掉
            //delete todoList[index]
            todoList.splice(index, 1)
            saveTodos()
        } else if (target.classList.contains('todo-edit')) {
            log('edit')
            var t = `<div id='id-div-update-cell'><input id="id-input-todoupdate" type="text" name="" value="">
            <button id='id-button-update' class='todo-update'>更新</button><div>`
            var todoDiv = target.parentElement.insertAdjacentHTML('beforeend', t)
        } else if (target.classList.contains('todo-update')) {
            var updateDiv = event.target.parentElement
            var index = indexOfElement(updateDiv.parentElement)
            var input = updateDiv.querySelector('#id-input-todoupdate')
            var todoSpan = updateDiv.parentElement.querySelector('span')
            todoSpan.innerText = input.value  //为todo设置新的值
            todoList[index].task = input.value
            saveTodos()
            updateDiv.remove()
        }
    })
}


//保存todoList到localStorage
var saveTodos = function() {
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

var loadTodos = function() {
    var s = localStorage.todoList
    return JSON.parse(s)
}

var indexOfElement = function(element) {
    var parent = element.parentElement
    for (var i=0; i<parent.children.length; i++) {
        var e = parent.children[i]
        if (e === element) {
            return i
        }
    }

}

var currentTime = function() {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString
}

//这个函数用来开关一个元素的某个class
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var initTodo = function() {
    todoList = loadTodos()
    for (var i=0; i<todoList.length; i++) {
        var todo = todoList[i]
        insertTodo(todo)
    }
}

var _main = function() {
    initTodo()
    bindAddEvent()
    bindTodoEvent()
}

_main()
