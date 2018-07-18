<template>
        <tr>
          <th scope="row">{{ todo.id }}</th>
          <td>{{ todo.task }}</td>
          <td>{{ todo.created_time }}</td>
          <td>{{ todo.updated_time }}</td>
          <td><button class="btn btn-primary" v-on:click="handleEdit">编辑</button></td>
          <td v-if="complete"><button class="btn btn-success" v-on:click="handleComplete">完成</button></td>
          <td v-else><button class="btn btn-secondary" v-on:click="handleComplete">未完成</button></td>
          <td><button class="btn btn-danger" v-on:click="handleDelete">删除</button></td>
          <div id='id-div-update-cell' class="alert alert-primary" v-show="show">
            <input v-model="updateValue"/>
            <button class="btn btn-primary" id='id-button-update' v-on:click="handleUpdate">更新</button>
        </div>
        </tr>
</template>

<script>
export default {
    data: function() {
        return {
            show: false,
            updateValue: '',
            complete: false,
        }
    },
    props: ['todo', 'index',],
    methods: {
        //删除被点击
        handleDelete: function() {
            this.$emit('delete-todo', this.index)
        },
        //编辑被点击
        handleEdit: function() {
            this.show = true
        },
        //更新被点击
        handleUpdate: function() {
            this.show = false
            if (this.updateValue != '') {
                this.$emit('update-todo', this.index, this.updateValue)
            }
        },
        //完成被点击
        handleComplete: function() {
            this.complete = !this.complete
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- 加上scoped属性限制css只影响本组件，即使父组件引用这些样式，也不会被影响到！ -->
<style scoped>
    .item {
        color: green;
    }
</style>
