<template>
	<form @submit.prevent="handleSubmit" class="form">
		<input type="text" placeholder="I need to ..." v-model="newTask">
		<button>Add</button>
	</form>
</template>

<script>
import { useTasksStore } from '../stores/TasksStore';
import { ref } from 'vue'

export default {
	setup() {
		const taskStore = useTasksStore()

		const newTask = ref('')

		const handleSubmit = () => {
			if (newTask.value.length > 0) {
				taskStore.addTask({
					title: newTask.value,
					isFav: false,
					id: Math.floor(Math.random() * 10000)
				})
			}
			newTask.value = ''
		}

		return {newTask, handleSubmit}
	}
}
</script>