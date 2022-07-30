const boardElement = document.getElementById('tic-board')
const cellElements = document.querySelectorAll('.cell')
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winMassageText = document.querySelector('.text')
const winBoard = document.querySelector('.winmas')
const button = document.querySelector('.restart')
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,5],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let circleTurn;


startGame()
button.addEventListener('click', startGame)


function startGame(){
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setHoverBoard()
    winBoard.classList.remove('active')
}








function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true)
    }else{
        swapTurns()
        setHoverBoard()
    }
}

function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}




function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}


function swapTurns(){
    circleTurn = !circleTurn
}


function setHoverBoard() {
    boardElement.classList.remove(X_CLASS)
    boardElement.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        boardElement.classList.add(CIRCLE_CLASS)
    }else{
        boardElement.classList.add(X_CLASS)
    }
}


function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combinations =>{
        return combinations.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


function endGame(draw){
    if(draw){
        winMassageText.innerText = `Draw!`
    }else{
        winMassageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winBoard.classList.add('active')
}