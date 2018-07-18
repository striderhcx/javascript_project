<template>
  <div>
    <div class="div-todo-add">
        <input placeholder="请输入你想添加的todo" class="input-add-todo" v-model="inputValue"/>
        <button class="btn btn-primary" v-on:click="handleSubmit">提交</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">任务</th>
          <th scope="col">创建时间</th>
          <th scope="col">更新时间</th>
        </tr>
      </thead>
      <tbody>
        <todo-item v-for="(item, index) of list" :key="index" :todo="item" :index="index" v-on:delete-todo="handleDelete" v-on:update-todo="handleUpdate"></todo-item>
      </tbody>
    </table>


  </div>
</template>

<script>
import TodoItem from './components/TodoItem'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
    components: {
        'todo-item': TodoItem
    },
    data: function() {
        return {
            inputValue: '',
            list: [],
        }
    },
    methods: {
    handleSubmit: function() {
        //this.list.push(this.inputValue)
        this.apiTodoAdd('/api/todo/add')
        this.inputValue = ''
    },

    handleDelete: function(index) {
        this.apiTodoDelete('/api/todo/delete?id='+this.list[index].id, index)
    },

    handleUpdate: function(index, updateValue) {
        this.apiTodoUpdate('/api/todo/update', index, updateValue)
    },

    apiTodoAll: function(api) {
        axios.get(api).then((response) => {
            console.log(response.data)
            this.list = response.data
        })
    },

    apiTodoAdd: function(api) {
        if (this.inputValue != '') {
            axios.post(api, {'task': this.inputValue}).then((response) => {
                console.log(response.data)
                this.list.push(response.data)
            })
        }
    },

    apiTodoDelete: function(api, index) {
        axios.get(api).then((response) => {
            console.log(response.data)
            this.list.splice(index, 1)
        })
    },

    apiTodoUpdate: function(api, index, updateValue) {
        var todo = this.list[index]
        axios.post(api, {'id': todo.id, 'task': updateValue}).then((response) => {
            console.log(response.data)
            this.list.splice(index, 1, response.data)
        })
    }

    },

    created: function() {
        this.apiTodoAll("/api/todo/all")  //错误写法（坑了好久）this.$options.methods.apiTodoAll("http://localhost:2000/api/todo/all")
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.input-add-todo {
    display: inline-block;
    width: 50%;
}

.div-todo-add {
    position: relative;
    position: relative;
    left: 20%;
    right: 20%;
}
body {
    background:lightblue;
    background-size: 100%
}
</style>
