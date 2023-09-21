<template>
	<div class="task">
		<h3>{{ task.title }}</h3>
		<div class="icons">
			<i 
				class="material-icons" 
				@click="taskStore.deleteTask(task.id)"
			>
				delete
			</i>
			<i 
				class="material-icons" 
				@click="taskStore.toggleFav(task.id)"
				:class="{isFav: task.isFav}"
			>
				favorite
			</i>
		</div>
	</div>
</template>

<script>
import { useTasksStore } from '../stores/TasksStore';

export default {
	props: {
		task: Object
	},
	setup () {
		const taskStore = useTasksStore()

		return {taskStore}
	}
}
</script>