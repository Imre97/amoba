import React, { useState, useRef } from 'react'
import './App.css'
import Row from './components/Row'

function App() {

  const [board, setBoard] = useState(Array(10).fill(null).map(() => Array(10).fill('X')))
  const [xIsNext, setXIsNext] = useState(true)
  const [playerOne, setPlayerOne] = useState('')
  const [playerTwo, setPlayerTwo] = useState('')
  const [playerOneMark, setPlayerOneMark] = useState('')
  const [playerTwoMark, setPlayerTwoMark] = useState('')

  const playerOneEl = useRef()
  const playerTwoEl = useRef()

  const playerOneMarkEl = useRef()
  const playerTwoMarkEl = useRef()


  const CalculateWinner = () => {
    //check rows
    for(let i = 0; i <= 9; i++){
      for(let j = 0; j <= 6; j++){
        if(board[i][j] && board[i][j] === board[i][j+1] && board[i][j] === board[i][j+2] && board[i][j] === board[i][j+3] && board[i][j] === board[i][j+4]){
          return board[i][j]
        }
      }
    }
    //check columns
    for(let i = 0; i <=5; i++){
      for(let j = 0; j <= 9; j++){
        if(board[i][j] && board[i][j] === board[i+1][j] && board[i][j] === board[i+2][j] && board[i][j] === board[i+3][j] && board[i][j] === board[i+4][j]){
          return board[i][j]
        }
      }
    }
    //check top left to rigth bottom
    for(let i = 0; i <= 5; i++){
      for(let j = 0; j <= 5; j++){
        if(board[i][j] && board[i][j] === board[i+1][j+1] && board[i][j] === board[i+2][j+2] && board[i][j] === board[i+3][j+3] && board[i][j] === board[i+4][j+4]){
          return board[i][j]
        }
      }
    }
    //check top rigth to left bottom
    for(let i = 5; i>=0; i--){
      for(let j = 9; j >= 0; j--){
        if(board[i][j] && board[i][j] === board[i+1][j-1] && board[i][j] === board[i+2][j-2] && board[i][j] === board[i+3][j-3] && board[i][j] === board[i+4][j-4]){
          return board[i][j]
        }
      }
    }
    return null
  }


  const winner = CalculateWinner(board)

  const  checkWinnerName = () => {
    if(winner === playerOneMark){
      return playerOne
    }else {
      return playerTwo
    }
  }

  const winnerName = checkWinnerName(winner)

  const handleCellClick = (row, column) => {


    if(winner) return

    const boardCopy = [...board]


    if (boardCopy[row][column]){
      alert('Ez a cella foglalt')
      return
    }

    boardCopy[row][column] = xIsNext ? (playerOneMark ? playerOneMark : 'X') : (playerTwoMark ? playerTwoMark : 'O')

    setBoard(boardCopy)

    setXIsNext(!xIsNext)

  }

  const newGame = () => {
    
    if(playerOne === '' || playerTwo === ''){
      alert('Add meg a neved')
      return
    } else if(playerOne === playerTwo){
      alert('Nem egyezhet a két név')
      return
    }
    setBoard(Array(10).fill(null).map(() => Array(10).fill(null)))
    setXIsNext(true)
  }

  const Table = board.map((row, i) => (
    <Row row={row} key={i} rowIndex={i} handlecellclick={handleCellClick}/>
  ))

  return (
    <div className="container">
      <div>
        <div className='playerone_container'>
          <h2>Player one</h2>
          <input type='text' placeholder='neved' onChange={() => {setPlayerOne(playerOneEl.current.value)}}  ref={playerOneEl} />
          <input type='text'maxLength='1' placeholder='jeled' onChange={() => {setPlayerOneMark(playerOneMarkEl.current.value)}} ref={playerOneMarkEl} />
        </div>
        <div className='playertwo_container' >
          <h2>Player two</h2>
          <input type='text' placeholder='neved' onChange={() => {setPlayerTwo(playerTwoEl.current.value)}}  ref={playerTwoEl} />
          <input type='text' maxLength='1' placeholder='jeled' onChange={() => {setPlayerTwoMark(playerTwoMarkEl.current.value)}} ref={playerTwoMarkEl} />
        </div>        
        <button onClick={newGame}>Új játék</button>
      </div>
      <div className='table-container' >
        {Table}
      </div>
      <p>
        {winner ? 'winner: ' + winnerName : 'Next player: ' + (xIsNext ? playerOne : playerTwo)}
      </p>
    </div>
  );
}

export default App;
