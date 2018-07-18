import Vue from 'vue'
import Router from 'vue-router'
import TodoItem from '@/components/TodoItem'
import TodoList from '../TodoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    }
  ]
})
