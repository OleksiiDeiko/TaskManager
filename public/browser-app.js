const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

//Load all tasks

const showTasks = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
        const {
            data: {tasks},
        } = await axios.get('/api/tasks')
        if(tasks.length < 1) {
            tasksDOM.innerHTML = '<h5 class="empty-list">There are no tasks yet</h5>'
            loadingDOM.style.visibility='hidden'
            return 
        }
        const allTasks = tasks
            .map((task) => {
                const { completed, _id: taskID, name } = task
                return `<div class = "single-task ${completed && 'task-completed'}">
                        <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                        <div class = "task-links">
                        
                        <a href = "task.html?id=${taskID}" class="edit-link">
                        <i class="fas fa-edit"></i>
                        </a>
                        <button type="button" class="delete-btn" data-id="${taskID}">
                        <i class="fas fa-trash"></i>
                        </button>
                        </div>
                        </div>`
            })
            .join('')
        tasksDOM.innerHTML = allTasks
    } catch(err) {
        tasksDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility='hidden'

}
showTasks()

//deleting tasks

tasksDOM.addEventListener('click', async (e) => {
    const element = e.target
    if(element.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible'
        const id = element.parentElement.dataset.id
        try {
            await axios.delete(`/api/tasks/${id}`)
            showTasks()
        } catch (err) {
            console.log(err)
        }
    }
    loadingDOM.style.visibility = 'hidden'
})

//adding tasks

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value

    try {
        await axios.post('/api/tasks', {name})
        showTasks()
        taskInputDOM.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `task added successfully`
        formAlertDOM.classList.add('text-success')
    } catch (err) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `something went wrong`
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
      }, 3000)
})