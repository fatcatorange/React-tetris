import TetrisGame from './TetrisGame';
import React from 'react';
import './App.css';
import HomePage from './HomePage';
import WaitingPage from './waitingPage';

function App() {
  const [nowPage,setNowPage] = React.useState("homePage")
  const [multiPlayerID,setMultiPlayerID] = React.useState("");
  let page;
  if(nowPage === "homePage")
  {
    page = <HomePage startSinglePlayerMode = {()=>(setNowPage("singlePlayerMode"))} startMatching = {()=>(setNowPage("waitingForMatch"))}/>
  }
  else if(nowPage === "singlePlayerMode")
  {
    page = <TetrisGame backToHomePage = {()=>(setNowPage("homePage"))}/>
  }
  else if(nowPage === "waitingForMatch")
  {
    page = <WaitingPage backToHomePage = {()=>(setNowPage("homePage"))} startMultiplayerMode = {()=>(setNowPage("homePage"))}/>
  }
  else if(nowPage === "startMultiplayerMode")
  {

  }
  return (
    page
    
  );
}

export default App;
