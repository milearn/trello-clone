import React from 'react';
import Input from './components/Input';
import Board from './components/Board';
import './App.css';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { getBoard, addBoard, BoardState } from './reducers/BoardSlice';

function App() {
  const board = useAppSelector(getBoard);
  const dispatch = useAppDispatch();
  const handleBoardAddition = (text) => {
    dispatch(addBoard(text));
  }
  const renderBoards = (board: BoardState) => <Board key={board.id} board={board} />
  return (
    <div className="app">
      <header className="app-header">
        <h1>Trello Board</h1>
        <Input displaySize="large" placeholder="Add a Board" onSubmit={handleBoardAddition} />
      </header>
      <main>
        {board.map(renderBoards)}
      </main>
    </div>
  );
}

export default App;
