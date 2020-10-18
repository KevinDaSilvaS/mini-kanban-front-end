document.getElementById("board-title"
).innerHTML = localStorage.getItem('currentBoardTitle');

const boardId = localStorage.getItem('currentBoard');

const loadTasks = () => {
    fetch(`http://localhost:1747/tasks/${boardId}`).then(async tasks => {

        const jsonTask = await tasks.json();
        addTaskToPage(jsonTask.details);
        return;
    }).catch(error => error);
}

const addTask = () => {
    const title = prompt("task title:");
    if(!title) return alert("title is required")

    let description = prompt("task description:");
    if(!description) description = undefined;

    insertTask({title, description});
}

const addTaskToPage = (tasks) => {
    tasks.map(task => {
        
        const {taskId, title, description, status} = task;
        let id = status;
        if(status == "TO DO") id = "TO-DO";
        
        const taskWrapper = document.getElementById(id);

        let elem = `<p class="task-desc">---</p>`;

        if(description) elem = `<p class="task-desc">${description}</p>`;

        taskWrapper.innerHTML += `
            <div draggable="true" ondragstart="drag(event)" class="task-square" id="${taskId}">
                <h5 class="task-title">${title}</h5>
                ${elem}
            </div>
        `;
    })
}

const insertTask = (task) => {
    task.status = "TO DO";
    fetch(`http://localhost:1747/tasks/${boardId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(async task =>  {
        const jsonTask = await task.json();
        addTaskToPage([jsonTask.details]);
        return;
    }).catch( error => error);
}

const updateStatus = (status = "TO DO", taskId) => {
    fetch(`http://localhost:1747/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status})
    }).catch( error => alert(error));
}
