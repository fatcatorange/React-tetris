import React from "react";
import './MultiPlayerGameOverPanel.css';

export default function BackToHome(props){

  return (
    <div className="multiplayer-game-over-panel">
        <div>他不要跟你玩了</div>
            <button className="rematch-button" onClick = {props.quit}>back</button>   
    </div>
  )
}