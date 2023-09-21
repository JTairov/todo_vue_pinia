<template>
  <main>


    <!-- heading -->

    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- New task form -->

    <div class="new-task-form">
      <TaskForm/>
    </div>

    <!-- Control buttons -->
    <nav class="filter">
      <!-- <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button> -->

      <select @change="(e) => { return filter = e.target.value }">
        <option value="all" default>All tasks</option>
        <option value="favs">Fav tasks</option>
      </select>
    </nav>

    <!-- Loading -->
    <div class="loading" v-if="isLoading">Loading tasks ...</div>

    <!-- Tasks list -->

    <div class="task-list" v-if="filter === 'all'">
      <p>All Tasks: {{ totalCount }} to do</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>Fav tasks: {{ favCount }} to do</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>

    <!-- Reset button -->
    <button @click="taskStore.$reset">Reset Store</button>


  </main>
</template>

<script>
import { useTasksStore } from "./stores/TasksStore"
import { ref } from 'vue'
import TaskDetails from "./components/TaskDetails.vue"
import TaskForm from "./components/TaskForm.vue"
import { storeToRefs } from "pinia"

export default {
  setup() {
    const taskStore = useTasksStore()

    const { tasks, isLoading, totalCount, favCount, favs } = storeToRefs(taskStore)

    // fetch tasks
    taskStore.getTasks()

    const filter = ref('all')

    return { taskStore, filter, tasks, isLoading, totalCount, favCount, favs }
  },

  components: {
    TaskDetails,
    TaskForm
  }
}
</script>