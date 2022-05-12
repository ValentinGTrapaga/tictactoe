const cells = document.querySelectorAll('[data-cell]')
const X_CLASS = "x"
const O_CLASS = "o"
const WINNING_COMB = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

const winninMessageDiv = document.getElementById("winning-message")
const winninMessage = document.querySelector("[data-winning-message]")
const restarBtn = document.querySelector('#restart-btn')

let circleTurn = false

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS
    //Marker
    placeMark(cell, currentClass)
    //Check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        endTurn()
    }
    //check for draw
    //Switch Turns
}

function placeMark(cell, mark) {
    cell.classList.add(mark)
}

function endTurn() {
    circleTurn = !circleTurn
}

function checkWin(currentClass) {
    return WINNING_COMB.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {
        winninMessage.innerText = `Its a draw`
    } else {
        winninMessage.innerText = `${circleTurn ? "O" : "X"} wins!`
    }
    winninMessageDiv.classList.add("show")
}

function isDraw() {
    return [...cells].every(cell => { //Hago destruct porque si no, la nodeList no tiene .every
        return (cell.classList.contains(X_CLASS) || 
        cell.classList.contains(O_CLASS))
    })
}

restarBtn.addEventListener('click', () => {
    location.reload()
})