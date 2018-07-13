
var log = function() {
    console.log.apply(console, arguments)
}

var bindTodoAddEvent = function() {
    $('#id-button-add').click(function(event){
        //获取 Input.value
        var todoInput = $('#id-input-todo')
        var task = todoInput.val()
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
            <button class='todo-edit pure-button pure-button-primary'>编辑</button>
            <button class='todo-done button-success pure-button'>完成</button>
            <button class='todo-delete button-warning pure-button'>删除</button>
            <span class='todo-span' contenteditable='true'>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `
    return t
}

var bindTodoDoneEvent = function() {
    $('#id-div-container').on('click', '.todo-done', function(event){
        log('done button click')
        // 给 todo div 开关一个状态class
        var button = $(event.target)
        button.closest('.todo-cell').toggleClass('done')
    })
}

var bindTodoDeleteEvent = function() {
    $('#id-div-container').on('click', '.todo-delete', function(event){
        log('delete button click')
        var target = event.target
        var index = indexOfElement(target.parentElement)
        //把元素从todoList中 remove掉
        //delete todoList[index]
        todoList.splice(index, 1)
        saveTodos()
        var button = $(event.target)
        button.closest('.todo-cell').remove()
    })
}

var bindTodoEditEvent = function() {
    $('#id-div-container').on('click', '.todo-edit', function(event){
        log('edit button click')
        var button = $(event.target)
        var t = `<div id='id-div-update-cell'><input id="id-input-todoupdate" type="text" name="" value="">
        <button id='id-button-update' class='todo-update'>更新</button><div>`
        var todoDiv = button.closest('.todo-cell').append(t)
    })
}

var bindTodoUpdateEvent = function() {
    $('#id-div-container').on('click', '.todo-update', function(event){
        log('update button click')
        var button = $(event.target)
        var index = indexOfElement(button.closest('.todo-cell')[0])
        var input = button.closest('#id-div-update-cell').find('#id-input-todoupdate')
        var todoSpan = button.closest('.todo-cell').find('.todo-span')
        todoSpan.text(input.val())  //为todo设置新的值
        todoList[index].task = input.val()  //通过val()方法可以拿到input的值
        saveTodos()
        button.closest('#id-div-update-cell').remove()
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

var todoList = []
var initTodo = function() {
    todoList = loadTodos()
    for (var i=0; i<todoList.length; i++) {
        var todo = todoList[i]
        insertTodo(todo)
    }
}

var bindTodoEvent = function() {
    bindTodoAddEvent()
    bindTodoDoneEvent()
    bindTodoEditEvent()
    bindTodoUpdateEvent()
    bindTodoDeleteEvent()
}
var _main = function() {
    initTodo()
    bindTodoEvent()
}

_main()
