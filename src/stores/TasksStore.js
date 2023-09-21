import { defineStore } from "pinia";

export const useTasksStore = defineStore('tasksStore', {
	state: () => ({
		tasks: [],
		isLoading: false
	}),
	getters: {
		favs() {
			return this.tasks.filter(task => task.isFav)
		},
		favCount() {
			return this.tasks.reduce((sum, current) => {
				return current.isFav ? ++sum : sum
			}, 0)
		},
		totalCount: (state) => {
			return state.tasks.length
		}
	}, 
	actions: {
		async getTasks() {
			this.isLoading = true

			const response = await fetch("http://localhost:3000/tasks")
			const data = await response.json()
			
			this.tasks = data
			this.isLoading = false
		},
		async addTask(task) {
			this.tasks.push(task)

			const response = await fetch("http://localhost:3000/tasks", {
				method: 'POST',
				body: JSON.stringify(task),
				headers: {
					'Content-Type': 'application/json',
				}
			})

			if (response.error) {
				console.log(response.error)
			}
		},
		async deleteTask(id) {
			this.tasks = this.tasks.filter((task) => {
				return task.id !== id
			})

			const response = await fetch("http://localhost:3000/tasks/" + id, {
				method: 'DELETE',
			})

			if (response.error) {
				console.log(response.error)
			}
		},
		async toggleFav(id) {
			const task = this.tasks.find(task => task.id === id)
			task.isFav = !task.isFav

			const response = await fetch("http://localhost:3000/tasks/" + id, {
				method: 'PATCH',
				body: JSON.stringify({isFav: task.isFav}),
				headers: {
					'Content-Type': 'application/json',
				}
			})

			if (response.error) {
				console.log(response.error)
			}
		}
	}
})

