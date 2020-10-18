const loadBoards = () => {
    fetch('http://localhost:1747/boards').then(async boards => {

        const jsonBoards = await boards.json();
        addBoardsToPage(jsonBoards.details);
        return;
    }).catch(error => error);
}

const addBoardsToPage = (boards) => {
    const boardWrapper = document.getElementById("my_boards");

    boards.map(board => {
        
        const {boardId, title, description} = board;

        let elem = `<p class="board-desc">---</p>`;

        if(description) elem = `<p class="board-desc">${description}</p>`;

        boardWrapper.innerHTML += `
            <div class="board-square" id="${boardId}" onclick="goToBoard('${boardId}', '${title}')">
                <h5 class="board-title">${title}</h5>
                ${elem}
            </div>
        `;
    })
}

const goToBoard = (boardId, title) => {
    localStorage.setItem('currentBoard', boardId);
    localStorage.setItem('currentBoardTitle', title);
    window.location.href = "http://localhost:5000/tasks/";
}

const addBoard = () => {
    const title = prompt("board title:");
    if(!title) return alert("title is required")

    let description = prompt("board description:");
    if(!description) description = undefined;

    insertBoard({title, description});
}

const insertBoard = (boardData) => {
    fetch(`http://localhost:1747/boards`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boardData)
    })
    .then(async board =>  {
        const jsonBoard = await board.json();
        addBoardsToPage([jsonBoard.details]);
        return;
    }).catch( error => error);
}